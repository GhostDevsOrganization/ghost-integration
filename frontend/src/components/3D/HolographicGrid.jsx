import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HolographicGrid({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    // Define default colors that will always work
    const defaultColors = {
        accentPrimary: '#00D632',
        accentSecondary: '#009986',
        primaryBackground: '#ffffff'
    };

    useEffect(() => {
        if (!mountRef.current) return;

        // Use default colors if themeData is not available
        const colors = themeData?.colors ? {
            accentPrimary: themeData.colors.accentPrimary || defaultColors.accentPrimary,
            accentSecondary: themeData.colors.accentSecondary || defaultColors.accentSecondary,
            primaryBackground: themeData.colors.primaryBackground || defaultColors.primaryBackground
        } : defaultColors;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 50, 200);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 25, 50);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode === 'high' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? window.devicePixelRatio : 1);
        mountRef.current.appendChild(renderer.domElement);

        // Create holographic grid floor with safe colors
        const gridSize = performanceMode === 'high' ? 100 : 50;
        const divisions = performanceMode === 'high' ? 50 : 25;

        const gridHelper = new THREE.GridHelper(gridSize, divisions,
            new THREE.Color(colors.accentPrimary),
            new THREE.Color(colors.accentSecondary)
        );
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Create vertical grid walls with safe colors
        const wallGrid1 = new THREE.GridHelper(gridSize, divisions,
            new THREE.Color(colors.accentPrimary),
            new THREE.Color(colors.accentSecondary)
        );
        wallGrid1.rotation.x = Math.PI / 2;
        wallGrid1.position.z = -gridSize / 2;
        wallGrid1.material.opacity = 0.2;
        wallGrid1.material.transparent = true;
        scene.add(wallGrid1);

        const wallGrid2 = new THREE.GridHelper(gridSize, divisions,
            new THREE.Color(colors.accentPrimary),
            new THREE.Color(colors.accentSecondary)
        );
        wallGrid2.rotation.z = Math.PI / 2;
        wallGrid2.position.x = -gridSize / 2;
        wallGrid2.material.opacity = 0.2;
        wallGrid2.material.transparent = true;
        scene.add(wallGrid2);

        // Create glowing scan lines
        const scanLines = [];
        for (let i = 0; i < 3; i++) {
            const scanGeometry = new THREE.PlaneGeometry(gridSize, 0.5);
            const scanMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const scanLine = new THREE.Mesh(scanGeometry, scanMaterial);
            scanLine.rotation.x = Math.PI / 2;
            scanLine.position.y = 0.1;
            scanLine.userData = {
                speed: 0.5 + Math.random() * 0.5,
                direction: i % 2 === 0 ? 1 : -1
            };
            scene.add(scanLine);
            scanLines.push(scanLine);
        }

        // Create holographic pillars
        const pillars = [];
        const pillarCount = performanceMode === 'high' ? 10 : 5;

        for (let i = 0; i < pillarCount; i++) {
            const height = 10 + Math.random() * 20;
            const pillarGeometry = new THREE.BoxGeometry(2, height, 2);
            const pillarMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentSecondary),
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });
            const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);

            pillar.position.set(
                (Math.random() - 0.5) * gridSize * 0.8,
                height / 2,
                (Math.random() - 0.5) * gridSize * 0.8
            );

            pillar.userData = {
                baseHeight: height,
                phase: Math.random() * Math.PI * 2,
                glowIntensity: Math.random()
            };

            scene.add(pillar);
            pillars.push(pillar);
        }

        // Create data streams
        const dataStreams = [];
        const streamCount = performanceMode === 'high' ? 20 : 10;

        for (let i = 0; i < streamCount; i++) {
            const streamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 20);
            const streamMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.6
            });
            const stream = new THREE.Mesh(streamGeometry, streamMaterial);

            stream.position.set(
                (Math.random() - 0.5) * gridSize,
                10,
                (Math.random() - 0.5) * gridSize
            );

            stream.userData = {
                speed: 0.1 + Math.random() * 0.2,
                startY: 20 + Math.random() * 10,
                endY: -5
            };

            scene.add(stream);
            dataStreams.push(stream);
        }

        // Create floating holo-panels
        const panels = [];
        const panelCount = performanceMode === 'high' ? 8 : 4;

        for (let i = 0; i < panelCount; i++) {
            const panelGeometry = new THREE.PlaneGeometry(5, 3);
            const panelMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentSecondary),
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide
            });
            const panel = new THREE.Mesh(panelGeometry, panelMaterial);

            const angle = (i / panelCount) * Math.PI * 2;
            const radius = 20;
            panel.position.set(
                Math.cos(angle) * radius,
                10 + Math.sin(angle * 2) * 5,
                Math.sin(angle) * radius
            );
            panel.lookAt(0, panel.position.y, 0);

            panel.userData = {
                angle,
                radius,
                phase: Math.random() * Math.PI * 2
            };

            // Add wireframe overlay
            const wireframe = new THREE.Mesh(
                panelGeometry,
                new THREE.MeshBasicMaterial({
                    color: new THREE.Color(themeData.colors.accentPrimary),
                    wireframe: true,
                    transparent: true,
                    opacity: 0.4
                })
            );
            panel.add(wireframe);

            scene.add(panel);
            panels.push(panel);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Slower camera animation
            //camera.position.x = Math.sin(time * 0.002) * 2; // Reduced from 0.1 to 0.02, and 10 to 5
            //camera.position.z = 40 + Math.cos(time * 0.002) * 2; // Reduced movement
            camera.lookAt(0, 0, 0);

            // Animate scan lines
            scanLines.forEach((line, index) => {
                line.position.z += line.userData.speed * line.userData.direction;

                if (Math.abs(line.position.z) > gridSize / 2) {
                    line.position.z = -line.position.z;
                }

                // Fade effect at edges
                const fadeDistance = 10;
                const distFromEdge = gridSize / 2 - Math.abs(line.position.z);
                line.material.opacity = Math.min(0.8, distFromEdge / fadeDistance);
            });

            // Animate pillars
            pillars.forEach(pillar => {
                // Height pulsing
                const heightScale = 1 + Math.sin(time + pillar.userData.phase) * 0.1;
                pillar.scale.y = heightScale;
                pillar.position.y = (pillar.userData.baseHeight * heightScale) / 2;

                // Glow effect
                pillar.material.opacity = 0.2 + Math.sin(time * 2 + pillar.userData.phase) * 0.1 * pillar.userData.glowIntensity;
            });

            // Animate data streams
            dataStreams.forEach(stream => {
                stream.position.y -= stream.userData.speed;

                if (stream.position.y < stream.userData.endY) {
                    stream.position.y = stream.userData.startY;
                }

                // Fade in/out
                const fadeTop = 5;
                const fadeBottom = 5;
                const distFromTop = stream.userData.startY - stream.position.y;
                const distFromBottom = stream.position.y - stream.userData.endY;

                if (distFromTop < fadeTop) {
                    stream.material.opacity = (distFromTop / fadeTop) * 0.6;
                } else if (distFromBottom < fadeBottom) {
                    stream.material.opacity = (distFromBottom / fadeBottom) * 0.6;
                } else {
                    stream.material.opacity = 0.6;
                }
            });

            // Animate floating panels
            panels.forEach(panel => {
                panel.userData.angle += 0.002;
                const newAngle = panel.userData.angle;

                panel.position.x = Math.cos(newAngle) * panel.userData.radius;
                panel.position.z = Math.sin(newAngle) * panel.userData.radius;
                panel.position.y = 10 + Math.sin(time + panel.userData.phase) * 2;

                panel.lookAt(0, panel.position.y, 0);

                // Flicker effect
                if (Math.random() > 0.98) {
                    panel.material.opacity = 0.4;
                } else {
                    panel.material.opacity = 0.2;
                }
            });




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
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [themeData, performanceMode]);

    return <div ref={mountRef} className="absolute inset-0" />;
}
