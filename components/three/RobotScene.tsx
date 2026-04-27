"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   CHILD FIGURE (built from geometry primitives)
   The child has a round head, body, arms, legs
   and "draws" on a floating canvas plane.
───────────────────────────────────────────── */
function ChildFigure({ t }: { t: number }) {
    const group = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (group.current) {
            // Gentle bobbing
            group.current.position.y = Math.sin(time * 1.4) * 0.08;
            // Slight look-around sway
            group.current.rotation.y = Math.sin(time * 0.4) * 0.18;
        }
    });

    const skin = "#f4c2a1";
    const shirt = "#00f5ff";
    const pants = "#1e3a5f";

    return (
        <group ref={group} position={[-3.2, -1, 0]}>
            {/* Head */}
            <mesh position={[0, 2.15, 0]}>
                <sphereGeometry args={[0.28, 16, 16]} />
                <meshStandardMaterial color={skin} />
            </mesh>
            {/* Hair */}
            <mesh position={[0, 2.38, 0]}>
                <sphereGeometry args={[0.19, 12, 12]} />
                <meshStandardMaterial color="#2d1a00" />
            </mesh>
            {/* Body */}
            <mesh position={[0, 1.6, 0]}>
                <boxGeometry args={[0.44, 0.6, 0.24]} />
                <meshStandardMaterial color={shirt} emissive={new THREE.Color("#00f5ff")} emissiveIntensity={0.1} />
            </mesh>
            {/* Left arm (raised to draw) */}
            <mesh position={[-0.35, 1.78, 0]} rotation={[0, 0, Math.PI / 3]}>
                <capsuleGeometry args={[0.06, 0.38, 4, 8]} />
                <meshStandardMaterial color={skin} />
            </mesh>
            {/* Right arm (relaxed) */}
            <mesh position={[0.35, 1.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <capsuleGeometry args={[0.06, 0.38, 4, 8]} />
                <meshStandardMaterial color={skin} />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.13, 0.95, 0]}>
                <capsuleGeometry args={[0.07, 0.42, 4, 8]} />
                <meshStandardMaterial color={pants} />
            </mesh>
            <mesh position={[0.13, 0.95, 0]}>
                <capsuleGeometry args={[0.07, 0.42, 4, 8]} />
                <meshStandardMaterial color={pants} />
            </mesh>
            {/* Shoes */}
            <mesh position={[-0.13, 0.68, 0.06]}>
                <boxGeometry args={[0.16, 0.1, 0.22]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.13, 0.68, 0.06]}>
                <boxGeometry args={[0.16, 0.1, 0.22]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Pencil in left hand */}
            <mesh position={[-0.65, 2.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <cylinderGeometry args={[0.025, 0.025, 0.4, 6]} />
                <meshStandardMaterial color="#f59e0b" />
            </mesh>
            <mesh position={[-0.76, 1.88, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <coneGeometry args={[0.025, 0.1, 6]} />
                <meshStandardMaterial color="#f97316" />
            </mesh>
        </group>
    );
}

/* ─────────────────────────────────────────────
   ROBOT (assembled from boxes + cylinders)
   Robots waddle back and forth
───────────────────────────────────────────── */
function Robot({
    position,
    scale = 1,
    color = "#8b5cf6",
    phase = 0,
}: {
    position: [number, number, number];
    scale?: number;
    color?: string;
    phase?: number;
}) {
    const group = useRef<THREE.Group>(null);
    const leftLeg = useRef<THREE.Mesh>(null);
    const rightLeg = useRef<THREE.Mesh>(null);
    const leftArm = useRef<THREE.Mesh>(null);
    const rightArm = useRef<THREE.Mesh>(null);
    const eyeL = useRef<THREE.Mesh>(null);
    const eyeR = useRef<THREE.Mesh>(null);
    const mat = useMemo(() => new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity: 0.2 }), [color]);
    const glowMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00f5ff", emissive: new THREE.Color("#00f5ff"), emissiveIntensity: 1 }), []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() + phase;
        if (group.current) {
            group.current.position.x = position[0] + Math.sin(t * 0.7) * 0.4;
            group.current.position.y = position[1] + Math.abs(Math.sin(t * 1.4)) * 0.06;
            group.current.rotation.y = Math.sin(t * 0.4) * 0.4;
        }
        if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * 2) * 0.35;
        if (rightLeg.current) rightLeg.current.rotation.x = -Math.sin(t * 2) * 0.35;
        if (leftArm.current) leftArm.current.rotation.x = -Math.sin(t * 2) * 0.4;
        if (rightArm.current) rightArm.current.rotation.x = Math.sin(t * 2) * 0.4;
        // Blinking eyes
        if (eyeL.current && eyeR.current) {
            const blink = Math.abs(Math.sin(t * 0.5)) > 0.97 ? 0.1 : 1;
            eyeL.current.scale.y = blink;
            eyeR.current.scale.y = blink;
        }
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Head */}
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[0.55, 0.48, 0.48]} />
                <primitive object={mat} />
            </mesh>
            {/* Antenna */}
            <mesh position={[0, 1.9, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.25, 6]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            <mesh position={[0, 2.05, 0]} ref={eyeL}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <primitive object={glowMat} />
            </mesh>
            {/* Eyes */}
            <mesh ref={eyeL} position={[-0.13, 1.52, 0.26]}>
                <circleGeometry args={[0.075, 12]} />
                <primitive object={glowMat} />
            </mesh>
            <mesh ref={eyeR} position={[0.13, 1.52, 0.26]}>
                <circleGeometry args={[0.075, 12]} />
                <primitive object={glowMat} />
            </mesh>
            {/* Mouth grill */}
            {[-0.1, 0, 0.1].map((x) => (
                <mesh key={x} position={[x, 1.32, 0.25]}>
                    <boxGeometry args={[0.05, 0.04, 0.01]} />
                    <meshStandardMaterial color="#00f5ff" emissive={new THREE.Color("#00f5ff")} emissiveIntensity={0.8} />
                </mesh>
            ))}
            {/* Body */}
            <mesh position={[0, 0.8, 0]}>
                <boxGeometry args={[0.6, 0.7, 0.44]} />
                <primitive object={mat} />
            </mesh>
            {/* Chest indicator */}
            <mesh position={[0, 0.88, 0.23]}>
                <circleGeometry args={[0.12, 16]} />
                <meshStandardMaterial color="#00f5ff" emissive={new THREE.Color("#00f5ff")} emissiveIntensity={1} />
            </mesh>
            {/* Arms */}
            <mesh ref={leftArm} position={[-0.42, 0.82, 0]}>
                <capsuleGeometry args={[0.07, 0.42, 4, 8]} />
                <primitive object={mat} />
            </mesh>
            <mesh ref={rightArm} position={[0.42, 0.82, 0]}>
                <capsuleGeometry args={[0.07, 0.42, 4, 8]} />
                <primitive object={mat} />
            </mesh>
            {/* Legs */}
            <mesh ref={leftLeg} position={[-0.18, 0.22, 0]}>
                <capsuleGeometry args={[0.09, 0.46, 4, 8]} />
                <primitive object={mat} />
            </mesh>
            <mesh ref={rightLeg} position={[0.18, 0.22, 0]}>
                <capsuleGeometry args={[0.09, 0.46, 4, 8]} />
                <primitive object={mat} />
            </mesh>
            {/* Feet */}
            <mesh position={[-0.18, -0.12, 0.08]}>
                <boxGeometry args={[0.22, 0.1, 0.3]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.18, -0.12, 0.08]}>
                <boxGeometry args={[0.22, 0.1, 0.3]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <pointLight color={color} intensity={1.5} distance={2.5} />
        </group>
    );
}

