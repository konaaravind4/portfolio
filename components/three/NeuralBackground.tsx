"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Number of nodes in the neural network
const NODE_COUNT = 80;
const CONNECTION_THRESHOLD = 0.28;

function NeuralNodes({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
    const meshRef = useRef<THREE.Points>(null);
    const lineRef = useRef<THREE.LineSegments>(null);
    const { size } = useThree();

    // Generate random node positions
    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(NODE_COUNT * 3);
        const velocities = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 14;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
            velocities.push({
                x: (Math.random() - 0.5) * 0.003,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.001,
            });
        }
        return { positions, velocities };
    }, []);

    const nodeGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
        return geo;
    }, [positions]);

    const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    useFrame(({ clock }) => {
        if (!meshRef.current || !lineRef.current) return;

        const time = clock.getElapsedTime();
        const posAttr = meshRef.current.geometry.attributes.position;
        const posArray = posAttr.array as Float32Array;

        // Animate nodes
        for (let i = 0; i < NODE_COUNT; i++) {
            posArray[i * 3] += velocities[i].x + Math.sin(time * 0.3 + i) * 0.0008;
            posArray[i * 3 + 1] += velocities[i].y + Math.cos(time * 0.2 + i) * 0.0008;
            posArray[i * 3 + 2] += velocities[i].z;

            // Boundary bounce
            if (Math.abs(posArray[i * 3]) > 7.5) velocities[i].x *= -1;
            if (Math.abs(posArray[i * 3 + 1]) > 5) velocities[i].y *= -1;
            if (Math.abs(posArray[i * 3 + 2]) > 2.5) velocities[i].z *= -1;

            // Mouse repulsion
            const mx = (mousePos.current.x - 0.5) * 14;
            const my = -(mousePos.current.y - 0.5) * 9;
            const dx = posArray[i * 3] - mx;
            const dy = posArray[i * 3 + 1] - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 2) {
                posArray[i * 3] += (dx / dist) * 0.015;
                posArray[i * 3 + 1] += (dy / dist) * 0.015;
            }
        }
        posAttr.needsUpdate = true;

        // Draw connections
        const linePositions: number[] = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                const dx = posArray[i * 3] - posArray[j * 3];
                const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < CONNECTION_THRESHOLD * 20) {
                    linePositions.push(
                        posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
                        posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
                    );
                }
            }
        }

        lineRef.current.geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(linePositions, 3)
        );
    });

    const nodeMaterial = useMemo(
        () =>
            new THREE.PointsMaterial({
                color: new THREE.Color("#A4DA65"),
                size: 0.09,
                transparent: true,
                opacity: 0.7,
                sizeAttenuation: true,
            }),
        []
    );

    const lineMaterial = useMemo(
        () =>
            new THREE.LineBasicMaterial({
                color: new THREE.Color("#6B7280"),
                transparent: true,
                opacity: 0.18,
            }),
        []
    );

    return (
        <>
            <points ref={meshRef} geometry={nodeGeometry} material={nodeMaterial} />
            <lineSegments ref={lineRef} geometry={lineGeometry} material={lineMaterial} />
        </>
    );
}

function PulsingOrb({ position, color }: { position: [number, number, number]; color: string }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.15);
        (ref.current.material as THREE.MeshBasicMaterial).opacity =
            0.06 + Math.sin(t * 1.5) * 0.04;
    });
    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshBasicMaterial color={new THREE.Color(color)} transparent opacity={0.08} />
        </mesh>
    );
}

function Scene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
    return (
        <>
            <NeuralNodes mousePos={mousePos} />
            <PulsingOrb position={[-4, 2, -2]} color="#A4DA65" />
            <PulsingOrb position={[4, -2, -1]} color="#6EE7B7" />
            <PulsingOrb position={[0, 0, -3]} color="#A4DA65" />
        </>
    );
}

export default function NeuralBackground() {
    const mousePos = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mousePos.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <Scene mousePos={mousePos} />
            </Canvas>
        </div>
    );
}
