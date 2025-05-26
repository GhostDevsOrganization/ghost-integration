import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const FractalMandala = ({ themeData, performanceMode = 'high' }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationRef = useRef(null);
    const [stats, setStats] = useState({
        iterations: 0,
        fractals: 0,
        fps: 60,
        complexity: 0
    });

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance configuration for fractal complexity
        const performanceConfig = {
            low: {
                maxIterations: 3,
                particleCount: 1000,
                fractalLayers: 3,
                geometryDetail: 16,
                animationSpeed: 0.5
            },
            medium: {
                maxIterations: 5,
                particleCount: 5000,
                fractalLayers: 5,
                geometryDetail: 32,
                animationSpeed: 0.75
            },
            high: {
                maxIterations: 7,
                particleCount: 15000,
                fractalLayers: 8,
                geometryDetail: 64,
                animationSpeed: 1.0
            }
        };

        const config = performanceConfig[performanceMode] || performanceConfig.high;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000008);
        sceneRef.current = scene;

        // Camera setup for fractal viewing
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 50);

        // Renderer with enhanced quality
        const renderer = new THREE.WebGLRenderer({
            antialias: performanceMode !== 'low',
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'low' ? 1 : 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        rendererRef.current = renderer;

        mountRef.current.appendChild(renderer.domElement);

        // Sacred geometry color palette
        const colors = {
            gold: 0xffd700,
            purple: 0x8a2be2,
            cyan: 0x00ffff,
            magenta: 0xff00ff,
            orange: 0xff6600,
            emerald: 0x50c878,
            indigo: 0x4b0082,
            rose: 0xff69b4
        };

        // Fibonacci sequence for golden ratio calculations
        const fibonacci = (n) => {
            if (n <= 1) return n;
            let a = 0, b = 1, temp;
            for (let i = 2; i <= n; i++) {
                temp = a + b;
                a = b;
                b = temp;
            }
            return b;
        };

        // Golden ratio constant
        const PHI = (1 + Math.sqrt(5)) / 2;

        // Generate fractal mandala geometry
        const createFractalMandala = () => {
            const mandalaGroup = new THREE.Group();
            const fractalObjects = [];

            // Create multiple layers of fractals
            for (let layer = 0; layer < config.fractalLayers; layer++) {
                const layerGroup = new THREE.Group();
                const layerRadius = 5 + layer * 8;
                const elementCount = fibonacci(layer + 4); // Use Fibonacci numbers

                for (let i = 0; i < elementCount; i++) {
                    const angle = (i / elementCount) * Math.PI * 2;
                    const goldenAngle = angle * PHI; // Golden ratio spiral

                    // Create fractal element based on sacred geometry
                    const element = createSacredGeometry(layer, i);

                    // Position using golden spiral
                    const x = Math.cos(goldenAngle) * layerRadius;
                    const y = Math.sin(goldenAngle) * layerRadius;
                    const z = Math.sin(layer * 0.5) * 2;

                    element.position.set(x, y, z);
                    element.rotation.z = goldenAngle;

                    // Scale based on golden ratio
                    const scale = Math.pow(PHI, -layer * 0.5);
                    element.scale.setScalar(scale);

                    layerGroup.add(element);
                    fractalObjects.push({
                        mesh: element,
                        layer,
                        index: i,
                        originalPosition: { x, y, z },
                        rotationSpeed: {
                            x: (Math.random() - 0.5) * 0.01,
                            y: (Math.random() - 0.5) * 0.01,
                            z: (Math.random() - 0.5) * 0.02
                        }
                    });
                }

                mandalaGroup.add(layerGroup);
            }

            return { group: mandalaGroup, objects: fractalObjects };
        };

        // Create sacred geometry shapes
        const createSacredGeometry = (layer, index) => {
            const geometryTypes = [
                'tetrahedron',
                'octahedron',
                'icosahedron',
                'dodecahedron',
                'torus',
                'flower',
                'merkaba'
            ];

            const geometryType = geometryTypes[layer % geometryTypes.length];
            let geometry, material;

            // Create geometry based on type
            switch (geometryType) {
                case 'tetrahedron':
                    geometry = new THREE.TetrahedronGeometry(2, 0);
                    break;
                case 'octahedron':
                    geometry = new THREE.OctahedronGeometry(2, 1);
                    break;
                case 'icosahedron':
                    geometry = new THREE.IcosahedronGeometry(2, 0);
                    break;
                case 'dodecahedron':
                    geometry = new THREE.DodecahedronGeometry(2, 0);
                    break;
                case 'torus':
                    geometry = new THREE.TorusGeometry(2, 0.6, 8, config.geometryDetail);
                    break;
                case 'flower':
                    geometry = createFlowerOfLife(1.5);
                    break;
                case 'merkaba':
                    geometry = createMerkaba(2);
                    break;
                default:
                    geometry = new THREE.IcosahedronGeometry(2, 1);
            }

            // Advanced material with custom shader
            material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    colorA: { value: new THREE.Color(colors.gold) },
                    colorB: { value: new THREE.Color(colors.purple) },
                    layer: { value: layer },
                    index: { value: index },
                    phi: { value: PHI }
                },
                vertexShader: `
                    varying vec3 vPosition;
                    varying vec3 vNormal;
                    varying vec2 vUv;
                    uniform float time;
                    uniform float layer;
                    uniform float phi;
                    
                    void main() {
                        vPosition = position;
                        vNormal = normal;
                        vUv = uv;
                        
                        vec3 pos = position;
                        
                        // Golden ratio-based vertex displacement
                        float displacement = sin(pos.x * phi + time) * 
                                           cos(pos.y * phi + time) * 
                                           sin(pos.z * phi + time) * 0.1;
                        
                        pos += normal * displacement;
                        
                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec3 colorA;
                    uniform vec3 colorB;
                    uniform float layer;
                    uniform float index;
                    uniform float phi;
                    
                    varying vec3 vPosition;
                    varying vec3 vNormal;
                    varying vec2 vUv;
                    
                    void main() {
                        // Sacred geometry color patterns
                        float pattern = sin(vPosition.x * phi) * 
                                       cos(vPosition.y * phi) * 
                                       sin(time + layer);
                        
                        vec3 color = mix(colorA, colorB, pattern * 0.5 + 0.5);
                        
                        // Add golden ratio-based brightness modulation
                        float brightness = (sin(time * phi + index) + 1.0) * 0.5;
                        color *= brightness * 0.5 + 0.7;
                        
                        // Fresnel effect for mystical glow
                        float fresnel = pow(1.0 - dot(vNormal, vec3(0, 0, 1)), 2.0);
                        color += fresnel * vec3(1.0, 0.8, 0.0) * 0.3;
                        
                        gl_FragColor = vec4(color, 0.8);
                    }
                `,
                transparent: true,
                side: THREE.DoubleSide
            });

            return new THREE.Mesh(geometry, material);
        };

        // Create Flower of Life geometry
        const createFlowerOfLife = (radius) => {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const indices = [];

            // Create 7 overlapping circles (Flower of Life pattern)
            const circles = 7;
            const segments = config.geometryDetail;

            for (let circle = 0; circle < circles; circle++) {
                const angle = (circle / 6) * Math.PI * 2; // 6 outer circles + 1 center
                const centerX = circle === 0 ? 0 : Math.cos(angle) * radius;
                const centerY = circle === 0 ? 0 : Math.sin(angle) * radius;

                for (let i = 0; i <= segments; i++) {
                    const segmentAngle = (i / segments) * Math.PI * 2;
                    const x = centerX + Math.cos(segmentAngle) * radius * 0.6;
                    const y = centerY + Math.sin(segmentAngle) * radius * 0.6;
                    const z = Math.sin(segmentAngle * 3) * 0.1; // Slight 3D effect

                    vertices.push(x, y, z);
                }
            }

            // Generate indices for wireframe
            for (let circle = 0; circle < circles; circle++) {
                for (let i = 0; i < segments; i++) {
                    const base = circle * (segments + 1);
                    indices.push(base + i, base + i + 1);
                }
            }

            geometry.setFromPoints(vertices.map((_, i) => {
                if (i % 3 === 0) {
                    return new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
                }
            }).filter(Boolean));

            return geometry;
        };

        // Create Merkaba (3D Star of David) geometry
        const createMerkaba = (size) => {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];

            // Two intersecting tetrahedra
            const tetrahedronVertices = [
                [0, size, 0], [size, -size, size], [-size, -size, size], [0, -size, -size], // First tetrahedron
                [0, -size, 0], [size, size, -size], [-size, size, -size], [0, size, size]   // Second tetrahedron (inverted)
            ];

            tetrahedronVertices.forEach(vertex => {
                vertices.push(...vertex);
            });

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.computeVertexNormals();

            return geometry;
        };

        // Particle system for mystical atmosphere
        const createMysticalParticles = () => {
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = config.particleCount;

            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            const colorArray = [colors.gold, colors.purple, colors.cyan, colors.magenta];

            for (let i = 0; i < particleCount; i++) {
                // Spherical distribution
                const radius = 30 + Math.random() * 70;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);

                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = radius * Math.cos(phi);

                // Color based on position
                const color = new THREE.Color(colorArray[i % colorArray.length]);
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;

                sizes[i] = Math.random() * 2 + 0.5;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const particleMaterial = new THREE.ShaderMaterial({
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
                        
                        float pulsation = sin(time * 2.0 + position.x * 0.1) * 0.5 + 1.0;
                        gl_PointSize = size * pixelRatio * pulsation * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    
                    void main() {
                        float dist = distance(gl_PointCoord, vec2(0.5));
                        if (dist > 0.5) discard;
                        
                        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                        gl_FragColor = vec4(vColor, alpha * 0.8);
                    }
                `,
                transparent: true,
                vertexColors: true,
                depthWrite: false
            });

            const particles = new THREE.Points(particleGeometry, particleMaterial);
            return { particles, material: particleMaterial };
        };

        // Initialize scene elements
        const mandala = createFractalMandala();
        const mysticalParticles = createMysticalParticles();

        scene.add(mandala.group);
        scene.add(mysticalParticles.particles);

        // Lighting for mystical atmosphere
        const ambientLight = new THREE.AmbientLight(0x222244, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(colors.gold, 1, 100);
        pointLight.position.