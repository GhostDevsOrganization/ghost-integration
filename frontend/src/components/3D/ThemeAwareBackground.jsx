import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

export default function ThemeAwareBackground({ animationType = 'advanced' }) {
    const canvasRef = useRef(null);
    const { themeData } = useTheme();

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Extract and enhance theme colors
        const primaryColor = new THREE.Color(themeData.colors.accentPrimary);
        const secondaryColor = new THREE.Color(themeData.colors.accentSecondary);
        const tertiaryColor = new THREE.Color(themeData.colors.textSecondary);

        // Create enhanced color palette with more vibrant variations
        const enhancedColors = [
            primaryColor.clone(),
            secondaryColor.clone(),
            tertiaryColor.clone(),
            primaryColor.clone().lerp(secondaryColor, 0.3),
            primaryColor.clone().lerp(secondaryColor, 0.7),
            primaryColor.clone().multiplyScalar(1.3),
            secondaryColor.clone().multiplyScalar(1.3),
            new THREE.Color().lerpColors(primaryColor, tertiaryColor, 0.5),
            primaryColor.clone().offsetHSL(0.1, 0.2, 0.1),
            secondaryColor.clone().offsetHSL(-0.1, 0.2, 0.1)
        ];

        // Add ambient lighting for better visibility
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);

        // Add dynamic point lights
        const pointLight1 = new THREE.PointLight(primaryColor.getHex(), 1.5, 150);
        pointLight1.position.set(50, 50, 50);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(secondaryColor.getHex(), 1.2, 120);
        pointLight2.position.set(-50, -50, 30);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(tertiaryColor.getHex(), 0.8, 100);
        pointLight3.position.set(0, 100, -50);
        scene.add(pointLight3);

        let meshes = [];
        let particles = null;
        let lines = null;
        let solidShapes = [];

        if (animationType === 'advanced') {
            camera.position.z = 100;

            // Create enhanced geometric shapes with more variety
            const geometries = [
                new THREE.IcosahedronGeometry(15, 1),
                new THREE.OctahedronGeometry(12, 0),
                new THREE.TetrahedronGeometry(10, 0),
                new THREE.DodecahedronGeometry(8, 0),
                new THREE.TorusGeometry(10, 4, 8, 16),
                new THREE.ConeGeometry(8, 16, 8),
                new THREE.SphereGeometry(12, 16, 16),
                new THREE.BoxGeometry(14, 14, 14)
            ];

            // Create mix of wireframe and solid materials with higher opacity
            const createMaterials = () => {
                const materials = [];
                enhancedColors.forEach((color, index) => {
                    // Wireframe materials with higher opacity
                    materials.push(new THREE.MeshBasicMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.7 + (index % 3) * 0.1
                    }));

                    // Solid materials with transparency and emissive glow
                    materials.push(new THREE.MeshLambertMaterial({
                        color: color,
                        transparent: true,
                        opacity: 0.4 + (index % 4) * 0.1,
                        emissive: color.clone().multiplyScalar(0.1)
                    }));
                });
                return materials;
            };

            const materials = createMaterials();

            // Create floating geometric shapes (increased count for more visual impact)
            for (let i = 0; i < 12; i++) {
                const geometry = geometries[i % geometries.length];
                const material = materials[i % materials.length];
                const mesh = new THREE.Mesh(geometry, material);

                // Enhanced positioning with more spread
                mesh.position.x = (Math.random() - 0.5) * 250;
                mesh.position.y = (Math.random() - 0.5) * 250;
                mesh.position.z = (Math.random() - 0.5) * 120;

                // Random rotation
                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                mesh.rotation.z = Math.random() * Math.PI;

                // Scale variation for visual interest
                const scale = 0.7 + Math.random() * 0.6;
                mesh.scale.setScalar(scale);

                scene.add(mesh);
                meshes.push(mesh);

                // Add some solid shapes for depth
                if (i % 3 === 0) {
                    const solidGeometry = new THREE.SphereGeometry(6 + Math.random() * 4, 16, 16);
                    const solidMaterial = new THREE.MeshLambertMaterial({
                        color: enhancedColors[i % enhancedColors.length],
                        transparent: true,
                        opacity: 0.3,
                        emissive: enhancedColors[i % enhancedColors.length].clone().multiplyScalar(0.2)
                    });
                    const solidMesh = new THREE.Mesh(solidGeometry, solidMaterial);

                    solidMesh.position.copy(mesh.position);
                    solidMesh.position.add(new THREE.Vector3(
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30
                    ));

                    scene.add(solidMesh);
                    solidShapes.push(solidMesh);
                }
            }

            // Enhanced connecting lines with better visibility
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions = [];
            const lineColors = [];

            for (let i = 0; i < meshes.length; i++) {
                for (let j = i + 1; j < meshes.length; j++) {
                    const distance = meshes[i].position.distanceTo(meshes[j].position);
                    if (distance < 100) {
                        linePositions.push(
                            meshes[i].position.x, meshes[i].position.y, meshes[i].position.z,
                            meshes[j].position.x, meshes[j].position.y, meshes[j].position.z
                        );

                        // Add color variation to lines
                        const lineColor = enhancedColors[i % enhancedColors.length];
                        lineColors.push(lineColor.r, lineColor.g, lineColor.b);
                        lineColors.push(lineColor.r, lineColor.g, lineColor.b);
                    }
                }
            }

            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

            const lineMaterial = new THREE.LineBasicMaterial({
                transparent: true,
                opacity: 0.5,
                vertexColors: true,
                blending: THREE.AdditiveBlending
            });

            lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lines);

            // Enhanced particle field with more colors and effects
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 300;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 400;
                positions[i3 + 1] = (Math.random() - 0.5) * 400;
                positions[i3 + 2] = (Math.random() - 0.5) * 200;

                const color = enhancedColors[Math.floor(Math.random() * enhancedColors.length)];
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;

                sizes[i] = 2 + Math.random() * 4;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const particleMaterial = new THREE.PointsMaterial({
                transparent: true,
                opacity: 0.8,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });

            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

        } else if (animationType === 'quantum') {
            camera.position.z = 50;

            // Enhanced quantum grid with better colors
            const geometry = new THREE.PlaneGeometry(100, 100, 60, 60);

            const material = new THREE.MeshLambertMaterial({
                color: primaryColor,
                wireframe: true,
                transparent: true,
                opacity: 0.8,
                emissive: primaryColor.clone().multiplyScalar(0.1)
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = -Math.PI / 4;
            scene.add(mesh);
            meshes.push(mesh);

            // Enhanced floating particles with theme colors
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 150;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 120;
                positions[i3 + 1] = (Math.random() - 0.5) * 120;
                positions[i3 + 2] = (Math.random() - 0.5) * 60;

                const color = enhancedColors[Math.floor(Math.random() * enhancedColors.length)];
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particleMaterial = new THREE.PointsMaterial({
                size: 5,
                transparent: true,
                opacity: 0.9,
                vertexColors: true,
                blending: THREE.AdditiveBlending
            });

            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);
        }

        // Enhanced animation loop with color pulsing
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Animate point lights for dynamic lighting
            pointLight1.position.x = Math.sin(time * 0.5) * 60;
            pointLight1.position.y = Math.cos(time * 0.3) * 60;
            pointLight2.position.x = Math.cos(time * 0.4) * 50;
            pointLight2.position.z = Math.sin(time * 0.6) * 40;

            if (animationType === 'advanced') {
                // Animate geometric shapes with enhanced motion
                meshes.forEach((mesh, index) => {
                    mesh.rotation.x += 0.012 * (index % 2 === 0 ? 1 : -1);
                    mesh.rotation.y += 0.018 * (index % 3 === 0 ? 1 : -1);
                    mesh.rotation.z += 0.01 * (index % 4 === 0 ? 1 : -1);

                    // Enhanced floating motion
                    mesh.position.y += Math.sin(time + index) * 0.15;
                    mesh.position.x += Math.cos(time * 0.7 + index) * 0.08;
                    mesh.position.z += Math.sin(time * 0.5 + index) * 0.05;

                    // Color pulsing effect
                    if (mesh.material.emissive) {
                        const intensity = 0.1 + Math.sin(time * 2 + index) * 0.05;
                        mesh.material.emissive.copy(mesh.material.color).multiplyScalar(intensity);
                    }
                });

                // Animate solid shapes
                solidShapes.forEach((shape, index) => {
                    shape.rotation.x += 0.008 * (index % 2 === 0 ? -1 : 1);
                    shape.rotation.y += 0.012 * (index % 3 === 0 ? -1 : 1);

                    // Floating motion
                    shape.position.y += Math.sin(time * 1.2 + index) * 0.1;
                    shape.position.x += Math.cos(time * 0.8 + index) * 0.06;

                    // Pulsing glow
                    const intensity = 0.2 + Math.sin(time * 3 + index) * 0.1;
                    shape.material.emissive.copy(shape.material.color).multiplyScalar(intensity);
                });

                // Enhanced particle animation
                if (particles) {
                    particles.rotation.y += 0.002;
                    particles.rotation.x += 0.001;

                    const positions = particles.geometry.attributes.position.array;
                    for (let i = 1; i < positions.length; i += 3) {
                        positions[i] += Math.sin(time + i) * 0.03;
                    }
                    particles.geometry.attributes.position.needsUpdate = true;
                }

                // Update connecting lines with enhanced colors
                if (lines) {
                    const linePositions = lines.geometry.attributes.position.array;
                    const lineColors = lines.geometry.attributes.color.array;
                    let lineIndex = 0;
                    let colorIndex = 0;

                    for (let i = 0; i < meshes.length; i++) {
                        for (let j = i + 1; j < meshes.length; j++) {
                            const distance = meshes[i].position.distanceTo(meshes[j].position);
                            if (distance < 100 && lineIndex < linePositions.length) {
                                linePositions[lineIndex] = meshes[i].position.x;
                                linePositions[lineIndex + 1] = meshes[i].position.y;
                                linePositions[lineIndex + 2] = meshes[i].position.z;
                                linePositions[lineIndex + 3] = meshes[j].position.x;
                                linePositions[lineIndex + 4] = meshes[j].position.y;
                                linePositions[lineIndex + 5] = meshes[j].position.z;

                                // Animate line colors
                                const colorIntensity = 0.5 + Math.sin(time * 2 + i + j) * 0.3;
                                const baseColor = enhancedColors[i % enhancedColors.length];
                                lineColors[colorIndex] = baseColor.r * colorIntensity;
                                lineColors[colorIndex + 1] = baseColor.g * colorIntensity;
                                lineColors[colorIndex + 2] = baseColor.b * colorIntensity;
                                lineColors[colorIndex + 3] = baseColor.r * colorIntensity;
                                lineColors[colorIndex + 4] = baseColor.g * colorIntensity;
                                lineColors[colorIndex + 5] = baseColor.b * colorIntensity;

                                lineIndex += 6;
                                colorIndex += 6;
                            }
                        }
                    }
                    lines.geometry.attributes.position.needsUpdate = true;
                    lines.geometry.attributes.color.needsUpdate = true;
                }

            } else if (animationType === 'quantum') {
                // Enhanced quantum animation
                meshes[0].rotation.z += 0.008;

                // Animate particles with wave motion
                if (particles) {
                    particles.rotation.y += 0.003;

                    const positions = particles.geometry.attributes.position.array;
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.5;
                        positions[i + 2] += Math.cos(time + positions[i] * 0.01) * 0.3;
                    }
                    particles.geometry.attributes.position.needsUpdate = true;
                }

                // Enhanced wave effect with color variation
                const positions = meshes[0].geometry.attributes.position;
                for (let i = 0; i < positions.count; i++) {
                    const x = positions.getX(i);
                    const y = positions.getY(i);
                    const z = Math.sin(x * 0.1 + time) * 3 + Math.cos(y * 0.1 + time) * 3;
                    positions.setZ(i, z);
                }
                positions.needsUpdate = true;

                // Pulse the grid color
                const intensity = 0.1 + Math.sin(time * 2) * 0.05;
                meshes[0].material.emissive.copy(meshes[0].material.color).multiplyScalar(intensity);
            }

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
    }, [themeData, animationType]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-75"
            style={{ zIndex: 0 }}
        />
    );
}