/* ─────────────────────────────────────────────
   DRAWING CANVAS PLANE + ANIMATED NEON LINES
   Simulates the child drawing a robot
───────────────────────────────────────────── */
function DrawingCanvas() {
    const group = useRef<THREE.Group>(null);
    const lineRef = useRef<THREE.Line>(null);

    const points = useMemo(() => {
        // Pre-computed "robot drawing" path points
        return [
            // head square
            [-0.2, 0.6, 0], [0.2, 0.6, 0], [0.2, 0.9, 0], [-0.2, 0.9, 0], [-0.2, 0.6, 0],
            // neck
            [0, 0.6, 0], [0, 0.5, 0],
            // body
            [-0.28, 0.5, 0], [0.28, 0.5, 0], [0.28, 0.0, 0], [-0.28, 0.0, 0], [-0.28, 0.5, 0],
            // arms
            [-0.28, 0.4, 0], [-0.55, 0.25, 0], [-0.28, 0.4, 0],
            [0.28, 0.4, 0], [0.55, 0.25, 0], [0.28, 0.4, 0],
            // legs
            [-0.28, 0.0, 0], [-0.18, -0.38, 0], [-0.28, 0.0, 0],
            [0.28, 0.0, 0], [0.18, -0.38, 0], [0.28, 0.0, 0],
            // eyes
            [-0.09, 0.78, 0.01], [-0.05, 0.78, 0.01], [-0.09, 0.78, 0.01],
            [0.09, 0.78, 0.01], [0.05, 0.78, 0.01], [0.09, 0.78, 0.01],
        ].map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    }, []);

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.15;
        }
        // Animate the drawn line growing
        if (lineRef.current) {
            const totalPts = points.length;
            const drawn = Math.floor(((Math.sin(clock.getElapsedTime() * 0.3) * 0.5 + 0.5)) * totalPts);
            const geo = new THREE.BufferGeometry().setFromPoints(points.slice(0, Math.max(2, drawn)));
            lineRef.current.geometry.dispose();
            lineRef.current.geometry = geo;
        }
    });

    return (
        <group ref={group} position={[-1.1, -0.1, 0.3]}>
            {/* Paper/canvas plane */}
            <mesh>
                <planeGeometry args={[1.3, 1.5]} />
                <meshStandardMaterial color="#0a0f1e" transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>
            {/* Border */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(1.3, 1.5) as any]} />
                <lineBasicMaterial color="#00f5ff" transparent opacity={0.3} />
            </lineSegments>
            {/* Animated drawing */}
            <line ref={lineRef as any}>
                <bufferGeometry />
                <lineBasicMaterial color="#00f5ff" linewidth={1.5} />
            </line>
            {/* Paper label */}
            <pointLight color="#00f5ff" intensity={0.6} distance={2} />
        </group>
    );
}

