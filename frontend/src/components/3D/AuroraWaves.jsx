import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuroraWaves({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 50);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode === 'high' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? window.devicePixelRatio : 1);
        mountRef.current.appendChild(renderer.domElement);

        // Aurora curtains
        const curtainCount = performanceMode === 'high' ? 5 : 3;
        const curtains = [];

        for (let i = 0; i < curtainCount; i++) {
            const curtainWidth = 80;
            const curtainHeight = 40;
            const segments = performanceMode === 'high' ? 50 : 25;

            const curtainGeometry = new THREE.PlaneGeometry(curtainWidth, curtainHeight, segments, segments);

            // Create gradient material
            const curtainMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color(themeData.colors.accentPrimary) },
                    color2: { value: new THREE.Color(themeData.colors.accentSecondary) },
                    opacity: { value: 0.3 + i * 0.1 }
                },
                vertexShader: `
          varying vec2 vUv;
          varying float vY;
          uniform float time;
          
          void main() {
            vUv = uv;
            vY = position.y;
            
            vec3 pos = position;
            float wave1 = sin(position.x * 0.1 + time) * 2.0;
            float wave2 = cos(position.x * 0.15 + time * 1.5) * 1.5;
            float wave3 = sin(position.y * 0.1 + time * 0.5) * 1.0;
            
            pos.z += wave1 + wave2;
            pos.y += wave3;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          varying vec2 vUv;
          varying float vY;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          
          void main() {
            float mixFactor = vUv.y + sin(vUv.x * 10.0 + time) * 0.1;
            vec3 color = mix(color1, color2, mixFactor);
            
            float alpha = opacity * (1.0 - vUv.y) * (0.5 + sin(time + vUv.x * 5.0) * 0.5);
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });

            const curtain = new THREE.Mesh(curtainGeometry, curtainMaterial);
            curtain.position.z = -10 - i * 5;
            curtain.position.y = 10;
            curtain.rotation.x = -0.3;

            curtain.userData = {
                baseY: 10 + i * 2,
                swaySpeed: 0.5 + Math.random() * 0.5,
                material: curtainMaterial
            };

            scene.add(curtain);
            curtains.push(curtain);
        }

        // Star field
        const starCount = performanceMode === 'high' ? 1000 : 500;
        const starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 200;
            starPositions[i * 3 + 1] = Math.random() * 100 - 20;
            starPositions[i * 3 + 2] = -50 - Math.random() * 50;

            const color = new THREE.Color();
            color.setHSL(0.6, 0.2, 0.8 + Math.random() * 0.2);
            starColors[i * 3] = color.r;
            starColors[i * 3 + 1] = color.g;
            starColors[i * 3 + 2] = color.b;

            starSizes[i] = Math.random() * 2;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

        const starMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Light rays
        const rayCount = performanceMode === 'high' ? 20 : 10;
        const rays = [];

        for (let i = 0; i < rayCount; i++) {
            const rayGeometry = new THREE.CylinderGeometry(0.1, 2, 60, 8);
            const rayMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(i % 2 === 0 ? themeData.colors.accentPrimary : themeData.colors.accentSecondary),
                transparent: true,
                opacity: 0.1,
                blending: THREE.AdditiveBlending
            });

            const ray = new THREE.Mesh(rayGeometry, rayMaterial);
            ray.position.set(
                (Math.random() - 0.5) * 100,
                30,
                -20 - Math.random() * 30
            );
            ray.rotation.z = (Math.random() - 0.5) * 0.5;

            ray.userData = {
                baseOpacity: 0.1,
                pulseSpeed: 1 + Math.random() * 2,
                swaySpeed: 0.001 + Math.random() * 0.002
            };

            scene.add(ray);
            rays.push(ray);
        }

        // Ground fog
        const fogGeometry = new THREE.PlaneGeometry(200, 100, 20, 20);
        const fogMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(themeData.colors.accentSecondary),
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const fog = new THREE.Mesh(fogGeometry, fogMaterial);
        fog.position.y = -20;
        fog.rotation.x = -Math.PI / 2;
        scene.add(fog);

        // Animation loop
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            // Animate aurora curtains
            curtains.forEach((curtain, index) => {
                curtain.userData.material.uniforms.time.value = time;
                curtain.position.y = curtain.userData.baseY + Math.sin(time * curtain.userData.swaySpeed) * 3;
                curtain.rotation.y = Math.sin(time * 0.2 + index) * 0.1;
            });

            // Animate light rays
            rays.forEach((ray, index) => {
                const pulse = Math.sin(time * ray.userData.pulseSpeed);
                ray.material.opacity = ray.userData.baseOpacity + pulse * 0.05;
                ray.rotation.z += ray.userData.swaySpeed;
                ray.position.x += Math.sin(time + index) * 0.1;
            });

            // Animate stars twinkling
            const starSizes = stars.geometry.attributes.size.array;
            for (let i = 0; i < starCount; i++) {
                starSizes[i] = 0.5 + Math.sin(time * 2 + i) * 0.5;
            }
            stars.geometry.attributes.size.needsUpdate = true;

            // Animate fog
            const fogVertices = fog.geometry.attributes.position.array;
            for (let i = 0; i < fogVertices.length; i += 3) {
                fogVertices[i + 2] = Math.sin(time + fogVertices[i] * 0.01) * 2;
            }
            fog.geometry.attributes.position.needsUpdate = true;
            fog.material.opacity = 0.05 + Math.sin(time * 0.5) * 0.05;

            // Camera movement
            camera.position.x = Math.sin(time * 0.1) * 10;
            camera.position.y = 5 + Math.cos(time * 0.1) * 5;
            camera.lookAt(0, 10, -30);

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
