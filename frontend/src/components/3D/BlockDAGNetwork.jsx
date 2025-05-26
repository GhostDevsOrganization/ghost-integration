import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BlockDAGNetwork({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(themeData.colors.primaryBackground), 0.8);
        mountRef.current.appendChild(renderer.domElement);

        // Simple BlockDAG visualization
        const nodes = [];
        for (let i = 0; i < 50; i++) {
            const geometry = new THREE.SphereGeometry(0.1, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary)
            });
            const node = new THREE.Mesh(geometry, material);

            node.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );

            scene.add(node);
            nodes.push(node);
        }

        camera.position.z = 15;

        const animate = () => {
            nodes.forEach(node => {
                node.rotation.x += 0.01;
                node.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [themeData, performanceMode]);

    return <div ref={mountRef} className="absolute inset-0" />;
}
