import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

// Cosmic Network Points Component
function CosmicNetworkPoints({ count = 800 }) {
    const mesh = useRef();
    const light = useRef();

    // Generate cosmic network positions
    const [positions, connections] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const connections = [];
        const nodes = [];

        // Create main network nodes in 3D space
        for (let i = 0; i < count; i++) {
            const radius = Math.random() * 25 + 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            nodes.push({ x, y, z, index: i });
        }

        // Create connections between nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) +
                    Math.pow(nodes[i].y - nodes[j].y, 2) +
                    Math.pow(nodes[i].z - nodes[j].z, 2)
                );

                // Connect nodes within a certain distance
                if (distance < 8 && Math.random() > 0.7) {
                    connections.push([
                        nodes[i].x, nodes[i].y, nodes[i].z,
                        nodes[j].x, nodes[j].y, nodes[j].z
                    ]);
                }
            }
        }

        return [positions, connections];
    }, [count]);

    // Animate the network
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (mesh.current) {
            mesh.current.rotation.x = time * 0.1;
            mesh.current.rotation.y = time * 0.05;
            mesh.current.rotation.z = time * 0.02;
        }

        if (light.current) {
            light.current.position.x = Math.sin(time * 0.5) * 10;
            light.current.position.z = Math.cos(time * 0.5) * 10;
        }
    });

    return (
        <group>
            {/* Cosmic network points */}
            <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#2dd4bf"
                    size={0.3}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Network connections */}
            {connections.map((connection, index) => (
                <Line
                    key={index}
                    points={[
                        [connection[0], connection[1], connection[2]],
                        [connection[3], connection[4], connection[5]]
                    ]}
                    color="#8b5cf6"
                    transparent
                    opacity={0.3}
                    lineWidth={1}
                />
            ))}

            {/* Ambient cosmic lighting */}
            <ambientLight intensity={0.3} color="#2dd4bf" />
            <pointLight ref={light} position={[0, 0, 10]} intensity={1} color="#8b5cf6" />
            <pointLight position={[10, 10, -10]} intensity={0.5} color="#2dd4bf" />
        </group>
    );
}

// Floating Cosmic Orbs Component
function CosmicOrbs({ count = 20 }) {
    const orbsRef = useRef();

    const orbs = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            ],
            scale: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.02 + 0.01,
            color: Math.random() > 0.5 ? '#2dd4bf' : '#8b5cf6'
        }));
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (orbsRef.current) {
            orbsRef.current.children.forEach((orb, index) => {
                const orbData = orbs[index];
                orb.position.y += Math.sin(time * orbData.speed + index) * 0.01;
                orb.position.x += Math.cos(time * orbData.speed + index) * 0.005;
                orb.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.2;
            });
        }
    });

    return (
        <group ref={orbsRef}>
            {orbs.map((orb, index) => (
                <mesh key={index} position={orb.position} scale={orb.scale}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial
                        color={orb.color}
                        transparent
                        opacity={0.4}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Energy Streams Component
function EnergyStreams() {
    const streamRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (streamRef.current) {
            streamRef.current.rotation.y = time * 0.1;
            streamRef.current.rotation.z = time * 0.05;
        }
    });

    const streamPoints = useMemo(() => {
        const points = [];
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 4;
            const radius = 15 + Math.sin(i * 0.1) * 5;
            points.push([
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                (i - 50) * 0.3
            ]);
        }
        return points;
    }, []);

    return (
        <group ref={streamRef}>
            <Line
                points={streamPoints}
                color="#2dd4bf"
                transparent
                opacity={0.6}
                lineWidth={2}
            />
            <Line
                points={streamPoints.map(([x, y, z]) => [-x, -y, z])}
                color="#8b5cf6"
                transparent
                opacity={0.6}
                lineWidth={2}
            />
        </group>
    );
}

// Cosmic Dust Particles
function CosmicDust({ count = 1000 }) {
    const dustRef = useRef();

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (dustRef.current) {
            dustRef.current.rotation.y = time * 0.02;
            dustRef.current.rotation.x = time * 0.01;
        }
    });

    return (
        <Points ref={dustRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// Main Interdimensional Network Component
export default function InterdimensionalNetwork({ className = "" }) {
    return (
        <div className={`fixed inset-0 -z-10 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 30], fov: 60 }}
                style={{ background: 'transparent' }}
            >
                <fog attach="fog" args={['#000000', 30, 100]} />

                {/* Main cosmic network */}
                <CosmicNetworkPoints count={600} />

                {/* Floating cosmic orbs */}
                <CosmicOrbs count={15} />

                {/* Energy streams */}
                <EnergyStreams />

                {/* Background cosmic dust */}
                <CosmicDust count={800} />

                {/* Additional lighting effects */}
                <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />
                <directionalLight position={[10, 10, 5]} intensity={0.3} color="#2dd4bf" />
            </Canvas>
        </div>
    );
}
