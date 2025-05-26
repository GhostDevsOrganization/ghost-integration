import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PlasmaStorm({ themeData, performanceMode = 'high' }) {
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

        // Plasma field shader material
        const plasmaFieldGeometry = new THREE.PlaneGeometry(100, 100, 128, 128);
        const plasmaFieldMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(themeData.colors.accentPrimary) },
                color2: { value: new THREE.Color(themeData.colors.accentSecondary) },
                intensity: { value: 1.0 }
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          float wave1 = sin(position.x * 0.05 + time) * cos(position.y * 0.05 + time) * 5.0;
          float wave2 = sin(position.x * 0.1 - time * 1.5) * sin(position.y * 0.1 + time * 0.5) * 3.0;
          pos.z += wave1 + wave2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float intensity;
        
        void main() {
          float plasma = sin(vPosition.x * 0.1 + time) * cos(vPosition.y * 0.1 - time);
          plasma += sin(distance(vPosition.xy, vec2(sin(time) * 20.0, cos(time) * 20.0)) * 0.1) * 2.0;
          plasma += cos(distance(vPosition.xy, vec2(cos(time * 0.7) * 30.0, sin(time * 0.7) * 30.0)) * 0.05) * 3.0;
          plasma = abs(plasma);
          
          vec3 color = mix(color1, color2, plasma * 0.5);
          float alpha = intensity * (0.5 + plasma * 0.5);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });

        const plasmaField = new THREE.Mesh(plasmaFieldGeometry, plasmaFieldMaterial);
        plasmaField.position.z = -20;
        scene.add(plasmaField);

        // Lightning bolts
        const lightningBolts = [];
        const boltCount = performanceMode === 'high' ? 10 : 5;

        function createLightningBolt() {
            const points = [];
            const segments = 20;
            const startPoint = new THREE.Vector3(
                (Math.random() - 0.5) * 40,
                20,
                (Math.random() - 0.5) * 20
            );
            const endPoint = new THREE.Vector3(
                startPoint.x + (Math.random() - 0.5) * 20,
                -20,
                startPoint.z + (Math.random() - 0.5) * 10
            );

            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const point = new THREE.Vector3().lerpVectors(startPoint, endPoint, t);

                // Add random displacement for jagged effect
                if (i > 0 && i < segments) {
                    point.x += (Math.random() - 0.5) * 3;
                    point.z += (Math.random() - 0.5) * 3;
                }

                points.push(point);
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: new THREE.Color('#ffffff'),
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                linewidth: 2
            });

            const bolt = new THREE.Line(geometry, material);
            bolt.userData = {
                lifetime: 0,
                maxLifetime: 0.5 + Math.random() * 0.5,
                intensity: Math.random()
            };

            return bolt;
        }

        // Energy orbs
        const orbs = [];
        const orbCount = performanceMode === 'high' ? 8 : 4;

        for (let i = 0; i < orbCount; i++) {
            const orbGroup = new THREE.Group();

            // Core orb
            const orbGeometry = new THREE.SphereGeometry(2, 16, 16);
            const orbMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.8
            });
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            orbGroup.add(orb);

            // Outer glow
            const glowGeometry = new THREE.SphereGeometry(3, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentSecondary),
                transparent: true,
                opacity: 0.2,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            orbGroup.add(glow);

            orbGroup.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );

            orbGroup.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                ),
                pulsePhase: Math.random() * Math.PI * 2,
                attractionStrength: 0.001 + Math.random() * 0.002
            };

            scene.add(orbGroup);
            orbs.push(orbGroup);
        }

        // Particle vortex
        const vortexParticleCount = performanceMode === 'high' ? 2000 : 1000;
        const vortexGeometry = new THREE.BufferGeometry();
        const vortexPositions = new Float32Array(vortexParticleCount * 3);
        const vortexColors = new Float32Array(vortexParticleCount * 3);
        const vortexData = [];

        for (let i = 0; i < vortexParticleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 20;
            const height = (Math.random() - 0.5) * 40;

            vortexPositions[i * 3] = Math.cos(angle) * radius;
            vortexPositions[i * 3 + 1] = height;
            vortexPositions[i * 3 + 2] = Math.sin(angle) * radius;

            const color = new THREE.Color(
                Math.random() > 0.5 ? themeData.colors.accentPrimary : themeData.colors.accentSecondary
            );
            vortexColors[i * 3] = color.r;
            vortexColors[i * 3 + 1] = color.g;
            vortexColors[i * 3 + 2] = color.b;

            vortexData.push({
                angle: angle,
                radius: radius,
                height: height,
                speed: 0.02 + Math.random() * 0.03,
                verticalSpeed: (Math.random() - 0.5) * 0.2
            });
        }

        vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
        vortexGeometry.setAttribute('color', new THREE.BufferAttribute(vortexColors, 3));

        const vortexMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const vortexParticles = new THREE.Points(vortexGeometry, vortexMaterial);
        scene.add(vortexParticles);

        // Plasma rings
        const rings = [];
        const ringCount = performanceMode === 'high' ? 5 : 3;

        for (let i = 0; i < ringCount; i++) {
            const ringGeometry = new THREE.TorusGeometry(10 + i * 5, 0.5, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.userData = {
                rotationSpeed: 0.01 + Math.random() * 0.02,
                pulsePhase: i * 0.5
            };
            scene.add(ring);
            rings.push(ring);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Update plasma field
            plasmaFieldMaterial.uniforms.time.value = time;

            // Animate lightning bolts
            lightningBolts.forEach((bolt, index) => {
                bolt.userData.lifetime += 0.016;
                if (bolt.userData.lifetime > bolt.userData.maxLifetime) {
                    scene.remove(bolt);
                    lightningBolts.splice(index, 1);
                } else {
                    const fadeOut = 1 - (bolt.userData.lifetime / bolt.userData.maxLifetime);
                    bolt.material.opacity = fadeOut * 0.8 * bolt.userData.intensity;
                }
            });

            // Create new lightning bolts occasionally
            if (Math.random() < 0.02 && lightningBolts.length < boltCount) {
                const newBolt = createLightningBolt();
                scene.add(newBolt);
                lightningBolts.push(newBolt);
            }

            // Animate energy orbs
            orbs.forEach(orb => {
                // Move orbs
                orb.position.add(orb.userData.velocity);

                // Bounce off boundaries
                if (Math.abs(orb.position.x) > 15) orb.userData.velocity.x *= -1;
                if (Math.abs(orb.position.y) > 10) orb.userData.velocity.y *= -1;
                if (Math.abs(orb.position.z) > 10) orb.userData.velocity.z *= -1;

                // Pulse effect
                const pulse = Math.sin(time * 2 + orb.userData.pulsePhase);
                orb.scale.setScalar(1 + pulse * 0.2);
                orb.children[0].material.opacity = 0.6 + pulse * 0.2;
                orb.children[1].material.opacity = 0.1 + pulse * 0.1;
            });

            // Animate vortex particles
            const vortexPositions = vortexParticles.geometry.attributes.position.array;
            vortexData.forEach((data, i) => {
                data.angle += data.speed;
                data.height += data.verticalSpeed;

                // Reset if too far
                if (Math.abs(data.height) > 20) {
                    data.verticalSpeed *= -1;
                }

                const i3 = i * 3;
                vortexPositions[i3] = Math.cos(data.angle) * data.radius;
                vortexPositions[i3 + 1] = data.height;
                vortexPositions[i3 + 2] = Math.sin(data.angle) * data.radius;
            });
            vortexParticles.geometry.attributes.position.needsUpdate = true;

            // Animate plasma rings
            rings.forEach(ring => {
                ring.rotation.x += ring.userData.rotationSpeed;
                ring.rotation.y += ring.userData.rotationSpeed * 0.7;
                const pulse = Math.sin(time + ring.userData.pulsePhase);
                ring.material.opacity = 0.2 + pulse * 0.1;
                ring.scale.setScalar(1 + pulse * 0.1);
            });

            // Camera movement
            camera.position.x = Math.sin(time * 0.1) * 5;
            camera.position.y = Math.cos(time * 0.15) * 3;
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
