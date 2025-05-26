import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MiningHashVisualization({ themeData, performanceMode = 'high' }) {
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

        // Hash blocks
        const hashBlocks = [];
        const blockCount = performanceMode === 'high' ? 50 : 25;

        // Create mining blocks with hash patterns
        for (let i = 0; i < blockCount; i++) {
            const geometry = new THREE.BoxGeometry(2, 0.5, 2);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.7,
                wireframe: Math.random() > 0.5
            });

            const block = new THREE.Mesh(geometry, material);
            block.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20
            );

            block.userData = {
                speed: 0.001 + Math.random() * 0.003,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                miningPower: Math.random(),
                hash: generateRandomHash()
            };

            scene.add(block);
            hashBlocks.push(block);
        }

        // Create hash connections
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(themeData.colors.accentSecondary),
            transparent: true,
            opacity: 0.3
        });

        const connections = [];
        for (let i = 0; i < hashBlocks.length - 1; i++) {
            if (Math.random() > 0.7) {
                const points = [
                    hashBlocks[i].position,
                    hashBlocks[i + 1].position
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, connectionMaterial);
                scene.add(line);
                connections.push({ line, start: i, end: i + 1 });
            }
        }

        // Hash particles
        const particleCount = performanceMode === 'high' ? 2000 : 1000;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            const color = new THREE.Color(
                Math.random() > 0.5 ? themeData.colors.accentPrimary : themeData.colors.accentSecondary
            );
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Mining core
        const coreGeometry = new THREE.OctahedronGeometry(3, 0);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(themeData.colors.accentPrimary),
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(core);

        // Helper function to generate random hash
        function generateRandomHash() {
            return Math.random().toString(36).substring(2, 15);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Animate hash blocks
            hashBlocks.forEach((block, index) => {
                block.rotation.y += block.userData.rotationSpeed;
                block.position.y += Math.sin(Date.now() * block.userData.speed + index) * 0.02;

                // Mining effect - pulse based on "mining power"
                const pulse = 1 + Math.sin(Date.now() * 0.001 * block.userData.miningPower) * 0.1;
                block.scale.setScalar(pulse);

                // Change opacity based on "hash difficulty"
                block.material.opacity = 0.3 + block.userData.miningPower * 0.5;
            });

            // Update connections
            connections.forEach(conn => {
                const start = hashBlocks[conn.start].position;
                const end = hashBlocks[conn.end].position;
                const points = [start, end];
                conn.line.geometry.setFromPoints(points);
            });

            // Rotate particles
            particles.rotation.y += 0.0005;
            particles.rotation.x += 0.0002;

            // Animate core
            core.rotation.x += 0.01;
            core.rotation.y += 0.015;
            const coreScale = 1 + Math.sin(Date.now() * 0.002) * 0.2;
            core.scale.setScalar(coreScale);

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
