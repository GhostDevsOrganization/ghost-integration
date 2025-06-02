import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StarfieldBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create star geometry
        const starCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < starCount; i++) {
            const x = THREE.MathUtils.randFloatSpread(600);
            const y = THREE.MathUtils.randFloatSpread(600);
            const z = THREE.MathUtils.randFloatSpread(600);
            vertices.push(x, y, z);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1,
            transparent: true,
            opacity: 0.8
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        const animate = () => {
            requestAnimationFrame(animate);
            // Subtle rotation to add movement
            stars.rotation.x += 0.0005;
            stars.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
}