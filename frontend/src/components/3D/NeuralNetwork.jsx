import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralNetwork({ themeData, performanceMode = 'high' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode === 'high' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(performanceMode === 'high' ? window.devicePixelRatio : 1);
        mountRef.current.appendChild(renderer.domElement);

        // Neural network structure
        const layers = performanceMode === 'high' ? 5 : 3;
        const nodesPerLayer = performanceMode === 'high' ? [8, 12, 16, 12, 8] : [6, 10, 6];
        const neurons = [];
        const connections = [];

        // Create neurons
        for (let layerIndex = 0; layerIndex < layers; layerIndex++) {
            const layerNeurons = [];
            const nodeCount = nodesPerLayer[layerIndex];
            const layerSpacing = 15;
            const layerX = (layerIndex - (layers - 1) / 2) * layerSpacing;

            for (let i = 0; i < nodeCount; i++) {
                const nodeSpacing = 5;
                const nodeY = (i - (nodeCount - 1) / 2) * nodeSpacing;

                // Neuron core
                const neuronGeometry = new THREE.SphereGeometry(1, 16, 16);
                const neuronMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(themeData.colors.accentPrimary),
                    transparent: true,
                    opacity: 0.8
                });
                const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
                neuron.position.set(layerX, nodeY, 0);

                // Neuron glow
                const glowGeometry = new THREE.SphereGeometry(1.5, 16, 16);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(themeData.colors.accentSecondary),
                    transparent: true,
                    opacity: 0.2
                });
                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                neuron.add(glow);

                neuron.userData = {
                    activation: Math.random(),
                    phase: Math.random() * Math.PI * 2,
                    layer: layerIndex,
                    index: i,
                    glow: glow
                };

                scene.add(neuron);
                layerNeurons.push(neuron);
            }
            neurons.push(layerNeurons);
        }

        // Create synaptic connections
        for (let l = 0; l < neurons.length - 1; l++) {
            const currentLayer = neurons[l];
            const nextLayer = neurons[l + 1];

            currentLayer.forEach((neuron1, i) => {
                nextLayer.forEach((neuron2, j) => {
                    // Create connection with probability based on distance
                    const distance = neuron1.position.distanceTo(neuron2.position);
                    const connectionProbability = performanceMode === 'high' ? 0.6 : 0.4;

                    if (Math.random() < connectionProbability) {
                        const points = [neuron1.position, neuron2.position];
                        const geometry = new THREE.BufferGeometry().setFromPoints(points);
                        const material = new THREE.LineBasicMaterial({
                            color: new THREE.Color(themeData.colors.accentSecondary),
                            transparent: true,
                            opacity: 0.2
                        });
                        const connection = new THREE.Line(geometry, material);

                        connection.userData = {
                            source: neuron1,
                            target: neuron2,
                            weight: Math.random(),
                            signal: 0,
                            signalProgress: 0
                        };

                        scene.add(connection);
                        connections.push(connection);
                    }
                });
            });
        }

        // Signal particles
        const signals = [];
        const signalGeometry = new THREE.SphereGeometry(0.3, 8, 8);

        // Background particles
        const bgParticleCount = performanceMode === 'high' ? 500 : 250;
        const bgGeometry = new THREE.BufferGeometry();
        const bgPositions = new Float32Array(bgParticleCount * 3);

        for (let i = 0; i < bgParticleCount; i++) {
            bgPositions[i * 3] = (Math.random() - 0.5) * 100;
            bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }

        bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

        const bgMaterial = new THREE.PointsMaterial({
            size: 0.5,
            color: new THREE.Color(themeData.colors.accentPrimary),
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
        scene.add(bgParticles);

        // Create signal pulse
        function createSignal(connection) {
            const signalMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(themeData.colors.accentPrimary),
                transparent: true,
                opacity: 0.8
            });
            const signal = new THREE.Mesh(signalGeometry, signalMaterial);
            signal.userData = {
                connection: connection,
                progress: 0,
                speed: 0.02 + Math.random() * 0.02
            };
            scene.add(signal);
            signals.push(signal);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Animate neurons
            neurons.forEach(layer => {
                layer.forEach(neuron => {
                    // Activation pulsing
                    const activation = 0.5 + Math.sin(time * 2 + neuron.userData.phase) * 0.5;
                    neuron.userData.activation = activation;

                    // Update neuron appearance based on activation
                    neuron.material.opacity = 0.4 + activation * 0.6;
                    neuron.scale.setScalar(0.8 + activation * 0.4);

                    // Glow effect
                    neuron.userData.glow.scale.setScalar(1 + activation * 0.5);
                    neuron.userData.glow.material.opacity = activation * 0.3;

                    // Slight movement
                    neuron.position.y += Math.sin(time + neuron.userData.phase) * 0.01;
                });
            });

            // Update connections based on neuron activations
            connections.forEach(connection => {
                const sourceActivation = connection.userData.source.userData.activation;
                const targetActivation = connection.userData.target.userData.activation;
                const signal = sourceActivation * targetActivation * connection.userData.weight;

                connection.material.opacity = 0.1 + signal * 0.4;

                // Create new signals occasionally
                if (Math.random() < 0.01 && signal > 0.5 && signals.length < 50) {
                    createSignal(connection);
                }
            });

            // Animate signals
            signals.forEach((signal, index) => {
                signal.userData.progress += signal.userData.speed;

                if (signal.userData.progress >= 1) {
                    // Remove completed signal
                    scene.remove(signal);
                    signals.splice(index, 1);
                } else {
                    // Update signal position along connection
                    const source = signal.userData.connection.userData.source.position;
                    const target = signal.userData.connection.userData.target.position;
                    const t = signal.userData.progress;

                    signal.position.lerpVectors(source, target, t);

                    // Fade in/out
                    if (t < 0.1) {
                        signal.material.opacity = t * 8;
                    } else if (t > 0.9) {
                        signal.material.opacity = (1 - t) * 8;
                    } else {
                        signal.material.opacity = 0.8;
                    }

                    // Signal glow
                    const scale = 1 + Math.sin(time * 10) * 0.3;
                    signal.scale.setScalar(scale);
                }
            });

            // Rotate background particles
            bgParticles.rotation.y += 0.0002;
            bgParticles.rotation.x += 0.0001;

            // Camera movement
            camera.position.x = Math.sin(time * 0.1) * 10;
            camera.position.y = Math.cos(time * 0.15) * 5;
            camera.lookAt(scene.position);

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
