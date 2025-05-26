import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const CyberpunkMetropolis = ({ themeData, performanceMode = 'high' }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationRef = useRef(null);
    const [stats, setStats] = useState({
        buildings: 0,
        particles: 0,
        fps: 60,
        renderTime: 0
    });

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance configuration
        const performanceConfig = {
            low: {
                buildings: 50,
                rainParticles: 1000,
                neonLights: 20,
                fogDensity: 0.01,
                shadowMapSize: 512,
                pixelRatio: 1
            },
            medium: {
                buildings: 100,
                rainParticles: 5000,
                neonLights: 50,
                fogDensity: 0.008,
                shadowMapSize: 1024,
                pixelRatio: 1.5
            },
            high: {
                buildings: 200,
                rainParticles: 15000,
                neonLights: 100,
                fogDensity: 0.005,
                shadowMapSize: 2048,
                pixelRatio: 2
            }
        };

        const config = performanceConfig[performanceMode] || performanceConfig.high;

        // Scene setup with cyberpunk atmosphere
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x001122, config.fogDensity);
        sceneRef.current = scene;

        // Camera with cinematic setup
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 80, 200);

        // Enhanced renderer with post-processing capabilities
        const renderer = new THREE.WebGLRenderer({
            antialias: performanceMode !== 'low',
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.pixelRatio));
        renderer.shadowMap.enabled = performanceMode !== 'low';
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        rendererRef.current = renderer;

        mountRef.current.appendChild(renderer.domElement);

        // Cyberpunk color palette
        const colors = {
            neonPink: 0xff00ff,
            neonCyan: 0x00ffff,
            neonGreen: 0x00ff00,
            neonOrange: 0xff6600,
            neonPurple: 0x8800ff,
            darkBuilding: 0x111122,
            windowLight: 0xffffaa,
            skyGlow: 0x001144
        };

        // Advanced building generation
        const createMetropolis = () => {
            const buildingGroup = new THREE.Group();
            const buildings = [];
            const gridSize = 20;
            const buildingSpacing = 25;

            for (let x = -gridSize; x <= gridSize; x += 2) {
                for (let z = -gridSize; z <= gridSize; z += 2) {
                    if (buildings.length >= config.buildings) break;

                    const distance = Math.sqrt(x * x + z * z);
                    if (distance > gridSize) continue;

                    // Varied building heights based on distance from center
                    const baseHeight = 20 + Math.random() * 60;
                    const centerInfluence = (gridSize - distance) / gridSize;
                    const height = baseHeight + centerInfluence * 80;

                    const width = 8 + Math.random() * 12;
                    const depth = 8 + Math.random() * 12;

                    // Create building with multiple segments
                    const buildingGroup = new THREE.Group();
                    const segments = Math.floor(height / 15) + 1;

                    for (let i = 0; i < segments; i++) {
                        const segmentHeight = height / segments;
                        const segmentGeometry = new THREE.BoxGeometry(
                            width * (1 - i * 0.1),
                            segmentHeight,
                            depth * (1 - i * 0.1)
                        );

                        const buildingMaterial = new THREE.MeshPhongMaterial({
                            color: colors.darkBuilding,
                            shininess: 50,
                            transparent: true,
                            opacity: 0.9
                        });

                        const segment = new THREE.Mesh(segmentGeometry, buildingMaterial);
                        segment.position.y = (i * segmentHeight) + segmentHeight / 2;
                        segment.castShadow = true;
                        segment.receiveShadow = true;
                        buildingGroup.add(segment);

                        // Add windows with emissive glow
                        if (performanceMode !== 'low') {
                            const windowsPerFloor = Math.floor(segmentHeight / 3);
                            for (let floor = 0; floor < windowsPerFloor; floor++) {
                                // Front windows
                                const windowGeometry = new THREE.PlaneGeometry(width * 0.8, 2);
                                const windowMaterial = new THREE.MeshBasicMaterial({
                                    color: Math.random() > 0.7 ? colors.windowLight : 0x000000,
                                    transparent: true,
                                    opacity: Math.random() > 0.3 ? 0.8 : 0.1
                                });
                                const window = new THREE.Mesh(windowGeometry, windowMaterial);
                                window.position.set(0, i * segmentHeight + floor * 3 + 2, depth / 2 + 0.1);
                                buildingGroup.add(window);

                                // Side windows
                                if (Math.random() > 0.5) {
                                    const sideWindow = window.clone();
                                    sideWindow.rotation.y = Math.PI / 2;
                                    sideWindow.position.set(width / 2 + 0.1, window.position.y, 0);
                                    buildingGroup.add(sideWindow);
                                }
                            }
                        }
                    }

                    // Add neon signs and advertisements
                    if (Math.random() > 0.7 && buildings.length < config.neonLights) {
                        const signGeometry = new THREE.PlaneGeometry(width * 0.6, 4);
                        const neonColors = [colors.neonPink, colors.neonCyan, colors.neonGreen, colors.neonOrange];
                        const signColor = neonColors[Math.floor(Math.random() * neonColors.length)];

                        const signMaterial = new THREE.MeshBasicMaterial({
                            color: signColor,
                            transparent: true,
                            opacity: 0.8
                        });

                        const sign = new THREE.Mesh(signGeometry, signMaterial);
                        sign.position.set(0, height * 0.7, depth / 2 + 0.2);
                        buildingGroup.add(sign);

                        // Add point light for neon glow
                        const neonLight = new THREE.PointLight(signColor, 2, 30);
                        neonLight.position.copy(sign.position);
                        neonLight.position.z += 5;
                        buildingGroup.add(neonLight);
                    }

                    buildingGroup.position.set(x * buildingSpacing, 0, z * buildingSpacing);
                    buildings.push(buildingGroup);
                    buildingGroup.add(buildingGroup);
                }
                if (buildings.length >= config.buildings) break;
            }

            return { group: buildingGroup, buildings };
        };

        // Advanced rain system with GPU optimization
        const createRainSystem = () => {
            const rainGeometry = new THREE.BufferGeometry();
            const rainCount = config.rainParticles;

            const positions = new Float32Array(rainCount * 3);
            const velocities = new Float32Array(rainCount * 3);
            const opacities = new Float32Array(rainCount);

            for (let i = 0; i < rainCount; i++) {
                // Random position in large area
                positions[i * 3] = (Math.random() - 0.5) * 1000;
                positions[i * 3 + 1] = Math.random() * 400 + 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

                // Downward velocity with slight wind
                velocities[i * 3] = (Math.random() - 0.5) * 0.5;
                velocities[i * 3 + 1] = -2 - Math.random() * 3;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

                opacities[i] = Math.random() * 0.8 + 0.2;
            }

            rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            rainGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            rainGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

            // Custom rain shader
            const rainMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    rainColor: { value: new THREE.Color(0x4488ff) }
                },
                vertexShader: `
                    attribute vec3 velocity;
                    attribute float opacity;
                    varying float vOpacity;
                    uniform float time;
                    
                    void main() {
                        vOpacity = opacity;
                        vec3 pos = position;
                        
                        // Update position based on velocity and time
                        pos += velocity * time * 20.0;
                        
                        // Reset position when below ground
                        if (pos.y < -10.0) {
                            pos.y = 400.0;
                        }
                        
                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = 2.0;
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    uniform vec3 rainColor;
                    varying float vOpacity;
                    
                    void main() {
                        gl_FragColor = vec4(rainColor, vOpacity * 0.6);
                    }
                `,
                transparent: true,
                depthWrite: false
            });

            const rain = new THREE.Points(rainGeometry, rainMaterial);
            return { rain, material: rainMaterial };
        };

        // Volumetric lighting system
        const createVolumetricLighting = () => {
            // Main street lights
            const streetLights = [];
            for (let i = -15; i <= 15; i += 5) {
                for (let j = -15; j <= 15; j += 5) {
                    const light = new THREE.SpotLight(colors.neonCyan, 3, 100, Math.PI / 6, 0.5);
                    light.position.set(i * 25, 40, j * 25);
                    light.target.position.set(i * 25, 0, j * 25);
                    light.castShadow = performanceMode !== 'low';

                    if (light.castShadow) {
                        light.shadow.mapSize.width = config.shadowMapSize;
                        light.shadow.mapSize.height = config.shadowMapSize;
                        light.shadow.camera.near = 0.5;
                        light.shadow.camera.far = 100;
                    }

                    scene.add(light);
                    scene.add(light.target);
                    streetLights.push(light);

                    // Light pole geometry
                    const poleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 35);
                    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
                    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
                    pole.position.set(i * 25, 17.5, j * 25);
                    pole.castShadow = true;
                    scene.add(pole);
                }
            }

            // Ambient city glow
            const ambientLight = new THREE.AmbientLight(colors.skyGlow, 0.4);
            scene.add(ambientLight);

            // Directional moonlight
            const moonLight = new THREE.DirectionalLight(0x4488ff, 0.8);
            moonLight.position.set(100, 200, 100);
            moonLight.castShadow = performanceMode !== 'low';
            if (moonLight.castShadow) {
                moonLight.shadow.mapSize.width = config.shadowMapSize;
                moonLight.shadow.mapSize.height = config.shadowMapSize;
                moonLight.shadow.camera.near = 1;
                moonLight.shadow.camera.far = 1000;
                moonLight.shadow.camera.left = -500;
                moonLight.shadow.camera.right = 500;
                moonLight.shadow.camera.top = 500;
                moonLight.shadow.camera.bottom = -500;
            }
            scene.add(moonLight);

            return { streetLights, ambient: ambientLight, moon: moonLight };
        };

        // Ground with reflective surface
        const createGround = () => {
            const groundGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
            const groundMaterial = new THREE.MeshPhongMaterial({
                color: 0x111111,
                shininess: 100,
                transparent: true,
                opacity: 0.8
            });

            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            scene.add(ground);

            // Add subtle vertex displacement for wet street effect
            const positions = groundGeometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 2] += Math.sin(positions[i] * 0.1) * Math.sin(positions[i + 1] * 0.1) * 0.3;
            }
            groundGeometry.attributes.position.needsUpdate = true;
            groundGeometry.computeVertexNormals();

            return ground;
        };

        // Flying vehicles (hovercars)
        const createFlyingVehicles = () => {
            const vehicles = [];
            const vehicleCount = Math.min(20, config.buildings / 5);

            for (let i = 0; i < vehicleCount; i++) {
                const vehicleGroup = new THREE.Group();

                // Vehicle body
                const bodyGeometry = new THREE.BoxGeometry(4, 1, 8);
                const bodyMaterial = new THREE.MeshPhongMaterial({
                    color: 0x333333,
                    shininess: 100
                });
                const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
                vehicleGroup.add(body);

                // Glowing elements
                const glowGeometry = new THREE.BoxGeometry(4.2, 0.2, 8.2);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: Math.random() > 0.5 ? colors.neonCyan : colors.neonPink,
                    transparent: true,
                    opacity: 0.6
                });
                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                glow.position.y = -0.6;
                vehicleGroup.add(glow);

                // Random flight path
                const pathRadius = 200 + Math.random() * 300;
                const pathHeight = 50 + Math.random() * 100;
                const pathSpeed = 0.001 + Math.random() * 0.002;
                const pathOffset = Math.random() * Math.PI * 2;

                vehicles.push({
                    group: vehicleGroup,
                    pathRadius,
                    pathHeight,
                    pathSpeed,
                    pathOffset,
                    time: Math.random() * 100
                });

                scene.add(vehicleGroup);
            }

            return vehicles;
        };

        // Initialize all scene elements
        const metropolis = createMetropolis();
        const rainSystem = createRainSystem();
        const lighting = createVolumetricLighting();
        const ground = createGround();
        const vehicles = createFlyingVehicles();

        scene.add(metropolis.group);
        scene.add(rainSystem.rain);

        // Animation variables
        let time = 0;
        let frameCount = 0;
        let lastFPSUpdate = Date.now();
        let lastRenderTime = 0;

        // Main animation loop
        const animate = () => {
            const frameStart = performance.now();
            animationRef.current = requestAnimationFrame(animate);

            time += 0.016; // 60fps timing
            frameCount++;

            // Update FPS and render time
            const now = Date.now();
            if (now - lastFPSUpdate >= 1000) {
                setStats(prev => ({
                    ...prev,
                    fps: Math.round((frameCount * 1000) / (now - lastFPSUpdate)),
                    buildings: metropolis.buildings.length,
                    particles: config.rainParticles,
                    renderTime: lastRenderTime.toFixed(2)
                }));
                frameCount = 0;
                lastFPSUpdate = now;
            }

            // Update rain system
            rainSystem.material.uniforms.time.value = time;

            // Animate flying vehicles
            vehicles.forEach(vehicle => {
                vehicle.time += vehicle.pathSpeed;
                const x = Math.cos(vehicle.time + vehicle.pathOffset) * vehicle.pathRadius;
                const z = Math.sin(vehicle.time + vehicle.pathOffset) * vehicle.pathRadius;
                const y = vehicle.pathHeight + Math.sin(vehicle.time * 2) * 10;

                vehicle.group.position.set(x, y, z);
                vehicle.group.lookAt(
                    x + Math.cos(vehicle.time + vehicle.pathOffset + 0.1) * vehicle.pathRadius,
                    y,
                    z + Math.sin(vehicle.time + vehicle.pathOffset + 0.1) * vehicle.pathRadius
                );
            });

            // Animate neon lights flickering
            if (frameCount % 30 === 0) {
                lighting.streetLights.forEach(light => {
                    if (Math.random() > 0.95) {
                        light.intensity = Math.random() * 2 + 1;
                    }
                });
            }

            // Dynamic camera movement
            const cameraRadius = 150;
            const cameraSpeed = 0.0005;
            camera.position.x = Math.cos(time * cameraSpeed) * cameraRadius;
            camera.position.z = Math.sin(time * cameraSpeed) * cameraRadius;
            camera.position.y = 60 + Math.sin(time * cameraSpeed * 0.3) * 30;
            camera.lookAt(0, 20, 0);

            // Render the scene
            const renderStart = performance.now();
            renderer.render(scene, camera);
            lastRenderTime = performance.now() - renderStart;
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            // Dispose of all resources
            scene.traverse((object) => {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [performanceMode, themeData]);

    return (
        <div className="absolute inset-0">
            <div ref={mountRef} className="w-full h-full" />

            {/* Cyberpunk UI Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm rounded-lg p-4 text-cyan-400 border border-cyan-500/30">
                <div className="font-mono text-lg mb-3 text-center">
                    <span className="text-pink-400">CYBER</span>
                    <span className="text-cyan-400">PUNK</span>
                    <span className="text-purple-400"> METROPOLIS</span>
                </div>
                <div className="space-y-2 text-sm font-mono">
                    <div>FPS: <span className="text-green-400">{stats.fps}</span></div>
                    <div>BUILDINGS: <span className="text-blue-400">{stats.buildings}</span></div>
                    <div>RAIN_DROPS: <span className="text-cyan-400">{stats.particles.toLocaleString()}</span></div>
                    <div>RENDER_TIME: <span className="text-yellow-400">{stats.renderTime}ms</span></div>
                    <div>MODE: <span className="text-pink-400">{performanceMode.toUpperCase()}</span></div>
                </div>
            </div>

            {/* Cyberpunk Scene Info */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white max-w-md border border-purple-500/30">
                <h3 className="font-bold text-xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                    CYBERPUNK METROPOLIS 2085
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                    Ultra-advanced neon cityscape with volumetric lighting, realistic rain simulation,
                    flying vehicles, and dynamic shadow mapping. Features procedural building generation
                    and atmospheric effects.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-pink-500/30 rounded text-xs border border-pink-500/50">Volumetric Fog</span>
                    <span className="px-2 py-1 bg-cyan-500/30 rounded text-xs border border-cyan-500/50">Neon Lighting</span>
                    <span className="px-2 py-1 bg-purple-500/30 rounded text-xs border border-purple-500/50">Rain Physics</span>
                    <span className="px-2 py-1 bg-blue-500/30 rounded text-xs border border-blue-500/50">Flying Vehicles</span>
                    <span className="px-2 py-1 bg-green-500/30 rounded text-xs border border-green-500/50">Custom Shaders</span>
                </div>
            </div>

            {/* Cyberpunk Loading Effect */}
            <div className="absolute top-4 right-4 z-10">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default CyberpunkMetropolis;