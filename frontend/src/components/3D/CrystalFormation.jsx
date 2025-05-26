import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CrystalFormation({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 20, 40);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode === 'high' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? window.devicePixelRatio : 1);
        mountRef.current.appendChild(renderer.domElement);

        // Crystal clusters
        const crystals = [];
        const crystalCount = performanceMode === 'high' ? 30 : 15;

        // Create main crystal formation
        for (let i = 0; i < crystalCount; i++) {
            const crystalGroup = new THREE.Group();

            // Crystal geometry - using elongated octahedron
            const radius = 1 + Math.random() * 2;
            const height = 3 + Math.random() * 5;
            const crystalGeometry = new THREE.ConeGeometry(radius, height, 6);

            // Crystal material with refraction effect
            const crystalMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(i % 3 === 0 ? themeData.colors.accentPrimary : themeData.colors.accentSecondary),
                transparent: true,
                opacity: 0.7,
                wireframe: false
            });

            const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
            crystal.position.y = height / 2;
            crystalGroup.add(crystal);

            // Add wireframe overlay for detail
            const wireframeMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const wireframe = new THREE.Mesh(crystalGeometry, wireframeMaterial);
            wireframe.position.y = height / 2;
            crystalGroup.add(wireframe);

            // Position crystals in clusters
            const clusterRadius = 20;
            const angle = (i / crystalCount) * Math.PI * 2;
            const distance = Math.random() * clusterRadius;
            crystalGroup.position.set(
                Math.cos(angle) * distance,
                0,
                Math.sin(angle) * distance
            );

            // Random rotation for natural look
            crystalGroup.rotation.x = (Math.random() - 0.5) * 0.3;
            crystalGroup.rotation.z = (Math.random() - 0.5) * 0.3;

            crystalGroup.userData = {
                growthSpeed: 0.001 + Math.random() * 0.002,
                pulseSpeed: 1 + Math.random() * 2,
                baseScale: 0.1,
                targetScale: 1,
                currentScale: 0.1,
                glowIntensity: Math.random()
            };

            scene.add(crystalGroup);
            crystals.push(crystalGroup);
        }

        // Smaller crystal fragments
        const fragments = [];
        const fragmentCount = performanceMode === 'high' ? 50 : 25;

        for (let i = 0; i < fragmentCount; i++) {
            const fragmentGeometry = new THREE.TetrahedronGeometry(0.5);
            const fragmentMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.6
            });
            const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);

            fragment.position.set(
                (Math.random() - 0.5) * 40,
                Math.random() * 10,
                (Math.random() - 0.5) * 40
            );

            fragment.userData = {
                floatSpeed: 0.5 + Math.random() * 1,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                baseY: fragment.position.y
            };

            scene.add(fragment);
            fragments.push(fragment);
        }

        // Energy particles flowing between crystals
        const particleCount = performanceMode === 'high' ? 1000 : 500;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        const particleData = [];

        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 50;
            particlePositions[i * 3 + 1] = Math.random() * 20;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            const color = new THREE.Color(themeData.colors.accentSecondary);
            particleColors[i * 3] = color.r;
            particleColors[i * 3 + 1] = color.g;
            particleColors[i * 3 + 2] = color.b;

            particleData.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    Math.random() * 0.1,
                    (Math.random() - 0.5) * 0.1
                ),
                origin: new THREE.Vector3(
                    particlePositions[i * 3],
                    particlePositions[i * 3 + 1],
                    particlePositions[i * 3 + 2]
                )
            });
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Ground plane with crystalline texture
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
        const groundMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(themeData.colors.primaryBackground),
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        // Light beams emanating from crystals
        const beams = [];
        crystals.forEach((crystal, index) => {
            if (index % 3 === 0) {
                const beamGeometry = new THREE.CylinderGeometry(0.1, 2, 20);
                const beamMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(themeData.colors.accentPrimary),
                    transparent: true,
                    opacity: 0.2,
                    blending: THREE.AdditiveBlending
                });
                const beam = new THREE.Mesh(beamGeometry, beamMaterial);
                beam.position.copy(crystal.position);
                beam.position.y = 10;
                beam.userData = { crystal: crystal };
                scene.add(beam);
                beams.push(beam);
            }
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Animate crystal growth
            crystals.forEach((crystal, index) => {
                // Growth animation
                if (crystal.userData.currentScale < crystal.userData.targetScale) {
                    crystal.userData.currentScale += crystal.userData.growthSpeed;
                    crystal.scale.setScalar(crystal.userData.currentScale);
                }

                // Pulsing glow effect
                const pulse = Math.sin(time * crystal.userData.pulseSpeed) * 0.2;
                crystal.children[0].material.opacity = 0.5 + pulse * crystal.userData.glowIntensity;

                // Gentle rotation
                crystal.rotation.y += 0.001;
            });

            // Animate fragments
            fragments.forEach(fragment => {
                fragment.position.y = fragment.userData.baseY + Math.sin(time * fragment.userData.floatSpeed) * 2;
                fragment.rotation.x += fragment.userData.rotationSpeed;
                fragment.rotation.y += fragment.userData.rotationSpeed * 0.7;
            });

            // Animate particles
            const positions = particles.geometry.attributes.position.array;
            particleData.forEach((data, i) => {
                const i3 = i * 3;

                // Update position
                positions[i3] += data.velocity.x;
                positions[i3 + 1] += data.velocity.y;
                positions[i3 + 2] += data.velocity.z;

                // Attract to nearest crystal
                if (crystals.length > 0) {
                    const nearestCrystal = crystals[Math.floor(Math.random() * crystals.length)];
                    const direction = new THREE.Vector3();
                    direction.subVectors(nearestCrystal.position, new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]));
                    direction.normalize();
                    direction.multiplyScalar(0.01);

                    data.velocity.add(direction);
                    data.velocity.multiplyScalar(0.98); // Damping
                }

                // Reset if too far
                if (Math.abs(positions[i3]) > 25 || positions[i3 + 1] > 30 || positions[i3 + 1] < 0) {
                    positions[i3] = data.origin.x;
                    positions[i3 + 1] = data.origin.y;
                    positions[i3 + 2] = data.origin.z;
                    data.velocity.set(
                        (Math.random() - 0.5) * 0.1,
                        Math.random() * 0.1,
                        (Math.random() - 0.5) * 0.1
                    );
                }
            });
            particles.geometry.attributes.position.needsUpdate = true;

            // Animate light beams
            beams.forEach(beam => {
                beam.material.opacity = 0.1 + Math.sin(time * 2) * 0.1;
                beam.scale.y = 1 + Math.sin(time * 3) * 0.2;
            });

            // Camera orbit
            const cameraRadius = 50;
            camera.position.x = Math.cos(time * 0.1) * cameraRadius;
            camera.position.z = Math.sin(time * 0.1) * cameraRadius;
            camera.position.y = 20 + Math.sin(time * 0.2) * 10;
            camera.lookAt(0, 5, 0);

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