/* ─────────────────────────────────────────────
   FLOATING STARS PARTICLES
───────────────────────────────────────────── */
function Stars() {
    const ref = useRef<THREE.Points>(null);
    const geo = useMemo(() => {
        const positions = new Float32Array(300 * 3);
        for (let i = 0; i < 300; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 18;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return g;
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    });

    return (
        <points ref={ref} geometry={geo}>
            <pointsMaterial color="#94a3b8" size={0.04} transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

/* ─────────────────────────────────────────────
   FULL SCENE
───────────────────────────────────────────── */
function Scene() {
    const timeRef = useRef(0);
    useFrame(({ clock }) => { timeRef.current = clock.getElapsedTime(); });

    return (
        <>
            <ambientLight intensity={0.35} />
            <directionalLight position={[5, 8, 5]} intensity={0.6} color="#ffffff" />
            <pointLight position={[-5, 3, 2]} intensity={1.2} color="#00f5ff" distance={12} />
            <pointLight position={[5, 2, 2]} intensity={0.8} color="#8b5cf6" distance={10} />

            <Stars />
            <ChildFigure t={timeRef.current} />
            <DrawingCanvas />

            {/* Three robots at different positions & colors */}
            <Robot position={[1.8, -1, 0]} scale={0.9} color="#8b5cf6" phase={0} />
            <Robot position={[3.4, -1, -1]} scale={0.75} color="#00f5ff" phase={1.5} />
            <Robot position={[4.8, -1, 0.5]} scale={0.65} color="#3b82f6" phase={3} />

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]}>
                <planeGeometry args={[22, 12]} />
                <meshStandardMaterial color="#030712" transparent opacity={0.6} />
            </mesh>
            {/* Grid lines on ground */}
            <gridHelper args={[22, 30, "#00f5ff", "#0d1526"]} position={[0, -1.27, 0]} />
        </>
    );
}

export default function RobotScene() {
    return (
        <div className="w-full h-[480px] md:h-[560px] relative rounded-2xl overflow-hidden">
            <Canvas
                camera={{ position: [0, 1.5, 8], fov: 55 }}
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                shadows
            >
                <Scene />
            </Canvas>
            {/* Overlay label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-mono">
                ✦ Interactive 3D Scene — drag to orbit
            </div>
        </div>
    );
}
