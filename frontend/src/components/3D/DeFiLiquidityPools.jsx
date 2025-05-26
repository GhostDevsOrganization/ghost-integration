import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DeFiLiquidityPools({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode === 'high' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? window.devicePixelRatio : 1);
        mountRef.current.appendChild(renderer.domElement);

        // Liquidity pools
        const pools = [];
        const poolCount = 5;
        const poolColors = [
            themeData.colors.accentPrimary,
            themeData.colors.accentSecondary,
            '#00ff88',
            '#ff0088',
            '#8800ff'
        ];

        // Create pool containers
        for (let i = 0; i < poolCount; i++) {
            const angle = (i / poolCount) * Math.PI * 2;
            const radius = 15;

            // Pool ring
            const ringGeometry = new THREE.TorusGeometry(5, 0.3, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(poolColors[i]),
                transparent: true,
                opacity: 0.8
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            );
            ring.rotation.x = Math.PI / 2;

            // Pool core
            const coreGeometry = new THREE.SphereGeometry(2, 32, 32);
            const coreMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(poolColors[i]),
                transparent: true,
                opacity: 0.4
            });
            const core = new THREE.Mesh(coreGeometry, coreMaterial);
            core.position.copy(ring.position);

            scene.add(ring);
            scene.add(core);

            pools.push({
                ring,
                core,
                color: poolColors[i],
                particles: [],
                angle,
                radius,
                liquidity: 0.5 + Math.random() * 0.5
            });
        }

        // Create flowing particles between pools
        const flowParticles = [];
        const particlesPerFlow = performanceMode === 'high' ? 100 : 50;

        pools.forEach((pool, poolIndex) => {
            const nextPool = pools[(poolIndex + 1) % pools.length];

            for (let i = 0; i < particlesPerFlow; i++) {
                const geometry = new THREE.SphereGeometry(0.1, 8, 8);
                const material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(pool.color),
                    transparent: true,
                    opacity: 0.8
                });
                const particle = new THREE.Mesh(geometry, material);

                particle.userData = {
                    source: pool,
                    target: nextPool,
                    progress: i / particlesPerFlow,
                    speed: 0.002 + Math.random() * 0.003,
                    waveOffset: Math.random() * Math.PI * 2
                };

                scene.add(particle);
                flowParticles.push(particle);
            }
        });

        // Central AMM hub
        const hubGeometry = new THREE.OctahedronGeometry(3, 1);
        const hubMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const hub = new THREE.Mesh(hubGeometry, hubMaterial);
        scene.add(hub);

        // Liquidity waves
        const waveRings = [];
        for (let i = 0; i < 3; i++) {
            const waveGeometry = new THREE.RingGeometry(10 + i * 5, 10.5 + i * 5, 64);
            const waveMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide
            });
            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            wave.rotation.x = Math.PI / 2;
            wave.userData = { phase: i * 0.5 };
            scene.add(wave);
            waveRings.push(wave);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Animate pools
            pools.forEach((pool, index) => {
                // Pool rotation
                pool.ring.rotation.z += 0.01;

                // Pool liquidity pulse
                const liquidityPulse = 1 + Math.sin(time + index) * 0.1 * pool.liquidity;
                pool.core.scale.setScalar(liquidityPulse);
                pool.ring.scale.setScalar(liquidityPulse);

                // Pool floating motion
                pool.ring.position.y = pool.ring.position.y + Math.sin(time * 0.5 + index) * 0.02;
                pool.core.position.y = pool.ring.position.y;
            });

            // Animate flowing particles
            flowParticles.forEach(particle => {
                particle.userData.progress += particle.userData.speed;
                if (particle.userData.progress > 1) {
                    particle.userData.progress = 0;
                }

                const t = particle.userData.progress;
                const source = particle.userData.source.ring.position;
                const target = particle.userData.target.ring.position;

                // Curved path between pools
                const midPoint = new THREE.Vector3(
                    (source.x + target.x) / 2,
                    (source.y + target.y) / 2 + Math.sin(t * Math.PI) * 5,
                    (source.z + target.z) / 2
                );

                // Quadratic bezier interpolation
                const p0 = source;
                const p1 = midPoint;
                const p2 = target;

                particle.position.x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
                particle.position.y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
                particle.position.z = (1 - t) * (1 - t) * p0.z + 2 * (1 - t) * t * p1.z + t * t * p2.z;

                // Add wave motion
                particle.position.x += Math.sin(time * 2 + particle.userData.waveOffset) * 0.5;
                particle.position.z += Math.cos(time * 2 + particle.userData.waveOffset) * 0.5;

                // Fade in/out at endpoints
                const fadeDist = 0.1;
                if (t < fadeDist) {
                    particle.material.opacity = (t / fadeDist) * 0.8;
                } else if (t > 1 - fadeDist) {
                    particle.material.opacity = ((1 - t) / fadeDist) * 0.8;
                } else {
                    particle.material.opacity = 0.8;
                }
            });

            // Animate central hub
            hub.rotation.x += 0.005;
            hub.rotation.y += 0.01;
            const hubScale = 1 + Math.sin(time * 2) * 0.2;
            hub.scale.setScalar(hubScale);

            // Animate liquidity waves
            waveRings.forEach((wave, index) => {
                wave.scale.setScalar(1 + Math.sin(time * 0.5 + wave.userData.phase) * 0.2);
                wave.material.opacity = 0.1 + Math.sin(time + wave.userData.phase) * 0.1;
                wave.rotation.z += 0.001 * (index + 1);
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
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [themeData, performanceMode]);

    return <div ref={mountRef} className="absolute inset-0" />;
}
