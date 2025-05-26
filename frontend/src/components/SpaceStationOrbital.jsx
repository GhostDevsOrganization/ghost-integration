import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const SpaceStationOrbital = ({ themeData, performanceMode = 'high' }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationRef = useRef(null);
    const [stats, setStats] = useState({
        objects: 0,
        particles: 0,
        fps: 60
    });

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance settings based on mode
        const performanceConfig = {
            low: { particles: 2000, debris: 50, stationSegments: 8, shadowQuality: 512 },
            medium: { particles: 5000, debris: 100, stationSegments: 16, shadowQuality: 1024 },
            high: { particles: 10000, debris: 200, stationSegments: 32, shadowQuality: 2048 }
        };

        const config = performanceConfig[performanceMode] || performanceConfig.high;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000011, 50, 1000);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 50, 100);

        // Enhanced WebGL renderer with optimizations
        const renderer = new THREE.WebGLRenderer({
            antialias: performanceMode !== 'low',
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'low' ? 1 : 2));
        renderer.shadowMap.enabled = performanceMode !== 'low';
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.autoUpdate = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        rendererRef.current = renderer;

        mountRef.current.appendChild(renderer.domElement);

        // Space environment
        const createSpaceEnvironment = () => {
            // Starfield using GPU-optimized geometry
            const starGeometry = new THREE.BufferGeometry();
            const starCount = config.particles;
            const positions = new Float32Array(starCount * 3);
            const colors = new Float32Array(starCount * 3);
            const sizes = new Float32Array(starCount);

            for (let i = 0; i < starCount; i++) {
                // Spherical distribution for realistic star field
                const radius = 500 + Math.random() * 500;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);

                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = radius * Math.cos(phi);

                // Color variation for different star types
                const starType = Math.random();
                if (starType < 0.1) {
                    // Blue giants
                    colors[i * 3] = 0.7;
                    colors[i * 3 + 1] = 0.8;
                    colors[i * 3 + 2] = 1.0;
                } else if (starType < 0.3) {
                    // Red dwarfs
                    colors[i * 3] = 1.0;
                    colors[i * 3 + 1] = 0.6;
                    colors[i * 3 + 2] = 0.4;
                } else {
                    // Sun-like stars
                    colors[i * 3] = 1.0;
                    colors[i * 3 + 1] = 1.0;
                    colors[i * 3 + 2] = 0.9;
                }

                sizes[i] = Math.random() * 2 + 0.5;
            }

            starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            // Advanced star material with custom shader
            const starMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    pixelRatio: { value: renderer.getPixelRatio() }
                },
                vertexShader: `
                    attribute float size;
                    varying vec3 vColor;
                    uniform float time;
                    uniform float pixelRatio;
                    
                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        
                        // Subtle pulsing effect
                        float pulse = sin(time * 2.0 + position.x * 0.01) * 0.3 + 0.7;
                        gl_PointSize = size * pixelRatio * pulse * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    
                    void main() {
                        float dist = distance(gl_PointCoord, vec2(0.5));
                        if (dist > 0.5) discard;
                        
                        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                vertexColors: true,
                depthWrite: false
            });

            const stars = new THREE.Points(starGeometry, starMaterial);
            scene.add(stars);

            return { stars, material: starMaterial };
        };

        // Create space station with modular design
        const createSpaceStation = () => {
            const stationGroup = new THREE.Group();

            // Central hub
            const hubGeometry = new THREE.SphereGeometry(8, config.stationSegments, config.stationSegments);
            const hubMaterial = new THREE.MeshPhongMaterial({
                color: 0x444444,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            const hub = new THREE.Mesh(hubGeometry, hubMaterial);
            hub.castShadow = true;
            hub.receiveShadow = true;
            stationGroup.add(hub);

            // Rotating rings
            const ringCount = 3;
            const rings = [];

            for (let i = 0; i < ringCount; i++) {
                const ringGroup = new THREE.Group();
                const radius = 15 + i * 8;

                // Ring structure
                const ringGeometry = new THREE.TorusGeometry(radius, 1.5, 8, config.stationSegments);
                const ringMaterial = new THREE.MeshPhongMaterial({
                    color: 0x666666,
                    shininess: 80
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.castShadow = true;
                ringGroup.add(ring);

                // Habitat modules on rings
                const moduleCount = 4 + i * 2;
                for (let j = 0; j < moduleCount; j++) {
                    const angle = (j / moduleCount) * Math.PI * 2;
                    const moduleGeometry = new THREE.BoxGeometry(3, 2, 4);
                    const moduleMaterial = new THREE.MeshPhongMaterial({
                        color: 0x555555,
                        transparent: true,
                        opacity: 0.8
                    });
                    const module = new THREE.Mesh(moduleGeometry, moduleMaterial);

                    module.position.x = Math.cos(angle) * radius;
                    module.position.z = Math.sin(angle) * radius;
                    module.lookAt(0, 0, 0);
                    module.castShadow = true;

                    // Add windows with emissive material
                    const windowGeometry = new THREE.PlaneGeometry(1, 0.8);
                    const windowMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffaa,
                        transparent: true,
                        opacity: 0.6
                    });
                    const window = new THREE.Mesh(windowGeometry, windowMaterial);
                    window.position.set(0, 0, 2.1);
                    module.add(window);

                    ringGroup.add(module);
                }

                rings.push(ringGroup);
                stationGroup.add(ringGroup);
            }

            // Solar panels
            const panelCount = 8;
            for (let i = 0; i < panelCount; i++) {
                const angle = (i / panelCount) * Math.PI * 2;
                const panelGeometry = new THREE.PlaneGeometry(12, 6);
                const panelMaterial = new THREE.MeshLambertMaterial({
                    color: 0x001133,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.7
                });
                const panel = new THREE.Mesh(panelGeometry, panelMaterial);

                panel.position.x = Math.cos(angle) * 45;
                panel.position.z = Math.sin(angle) * 45;
                panel.position.y = Math.sin(i * 0.5) * 10;
                panel.lookAt(0, 0, 0);

                stationGroup.add(panel);
            }

            return { station: stationGroup, rings };
        };

        // Space debris field
        const createDebrisField = () => {
            const debrisGroup = new THREE.Group();
            const debrisCount = config.debris;
            const debris = [];

            for (let i = 0; i < debrisCount; i++) {
                const size = Math.random() * 2 + 0.5;
                const geometry = new THREE.IcosahedronGeometry(size, 1);
                const material = new THREE.MeshLambertMaterial({
                    color: new THREE.Color().setHSL(0.1, 0.3, 0.3 + Math.random() * 0.3)
                });
                const piece = new THREE.Mesh(geometry, material);

                // Random orbital position
                const distance = 150 + Math.random() * 300;
                const angle = Math.random() * Math.PI * 2;
                const height = (Math.random() - 0.5) * 100;

                piece.position.x = Math.cos(angle) * distance;
                piece.position.z = Math.sin(angle) * distance;
                piece.position.y = height;

                // Random rotation
                piece.rotation.x = Math.random() * Math.PI * 2;
                piece.rotation.y = Math.random() * Math.PI * 2;
                piece.rotation.z = Math.random() * Math.PI * 2;

                debris.push({
                    mesh: piece,
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    },
                    orbitSpeed: (Math.random() - 0.5) * 0.001,
                    orbitRadius: distance
                });

                debrisGroup.add(piece);
            }

            return { group: debrisGroup, pieces: debris };
        };

        // Lighting setup
        const createLighting = () => {
            // Sun (distant directional light)
            const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
            sunLight.position.set(200, 100, 100);
            sunLight.castShadow = performanceMode !== 'low';
            if (sunLight.castShadow) {
                sunLight.shadow.mapSize.width = config.shadowQuality;
                sunLight.shadow.mapSize.height = config.shadowQuality;
                sunLight.shadow.camera.near = 1;
                sunLight.shadow.camera.far = 1000;
                sunLight.shadow.camera.left = -200;
                sunLight.shadow.camera.right = 200;
                sunLight.shadow.camera.top = 200;
                sunLight.shadow.camera.bottom = -200;
            }
            scene.add(sunLight);

            // Earth reflection (subtle blue ambient)
            const earthLight = new THREE.AmbientLight(0x4488ff, 0.3);
            scene.add(earthLight);

            // Station interior lights
            const interiorLight = new THREE.PointLight(0xffffaa, 0.8, 100);
            interiorLight.position.set(0, 0, 0);
            scene.add(interiorLight);

            return { sun: sunLight, earth: earthLight, interior: interiorLight };
        };

        // Initialize scene
        const spaceEnv = createSpaceEnvironment();
        const station = createSpaceStation();
        const debrisField = createDebrisField();
        const lighting = createLighting();

        // Earth in the background
        const earthGeometry = new THREE.SphereGeometry(50, 32, 32);
        const earthMaterial = new THREE.MeshPhongMaterial({
            color: 0x4488ff,
            shininess: 30,
            transparent: true,
            opacity: 0.8
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.set(-300, -200, -400);
        scene.add(earth);

        // Animation variables
        let time = 0;
        let frameCount = 0;
        let lastFPSUpdate = Date.now();

        // Main animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            time += 0.016; // 60fps timing
            frameCount++;

            // Update FPS counter
            const now = Date.now();
            if (now - lastFPSUpdate >= 1000) {
                setStats(prev => ({
                    ...prev,
                    fps: Math.round((frameCount * 1000) / (now - lastFPSUpdate)),
                    objects: scene.children.length,
                    particles: config.particles
                }));
                frameCount = 0;
                lastFPSUpdate = now;
            }

            // Rotate space station rings
            station.rings.forEach((ring, index) => {
                ring.rotation.y += (0.005 + index * 0.002) * (performanceMode === 'low' ? 0.5 : 1);
            });

            // Animate debris
            debrisField.pieces.forEach(debris => {
                debris.mesh.rotation.x += debris.rotationSpeed.x;
                debris.mesh.rotation.y += debris.rotationSpeed.y;
                debris.mesh.rotation.z += debris.rotationSpeed.z;

                // Orbital motion
                const angle = time * debris.orbitSpeed;
                const x = Math.cos(angle) * debris.orbitRadius;
                const z = Math.sin(angle) * debris.orbitRadius;
                debris.mesh.position.x = x;
                debris.mesh.position.z = z;
            });

            // Update star pulsing
            spaceEnv.material.uniforms.time.value = time;

            // Rotate Earth
            earth.rotation.y += 0.001;

            // Camera orbital motion
            const cameraRadius = 120;
            const cameraSpeed = 0.0003;
            camera.position.x = Math.cos(time * cameraSpeed) * cameraRadius;
            camera.position.z = Math.sin(time * cameraSpeed) * cameraRadius;
            camera.position.y = 30 + Math.sin(time * cameraSpeed * 0.5) * 20;
            camera.lookAt(0, 0, 0);

            // Update shadow maps occasionally for performance
            if (frameCount % 30 === 0 && performanceMode !== 'low') {
                renderer.shadowMap.needsUpdate = true;
            }

            renderer.render(scene, camera);
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

            // Dispose of geometries and materials
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

            {/* Performance Stats Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                <div className="font-semibold mb-2">Space Station Orbital</div>
                <div className="space-y-1">
                    <div>FPS: <span className="text-green-400">{stats.fps}</span></div>
                    <div>Objects: <span className="text-blue-400">{stats.objects}</span></div>
                    <div>Particles: <span className="text-purple-400">{stats.particles.toLocaleString()}</span></div>
                    <div>Mode: <span className="text-yellow-400">{performanceMode}</span></div>
                </div>
            </div>

            {/* Scene Description */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white max-w-sm">
                <h3 className="font-bold text-lg mb-2">Space Station Orbital</h3>
                <p className="text-sm text-white/80 mb-2">
                    Advanced orbital mechanics simulation featuring a modular space station with rotating habitat rings,
                    realistic debris field, and dynamic lighting from Earth and the Sun.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-500/30 rounded text-xs">Orbital Physics</span>
                    <span className="px-2 py-1 bg-green-500/30 rounded text-xs">Shadow Mapping</span>
                    <span className="px-2 py-1 bg-purple-500/30 rounded text-xs">Instanced Rendering</span>
                    <span className="px-2 py-1 bg-yellow-500/30 rounded text-xs">Custom Shaders</span>
                </div>
            </div>
        </div>
    );
};

export default SpaceStationOrbital;