import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Brain } from "lucide-react";

const Neural3DBackground = ({
    className,
    nodeCount = 80,
    particleCount = 120,
    connectionDistance = 150,
    nodeSpeed = 0.5,
    particleSpeed = 2,
    children,
    themeData
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(0);
    const nodesRef = useRef([]);
    const particlesRef = useRef([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [initialized, setInitialized] = useState(false);

    // Initialize nodes and particles
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        setDimensions({ width, height });

        // Initialize nodes
        const nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 500 - 250, // z-depth for 3D effect
                radius: Math.random() * 3 + 2,
                color: `rgba(${30 + Math.random() * 50}, ${180 + Math.random() * 75}, ${220 + Math.random() * 35}, ${0.7 + Math.random() * 0.3})`,
                vx: (Math.random() - 0.5) * nodeSpeed,
                vy: (Math.random() - 0.5) * nodeSpeed,
                vz: (Math.random() - 0.5) * nodeSpeed * 0.5,
                connections: [],
                opacity: 0.2 + Math.random() * 0.8
            });
        }

        // Initialize particles
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const sourceIndex = Math.floor(Math.random() * nodeCount);
            let targetIndex;
            do {
                targetIndex = Math.floor(Math.random() * nodeCount);
            } while (targetIndex === sourceIndex);

            particles.push({
                x: nodes[sourceIndex].x,
                y: nodes[sourceIndex].y,
                z: nodes[sourceIndex].z,
                targetIndex,
                progress: 0,
                speed: 0.5 + Math.random() * particleSpeed,
                color: `rgba(${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${220 + Math.random() * 35}, ${0.6 + Math.random() * 0.4})`,
                opacity: 0.4 + Math.random() * 0.6
            });
        }

        nodesRef.current = nodes;
        particlesRef.current = particles;
        setInitialized(true);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [nodeCount, particleCount, nodeSpeed, particleSpeed]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            const container = canvas.parentElement;
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            canvas.width = width;
            canvas.height = height;
            setDimensions({ width, height });

            // Reposition nodes proportionally
            if (nodesRef.current.length > 0) {
                const oldWidth = dimensions.width || width;
                const oldHeight = dimensions.height || height;

                nodesRef.current.forEach(node => {
                    node.x = (node.x / oldWidth) * width;
                    node.y = (node.y / oldHeight) * height;
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Animation loop
    useEffect(() => {
        if (!canvasRef.current || !initialized) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const animate = () => {
            if (!ctx) return;

            // Clear canvas with a semi-transparent background for motion blur effect
            ctx.fillStyle = 'rgba(0, 10, 30, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update node positions and find connections
            nodesRef.current.forEach((node, index) => {
                // Move nodes
                node.x += node.vx;
                node.y += node.vy;
                node.z += node.vz;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) {
                    node.vx = -node.vx;
                }
                if (node.y < 0 || node.y > canvas.height) {
                    node.vy = -node.vy;
                }
                if (node.z < -250 || node.z > 250) {
                    node.vz = -node.vz;
                }

                // Slightly randomize velocity for organic movement
                if (Math.random() > 0.98) {
                    node.vx += (Math.random() - 0.5) * 0.2 * nodeSpeed;
                    node.vy += (Math.random() - 0.5) * 0.2 * nodeSpeed;
                    node.vz += (Math.random() - 0.5) * 0.1 * nodeSpeed;

                    // Limit velocity
                    const maxVelocity = nodeSpeed * 1.5;
                    const vSquared = node.vx * node.vx + node.vy * node.vy + node.vz * node.vz;
                    if (vSquared > maxVelocity * maxVelocity) {
                        const ratio = maxVelocity / Math.sqrt(vSquared);
                        node.vx *= ratio;
                        node.vy *= ratio;
                        node.vz *= ratio;
                    }
                }

                // Reset connections
                node.connections = [];
            });

            // Find connections between nodes
            for (let i = 0; i < nodesRef.current.length; i++) {
                const nodeA = nodesRef.current[i];

                for (let j = i + 1; j < nodesRef.current.length; j++) {
                    const nodeB = nodesRef.current[j];

                    // Calculate 3D distance
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const dz = nodeA.z - nodeB.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    // Connect nodes that are close enough
                    if (distance < connectionDistance) {
                        nodeA.connections.push(j);
                        nodeB.connections.push(i);

                        // Calculate depth-based opacity
                        const zFactor = Math.max(0, 1 - Math.abs((nodeA.z + nodeB.z) / 500));
                        const distanceFactor = 1 - distance / connectionDistance;
                        const opacity = 0.2 + distanceFactor * 0.6 * zFactor;

                        // Draw connection with enhanced glow
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.strokeStyle = `rgba(100, 210, 255, ${opacity})`;
                        ctx.lineWidth = 0.5 + zFactor * 2;
                        ctx.stroke();

                        // Add glow effect to connections
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeB.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.strokeStyle = `rgba(150, 230, 255, ${opacity * 0.3})`;
                        ctx.lineWidth = 2 + zFactor * 3;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes with enhanced depth effect and glow
            nodesRef.current.forEach(node => {
                // Calculate size and opacity based on z-position
                const zFactor = (node.z + 250) / 500; // 0 to 1
                const scaledRadius = node.radius * (0.5 + zFactor * 0.5);
                const depthOpacity = 0.6 + zFactor * 0.4;

                // Draw multiple glow layers for enhanced effect
                for (let i = 0; i < 3; i++) {
                    const glowRadius = scaledRadius * (4 + i * 2);
                    const glowOpacity = (0.2 - i * 0.05) * depthOpacity;

                    const gradient = ctx.createRadialGradient(
                        node.x, node.y, 0,
                        node.x, node.y, glowRadius
                    );
                    gradient.addColorStop(0, `rgba(100, 210, 255, ${glowOpacity})`);
                    gradient.addColorStop(1, 'rgba(100, 210, 255, 0)');

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Draw core node
                ctx.beginPath();
                ctx.arc(node.x, node.y, scaledRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180, 230, 255, ${depthOpacity})`;
                ctx.fill();

                // Add bright center
                ctx.beginPath();
                ctx.arc(node.x, node.y, scaledRadius * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${depthOpacity * 0.8})`;
                ctx.fill();
            });

            // Update and draw particles with enhanced trails
            particlesRef.current.forEach((particle, index) => {
                const targetNode = nodesRef.current[particle.targetIndex];

                // Update particle position
                particle.progress += 0.01 * particle.speed;

                if (particle.progress >= 1) {
                    // Reset particle to a new path
                    const sourceIndex = particle.targetIndex;
                    let targetIndex;

                    // Try to find a connected node
                    const connections = nodesRef.current[sourceIndex].connections;
                    if (connections.length > 0) {
                        targetIndex = connections[Math.floor(Math.random() * connections.length)];
                    } else {
                        // If no connections, pick a random node
                        do {
                            targetIndex = Math.floor(Math.random() * nodesRef.current.length);
                        } while (targetIndex === sourceIndex);
                    }

                    particle.x = nodesRef.current[sourceIndex].x;
                    particle.y = nodesRef.current[sourceIndex].y;
                    particle.z = nodesRef.current[sourceIndex].z;
                    particle.targetIndex = targetIndex;
                    particle.progress = 0;
                    particle.speed = 0.5 + Math.random() * particleSpeed;
                } else {
                    // Interpolate position
                    const sourceNode = nodesRef.current.find((_, i) =>
                        nodesRef.current[i].connections.includes(particle.targetIndex)
                    ) || nodesRef.current[0];

                    particle.x = sourceNode.x + (targetNode.x - sourceNode.x) * particle.progress;
                    particle.y = sourceNode.y + (targetNode.y - sourceNode.y) * particle.progress;
                    particle.z = sourceNode.z + (targetNode.z - sourceNode.z) * particle.progress;
                }

                // Calculate depth-based opacity
                const zFactor = (particle.z + 250) / 500; // 0 to 1
                const depthOpacity = 0.5 + zFactor * 0.5;

                // Draw particle with glow
                const particleRadius = 1 + zFactor * 2;

                // Glow effect
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particleRadius * 3
                );
                gradient.addColorStop(0, `rgba(150, 230, 255, ${depthOpacity * particle.opacity * 0.6})`);
                gradient.addColorStop(1, 'rgba(150, 230, 255, 0)');

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particleRadius * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${depthOpacity * particle.opacity})`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [initialized, dimensions, connectionDistance, nodeSpeed, particleSpeed]);

    return (
        <div className={cn(
            "fixed inset-0 w-full h-full pointer-events-none z-0",
            "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900",
            className
        )}>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 opacity-30"></div>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Neural3DBackground;
