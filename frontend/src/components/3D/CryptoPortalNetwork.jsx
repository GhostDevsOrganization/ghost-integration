import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CryptoPortalNetwork({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const animationRef = useRef(null);
    const [hoveredCrypto, setHoveredCrypto] = useState(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance settings based on mode
        const getPerformanceSettings = () => {
            switch (performanceMode) {
                case 'low':
                    return {
                        cryptoCount: 12,
                        particleCount: 800,
                        quality: 0.5,
                        portalRings: 2,
                        connectionLines: 15
                    };
                case 'medium':
                    return {
                        cryptoCount: 20,
                        particleCount: 2000,
                        quality: 0.75,
                        portalRings: 3,
                        connectionLines: 25
                    };
                case 'high':
                default:
                    return {
                        cryptoCount: 32,
                        particleCount: 4000,
                        quality: 1.0,
                        portalRings: 4,
                        connectionLines: 40
                    };
                case 'ultra':
                    return {
                        cryptoCount: 48,
                        particleCount: 8000,
                        quality: 1.5,
                        portalRings: 5,
                        connectionLines: 60
                    };
            }
        };

        const settings = getPerformanceSettings();

        // Enhanced crypto data with proper branding
        const cryptoData = [
            { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', category: 'Layer 1' },
            { symbol: 'ETH', name: 'Ethereum', color: '#627EEA', category: 'Layer 1' },
            { symbol: 'KAS', name: 'Kaspa', color: '#70C7BA', category: 'BlockDAG' },
            { symbol: 'ADA', name: 'Cardano', color: '#0033AD', category: 'Layer 1' },
            { symbol: 'DOT', name: 'Polkadot', color: '#E6007A', category: 'Layer 0' },
            { symbol: 'LINK', name: 'Chainlink', color: '#2A5ADA', category: 'Oracle' },
            { symbol: 'UNI', name: 'Uniswap', color: '#FF007A', category: 'DEX' },
            { symbol: 'MATIC', name: 'Polygon', color: '#8247E5', category: 'Layer 2' },
            { symbol: 'SOL', name: 'Solana', color: '#00FFA3', category: 'Layer 1' },
            { symbol: 'AVAX', name: 'Avalanche', color: '#E84142', category: 'Layer 1' },
            { symbol: 'ATOM', name: 'Cosmos', color: '#2E3148', category: 'Layer 0' },
            { symbol: 'XRP', name: 'Ripple', color: '#23292F', category: 'Payment' },
            { symbol: 'BNB', name: 'Binance', color: '#F3BA2F', category: 'Exchange' },
            { symbol: 'ALGO', name: 'Algorand', color: '#000000', category: 'Layer 1' },
            { symbol: 'NEAR', name: 'Near Protocol', color: '#00C08B', category: 'Layer 1' },
            { symbol: 'FTM', name: 'Fantom', color: '#1969FF', category: 'Layer 1' },
            { symbol: 'SAND', name: 'Sandbox', color: '#00ADEF', category: 'Gaming' },
            { symbol: 'MANA', name: 'Decentraland', color: '#FF2D55', category: 'Metaverse' },
            { symbol: 'CRO', name: 'Cronos', color: '#002D74', category: 'Exchange' },
            { symbol: 'LTC', name: 'Litecoin', color: '#BFBBBB', category: 'Payment' },
            { symbol: 'XLM', name: 'Stellar', color: '#7D00FF', category: 'Payment' },
            { symbol: 'VET', name: 'VeChain', color: '#15BDFF', category: 'Supply Chain' },
            { symbol: 'ICP', name: 'Internet Computer', color: '#29ABE2', category: 'Layer 1' },
            { symbol: 'THETA', name: 'Theta Network', color: '#2AB8E6', category: 'Media' },
            { symbol: 'FIL', name: 'Filecoin', color: '#0090FF', category: 'Storage' },
            { symbol: 'TRX', name: 'Tron', color: '#FF060A', category: 'Layer 1' },
            { symbol: 'EOS', name: 'EOS', color: '#443F54', category: 'Layer 1' },
            { symbol: 'XTZ', name: 'Tezos', color: '#2C7DF7', category: 'Layer 1' },
            { symbol: 'AAVE', name: 'Aave', color: '#B6509E', category: 'DeFi' },
            { symbol: 'MKR', name: 'Maker', color: '#1AAB9B', category: 'DeFi' },
            { symbol: 'COMP', name: 'Compound', color: '#00D395', category: 'DeFi' },
            { symbol: 'SUSHI', name: 'SushiSwap', color: '#FA52A0', category: 'DEX' },
            { symbol: 'CRV', name: 'Curve', color: '#40649F', category: 'DEX' },
            { symbol: 'YFI', name: 'Yearn Finance', color: '#006AE3', category: 'DeFi' },
            { symbol: 'SNX', name: 'Synthetix', color: '#5FCDF9', category: 'DeFi' },
            { symbol: '1INCH', name: '1inch', color: '#94A6C8', category: 'DEX' },
            { symbol: 'BAL', name: 'Balancer', color: '#1E1E1E', category: 'DEX' },
            { symbol: 'ZRX', name: '0x Protocol', color: '#302C2C', category: 'DEX' },
            { symbol: 'ENJ', name: 'Enjin Coin', color: '#624DBF', category: 'Gaming' },
            { symbol: 'CHZ', name: 'Chiliz', color: '#CD212A', category: 'Sports' },
            { symbol: 'BAT', name: 'Basic Attention', color: '#FF5000', category: 'Utility' },
            { symbol: 'ZIL', name: 'Zilliqa', color: '#49C1BF', category: 'Layer 1' },
            { symbol: 'ICX', name: 'ICON', color: '#1FC5C9', category: 'Layer 1' },
            { symbol: 'ONT', name: 'Ontology', color: '#32A4BE', category: 'Layer 1' },
            { symbol: 'QTUM', name: 'Qtum', color: '#2E9AD0', category: 'Layer 1' },
            { symbol: 'ZEC', name: 'Zcash', color: '#ECB244', category: 'Privacy' },
            { symbol: 'DASH', name: 'Dash', color: '#008CE7', category: 'Privacy' },
            { symbol: 'XMR', name: 'Monero', color: '#FF6600', category: 'Privacy' }
        ].slice(0, settings.cryptoCount);

        // Extract theme colors
        const primaryColor = new THREE.Color(themeData.colors.accentPrimary);
        const secondaryColor = new THREE.Color(themeData.colors.accentSecondary);
        const backgroundColor = new THREE.Color(themeData.colors.primaryBackground);
        const textColor = new THREE.Color(themeData.colors.textPrimary);

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(backgroundColor, 0.1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.quality * 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // Enhanced Portal Shader Material with proper initialization
        const portalShaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                primaryColor: { value: primaryColor.clone() },
                secondaryColor: { value: secondaryColor.clone() },
                backgroundColor: { value: backgroundColor.clone() },
                portalIntensity: { value: 1.0 },
                ringCount: { value: parseFloat(settings.portalRings) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 mouse;
                uniform vec2 resolution;
                uniform vec3 primaryColor;
                uniform vec3 secondaryColor;
                uniform vec3 backgroundColor;
                uniform float portalIntensity;
                uniform float ringCount;
                
                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                // Enhanced noise function
                float noise(vec2 uv) {
                    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
                }
                
                // Fractal noise
                float fractalNoise(vec2 uv) {
                    float value = 0.0;
                    float amplitude = 0.5;
                    for(int i = 0; i < 4; i++) {
                        value += noise(uv) * amplitude;
                        uv *= 2.0;
                        amplitude *= 0.5;
                    }
                    return value;
                }
                
                // Portal effect with multiple rings
                vec3 portalEffect(vec2 uv) {
                    vec2 center = vec2(0.5, 0.5);
                    float distance = length(uv - center);
                    
                    vec3 color = vec3(0.0);
                    
                    // Multiple portal rings
                    for(float i = 1.0; i <= ringCount; i++) {
                        float ringRadius = i * 0.15;
                        float ringWidth = 0.02 + sin(time * 2.0 + i) * 0.01;
                        
                        float ring = 1.0 - smoothstep(ringRadius - ringWidth, ringRadius + ringWidth, distance);
                        ring *= smoothstep(ringRadius - ringWidth * 3.0, ringRadius - ringWidth, distance);
                        
                        // Rotating energy
                        float angle = atan(uv.y - center.y, uv.x - center.x);
                        float rotation = sin(angle * 8.0 + time * 3.0 * i) * 0.5 + 0.5;
                        
                        vec3 ringColor = mix(primaryColor, secondaryColor, rotation);
                        color += ringColor * ring * portalIntensity;
                    }
                    
                    // Central vortex
                    float vortex = 1.0 - smoothstep(0.0, 0.3, distance);
                    float vortexRotation = sin(distance * 20.0 - time * 8.0) * 0.5 + 0.5;
                    color += mix(secondaryColor, primaryColor, vortexRotation) * vortex * 0.3;
                    
                    return color;
                }
                
                // Energy field background
                vec3 energyField(vec2 uv) {
                    float field = fractalNoise(uv * 3.0 + time * 0.1);
                    field += fractalNoise(uv * 6.0 - time * 0.15) * 0.5;
                    
                    vec3 fieldColor = mix(backgroundColor, primaryColor * 0.3, field);
                    return fieldColor;
                }
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Combine effects
                    vec3 background = energyField(uv);
                    vec3 portal = portalEffect(uv);
                    
                    vec3 finalColor = background + portal;
                    
                    // Add depth-based opacity
                    float opacity = 0.8 + dot(vNormal, vec3(0.0, 0.0, 1.0)) * 0.2;
                    
                    gl_FragColor = vec4(finalColor, opacity);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        // Create main portal background
        const portalGeometry = new THREE.PlaneGeometry(25, 20);
        const portalMesh = new THREE.Mesh(portalGeometry, portalShaderMaterial);
        portalMesh.position.z = -8;
        scene.add(portalMesh);

        // Create portal rings
        const portalRings = [];
        for (let i = 0; i < settings.portalRings; i++) {
            const ringGeometry = new THREE.TorusGeometry(3 + i * 1.5, 0.1, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? primaryColor : secondaryColor,
                transparent: true,
                opacity: 0.6,
                emissive: i % 2 === 0 ? primaryColor : secondaryColor,
                emissiveIntensity: 0.3
            });

            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.z = -2 - i * 0.5;
            ring.userData = {
                originalZ: ring.position.z,
                rotationSpeed: 0.01 + i * 0.005,
                pulsePhase: i * Math.PI / 2
            };

            portalRings.push(ring);
            scene.add(ring);
        }

        // Create crypto icons with enhanced 3D geometry
        const cryptoIcons = [];
        const iconGroup = new THREE.Group();

        cryptoData.forEach((crypto, index) => {
            // Create 3D icon geometry
            const iconGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.1);

            // Create material with crypto branding
            const iconMaterial = new THREE.MeshPhongMaterial({
                color: new THREE.Color(crypto.color),
                emissive: new THREE.Color(crypto.color),
                emissiveIntensity: 0.2,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });

            const icon = new THREE.Mesh(iconGeometry, iconMaterial);

            // Position icons in orbital pattern
            const angle = (index / cryptoData.length) * Math.PI * 2;
            const radius = 8 + Math.sin(index * 0.5) * 2;
            const height = Math.cos(index * 0.3) * 1.5;

            icon.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius + height,
                Math.sin(index * 0.7) * 2
            );

            // Store crypto data and animation properties
            icon.userData = {
                crypto: crypto,
                originalPosition: icon.position.clone(),
                angle: angle,
                radius: radius,
                orbitSpeed: 0.005 + Math.random() * 0.01,
                bobSpeed: 0.8 + Math.random() * 0.4,
                bobAmplitude: 0.3 + Math.random() * 0.2,
                index: index
            };

            // Add text label
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 64;

            context.fillStyle = crypto.color;
            context.fillRect(0, 0, 128, 64);
            context.fillStyle = '#FFFFFF';
            context.font = 'bold 16px Arial';
            context.textAlign = 'center';
            context.fillText(crypto.symbol, 64, 25);
            context.font = '10px Arial';
            context.fillText(crypto.category, 64, 45);

            const texture = new THREE.CanvasTexture(canvas);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9
            });
            const labelGeometry = new THREE.PlaneGeometry(0.8, 0.4);
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.copy(icon.position);
            label.position.z += 0.3;

            icon.add(label);
            iconGroup.add(icon);
            cryptoIcons.push(icon);
        });

        scene.add(iconGroup);

        // Create connection lines between crypto icons
        const connectionLines = [];
        const lineMaterial = new THREE.LineBasicMaterial({
            color: primaryColor,
            transparent: true,
            opacity: 0.3
        });

        for (let i = 0; i < settings.connectionLines && i < cryptoIcons.length; i++) {
            const startIcon = cryptoIcons[i];
            const endIcon = cryptoIcons[(i + Math.floor(cryptoIcons.length / 3)) % cryptoIcons.length];

            const points = [startIcon.position, endIcon.position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);

            line.userData = {
                startIcon: startIcon,
                endIcon: endIcon,
                pulsePhase: Math.random() * Math.PI * 2
            };

            connectionLines.push(line);
            scene.add(line);
        }

        // Enhanced particle system
        const particleCount = settings.particleCount;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Initial positions in spherical distribution
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const radius = 5 + Math.random() * 10;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Theme-aware colors with crypto branding
            const colorChoice = Math.random();
            let color;
            if (colorChoice < 0.4) {
                color = primaryColor;
            } else if (colorChoice < 0.8) {
                color = secondaryColor;
            } else {
                // Use random crypto color
                const randomCrypto = cryptoData[Math.floor(Math.random() * cryptoData.length)];
                color = new THREE.Color(randomCrypto.color);
            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // Initial velocities
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

            sizes[i] = Math.random() * 3 + 1;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(textColor, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(primaryColor, 1, 100);
        pointLight.position.set(0, 0, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(secondaryColor, 0.8, 100);
        pointLight2.position.set(5, 5, 0);
        scene.add(pointLight2);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Update portal shader
            portalShaderMaterial.uniforms.mouse.value.set(
                (event.clientX / window.innerWidth),
                1.0 - (event.clientY / window.innerHeight)
            );

            // Raycasting for hover effects
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(cryptoIcons);

            if (intersects.length > 0) {
                const hoveredIcon = intersects[0].object;
                setHoveredCrypto(hoveredIcon.userData.crypto);

                // Scale effect
                hoveredIcon.scale.setScalar(1.3);
                hoveredIcon.material.emissiveIntensity = 0.5;
            } else {
                setHoveredCrypto(null);
                // Reset all icons
                cryptoIcons.forEach(icon => {
                    icon.scale.setScalar(1.0);
                    icon.material.emissiveIntensity = 0.2;
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Camera setup
        camera.position.set(0, 0, 15);

        // Animation loop
        const clock = new THREE.Clock();

        const animate = () => {
            try {
                const elapsedTime = clock.getElapsedTime();
                const deltaTime = clock.getDelta();

                // Update portal shader with error checking
                if (portalShaderMaterial.uniforms.time) {
                    portalShaderMaterial.uniforms.time.value = elapsedTime;
                }
                if (portalShaderMaterial.uniforms.primaryColor) {
                    portalShaderMaterial.uniforms.primaryColor.value.copy(primaryColor);
                }
                if (portalShaderMaterial.uniforms.secondaryColor) {
                    portalShaderMaterial.uniforms.secondaryColor.value.copy(secondaryColor);
                }
                if (portalShaderMaterial.uniforms.backgroundColor) {
                    portalShaderMaterial.uniforms.backgroundColor.value.copy(backgroundColor);
                }

                // Animate portal rings
                portalRings.forEach((ring, index) => {
                    const userData = ring.userData;
                    ring.rotation.z += userData.rotationSpeed;
                    ring.rotation.x = Math.sin(elapsedTime + userData.pulsePhase) * 0.1;

                    // Pulsing effect
                    const pulse = 1.0 + Math.sin(elapsedTime * 2 + userData.pulsePhase) * 0.1;
                    ring.scale.setScalar(pulse);

                    // Update material colors
                    ring.material.color = index % 2 === 0 ? primaryColor : secondaryColor;
                    ring.material.emissive = index % 2 === 0 ? primaryColor : secondaryColor;
                });

                // Animate crypto icons
                cryptoIcons.forEach((icon) => {
                    const userData = icon.userData;

                    // Orbital motion
                    userData.angle += userData.orbitSpeed;
                    const x = Math.cos(userData.angle) * userData.radius;
                    const y = Math.sin(userData.angle) * userData.radius;
                    const z = Math.sin(elapsedTime * userData.bobSpeed + userData.index) * userData.bobAmplitude;

                    icon.position.set(x, y, z);

                    // Rotation
                    icon.rotation.x += 0.01;
                    icon.rotation.y += 0.015;

                    // Update material colors to maintain theme compatibility
                    const baseColor = new THREE.Color(userData.crypto.color);
                    const themeInfluence = 0.2;
                    const finalColor = baseColor.clone().lerp(primaryColor, themeInfluence);
                    icon.material.color = finalColor;
                    icon.material.emissive = finalColor;
                });

                // Update connection lines
                connectionLines.forEach((line) => {
                    const userData = line.userData;
                    const points = [userData.startIcon.position, userData.endIcon.position];
                    line.geometry.setFromPoints(points);

                    // Pulsing opacity
                    const pulse = Math.sin(elapsedTime * 3 + userData.pulsePhase) * 0.5 + 0.5;
                    line.material.opacity = 0.1 + pulse * 0.3;
                    line.material.color = primaryColor;
                });

                // Animate particles
                const positions = particleSystem.geometry.attributes.position.array;
                const colors = particleSystem.geometry.attributes.color.array;

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;

                    // Orbital motion around center
                    const centerDistance = Math.sqrt(
                        positions[i3] * positions[i3] +
                        positions[i3 + 1] * positions[i3 + 1]
                    );

                    if (centerDistance > 0) {
                        const angle = Math.atan2(positions[i3 + 1], positions[i3]);
                        const newAngle = angle + 0.005;
                        const radius = centerDistance + Math.sin(elapsedTime + i * 0.1) * 0.1;

                        positions[i3] = Math.cos(newAngle) * radius;
                        positions[i3 + 1] = Math.sin(newAngle) * radius;
                    }

                    // Vertical oscillation
                    positions[i3 + 2] += Math.sin(elapsedTime * 2 + i * 0.1) * 0.01;

                    // Update colors to match theme
                    const colorLerp = Math.sin(elapsedTime + i * 0.1) * 0.5 + 0.5;
                    const lerpedColor = primaryColor.clone().lerp(secondaryColor, colorLerp);
                    colors[i3] = lerpedColor.r;
                    colors[i3 + 1] = lerpedColor.g;
                    colors[i3 + 2] = lerpedColor.b;

                    // Boundary conditions
                    if (Math.abs(positions[i3]) > 15) positions[i3] *= 0.9;
                    if (Math.abs(positions[i3 + 1]) > 15) positions[i3 + 1] *= 0.9;
                    if (Math.abs(positions[i3 + 2]) > 15) positions[i3 + 2] *= 0.9;
                }

                particleSystem.geometry.attributes.position.needsUpdate = true;
                particleSystem.geometry.attributes.color.needsUpdate = true;

                // Gentle camera movement
                camera.position.x = Math.sin(elapsedTime * 0.1) * 2;
                camera.position.y = Math.cos(elapsedTime * 0.08) * 1;
                camera.lookAt(0, 0, 0);

                // Update lighting colors
                pointLight.color = primaryColor;
                pointLight2.color = secondaryColor;

                renderer.render(scene, camera);
                animationRef.current = requestAnimationFrame(animate);
            } catch (error) {
                console.error('Animation error:', error);
                // Continue animation even if there's an error
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            portalShaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Store references for cleanup
        sceneRef.current = {
            scene,
            camera,
            renderer,
            cryptoIcons,
            portalRings,
            particleSystem,
            connectionLines
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
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();
        };
    }, [themeData, performanceMode]);

    return (
        <div className="relative w-full h-full">
            {/* Three.js Canvas */}
            <div
                ref={mountRef}
                className="absolute inset-0"
                style={{ zIndex: 1 }}
            />

            {/* Hover tooltip */}
            {hoveredCrypto && (
                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-lg font-bold" style={{ color: hoveredCrypto.color }}>
                        {hoveredCrypto.symbol}
                    </div>
                    <div className="text-sm text-white/80">{hoveredCrypto.name}</div>
                    <div className="text-xs text-white/60">{hoveredCrypto.category}</div>
                </div>
            )}

            {/* Portal title */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
                <h2
                    className="text-4xl font-bold tracking-wider mb-2"
                    style={{
                        color: themeData.colors.accentPrimary,
                        textShadow: `0 0 20px ${themeData.colors.accentPrimary}66`
                    }}
                >
                    CRYPTO PORTAL NETWORK
                </h2>
                <div
                    className="h-1 w-48 mx-auto rounded-full"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${themeData.colors.accentPrimary}, ${themeData.colors.accentSecondary}, transparent)`
                    }}
                />
            </div>
        </div>
    );
}
