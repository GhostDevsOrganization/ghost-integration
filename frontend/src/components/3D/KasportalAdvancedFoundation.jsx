import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function KasportalAdvancedFoundation({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance settings
        const getPerformanceSettings = () => {
            switch (performanceMode) {
                case 'low':
                    return { nodeCount: 50, particleCount: 1000, quality: 0.5 };
                case 'medium':
                    return { nodeCount: 80, particleCount: 3000, quality: 0.75 };
                case 'high':
                default:
                    return { nodeCount: 127, particleCount: 5000, quality: 1.0 };
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
        renderer.setClearColor(backgroundColor, 0.1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.quality * 2));
        mountRef.current.appendChild(renderer.domElement);

        // Custom Kaspa Liquidity Gravity Shader Material
        const liquidityGravityMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                liquidityCoefficient: { value: 2.47 },
                primaryColor: { value: primaryColor },
                secondaryColor: { value: secondaryColor },
                backgroundColor: { value: backgroundColor }
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;
        uniform float liquidityCoefficient;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec3 backgroundColor;
        varying vec2 vUv;
        
        // Kaspa's Liquidity Gravity Model (λ = 2.47)
        float liquidityGravity(vec2 pos, vec2 center, float mass) {
          float distance = length(pos - center);
          return liquidityCoefficient * mass / (distance * distance + 0.1);
        }
        
        // GHOSTDAG Hash Function
        float ghostdagHash(vec2 uv) {
          return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        // BlockDAG Parallel Processing (k ≥ 18 for MEV resistance)
        vec3 blockdagVisualization(vec2 uv) {
          vec3 color = vec3(0.0);
          
          // Simulate 18+ parallel blocks
          for(int i = 0; i < 18; i++) {
            float blockTime = time + float(i) * 0.15;
            vec2 blockPos = vec2(
              cos(blockTime * 0.7 + float(i) * 0.5) * 0.4,
              sin(blockTime * 0.5 + float(i) * 0.3) * 0.4
            );
            
            float blockMass = 1.0 + sin(blockTime) * 0.5;
            float gravity = liquidityGravity(uv, blockPos + 0.5, blockMass);
            float hash = ghostdagHash(uv + blockPos + time * 0.1);
            
            // Theme-aware colors
            vec3 blockColor = mix(primaryColor, secondaryColor, hash);
            
            color += blockColor * gravity * 0.15 * (1.0 + sin(blockTime * 2.0) * 0.3);
          }
          
          return color;
        }
        
        // Cross-chain Portal Effect
        vec3 crossChainPortal(vec2 uv) {
          vec2 center = mouse;
          float portalDistance = length(uv - center);
          float portal = 1.0 - smoothstep(0.1, 0.4, portalDistance);
          
          // Rotating portal rings
          float angle = atan(uv.y - center.y, uv.x - center.x);
          float rings = sin(portalDistance * 15.0 - time * 4.0) * 0.5 + 0.5;
          
          vec3 portalColor = mix(primaryColor, secondaryColor, rings) * portal;
          
          return portalColor * portal;
        }
        
        // Liquidity Flow Simulation
        vec3 liquidityFlow(vec2 uv) {
          vec2 flow = vec2(
            sin(time * 2.0 + uv.y * 12.0) * 0.03,
            cos(time * 1.8 + uv.x * 10.0) * 0.03
          );
          
          vec2 flowUv = uv + flow;
          float flowPattern = sin(flowUv.x * 20.0 + time * 3.0) * 
                             cos(flowUv.y * 15.0 + time * 2.5);
          
          return mix(primaryColor, secondaryColor, 0.5) * flowPattern * 0.2;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Combine all Kaspa-themed effects
          vec3 blockdag = blockdagVisualization(uv);
          vec3 portal = crossChainPortal(uv);
          vec3 flow = liquidityFlow(uv);
          
          // Theme-aware background gradient
          vec3 background = mix(backgroundColor, backgroundColor * 1.2, length(uv - 0.5));
          
          vec3 finalColor = background + blockdag + portal + flow;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
            transparent: true
        });

        // Create background plane
        const backgroundGeometry = new THREE.PlaneGeometry(20, 15);
        const backgroundMesh = new THREE.Mesh(backgroundGeometry, liquidityGravityMaterial);
        backgroundMesh.position.z = -5;
        scene.add(backgroundMesh);

        // GPGPU Particle System for Network Nodes
        const nodes = [];
        const nodeGroup = new THREE.Group();

        for (let i = 0; i < settings.nodeCount; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.03, 8, 8);

            // Custom shader for individual nodes
            const nodeMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    nodeId: { value: i },
                    activity: { value: Math.random() },
                    primaryColor: { value: primaryColor },
                    secondaryColor: { value: secondaryColor }
                },
                vertexShader: `
          uniform float time;
          uniform float nodeId;
          varying float vActivity;
          
          void main() {
            vActivity = sin(time * 2.0 + nodeId * 0.5) * 0.5 + 0.5;
            
            vec3 pos = position;
            pos *= 1.0 + vActivity * 0.3; // Pulsing based on activity
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform float time;
          uniform float nodeId;
          uniform vec3 primaryColor;
          uniform vec3 secondaryColor;
          varying float vActivity;
          
          void main() {
            // Color based on blockchain type and activity
            vec3 baseColor = mix(primaryColor, secondaryColor, sin(nodeId * 0.1) * 0.5 + 0.5);
            
            vec3 finalColor = baseColor * (0.6 + vActivity * 0.8);
            gl_FragColor = vec4(finalColor, 0.9);
          }
        `,
                transparent: true
            });

            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

            // Position nodes in 3D space using spherical distribution
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const radius = 3 + Math.random() * 2;

            node.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            node.userData = {
                originalPosition: node.position.clone(),
                liquidityMass: 0.5 + Math.random() * 1.5,
                oscillationPhase: Math.random() * Math.PI * 2
            };

            nodeGroup.add(node);
            nodes.push(node);
        }

        scene.add(nodeGroup);

        // Liquidity Flow Particles
        const particleCount = settings.particleCount;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Initial positions
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Theme-aware colors
            const colorType = Math.random();
            const color = colorType < 0.5 ? primaryColor : secondaryColor;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // Initial velocities
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.008,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            sizeAttenuation: true
        });

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        // Mouse tracking
        const mouse = new THREE.Vector2();

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth);
            mouse.y = 1.0 - (event.clientY / window.innerHeight);
            liquidityGravityMaterial.uniforms.mouse.value.set(mouse.x, mouse.y);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Camera setup
        camera.position.set(0, 0, 8);

        // Animation loop
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = clock.getDelta();

            // Update shader uniforms
            liquidityGravityMaterial.uniforms.time.value = elapsedTime;
            liquidityGravityMaterial.uniforms.primaryColor.value = primaryColor;
            liquidityGravityMaterial.uniforms.secondaryColor.value = secondaryColor;
            liquidityGravityMaterial.uniforms.backgroundColor.value = backgroundColor;

            // Update node materials
            nodes.forEach((node, index) => {
                node.material.uniforms.time.value = elapsedTime;
                node.material.uniforms.primaryColor.value = primaryColor;
                node.material.uniforms.secondaryColor.value = secondaryColor;

                // Liquidity gravity simulation
                const userData = node.userData;
                const oscillation = Math.sin(elapsedTime * 0.5 + userData.oscillationPhase) * 0.1;

                node.position.copy(userData.originalPosition);
                node.position.multiplyScalar(1 + oscillation);

                // Special effect for Kaspa node (make it stand out)
                if (index === 0) {
                    node.position.multiplyScalar(1.2);
                    node.material.uniforms.activity.value = Math.sin(elapsedTime * 3.0) * 0.5 + 1.0;
                }
            });

            // Update particle system (Liquidity Flow Simulation)
            const positions = particleSystem.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Apply liquidity gravity to particles
                let totalForceX = 0, totalForceY = 0, totalForceZ = 0;

                nodes.forEach((node) => {
                    const dx = positions[i3] - node.position.x;
                    const dy = positions[i3 + 1] - node.position.y;
                    const dz = positions[i3 + 2] - node.position.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;

                    const force = (node.userData.liquidityMass * 2.47) / (distance * distance);

                    totalForceX -= (dx / distance) * force * 0.001;
                    totalForceY -= (dy / distance) * force * 0.001;
                    totalForceZ -= (dz / distance) * force * 0.001;
                });

                // Update velocities
                velocities[i3] += totalForceX;
                velocities[i3 + 1] += totalForceY;
                velocities[i3 + 2] += totalForceZ;

                // Apply damping
                velocities[i3] *= 0.995;
                velocities[i3 + 1] *= 0.995;
                velocities[i3 + 2] *= 0.995;

                // Update positions
                positions[i3] += velocities[i3];
                positions[i3 + 1] += velocities[i3 + 1];
                positions[i3 + 2] += velocities[i3 + 2];

                // Boundary conditions
                if (Math.abs(positions[i3]) > 8) velocities[i3] *= -0.8;
                if (Math.abs(positions[i3 + 1]) > 8) velocities[i3 + 1] *= -0.8;
                if (Math.abs(positions[i3 + 2]) > 8) velocities[i3 + 2] *= -0.8;
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;

            // Rotate entire scene slowly
            nodeGroup.rotation.y = elapsedTime * 0.05;
            particleSystem.rotation.y = elapsedTime * 0.02;

            // Camera gentle movement
            camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
            camera.position.y = Math.cos(elapsedTime * 0.08) * 0.3;
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
            liquidityGravityMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Store references for cleanup
        sceneRef.current = {
            scene,
            camera,
            renderer,
            nodes,
            particleSystem
        };

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

            // Dispose of all resources
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
