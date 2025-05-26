import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AdvancedBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create multiple geometric shapes
        const geometries = [
            new THREE.IcosahedronGeometry(15, 0),
            new THREE.OctahedronGeometry(12, 0),
            new THREE.TetrahedronGeometry(10, 0),
            new THREE.DodecahedronGeometry(8, 0)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({
                color: 0x14B8A6,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            }),
            new THREE.MeshBasicMaterial({
                color: 0x8B5CF6,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            }),
            new THREE.MeshBasicMaterial({
                color: 0xF59E0B,
                wireframe: true,
                transparent: true,
                opacity: 0.35
            }),
            new THREE.MeshBasicMaterial({
                color: 0xEF4444,
                wireframe: true,
                transparent: true,
                opacity: 0.25
            })
        ];

        const meshes = [];

        // Create floating geometric shapes
        for (let i = 0; i < 8; i++) {
            const geometry = geometries[i % geometries.length];
            const material = materials[i % materials.length];
            const mesh = new THREE.Mesh(geometry, material);

            // Random positioning
            mesh.position.x = (Math.random() - 0.5) * 200;
            mesh.position.y = (Math.random() - 0.5) * 200;
            mesh.position.z = (Math.random() - 0.5) * 100;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;

            scene.add(mesh);
            meshes.push(mesh);
        }

        // Create connecting lines between shapes
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = [];

        for (let i = 0; i < meshes.length; i++) {
            for (let j = i + 1; j < meshes.length; j++) {
                const distance = meshes[i].position.distanceTo(meshes[j].position);
                if (distance < 80) {
                    linePositions.push(
                        meshes[i].position.x, meshes[i].position.y, meshes[i].position.z,
                        meshes[j].position.x, meshes[j].position.y, meshes[j].position.z
                    );
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x14B8A6,
            transparent: true,
            opacity: 0.2
        });

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Create particle field
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color(0x14B8A6), // Teal
            new THREE.Color(0x8B5CF6), // Purple
            new THREE.Color(0xF59E0B), // Amber
            new THREE.Color(0xEF4444)  // Red
        ];

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 300;
            positions[i + 1] = (Math.random() - 0.5) * 300;
            positions[i + 2] = (Math.random() - 0.5) * 150;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 3,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Animate geometric shapes
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);
                mesh.rotation.y += 0.015 * (index % 3 === 0 ? 1 : -1);
                mesh.rotation.z += 0.008 * (index % 4 === 0 ? 1 : -1);

                // Floating motion
                mesh.position.y += Math.sin(time + index) * 0.1;
                mesh.position.x += Math.cos(time * 0.5 + index) * 0.05;
            });

            // Animate particles
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;

            // Update particle positions for floating effect
            const positions = particles.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] += Math.sin(time + i) * 0.02;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Update connecting lines
            const linePositions = lines.geometry.attributes.position.array;
            let lineIndex = 0;
            for (let i = 0; i < meshes.length; i++) {
                for (let j = i + 1; j < meshes.length; j++) {
                    const distance = meshes[i].position.distanceTo(meshes[j].position);
                    if (distance < 80 && lineIndex < linePositions.length) {
                        linePositions[lineIndex] = meshes[i].position.x;
                        linePositions[lineIndex + 1] = meshes[i].position.y;
                        linePositions[lineIndex + 2] = meshes[i].position.z;
                        linePositions[lineIndex + 3] = meshes[j].position.x;
                        linePositions[lineIndex + 4] = meshes[j].position.y;
                        linePositions[lineIndex + 5] = meshes[j].position.z;
                        lineIndex += 6;
                    }
                }
            }
            lines.geometry.attributes.position.needsUpdate = true;

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
            geometries.forEach(geometry => geometry.dispose());
            materials.forEach(material => material.dispose());
            lineGeometry.dispose();
            lineMaterial.dispose();
            particleGeometry.dispose();
            particleMaterial.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" style={{ zIndex: 0 }} />;
}
