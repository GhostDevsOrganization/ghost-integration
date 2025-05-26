import React, { useRef, useEffect, useState } from 'react';

const NeuralParticleSystem = ({
    particleCount = 100,
    connectionDistance = 100,
    performanceMode = 'high' // 'high', 'medium', 'low'
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Particle class
    class Particle {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.reset();
        }

        reset() {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 100;
            this.x = this.canvasWidth / 2 + Math.cos(angle) * distance;
            this.y = this.canvasHeight / 2 + Math.sin(angle) * distance;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.type = Math.random() > 0.7 ? 'hexagon' : 'dot';
            this.angle = 0;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Spiral motion around center
            const dx = this.x - this.canvasWidth / 2;
            const dy = this.y - this.canvasHeight / 2;
            const centerAngle = Math.atan2(dy, dx);
            this.x += Math.cos(centerAngle + Math.PI / 2) * 0.2;
            this.y += Math.sin(centerAngle + Math.PI / 2) * 0.2;

            // Reset if out of bounds
            if (this.x < -50 || this.x > this.canvasWidth + 50 ||
                this.y < -50 || this.y > this.canvasHeight + 50) {
                this.reset();
            }

            this.angle += 0.02;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;

            if (this.type === 'hexagon') {
                // Draw hexagon
                ctx.strokeStyle = '#4a9eff';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i + this.angle;
                    const x = this.x + Math.cos(angle) * this.size * 3;
                    const y = this.y + Math.sin(angle) * this.size * 3;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            } else {
                // Draw dot
                ctx.fillStyle = '#4a9eff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // Initialize particles
    const initParticles = (width, height) => {
        const adjustedCount = performanceMode === 'low' ? particleCount * 0.5 :
            performanceMode === 'medium' ? particleCount * 0.75 :
                particleCount;

        particlesRef.current = [];
        for (let i = 0; i < adjustedCount; i++) {
            particlesRef.current.push(new Particle(width, height));
        }
    };

    // Animation loop
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Clear with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // Draw connections
        if (performanceMode !== 'low') {
            ctx.strokeStyle = 'rgba(74, 158, 255, 0.1)';
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.globalAlpha = opacity * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { innerWidth, innerHeight } = window;
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        setDimensions({ width: innerWidth, height: innerHeight });

        // Update particle canvas dimensions
        particlesRef.current.forEach(particle => {
            particle.canvasWidth = innerWidth;
            particle.canvasHeight = innerHeight;
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initial setup
        handleResize();
        initParticles(window.innerWidth, window.innerHeight);

        // Start animation
        animate();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [particleCount, connectionDistance, performanceMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 1,
                background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000 70%)'
            }}
        />
    );
};

export default NeuralParticleSystem;
