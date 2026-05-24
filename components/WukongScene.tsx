"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ─────────────────────────────────────────────
// WUKONG 3D SCENE — Full Boss-Fight Interactive
// ─────────────────────────────────────────────
export default function WukongScene() {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    // ── RENDERER ─────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent
    Object.assign(renderer.domElement.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "0",
      pointerEvents: "none",
    });
    document.body.prepend(renderer.domElement);

    // ── SCENE / CAMERA ───────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 5);

    // ── LIGHTS ───────────────────────────────
    const ambient = new THREE.AmbientLight(0x111111, 1);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffd700, 2.5);
    keyLight.position.set(3, 8, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8b0000, 1.8);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.5, 8);
    pointLight.position.set(2.5, -0.5, 1);
    scene.add(pointLight);

    // ── GROUND PLANE (receives shadows) ──────
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── MODEL STATE ──────────────────────────
    let wukongModel: THREE.Group | null = null;
    let wukongMixer: THREE.AnimationMixer | null = null;
    let idleAction: THREE.AnimationAction | null = null;
    let runAction: THREE.AnimationAction | null = null;
    let isAttacking = false;
    let floatTime = 0;
    const HOME_POS = new THREE.Vector3(2.5, -1, 0);

    // ── LOAD MODEL ───────────────────────────
    const loader = new GLTFLoader();

    // Try Wukong-style warrior, fallback to Soldier.glb
    const MODEL_URLS = [
      "https://threejs.org/examples/models/gltf/Soldier.glb",
    ];

    function loadModel(urlIndex: number) {
      if (urlIndex >= MODEL_URLS.length) return;
      loader.load(
        MODEL_URLS[urlIndex],
        (gltf) => {
          wukongModel = gltf.scene;
          wukongMixer = new THREE.AnimationMixer(wukongModel);

          wukongModel.scale.set(1.2, 1.2, 1.2);
          wukongModel.position.copy(HOME_POS);
          wukongModel.rotation.y = -0.4;

          wukongModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat) {
                // Golden tint
                mat.emissive = new THREE.Color(0x3a2a00);
                mat.emissiveIntensity = 0.3;
                mat.color.multiplyScalar(0.9);
              }
            }
          });

          scene.add(wukongModel);

          const clips = gltf.animations;
          if (clips.length > 0) {
            idleAction = wukongMixer.clipAction(clips[0]);
            idleAction.play();
          }
          if (clips.length > 3) {
            runAction = wukongMixer.clipAction(clips[3]);
          }

          // Attach click listeners after model is ready
          attachClickListeners();
        },
        undefined,
        () => loadModel(urlIndex + 1)
      );
    }
    loadModel(0);

    // ── HELPERS ──────────────────────────────
    function screenTo3D(screenX: number, screenY: number, depth = 2) {
      const vec = new THREE.Vector3(
        (screenX / window.innerWidth) * 2 - 1,
        -(screenY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = (depth - camera.position.z) / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(dist));
    }

    // ── SHOCKWAVE + SPARKS ───────────────────
    function spawnHitEffect(pos: THREE.Vector3) {
      // Shockwave ring
      const ringGeo = new THREE.RingGeometry(0.1, 0.15, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(camera.position);
      scene.add(ring);

      let ringScale = 1;
      const expandRing = setInterval(() => {
        ringScale += 0.3;
        ring.scale.setScalar(ringScale);
        ringMat.opacity = Math.max(0, 1 - ringScale / 10);
        if (ringScale > 10) {
          scene.remove(ring);
          ringGeo.dispose();
          ringMat.dispose();
          clearInterval(expandRing);
        }
      }, 16);

      // Second inner ring (crimson)
      const ring2Geo = new THREE.RingGeometry(0.05, 0.1, 32);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x8b0000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.position.copy(pos);
      ring2.lookAt(camera.position);
      scene.add(ring2);
      let r2Scale = 1;
      const expandRing2 = setInterval(() => {
        r2Scale += 0.5;
        ring2.scale.setScalar(r2Scale);
        ring2Mat.opacity = Math.max(0, 0.8 - r2Scale / 6);
        if (r2Scale > 6) {
          scene.remove(ring2);
          ring2Geo.dispose();
          ring2Mat.dispose();
          clearInterval(expandRing2);
        }
      }, 16);

      // Gold sparks
      const sparks = new THREE.Group();
      for (let i = 0; i < 24; i++) {
        const geo = new THREE.SphereGeometry(0.04, 4, 4);
        const mat = new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? 0xff4400 : 0xffd700,
        });
        const spark = new THREE.Mesh(geo, mat);
        spark.position.copy(pos);
        (spark as any).velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.22,
          Math.random() * 0.22,
          (Math.random() - 0.5) * 0.22
        );
        sparks.add(spark);
      }
      scene.add(sparks);

      let sparkLife = 0;
      const animSparks = setInterval(() => {
        sparkLife++;
        sparks.children.forEach((s) => {
          const m = s as THREE.Mesh;
          m.position.add((m as any).velocity);
          (m as any).velocity.y -= 0.009;
          m.scale.multiplyScalar(0.97);
        });
        if (sparkLife > 45) {
          sparks.children.forEach((s) => {
            (s as THREE.Mesh).geometry.dispose();
            ((s as THREE.Mesh).material as THREE.Material).dispose();
          });
          scene.remove(sparks);
          clearInterval(animSparks);
        }
      }, 16);
    }

    // ── BUTTON SHATTER ───────────────────────
    function shatterButton(btn: HTMLElement) {
      btn.style.transition = "none";
      btn.style.animation = "wukong-shatter3D 0.5s ease-in forwards";

      const rect = btn.getBoundingClientRect();
      for (let i = 0; i < 12; i++) {
        const shard = document.createElement("div");
        const size = 8 + Math.random() * 14;
        const dx = (Math.random() - 0.5) * 320;
        const dy = -(Math.random() * 220 + 60);
        const rz = (Math.random() - 0.5) * 720;
        const rx = (Math.random() - 0.5) * 360;
        shard.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, #B4833D, #D4A95A);
          border-radius: 2px;
          left: ${rect.left + Math.random() * rect.width}px;
          top: ${rect.top + Math.random() * rect.height}px;
          z-index: 999999;
          pointer-events: none;
          --wk-dx: ${dx}px;
          --wk-dy: ${dy}px;
          --wk-rz: ${rz}deg;
          --wk-rx: ${rx}deg;
          animation: wukong-shardFly 0.85s ease-out forwards;
        `;
        document.body.appendChild(shard);
        setTimeout(() => shard.remove(), 900);
      }
    }

    // ── GOLD SLASH WIPE ──────────────────────
    function goldSlashWipe(btn: HTMLElement, onDone: () => void) {
      const flash = document.createElement("div");
      flash.style.cssText = `
        position: fixed; inset: 0;
        background: linear-gradient(135deg, #B4833D 0%, #D4A95A 40%, #8B0000 100%);
        z-index: 9999999;
        pointer-events: none;
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        animation: wukong-slashWipe 0.5s cubic-bezier(0.76,0,0.24,1) forwards;
      `;
      document.body.appendChild(flash);
      setTimeout(() => {
        onDone();
        setTimeout(() => {
          flash.style.animation = "wukong-slashWipeOut 0.4s ease-in-out forwards";
          setTimeout(() => flash.remove(), 420);
        }, 50);
      }, 460);
    }

    // ── RESET WUKONG TO HOME ─────────────────
    function resetWukong() {
      if (!wukongModel) return;
      const startPos = wukongModel.position.clone();
      const dur = 900;
      const t0 = performance.now();
      function ret(now: number) {
        const t = Math.min((now - t0) / dur, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        wukongModel!.position.lerpVectors(startPos, HOME_POS, ease);
        if (t < 1) requestAnimationFrame(ret);
        else {
          wukongModel!.rotation.x = 0;
          wukongModel!.rotation.y = -0.4;
          idleAction?.reset().play();
          isAttacking = false;
        }
      }
      requestAnimationFrame(ret);
    }

    // ── FLIP + STRIKE SEQUENCE ───────────────
    function startFlip(btn: HTMLElement, targetPos: THREE.Vector3) {
      if (!wukongModel) return;
      const flipDur = 700;
      const t0 = performance.now();
      const startRotX = wukongModel.rotation.x;

      function flipFrame(now: number) {
        const t = Math.min((now - t0) / flipDur, 1);
        wukongModel!.rotation.x = startRotX + Math.PI * 2 * t;
        wukongModel!.position.y += Math.sin(t * Math.PI) * 0.05;
        if (t < 1) requestAnimationFrame(flipFrame);
        else {
          wukongModel!.rotation.x = startRotX;
          // Staff strike effect
          spawnHitEffect(targetPos);
          shatterButton(btn);
          setTimeout(() => {
            goldSlashWipe(btn, () => {
              // Navigate / click
              if (
                btn instanceof HTMLAnchorElement &&
                btn.href &&
                btn.href !== "#" &&
                !btn.href.endsWith("#")
              ) {
                window.location.href = btn.href;
              } else {
                // Fire the button's original handler
                const clone = btn.cloneNode(true) as HTMLElement;
                btn.parentNode?.replaceChild(clone, btn);
                clone.click();
                btn.parentNode?.replaceChild(btn, clone);
              }
            });
          }, 100);
          setTimeout(() => resetWukong(), 1200);
        }
      }
      requestAnimationFrame(flipFrame);
    }

    // ── DASH TOWARD BUTTON ───────────────────
    function dashToTarget(btn: HTMLElement) {
      if (!wukongModel) return;
      const rect = btn.getBoundingClientRect();
      const target3D = screenTo3D(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
      // Clamp depth so model stays visible
      target3D.z = Math.max(target3D.z, 1);

      const startPos = wukongModel.position.clone();
      const dur = 500;
      const t0 = performance.now();

      // Face target
      wukongModel.lookAt(target3D.x, wukongModel.position.y, target3D.z);
      idleAction?.stop();
      runAction?.reset().play();

      function dashFrame(now: number) {
        const t = Math.min((now - t0) / dur, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        wukongModel!.position.lerpVectors(startPos, target3D, ease);
        if (t < 1) requestAnimationFrame(dashFrame);
        else {
          runAction?.stop();
          startFlip(btn, target3D);
        }
      }
      requestAnimationFrame(dashFrame);
    }

    // ── CLICK LISTENERS ──────────────────────
    const cleanupFns: (() => void)[] = [];

    function attachClickListeners() {
      const targets = document.querySelectorAll<HTMLElement>(
        "button, a, [role='button'], input[type='submit'], .cursor-target"
      );
      targets.forEach((btn) => {
        const handler = (e: Event) => {
          if (isAttacking || !wukongModel) return;
          e.preventDefault();
          e.stopPropagation();
          isAttacking = true;
          dashToTarget(btn);
        };
        btn.addEventListener("click", handler, true);
        cleanupFns.push(() => btn.removeEventListener("click", handler, true));
      });
    }

    // ── PULSING LIGHT ────────────────────────
    let pulseDir = 1;
    function pulseLight() {
      pointLight.intensity += 0.018 * pulseDir;
      if (pointLight.intensity > 2.2 || pointLight.intensity < 0.8)
        pulseDir *= -1;
    }

    // ── IDLE FLOAT ───────────────────────────
    function wukongIdleFloat(delta: number) {
      if (!wukongModel || isAttacking) return;
      floatTime += delta;
      wukongModel.position.y =
        HOME_POS.y + Math.sin(floatTime * 0.8) * 0.12;
      wukongModel.rotation.y = -0.4 + Math.sin(floatTime * 0.4) * 0.08;
      const breathe = 1 + Math.sin(floatTime * 1.2) * 0.012;
      wukongModel.scale.setScalar(1.2 * breathe);
    }

    // ── ANIMATE LOOP ─────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      wukongMixer?.update(delta);
      wukongIdleFloat(delta);
      pulseLight();
      renderer.render(scene, camera);
    }
    animate();

    // ── RESIZE ───────────────────────────────
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // ── CSS KEYFRAMES (injected once) ────────
    if (!document.getElementById("wukong-scene-styles")) {
      const style = document.createElement("style");
      style.id = "wukong-scene-styles";
      style.textContent = `
        @keyframes wukong-shatter3D {
          0%   { transform: scale(1) rotateX(0deg); opacity: 1; filter: brightness(3); }
          40%  { transform: scale(1.35) rotateX(20deg) rotateZ(5deg); filter: brightness(6); }
          100% { transform: scale(0) rotateX(90deg) rotateZ(15deg); opacity: 0; }
        }
        @keyframes wukong-shardFly {
          0%   { transform: translate(0,0) rotateZ(0deg) rotateX(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--wk-dx), var(--wk-dy)) rotateZ(var(--wk-rz)) rotateX(var(--wk-rx)) scale(0.2); opacity: 0; }
        }
        @keyframes wukong-slashWipe {
          0%   { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          50%  { clip-path: polygon(0 0, 110% 0, 110% 100%, 0 100%); }
          100% { clip-path: polygon(0 0, 110% 0, 110% 100%, 0 100%); }
        }
        @keyframes wukong-slashWipeOut {
          0%   { clip-path: polygon(0 0, 110% 0, 110% 100%, 0 100%); }
          100% { clip-path: polygon(110% 0, 110% 0, 110% 100%, 110% 100%); }
        }
      `;
      document.head.appendChild(style);
    }

    // ── CLEANUP ──────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      cleanupFns.forEach((fn) => fn());
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      mountedRef.current = false;
    };
  }, []);

  return null; // No DOM — renders into WebGL canvas
}
