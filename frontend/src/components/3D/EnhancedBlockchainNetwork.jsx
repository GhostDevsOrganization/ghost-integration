import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

export default function EnhancedBlockchainNetwork({ performanceMode = 'high' }) {
    const canvasRef = useRef(null);
    const { themeData } = useTheme();

    useEffect(() => {
        if (!canvasRef.current) return;

        // Performance settings based on mode
        const performanceSettings = {
            high: { nodeCount: 40, particleCount: 300, connectionDistance: 30 },
            medium: { nodeCount: 25, particleCount: 200, connectionDistance: 25 },
            low: { nodeCount: 15, particleCount: 100, connectionDistance: 20 }
        };

        const settings = performanceSettings[performanceMode] || performanceSettings.high;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0a0a0a, 50, 150);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: performanceMode === 'high'
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'high' ? 2 : 1));
        camera.position.z = 80;
        camera.position.y = 10;
        camera.lookAt(0, 0, 0);

        // Extract theme colors
        const primaryColor = new THREE.Color(themeData.colors.accentPrimary);
        const secondaryColor = new THREE.Color(themeData.colors.accentSecondary);
        const textColor = new THREE.Color(themeData.colors.textPrimary);
        const bgColor = new THREE.Color(themeData.colors.primaryBackground);

        // Lighting with theme colors
        const ambientLight = new THREE.AmbientLight(primaryColor.getHex(), 0.3);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(primaryColor.getHex(), 1.5, 150);
        pointLight1.position.set(50, 50, 50);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(secondaryColor.getHex(), 1.2, 120);
        pointLight2.position.set(-50, -50, 30);
        scene.add(pointLight2);

        // Create central logo group
        const logoGroup = new THREE.Group();

        // Create hexagon geometry for logo base
        const hexRadius = 8;
        const hexShape = new THREE.Shape();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
            const x = Math.cos(angle) * hexRadius;
            const y = Math.sin(angle) * hexRadius;
            if (i === 0) {
                hexShape.moveTo(x, y);
            } else {
                hexShape.lineTo(x, y);
            }
        }
        hexShape.closePath();

        // Logo hexagon with theme-aware gradient effect
        const hexGeometry = new THREE.ShapeGeometry(hexShape);
        const hexMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: primaryColor.clone() },
                color2: { value: secondaryColor.clone() }
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          vec3 color = mix(color1, color2, vUv.y + sin(time) * 0.1);
          gl_FragColor = vec4(color, 0.15);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide
        });
        const hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);
        logoGroup.add(hexMesh);

        // Create glowing hexagon border with theme color
        const hexBorderGeometry = new THREE.EdgesGeometry(hexGeometry);
        const hexBorderMaterial = new THREE.LineBasicMaterial({
            color: secondaryColor.getHex(),
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });
        const hexBorder = new THREE.LineSegments(hexBorderGeometry, hexBorderMaterial);
        logoGroup.add(hexBorder);

        // Create swirl inside logo with theme colors
        const swirlGroup = new THREE.Group();
        const swirlSegments = performanceMode === 'high' ? 5 : 3;
        for (let i = 0; i < swirlSegments; i++) {
            const curve = new THREE.CubicBezierCurve3(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(2, 1, 0).multiplyScalar(i * 0.3),
                new THREE.Vector3(-1, 2, 0).multiplyScalar(i * 0.3),
                new THREE.Vector3(-3, 0, 0).multiplyScalar(i * 0.3)
            );

            const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.2 - i * 0.03, 8, false);
            const hue = (primaryColor.getHSL({}).h + i * 0.1) % 1;
            const swirlColor = new THREE.Color().setHSL(hue, 1, 0.5);
            const tubeMaterial = new THREE.MeshBasicMaterial({
                color: swirlColor,
                transparent: true,
                opacity: 0.8 - i * 0.1
            });
            const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
            tube.rotation.z = (i * Math.PI * 2) / swirlSegments;
            swirlGroup.add(tube);
        }
        swirlGroup.scale.set(1.5, 1.5, 1.5);
        logoGroup.add(swirlGroup);

        scene.add(logoGroup);

        // Network nodes with theme colors
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: secondaryColor.getHex(),
            emissive: primaryColor.getHex(),
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });

        // Create nodes in orbital rings
        for (let i = 0; i < settings.nodeCount; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());

            // Position nodes in multiple orbital rings
            const ring = Math.floor(i / 8);
            const angle = (i % 8) * Math.PI * 0.25;
            const radius = 25 + ring * 15;

            node.position.x = Math.cos(angle) * radius;
            node.position.z = Math.sin(angle) * radius;
            node.position.y = (Math.random() - 0.5) * 20;

            node.userData = {
                basePosition: node.position.clone(),
                orbitSpeed: 0.001 + Math.random() * 0.002,
                floatSpeed: Math.random() * 0.005,
                floatOffset: Math.random() * Math.PI * 2,
                pulseSpeed: 1 + Math.random() * 2,
                pulseOffset: Math.random() * Math.PI * 2
            };

            nodes.push(node);
            scene.add(node);
        }

        // Create connections between nodes with theme colors
        const connections = [];
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: primaryColor.getHex(),
            transparent: true,
            opacity: 0.3
        });

        // Connect nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].position.distanceTo(nodes[j].position);
                if (distance < settings.connectionDistance) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        nodes[i].position,
                        nodes[j].position
                    ]);
                    const connection = new THREE.Line(geometry, connectionMaterial.clone());
                    connection.userData = {
                        node1: nodes[i],
                        node2: nodes[j],
                        baseOpacity: 0.1 + Math.random() * 0.2
                    };
                    connections.push(connection);
                    scene.add(connection);
                }
            }
        }

        // Data packets traveling along connections with theme colors
        const packets = [];
        const packetGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const packetMaterial = new THREE.MeshBasicMaterial({
            color: textColor.getHex(),
            emissive: textColor.getHex(),
            emissiveIntensity: 2
        });

        // Create packets
        connections.forEach((connection, index) => {
            if (index % 3 === 0) { // Only some connections have packets
                const packet = new THREE.Mesh(packetGeometry, packetMaterial.clone());
                packet.userData = {
                    connection: connection,
                    progress: Math.random(),
                    speed: 0.005 + Math.random() * 0.01,
                    direction: Math.random() > 0.5 ? 1 : -1
                };
                packets.push(packet);
                scene.add(packet);
            }
        });

        // Particle field with theme colors
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(settings.particleCount * 3);
        const particleColors = new Float32Array(settings.particleCount * 3);
        const particleSizes = new Float32Array(settings.particleCount);

        for (let i = 0; i < settings.particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 150;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 150;
            particleSizes[i] = Math.random() * 2;

            // Use theme colors for particles
            const useSecondary = Math.random() > 0.5;
            const color = useSecondary ? secondaryColor : primaryColor;
            particleColors[i * 3] = color.r;
            particleColors[i * 3 + 1] = color.g;
            particleColors[i * 3 + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 1,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        let hoveredNode = null;

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            // Update logo
            logoGroup.rotation.y = Math.sin(time * 0.5) * 0.1;
            logoGroup.rotation.z = time * 0.1;
            swirlGroup.rotation.z = -time * 0.5;
            hexMaterial.uniforms.time.value = time;

            // Update logo glow with theme colors
            const glowIntensity = 0.8 + Math.sin(time * 2) * 0.2;
            hexBorderMaterial.opacity = glowIntensity;

            // Check for mouse hover on nodes
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(nodes);

            if (intersects.length > 0) {
                if (hoveredNode !== intersects[0].object) {
                    if (hoveredNode) hoveredNode.scale.set(1, 1, 1);
                    hoveredNode = intersects[0].object;
                    hoveredNode.scale.set(1.5, 1.5, 1.5);
                }
            } else if (hoveredNode) {
                hoveredNode.scale.set(1, 1, 1);
                hoveredNode = null;
            }

            // Update nodes
            nodes.forEach((node) => {
                const userData = node.userData;

                // Orbital motion
                const angle = userData.orbitSpeed * time;
                const radius = userData.basePosition.length();
                node.position.x = Math.cos(angle) * radius;
                node.position.z = Math.sin(angle) * radius;

                // Floating motion
                node.position.y = userData.basePosition.y +
                    Math.sin(time * userData.floatSpeed + userData.floatOffset) * 3;

                // Pulse effect
                const pulse = 0.8 + Math.sin(time * userData.pulseSpeed + userData.pulseOffset) * 0.2;
                node.material.emissiveIntensity = pulse;

                // Distance-based opacity
                const distanceFromCenter = node.position.length();
                node.material.opacity = 0.8 - (distanceFromCenter / 100) * 0.5;
            });

            // Update connections
            connections.forEach((connection) => {
                const node1 = connection.userData.node1;
                const node2 = connection.userData.node2;

                connection.geometry.setFromPoints([node1.position, node2.position]);

                // Pulse connection opacity
                const pulseOpacity = connection.userData.baseOpacity +
                    Math.sin(time * 3) * 0.1;
                connection.material.opacity = pulseOpacity;
            });

            // Update packets
            packets.forEach((packet) => {
                const { connection, progress, speed, direction } = packet.userData;
                const node1 = connection.userData.node1;
                const node2 = connection.userData.node2;

                // Update progress
                packet.userData.progress += speed * direction;

                // Reverse direction at ends
                if (packet.userData.progress > 1 || packet.userData.progress < 0) {
                    packet.userData.direction *= -1;
                    packet.userData.progress = Math.max(0, Math.min(1, packet.userData.progress));
                }

                // Position packet along connection
                packet.position.lerpVectors(
                    node1.position,
                    node2.position,
                    packet.userData.progress
                );

                // Glow effect
                const glow = 0.5 + Math.sin(time * 10) * 0.5;
                packet.material.opacity = glow;
            });

            // Update particles
            const particlePositionsArray = particles.geometry.attributes.position.array;
            for (let i = 0; i < settings.particleCount; i++) {
                particlePositionsArray[i * 3 + 1] += Math.sin(time + i) * 0.01;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Camera movement
            camera.position.x = Math.sin(time * 0.1) * 10;
            camera.position.y = 10 + Math.sin(time * 0.15) * 5;
            camera.lookAt(0, 0, 0);

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

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            scene.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        };
    }, [themeData, performanceMode]);

    return (
        <div className="fixed inset-0 -z-10" style={{ backgroundColor: themeData.colors.primaryBackground }}>
            <canvas ref={canvasRef} className="w-full h-full" />
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: `linear-gradient(to bottom, transparent, ${themeData.colors.accentPrimary}20, ${themeData.colors.accentSecondary}10)`
                }}
            />
        </div>
    );
}
