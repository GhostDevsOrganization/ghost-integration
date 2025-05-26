import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const KaspaLiquidityGravity = ({ themeData, performanceMode = 'high' }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: performanceMode === 'high',
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Kaspa green color scheme
        const kaspaGreen = '#00D632';
        const kaspaSecondary = '#00A028';
        const kaspaAccent = '#00FF3D';

        // Central Kaspa gravity well
        const centralWellGeometry = new THREE.SphereGeometry(4, 32, 32);
        const centralWellMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(kaspaGreen),
            transparent: true,
            opacity: 0.8,
            emissive: new THREE.Color(kaspaGreen).multiplyScalar(0.3)
        });
        const centralWell = new THREE.Mesh(centralWellGeometry, centralWellMaterial);
        scene.add(centralWell);

        // Gravity field rings around central well
        const gravityRings = [];
        for (let i = 0; i < 5; i++) {
            const ringGeometry = new THREE.RingGeometry(8 + i * 3, 8.2 + i * 3, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(kaspaGreen),
                transparent: true,
                opacity: 0.3 - i * 0.05,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.userData = {
                originalRadius: 8 + i * 3,
                phase: i * 0.3,
                speed: 0.01 + i * 0.002
            };
            scene.add(ring);
            gravityRings.push(ring);
        }

        // Liquidity particles with gravity simulation
        const liquidityParticles = [];
        const particleCount = performanceMode === 'high' ? 200 : 100;

        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.2 + Math.random() * 0.3, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.33 + Math.random() * 0.1, 0.8, 0.6), // Green variations
                transparent: true,
                opacity: 0.7 + Math.random() * 0.3,
                emissive: new THREE.Color(kaspaAccent).multiplyScalar(0.1)
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);

            // Random starting position in a sphere around the center
            const radius = 25 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            particle.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            // Initial velocity for orbital motion
            const orbitalSpeed = 0.02 + Math.random() * 0.01;
            particle.userData = {
                velocity: new THREE.Vector3(
                    -particle.position.y * orbitalSpeed,
                    particle.position.x * orbitalSpeed,
                    (Math.random() - 0.5) * 0.01
                ).normalize().multiplyScalar(orbitalSpeed),
                mass: 0.5 + Math.random() * 0.5,
                originalOpacity: particle.material.opacity,
                phase: Math.random() * Math.PI * 2
            };

            scene.add(particle);
            liquidityParticles.push(particle);
        }

        // Liquidity streams flowing toward center
        const liquidityStreams = [];
        const streamCount = 8;

        for (let i = 0; i < streamCount; i++) {
            const streamParticles = [];
            const particlesPerStream = 20;

            for (let j = 0; j < particlesPerStream; j++) {
                const streamParticleGeometry = new THREE.SphereGeometry(0.1, 6, 6);
                const streamParticleMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(kaspaAccent),
                    transparent: true,
                    opacity: 0.8,
                    emissive: new THREE.Color(kaspaAccent).multiplyScalar(0.2)
                });
                const streamParticle = new THREE.Mesh(streamParticleGeometry, streamParticleMaterial);

                const angle = (i / streamCount) * Math.PI * 2;
                const distance = 40 - (j / particlesPerStream) * 35;

                streamParticle.position.set(
                    Math.cos(angle) * distance,
                    Math.sin(angle) * distance,
                    (Math.random() - 0.5) * 10
                );

                streamParticle.userData = {
                    streamIndex: i,
                    particleIndex: j,
                    angle: angle,
                    speed: 0.5 + Math.random() * 0.3
                };

                scene.add(streamParticle);
                streamParticles.push(streamParticle);
            }
            liquidityStreams.push(streamParticles);
        }

        // Pulsing energy waves
        const energyWaves = [];
        for (let i = 0; i < 3; i++) {
            const waveGeometry = new THREE.RingGeometry(1, 2, 32);
            const waveMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(kaspaGreen),
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            });
            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            wave.userData = {
                phase: i * 0.8,
                maxRadius: 30,
                speed: 0.02
            };
            scene.add(wave);
            energyWaves.push(wave);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Animate central gravity well
            centralWell.rotation.x += 0.005;
            centralWell.rotation.y += 0.01;
            const wellPulse = 1 + Math.sin(time * 2) * 0.2;
            centralWell.scale.setScalar(wellPulse);

            // Animate gravity field rings
            gravityRings.forEach((ring, index) => {
                ring.rotation.z += ring.userData.speed;
                const gravityPulse = 1 + Math.sin(time + ring.userData.phase) * 0.1;
                ring.scale.setScalar(gravityPulse);

                // Ripple effect
                const ripple = Math.sin(time * 3 + index * 0.5) * 0.5;
                ring.material.opacity = (0.3 - index * 0.05) + ripple * 0.1;
            });

            // Simulate gravity on liquidity particles
            liquidityParticles.forEach((particle, index) => {
                const position = particle.position;
                const velocity = particle.userData.velocity;

                // Calculate gravitational force toward center
                const distanceToCenter = position.length();
                const gravityStrength = 0.001 * particle.userData.mass;
                const gravityForce = position.clone().normalize().multiplyScalar(-gravityStrength / (distanceToCenter * distanceToCenter + 1));

                // Apply gravity
                velocity.add(gravityForce);

                // Apply velocity
                position.add(velocity);

                // Add some turbulence
                const turbulence = new THREE.Vector3(
                    Math.sin(time + index * 0.1) * 0.002,
                    Math.cos(time + index * 0.1) * 0.002,
                    Math.sin(time * 0.5 + index * 0.1) * 0.001
                );
                position.add(turbulence);

                // Reset if too close to center or too far
                if (distanceToCenter < 5) {
                    // Particle absorbed - respawn at edge
                    const respawnRadius = 40 + Math.random() * 10;
                    const respawnTheta = Math.random() * Math.PI * 2;
                    const respawnPhi = Math.random() * Math.PI;

                    position.set(
                        respawnRadius * Math.sin(respawnPhi) * Math.cos(respawnTheta),
                        respawnRadius * Math.sin(respawnPhi) * Math.sin(respawnTheta),
                        respawnRadius * Math.cos(respawnPhi)
                    );

                    const orbitalSpeed = 0.02 + Math.random() * 0.01;
                    velocity.set(
                        -position.y * orbitalSpeed,
                        position.x * orbitalSpeed,
                        (Math.random() - 0.5) * 0.01
                    ).normalize().multiplyScalar(orbitalSpeed);
                } else if (distanceToCenter > 60) {
                    // Too far - pull back
                    velocity.multiplyScalar(0.8);
                }

                // Opacity based on distance to center
                const opacityFactor = Math.max(0.2, 1 - distanceToCenter / 50);
                particle.material.opacity = particle.userData.originalOpacity * opacityFactor;

                // Rotation
                particle.rotation.x += 0.01;
                particle.rotation.y += 0.015;
            });

            // Animate liquidity streams
            liquidityStreams.forEach((stream, streamIndex) => {
                stream.forEach((particle, particleIndex) => {
                    const userData = particle.userData;
                    const progress = (time * userData.speed + particleIndex * 0.1) % 1;
                    const distance = 40 * (1 - progress);

                    particle.position.set(
                        Math.cos(userData.angle + time * 0.1) * distance,
                        Math.sin(userData.angle + time * 0.1) * distance,
                        Math.sin(time + particleIndex * 0.2) * 5
                    );

                    // Fade as approaching center
                    particle.material.opacity = 0.8 * (distance / 40);

                    // Scale based on distance
                    const scale = 0.5 + (distance / 40) * 0.5;
                    particle.scale.setScalar(scale);
                });
            });

            // Animate energy waves
            energyWaves.forEach((wave, index) => {
                const waveTime = time * wave.userData.speed + wave.userData.phase;
                const radius = (waveTime % 1) * wave.userData.maxRadius;

                wave.scale.setScalar(radius);
                wave.material.opacity = 0.4 * (1 - (waveTime % 1));
                wave.rotation.z += 0.01;
            });

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
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();

            // Clean up geometries and materials
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        };
    }, [themeData, performanceMode]);

    return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

export default KaspaLiquidityGravity;
