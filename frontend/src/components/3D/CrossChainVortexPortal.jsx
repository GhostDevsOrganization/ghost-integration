import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CrossChainVortexPortal({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const animationRef = useRef(null);
    const [portalActive, setPortalActive] = useState(false);

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance settings
        const getPerformanceSettings = () => {
            switch (performanceMode) {
                case 'low':
                    return { particleCount: 500, ringCount: 4, quality: 0.5 };
                case 'medium':
                    return { particleCount: 750, ringCount: 6, quality: 0.75 };
                case 'high':
                default:
                    return { particleCount: 1000, ringCount: 8, quality: 1.0 };
            }
        };

        const settings = getPerformanceSettings();

        // Extract theme colors
        const primaryColor = new THREE.Color(themeData.colors.accentPrimary);
        const secondaryColor = new THREE.Color(themeData.colors.accentSecondary);
        const backgroundColor = new THREE.Color(themeData.colors.primaryBackground);

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(backgroundColor, 0.8);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.quality * 2));
        mountRef.current.appendChild(renderer.domElement);

        // Create massive rotating portal
        const createVortexPortal = () => {
            const portalGroup = new THREE.Group();

            // Main portal rings (multiple layers)
            const rings = [];
            for (let i = 0; i < settings.ringCount; i++) {
                const radius = 2 + i * 0.4;
                const ringGeometry = new THREE.TorusGeometry(radius, 0.05, 16, 100);

                const ringMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        ringId: { value: i },
                        portalActive: { value: 0.0 },
                        primaryColor: { value: primaryColor },
                        secondaryColor: { value: secondaryColor }
                    },
                    vertexShader: `
            uniform float time;
            uniform float ringId;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
              vPosition = position;
              vNormal = normal;
              
              vec3 pos = position;
              
              // Ring pulsing effect
              float pulse = sin(time * 2.0 + ringId * 0.5) * 0.1 + 1.0;
              pos *= pulse;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
                    fragmentShader: `
            uniform float time;
            uniform float ringId;
            uniform float portalActive;
            uniform vec3 primaryColor;
            uniform vec3 secondaryColor;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
              float ringFactor = ringId / 8.0;
              
              // Portal energy colors using theme
              vec3 baseColor = mix(primaryColor, secondaryColor, ringFactor);
              vec3 activeColor = mix(secondaryColor, primaryColor, 0.5);
              
              vec3 finalColor = mix(baseColor, activeColor, portalActive);
              
              // Energy flow effect
              float flow = sin(time * 3.0 + ringFactor * 10.0) * 0.3 + 0.7;
              finalColor *= flow;
              
              float alpha = 0.8 + sin(time + ringId) * 0.2;
              gl_FragColor = vec4(finalColor, alpha);
            }
          `,
                    transparent: true,
                    side: THREE.DoubleSide
                });

                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = Math.PI / 2;
                ring.userData = { rotationSpeed: 0.3 + i * 0.1, ringId: i };

                portalGroup.add(ring);
                rings.push(ring);
            }

            return { portalGroup, rings };
        };

        const { portalGroup, rings } = createVortexPortal();
        scene.add(portalGroup);

        // Cross-chain asset particles
        const createCrossChainAssets = () => {
            const assetCount = settings.particleCount;
            const positions = new Float32Array(assetCount * 3);
            const colors = new Float32Array(assetCount * 3);
            const phases = new Float32Array(assetCount);

            for (let i = 0; i < assetCount; i++) {
                // Start positions (outer rim)
                const angle = Math.random() * Math.PI * 2;
                const radius = 8 + Math.random() * 5;

                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
                positions[i * 3 + 2] = Math.sin(angle) * radius;

                phases[i] = Math.random();

                // Theme-aware colors
                const color = Math.random() < 0.5 ? primaryColor : secondaryColor;
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            const assetGeometry = new THREE.BufferGeometry();
            assetGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            assetGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            assetGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

            const assetMaterial = new THREE.PointsMaterial({
                size: 4,
                transparent: true,
                opacity: 0.8,
                vertexColors: true,
                sizeAttenuation: true
            });

            return new THREE.Points(assetGeometry, assetMaterial);
        };

        const crossChainAssets = createCrossChainAssets();
        scene.add(crossChainAssets);

        // Lighting
        const ambientLight = new THREE.AmbientLight(backgroundColor, 0.4);
        scene.add(ambientLight);

        const portalLight = new THREE.PointLight(primaryColor, 2, 20);
        portalLight.position.set(0, 0, 0);
        scene.add(portalLight);

        // Camera setup
        camera.position.set(0, 5, 12);
        camera.lookAt(0, 0, 0);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));

            if (distance < 15) {
                setPortalActive(true);
                rings.forEach(ring => {
                    ring.material.uniforms.portalActive.value = 1.0;
                });
            } else {
                setPortalActive(false);
                rings.forEach(ring => {
                    ring.material.uniforms.portalActive.value = 0.0;
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Update ring materials
            rings.forEach((ring, index) => {
                ring.rotation.z += ring.userData.rotationSpeed * 0.01;
                ring.material.uniforms.time.value = elapsedTime;
                ring.material.uniforms.primaryColor.value = primaryColor;
                ring.material.uniforms.secondaryColor.value = secondaryColor;
            });

            // Animate particles
            const positions = crossChainAssets.geometry.attributes.position.array;
            for (let i = 0; i < positions.length / 3; i++) {
                const i3 = i * 3;

                // Move towards center
                positions[i3] *= 0.999;
                positions[i3 + 1] *= 0.999;
                positions[i3 + 2] *= 0.999;

                // Reset if too close to center
                if (Math.abs(positions[i3]) < 0.5) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = 8 + Math.random() * 5;
                    positions[i3] = Math.cos(angle) * radius;
                    positions[i3 + 2] = Math.sin(angle) * radius;
                }
            }
            crossChainAssets.geometry.attributes.position.needsUpdate = true;

            // Camera movement
            camera.position.x = Math.cos(elapsedTime * 0.1) * 12;
            camera.position.z = Math.sin(elapsedTime * 0.1) * 12;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Store references for cleanup
        sceneRef.current = { scene, camera, renderer };

        // Cleanup function
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }

            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (object.material.map) object.material.map.dispose();
                    object.material.dispose();
                }
            });

            renderer.dispose();
        };
    }, [themeData, performanceMode]);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0"
            style={{ zIndex: 1 }}
        />
    );
}
