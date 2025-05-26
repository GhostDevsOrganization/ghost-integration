import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuantumField({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode === 'high' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? window.devicePixelRatio : 1);
        mountRef.current.appendChild(renderer.domElement);

        // Quantum field grid
        const gridSize = performanceMode === 'high' ? 30 : 20;
        const spacing = 2;
        const quantumNodes = [];

        // Create quantum nodes
        for (let x = -gridSize / 2; x < gridSize / 2; x++) {
            for (let z = -gridSize / 2; z < gridSize / 2; z++) {
                const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
                const nodeMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(themeData.colors.accentPrimary),
                    transparent: true,
                    opacity: 0.6
                });
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

                node.position.set(x * spacing, 0, z * spacing);
                node.userData = {
                    baseY: 0,
                    phase: Math.random() * Math.PI * 2,
                    frequency: 0.5 + Math.random() * 1.5,
                    amplitude: 0.5 + Math.random() * 2,
                    superposition: Math.random() > 0.7
                };

                scene.add(node);
                quantumNodes.push(node);
            }
        }

        // Quantum entanglement connections
        const entanglements = [];
        const entanglementMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(themeData.colors.accentSecondary),
            transparent: true,
            opacity: 0.3
        });

        // Create random entanglements
        for (let i = 0; i < quantumNodes.length * 0.1; i++) {
            const node1 = quantumNodes[Math.floor(Math.random() * quantumNodes.length)];
            const node2 = quantumNodes[Math.floor(Math.random() * quantumNodes.length)];

            if (node1 !== node2) {
                const points = [node1.position, node2.position];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, entanglementMaterial.clone());
                scene.add(line);
                entanglements.push({ line, node1, node2 });
            }
        }

        // Wave interference patterns
        const waveCount = performanceMode === 'high' ? 5 : 3;
        const waves = [];

        for (let i = 0; i < waveCount; i++) {
            const waveGeometry = new THREE.RingGeometry(5 + i * 3, 5.5 + i * 3, 64);
            const waveMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide
            });
            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            wave.rotation.x = Math.PI / 2;
            wave.userData = {
                phase: i * 0.5,
                speed: 0.02 + Math.random() * 0.02
            };
            scene.add(wave);
            waves.push(wave);
        }

        // Quantum particles
        const particleCount = performanceMode === 'high' ? 1000 : 500;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const phases = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            const color = new THREE.Color(
                Math.random() > 0.5 ? themeData.colors.accentPrimary : themeData.colors.accentSecondary
            );
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            phases[i] = Math.random() * Math.PI * 2;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Probability cloud
        const cloudGeometry = new THREE.IcosahedronGeometry(10, 3);
        const cloudMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(themeData.colors.accentPrimary),
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        const probabilityCloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        scene.add(probabilityCloud);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Animate quantum nodes with wave function
            quantumNodes.forEach((node, index) => {
                const waveHeight = Math.sin(time * node.userData.frequency + node.userData.phase) * node.userData.amplitude;
                node.position.y = node.userData.baseY + waveHeight;

                // Superposition effect
                if (node.userData.superposition) {
                    node.material.opacity = 0.3 + Math.abs(Math.sin(time * 2 + node.userData.phase)) * 0.5;
                    const scale = 1 + Math.sin(time * 3 + node.userData.phase) * 0.3;
                    node.scale.setScalar(scale);
                }

                // Color oscillation
                const hue = (time * 0.1 + index * 0.01) % 1;
                node.material.color.setHSL(hue, 0.7, 0.5);
            });

            // Update entanglement connections
            entanglements.forEach(({ line, node1, node2 }) => {
                const points = [node1.position, node2.position];
                line.geometry.setFromPoints(points);

                // Quantum correlation effect
                const distance = node1.position.distanceTo(node2.position);
                line.material.opacity = Math.max(0.1, 0.5 - distance / 30);
            });

            // Animate interference waves
            waves.forEach((wave, index) => {
                wave.scale.setScalar(1 + (time * wave.userData.speed + wave.userData.phase) % 2);
                wave.material.opacity = 0.1 + Math.sin(time + wave.userData.phase) * 0.05;
                wave.position.y = Math.sin(time * 0.5 + index) * 2;
            });

            // Animate quantum particles with uncertainty principle
            const particlePositions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const phase = phases[i];

                // Quantum fluctuation
                particlePositions[i3] += Math.sin(time + phase) * 0.1;
                particlePositions[i3 + 1] += Math.cos(time * 1.5 + phase) * 0.1;
                particlePositions[i3 + 2] += Math.sin(time * 0.7 + phase) * 0.1;

                // Boundary conditions
                if (Math.abs(particlePositions[i3]) > 25) particlePositions[i3] *= -0.9;
                if (Math.abs(particlePositions[i3 + 1]) > 15) particlePositions[i3 + 1] *= -0.9;
                if (Math.abs(particlePositions[i3 + 2]) > 25) particlePositions[i3 + 2] *= -0.9;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Animate probability cloud
            probabilityCloud.rotation.x += 0.002;
            probabilityCloud.rotation.y += 0.003;
            const cloudScale = 1 + Math.sin(time * 0.5) * 0.2;
            probabilityCloud.scale.setScalar(cloudScale);

            // Camera subtle movement
            camera.position.x = Math.sin(time * 0.1) * 5;
            camera.position.y = Math.cos(time * 0.1) * 3;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [themeData, performanceMode]);

    return <div ref={mountRef} className="absolute inset-0" />;
}
