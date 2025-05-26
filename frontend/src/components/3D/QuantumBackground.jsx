import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuantumBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create gradient mesh
        const geometry = new THREE.PlaneGeometry(50, 50, 100, 100);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                colorA: { value: new THREE.Color(0x14B8A6) }, // Teal to match your theme
                colorB: { value: new THREE.Color(0x8B5CF6) }  // Purple to match your theme
            },
            vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.3 + time) * 2.0;
          pos.z += cos(pos.y * 0.3 + time * 0.5) * 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        void main() {
          vec3 color = mix(colorA, colorB, vUv.y);
          gl_FragColor = vec4(color, 0.2);
        }
      `,
            transparent: true,
            wireframe: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 6;
        scene.add(mesh);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            material.uniforms.time.value += 0.01;
            mesh.rotation.z += 0.001;
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
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />;
}
