import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuantumBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create flowing energy streams instead of blocky wireframe
        const streamGroups = [];
        const numStreams = 8;

        for (let i = 0; i < numStreams; i++) {
            const points = [];
            const radius = 15 + Math.random() * 10;
            const height = 40;

            // Create curved path for energy stream
            for (let j = 0; j <= 100; j++) {
                const t = j / 100;
                const angle = t * Math.PI * 4 + (i / numStreams) * Math.PI * 2;
                const x = Math.cos(angle) * radius * (1 - t * 0.3);
                const y = (t - 0.5) * height;
                const z = Math.sin(angle) * radius * (1 - t * 0.3);
                points.push(new THREE.Vector3(x, y, z));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, false);

            const streamMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.5 + i * 0.1, 0.8, 0.6),
                transparent: true,
                opacity: 0.8,
                emissive: new THREE.Color().setHSL(0.5 + i * 0.1, 0.5, 0.2)
            });

            const stream = new THREE.Mesh(tubeGeometry, streamMaterial);
            stream.userData = {
                originalRotation: { x: 0, y: 0, z: 0 },
                speed: 0.01 + Math.random() * 0.02,
                phase: i * 0.5
            };

            scene.add(stream);
            streamGroups.push(stream);
        }

        // Create floating orbs with glow effect
        const orbs = [];
        const numOrbs = 15;

        for (let i = 0; i < numOrbs; i++) {
            const orbGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 16, 16);
            const orbMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.7),
                transparent: true,
                opacity: 0.9,
                emissive: new THREE.Color().setHSL(Math.random(), 0.5, 0.3)
            });

            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            orb.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );

            orb.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                originalPosition: orb.position.clone(),
                phase: Math.random() * Math.PI * 2
            };

            scene.add(orb);
            orbs.push(orb);
        }

        // Create enhanced particle system
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 300;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Position particles in a more interesting distribution
            const radius = Math.random() * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Varied colors
            const hue = Math.random() * 0.3 + 0.4; // Blue to purple range
            const color = new THREE.Color().setHSL(hue, 0.8, 0.7);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 1;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 2,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Create central energy core
        const coreGeometry = new THREE.SphereGeometry(2, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.6,
            emissive: 0x004444
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(core);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Animate energy streams
            streamGroups.forEach((stream, index) => {
                stream.rotation.y += stream.userData.speed;
                stream.rotation.x = Math.sin(time + stream.userData.phase) * 0.2;
                stream.rotation.z = Math.cos(time + stream.userData.phase) * 0.1;

                // Pulse effect
                const scale = 1 + Math.sin(time * 2 + stream.userData.phase) * 0.1;
                stream.scale.setScalar(scale);
            });

            // Animate floating orbs
            orbs.forEach((orb, index) => {
                orb.position.add(orb.userData.velocity);

                // Orbital motion
                const phase = time + orb.userData.phase;
                orb.position.x += Math.sin(phase) * 0.01;
                orb.position.y += Math.cos(phase * 0.7) * 0.01;
                orb.position.z += Math.sin(phase * 0.5) * 0.01;

                // Boundary check - reset if too far
                if (orb.position.length() > 50) {
                    orb.position.copy(orb.userData.originalPosition);
                }

                // Pulsing glow
                const intensity = 0.5 + Math.sin(time * 3 + index) * 0.3;
                orb.material.opacity = intensity;
            });

            // Animate particles
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;

            // Animate particle positions for flowing effect
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.01;
                positions[i + 2] += Math.cos(time + positions[i] * 0.01) * 0.01;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Animate central core
            core.rotation.x += 0.01;
            core.rotation.y += 0.015;
            const coreScale = 1 + Math.sin(time * 2) * 0.2;
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
            renderer.dispose();

            // Clean up geometries and materials
            streamGroups.forEach(stream => {
                stream.geometry.dispose();
                stream.material.dispose();
            });

            orbs.forEach(orb => {
                orb.geometry.dispose();
                orb.material.dispose();
            });

            particleGeometry.dispose();
            particleMaterial.dispose();
            coreGeometry.dispose();
            coreMaterial.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ zIndex: 0 }} />;
}
