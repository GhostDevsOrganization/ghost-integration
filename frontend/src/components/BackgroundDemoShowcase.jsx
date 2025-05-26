import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

// Import existing background components
import KasportalAdvancedFoundation from './3D/KasportalAdvancedFoundation';
import CrossChainVortexPortal from './3D/CrossChainVortexPortal';
import BlockDAGNetwork from './3D/BlockDAGNetwork';

// Import new 3D visualization components
import MiningHashVisualization from './3D/MiningHashVisualization';
import DeFiLiquidityPools from './3D/DeFiLiquidityPools';
import QuantumField from './3D/QuantumField';
import HolographicGrid from './3D/HolographicGrid';
import NeuralNetwork from './3D/NeuralNetwork';
import AuroraWaves from './3D/AuroraWaves';
import CrystalFormation from './3D/CrystalFormation';
import PlasmaStorm from './3D/PlasmaStorm';
import CryptoPortalNetwork from './3D/CryptoPortalNetwork';

// Enhanced Performance Monitor Hook with WebGPU Detection
const useAdvancedPerformanceMonitor = () => {
    const [metrics, setMetrics] = useState({
        fps: 60,
        memory: 0,
        gpuMemory: 0,
        renderTime: 0,
        webGPUSupported: false,
        webGLVersion: '1.0',
        performanceTier: 'high',
        devicePixelRatio: 1,
        hardwareConcurrency: 4,
        maxTextureSize: 2048,
        isLowPowerMode: false
    });

    const frameTimesRef = useRef([]);
    const lastFrameTimeRef = useRef(performance.now());
    const fpsCounterRef = useRef(0);

    useEffect(() => {
        let mounted = true;

        // Enhanced WebGPU and WebGL Detection
        const detectGraphicsCapabilities = async () => {
            const capabilities = {
                webGPUSupported: false,
                webGLVersion: '1.0',
                maxTextureSize: 2048,
                devicePixelRatio: window.devicePixelRatio || 1,
                hardwareConcurrency: navigator.hardwareConcurrency || 4
            };

            // Check WebGPU Support
            if ('gpu' in navigator) {
                try {
                    const adapter = await navigator.gpu.requestAdapter();
                    if (adapter) {
                        capabilities.webGPUSupported = true;
                    }
                } catch (e) {
                    console.log('WebGPU not available:', e);
                }
            }

            // Check WebGL Version and Capabilities
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (gl) {
                capabilities.webGLVersion = gl.getContext('webgl2') ? '2.0' : '1.0';
                capabilities.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            }

            // Detect Low Power Mode (mobile battery optimization)
            capabilities.isLowPowerMode =
                /Mobi|Android/i.test(navigator.userAgent) &&
                navigator.getBattery &&
                (await navigator.getBattery?.())?.level < 0.2;

            if (mounted) {
                setMetrics(prev => ({
                    ...prev,
                    ...capabilities,
                    performanceTier: capabilities.webGPUSupported ? 'ultra' :
                        capabilities.webGLVersion === '2.0' ? 'high' : 'medium'
                }));
            }
        };

        detectGraphicsCapabilities();

        // Enhanced FPS and Performance Monitoring
        let frameCount = 0;
        const monitorPerformance = () => {
            if (!mounted) return;

            const currentTime = performance.now();
            const deltaTime = currentTime - lastFrameTimeRef.current;

            frameTimesRef.current.push(deltaTime);
            if (frameTimesRef.current.length > 120) { // Track last 2 seconds at 60fps
                frameTimesRef.current.shift();
            }

            frameCount++;
            fpsCounterRef.current++;

            // Update metrics every 60 frames (approximately 1 second at 60fps)
            if (frameCount >= 60) {
                const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
                const fps = Math.round(1000 / avgFrameTime);
                const smoothFps = Math.min(fps, 120); // Cap at 120fps for display

                // Determine performance tier based on actual performance
                let performanceTier = 'low';
                if (smoothFps >= 55) performanceTier = metrics.webGPUSupported ? 'ultra' : 'high';
                else if (smoothFps >= 45) performanceTier = 'high';
                else if (smoothFps >= 30) performanceTier = 'medium';

                setMetrics(prev => ({
                    ...prev,
                    fps: smoothFps,
                    renderTime: avgFrameTime.toFixed(2),
                    performanceTier,
                    memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 0,
                    gpuMemory: performance.memory ? Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) : 0
                }));

                frameCount = 0;
            }

            lastFrameTimeRef.current = currentTime;
            requestAnimationFrame(monitorPerformance);
        };

        monitorPerformance();

        return () => {
            mounted = false;
        };
    }, []);

    return metrics;
};

// Enhanced Background Configurations with Next-Gen Features
const ENHANCED_BACKGROUND_CONFIGS = [
    {
        id: 'kasportal',
        name: 'Kaspa Liquidity Gravity',
        component: KasportalAdvancedFoundation,
        category: 'Blockchain',
        description: 'Advanced physics simulation with λ=2.47 liquidity gravity',
        complexity: 'Ultra',
        performance: 'WebGPU',
        particleCount: 50000,
        shaderTypes: ['vertex', 'fragment', 'compute'],
        features: ['physics', 'gpu-compute', 'real-time'],
        gpuMemoryUsage: 'High',
        recommendedTier: 'high'
    },
    {
        id: 'vortex',
        name: 'Cross-Chain Vortex Portal',
        component: CrossChainVortexPortal,
        category: 'Blockchain',
        description: 'Interdimensional bridge with cross-chain asset flows',
        complexity: 'Ultra',
        performance: 'WebGPU',
        particleCount: 75000,
        shaderTypes: ['vertex', 'fragment', 'compute'],
        features: ['portal-effects', 'particle-physics', 'audio-reactive'],
        gpuMemoryUsage: 'High',
        recommendedTier: 'high'
    },
    {
        id: 'blockdag',
        name: 'BlockDAG Network',
        component: BlockDAGNetwork,
        category: 'Blockchain',
        description: 'Parallel block processing visualization',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 25000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['network-topology', 'consensus-animation', 'instanced-rendering'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'mining',
        name: 'Mining Hash Visualization',
        component: MiningHashVisualization,
        category: 'Blockchain',
        description: 'Animated cryptographic hash patterns with real-time generation',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 30000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['hash-generation', 'text-particles', 'spiral-animation'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'defi',
        name: 'DeFi Liquidity Pools',
        component: DeFiLiquidityPools,
        category: 'Blockchain',
        description: 'Flowing particle streams with liquidity pool mechanics',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 40000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['fluid-simulation', 'yield-visualization', 'token-flow'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'quantum',
        name: 'Quantum Field',
        component: QuantumField,
        category: 'Physics',
        description: 'Particle wave interference with quantum mechanics simulation',
        complexity: 'Ultra',
        performance: 'WebGPU',
        particleCount: 100000,
        shaderTypes: ['vertex', 'fragment', 'compute'],
        features: ['wave-interference', 'superposition', 'quantum-tunneling'],
        gpuMemoryUsage: 'High',
        recommendedTier: 'high'
    },
    {
        id: 'holographic',
        name: 'Holographic Grid',
        component: HolographicGrid,
        category: 'Futuristic',
        description: 'Tron-style digital landscape with holographic effects',
        complexity: 'Medium',
        performance: 'WebGL',
        particleCount: 15000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['grid-morphing', 'hologram-shader', 'neon-glow'],
        gpuMemoryUsage: 'Low',
        recommendedTier: 'low'
    },
    {
        id: 'neural',
        name: 'Neural Network',
        component: NeuralNetwork,
        category: 'AI',
        description: 'Brain-like synaptic connections with AI-driven patterns',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 35000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['synaptic-firing', 'neural-pathways', 'learning-animation'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'crypto-portal',
        name: 'Crypto Portal Network',
        component: CryptoPortalNetwork,
        category: 'Blockchain',
        description: 'Interactive crypto ecosystem with 48+ currencies and portal effects',
        complexity: 'Ultra',
        performance: 'WebGL2',
        particleCount: 32000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['crypto-icons', 'portal-rings', 'interactive-hover', 'theme-adaptive'],
        gpuMemoryUsage: 'High',
        recommendedTier: 'high'
    },
    // Enhanced placeholder components for remaining backgrounds
    {
        id: 'space',
        name: 'Space Station Orbital',
        component: ({ themeData, performanceMode }) => (
            <EnhancedPlaceholder
                themeData={themeData}
                name="Space Station Orbital"
                description="Rotating orbital structures with realistic physics"
                features={['orbital-mechanics', 'space-debris', '3d-models']}
                performanceMode={performanceMode}
            />
        ),
        category: 'Futuristic',
        description: 'Rotating orbital structures with realistic space physics',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 20000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['orbital-physics', 'procedural-stars', 'realistic-lighting'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk Metropolis',
        component: ({ themeData, performanceMode }) => (
            <EnhancedPlaceholder
                themeData={themeData}
                name="Cyberpunk Metropolis"
                description="Neon-lit geometric cityscape with volumetric fog"
                features={['volumetric-lighting', 'neon-reflections', 'rain-effects']}
                performanceMode={performanceMode}
            />
        ),
        category: 'Futuristic',
        description: 'Neon-lit geometric cityscape with advanced lighting',
        complexity: 'Ultra',
        performance: 'WebGPU',
        particleCount: 80000,
        shaderTypes: ['vertex', 'fragment', 'compute'],
        features: ['volumetric-fog', 'neon-reflections', 'rain-simulation'],
        gpuMemoryUsage: 'High',
        recommendedTier: 'high'
    },
    {
        id: 'fractal',
        name: 'Fractal Mandala',
        component: ({ themeData, performanceMode }) => (
            <EnhancedPlaceholder
                themeData={themeData}
                name="Fractal Mandala"
                description="Sacred geometry with infinite recursion patterns"
                features={['fractal-generation', 'sacred-geometry', 'color-evolution']}
                performanceMode={performanceMode}
            />
        ),
        category: 'Abstract',
        description: 'Sacred geometry patterns with fractal mathematics',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 25000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['fractal-math', 'infinite-zoom', 'color-morphing'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'aurora',
        name: 'Aurora Borealis',
        component: AuroraWaves,
        category: 'Natural',
        description: 'Northern lights simulation with realistic physics',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 45000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['electromagnetic-simulation', 'atmospheric-scattering', 'real-time-physics'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'crystal',
        name: 'Crystal Formation',
        component: CrystalFormation,
        category: 'Abstract',
        description: 'Growing crystal structures with realistic optics',
        complexity: 'High',
        performance: 'WebGL2',
        particleCount: 30000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['procedural-generation', 'light-refraction', 'growth-simulation'],
        gpuMemoryUsage: 'Medium',
        recommendedTier: 'medium'
    },
    {
        id: 'plasma',
        name: 'Plasma Storm',
        component: PlasmaStorm,
        category: 'Abstract',
        description: 'Electric energy fields with plasma physics simulation',
        complexity: 'Ultra',
        performance: 'WebGPU',
        particleCount: 60000,
        shaderTypes: ['vertex', 'fragment', 'compute'],
        features: ['plasma-simulation', 'electromagnetic-visualization', 'energy-discharge'],
        gpuMemoryUsage: 'High',
        recommendedTier: 'high'
    },
    {
        id: 'minimal',
        name: 'Minimal Geometric',
        component: ({ themeData, performanceMode }) => (
            <EnhancedPlaceholder
                themeData={themeData}
                name="Minimal Geometric"
                description="Clean geometric shapes with subtle animations"
                features={['geometric-morphing', 'subtle-animation', 'clean-aesthetics']}
                performanceMode={performanceMode}
            />
        ),
        category: 'Abstract',
        description: 'Clean geometric shapes optimized for performance',
        complexity: 'Low',
        performance: 'WebGL',
        particleCount: 5000,
        shaderTypes: ['vertex', 'fragment'],
        features: ['geometric-primitives', 'smooth-transitions', 'optimized-rendering'],
        gpuMemoryUsage: 'Low',
        recommendedTier: 'low'
    }
];

// Enhanced Placeholder Component with Next-Gen Features
const EnhancedPlaceholder = ({ themeData, name, description, features = [], performanceMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        // Create animated background based on performance mode
        const particles = [];
        const particleCount = performanceMode === 'low' ? 50 : performanceMode === 'medium' ? 200 : 500;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 4 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                hue: Math.random() * 360,
                age: 0,
                maxAge: Math.random() * 1000 + 500
            });
        }

        let animationId;

        const animate = () => {
            // Fade background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.age += 1;

                // Boundary collision
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Age-based opacity
                const ageRatio = particle.age / particle.maxAge;
                const dynamicOpacity = particle.opacity * (1 - ageRatio);

                // Draw particle with glow effect
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${dynamicOpacity})`);
                gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Reset particle when it gets too old
                if (particle.age >= particle.maxAge) {
                    particle.x = Math.random() * canvas.width;
                    particle.y = Math.random() * canvas.height;
                    particle.age = 0;
                    particle.hue = Math.random() * 360;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            window.removeEventListener('resize', updateSize);
        };
    }, [performanceMode]);

    return (
        <div className="absolute inset-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    background: `linear-gradient(135deg, ${themeData.colors.primaryBackground} 0%, rgba(0,0,0,0.8) 100%)`
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 bg-black/20 backdrop-blur-md rounded-xl border border-white/20 max-w-lg">
                    <div className="text-4xl font-bold mb-4" style={{ color: themeData.colors.accentPrimary }}>
                        {name}
                    </div>
                    <div className="text-lg mb-4" style={{ color: themeData.colors.textPrimary }}>
                        {description}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {features.map(feature => (
                            <span
                                key={feature}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm"
                                style={{ color: themeData.colors.textSecondary }}
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                    <div className="text-sm opacity-70" style={{ color: themeData.colors.textSecondary }}>
                        🚀 Next-Gen Implementation Coming Soon
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function EnhancedBackgroundDemoShowcase() {
    const { theme, themeData, allThemes, setTheme } = useTheme();
    const [currentBackground, setCurrentBackground] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [autoPlaySpeed, setAutoPlaySpeed] = useState(5000);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [performanceMode, setPerformanceMode] = useState('high');
    const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    const metrics = useAdvancedPerformanceMonitor();

    // Auto-optimized performance mode based on real metrics
    const optimizedPerformanceMode = useMemo(() => {
        if (metrics.fps < 25) return 'low';
        if (metrics.fps < 40) return 'medium';
        if (metrics.isLowPowerMode) return 'medium';
        return performanceMode;
    }, [metrics.fps, metrics.isLowPowerMode, performanceMode]);

    // Filter backgrounds by category
    const filteredBackgrounds = useMemo(() => {
        if (filterCategory === 'all') return ENHANCED_BACKGROUND_CONFIGS;
        return ENHANCED_BACKGROUND_CONFIGS.filter(bg =>
            bg.category.toLowerCase() === filterCategory.toLowerCase()
        );
    }, [filterCategory]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentBackground(prev => (prev + 1) % filteredBackgrounds.length);
        }, autoPlaySpeed);

        return () => clearInterval(interval);
    }, [isAutoPlay, autoPlaySpeed, filteredBackgrounds.length]);

    const CurrentBackgroundComponent = filteredBackgrounds[currentBackground]?.component;
    const currentConfig = filteredBackgrounds[currentBackground];

    const handleBackgroundChange = useCallback((index) => {
        setCurrentBackground(index);
    }, []);

    const handleThemeChange = useCallback((themeName) => {
        setTheme(themeName);
    }, [setTheme]);

    // Enhanced fullscreen functionality with proper browser API support
    const toggleFullscreen = useCallback(async () => {
        try {
            if (!isFullscreen) {
                // Enter fullscreen
                const element = document.documentElement;
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    await element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    await element.msRequestFullscreen();
                } else {
                    // Fallback for browsers that don't support fullscreen API
                    setIsFullscreen(true);
                }
                // Hide controls when entering fullscreen
                setShowControls(false);
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                } else {
                    // Fallback for browsers that don't support fullscreen API
                    setIsFullscreen(false);
                }
                // Show controls when exiting fullscreen
                setShowControls(true);
            }
        } catch (error) {
            console.log('Fullscreen toggle failed:', error);
            // Fallback to CSS-only fullscreen
            setIsFullscreen(!isFullscreen);
            setShowControls(!isFullscreen);
        }
    }, [isFullscreen]);

    // Listen for fullscreen changes from browser
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement
            );
            setIsFullscreen(isCurrentlyFullscreen);
            // Auto-hide controls in fullscreen, show when exiting
            setShowControls(!isCurrentlyFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Performance color coding
    const getPerformanceColor = useCallback((value, thresholds = [30, 50, 60]) => {
        if (value >= thresholds[2]) return 'text-emerald-400';
        if (value >= thresholds[1]) return 'text-yellow-400';
        if (value >= thresholds[0]) return 'text-orange-400';
        return 'text-red-400';
    }, []);

    const getComplexityColor = useCallback((complexity) => {
        switch (complexity) {
            case 'Low': return 'text-green-400';
            case 'Medium': return 'text-yellow-400';
            case 'High': return 'text-orange-400';
            case 'Ultra': return 'text-red-400';
            default: return 'text-gray-400';
        }
    }, []);

    const getPerformanceTierColor = useCallback((tier) => {
        switch (tier) {
            case 'ultra': return 'text-purple-400';
            case 'high': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'low': return 'text-red-400';
            default: return 'text-gray-400';
        }
    }, []);

    if (!currentConfig) return null;

    return (
        <div className={`relative w-full min-h-screen overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Current Background */}
            <div className="absolute inset-0">
                <CurrentBackgroundComponent
                    themeData={themeData}
                    performanceMode={optimizedPerformanceMode}
                />
            </div>

            {/* Enhanced Controls Overlay - Only show when not in fullscreen or when controls are toggled on */}
            {(!isFullscreen || showControls) && (
                <div className="relative z-10 p-4 max-h-screen overflow-y-auto">
                    {/* Enhanced Header with WebGPU Status */}
                    <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    Next-Gen 3D Background Showcase
                                </h1>
                                <p className="text-white/70 text-sm">
                                    {ENHANCED_BACKGROUND_CONFIGS.length} Ultra-Advanced 3D Backgrounds • WebGPU Ready • AI Enhanced
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* WebGPU Status Badge */}
                                <div className="text-center">
                                    <div className="text-xs text-white/70">Graphics API</div>
                                    <div className={`text-sm font-bold ${metrics.webGPUSupported ? 'text-purple-400' : 'text-blue-400'}`}>
                                        {metrics.webGPUSupported ? 'WebGPU' : `WebGL ${metrics.webGLVersion}`}
                                    </div>
                                </div>

                                {/* Performance Tier */}
                                <div className="text-center">
                                    <div className="text-xs text-white/70">Performance</div>
                                    <div className={`text-sm font-bold uppercase ${getPerformanceTierColor(metrics.performanceTier)}`}>
                                        {metrics.performanceTier}
                                    </div>
                                </div>

                                {/* FPS Monitor */}
                                <div className="text-center">
                                    <div className="text-xs text-white/70">FPS</div>
                                    <div className={`text-lg font-bold ${getPerformanceColor(metrics.fps)}`}>
                                        {metrics.fps}
                                    </div>
                                </div>

                                <button
                                    onClick={toggleFullscreen}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all hover:scale-105 active:scale-95"
                                    title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen (F11)'}
                                >
                                    {isFullscreen ? '🗗 Exit Fullscreen' : '🗖 Enter Fullscreen'}
                                </button>
                            </div>
                        </div>

                        {/* Enhanced Current Background Info */}
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                            <div>
                                <div className="text-sm text-white/70 mb-1">Current Background</div>
                                <div className="text-lg font-semibold text-white">{currentConfig.name}</div>
                                <div className="text-sm text-white/60">{currentConfig.category}</div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-1">Particle Count</div>
                                <div className="text-lg font-bold text-emerald-400">
                                    {currentConfig.particleCount?.toLocaleString() || 'N/A'}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-1">Graphics API</div>
                                <div className={`text-sm font-semibold ${currentConfig.performance === 'WebGPU' ? 'text-purple-400' : 'text-blue-400'}`}>
                                    {currentConfig.performance}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-1">Complexity</div>
                                <div className={`text-sm font-semibold ${getComplexityColor(currentConfig.complexity)}`}>
                                    {currentConfig.complexity}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-1">Shaders</div>
                                <div className="text-sm text-white">
                                    {currentConfig.shaderTypes?.join(' + ') || 'N/A'}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-1">GPU Memory</div>
                                <div className={`text-sm font-semibold ${currentConfig.gpuMemoryUsage === 'High' ? 'text-red-400' :
                                    currentConfig.gpuMemoryUsage === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                                    }`}>
                                    {currentConfig.gpuMemoryUsage}
                                </div>
                            </div>
                        </div>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {currentConfig.features?.map(feature => (
                                <span key={feature} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                                    {feature}
                                </span>
                            )) || null}
                        </div>
                    </div>

                    {/* Enhanced Background Selector with Filtering */}
                    <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Background Selection</h3>

                            <div className="flex items-center space-x-4">
                                {/* Category Filter */}
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm text-white/70">Filter:</label>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => {
                                            setFilterCategory(e.target.value);
                                            setCurrentBackground(0);
                                        }}
                                        className="bg-black/30 text-white text-sm rounded px-2 py-1 border border-white/20"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="blockchain">Blockchain</option>
                                        <option value="physics">Physics</option>
                                        <option value="ai">AI</option>
                                        <option value="futuristic">Futuristic</option>
                                        <option value="abstract">Abstract</option>
                                        <option value="natural">Natural</option>
                                    </select>
                                </div>

                                {/* Auto-play Controls */}
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm text-white/70">Auto-play</label>
                                    <button
                                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                                        className={`w-12 h-6 rounded-full transition-all ${isAutoPlay ? 'bg-blue-500' : 'bg-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-all ${isAutoPlay ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                    </button>
                                </div>

                                {isAutoPlay && (
                                    <div className="flex items-center space-x-2">
                                        <label className="text-sm text-white/70">Speed</label>
                                        <select
                                            value={autoPlaySpeed}
                                            onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                                            className="bg-black/30 text-white text-sm rounded px-2 py-1 border border-white/20"
                                        >
                                            <option value={2000}>2s</option>
                                            <option value={5000}>5s</option>
                                            <option value={10000}>10s</option>
                                            <option value={15000}>15s</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {filteredBackgrounds.map((config, index) => (
                                <button
                                    key={config.id}
                                    onClick={() => handleBackgroundChange(index)}
                                    className={`p-3 rounded-lg text-left transition-all ${currentBackground === index
                                        ? 'bg-gradient-to-br from-blue-500/50 to-purple-500/50 border-2 border-blue-400 text-white transform scale-105'
                                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:transform hover:scale-105'
                                        }`}
                                >
                                    <div className="font-semibold mb-2 text-sm">{config.name}</div>
                                    <div className="text-xs text-white/70 mb-2">{config.category}</div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={`px-2 py-1 rounded ${config.performance === 'WebGPU' ? 'bg-purple-500/30 text-purple-300' :
                                            config.performance === 'WebGL2' ? 'bg-blue-500/30 text-blue-300' :
                                                'bg-gray-500/30 text-gray-300'
                                            }`}>
                                            {config.performance}
                                        </span>
                                        <span className="text-white/60">
                                            {config.particleCount ? `${Math.round(config.particleCount / 1000)}K` : '-'}
                                        </span>
                                    </div>
                                    <div className={`text-xs mt-1 font-semibold ${getComplexityColor(config.complexity)}`}>
                                        {config.complexity} Complexity
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Theme Selector */}
                    <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">Theme Selection</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                            {Object.entries(allThemes).map(([themeName, themeConfig]) => (
                                <button
                                    key={themeName}
                                    onClick={() => handleThemeChange(themeName)}
                                    className={`p-3 rounded-lg text-xs text-center transition-all transform hover:scale-105 ${theme === themeName
                                        ? 'border-2 border-white text-white scale-105'
                                        : 'border border-white/20 text-white/80 hover:border-white/40'
                                        }`}
                                    style={{
                                        backgroundColor: themeConfig.colors.primaryBackground,
                                        color: themeConfig.colors.textPrimary
                                    }}
                                >
                                    <div className="font-semibold mb-1">{themeConfig.name}</div>
                                    <div className="flex space-x-1 justify-center">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: themeConfig.colors.accentPrimary }}
                                        />
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: themeConfig.colors.accentSecondary }}
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Performance Dashboard */}
                    <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Performance Dashboard</h3>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
                                    className="text-sm text-white/70 hover:text-white transition-colors"
                                >
                                    {showAdvancedMetrics ? '▼ Less Details' : '▶ More Details'}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Quality Mode</label>
                                <select
                                    value={performanceMode}
                                    onChange={(e) => setPerformanceMode(e.target.value)}
                                    className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/20"
                                >
                                    <option value="ultra">Ultra (WebGPU Preferred)</option>
                                    <option value="high">High Quality</option>
                                    <option value="medium">Medium Quality</option>
                                    <option value="low">Low Quality (Mobile)</option>
                                </select>
                                {optimizedPerformanceMode !== performanceMode && (
                                    <div className="text-xs text-yellow-400 mt-1">
                                        Auto-optimized to: {optimizedPerformanceMode}
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-2">Frame Rate</div>
                                <div className={`text-2xl font-bold ${getPerformanceColor(metrics.fps)}`}>
                                    {metrics.fps} FPS
                                </div>
                                <div className="text-xs text-white/60">Target: 60 FPS</div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-2">Memory Usage</div>
                                <div className="text-lg font-bold text-white">
                                    {metrics.memory} MB
                                </div>
                                <div className="text-xs text-white/60">JS Heap Size</div>
                            </div>

                            <div>
                                <div className="text-sm text-white/70 mb-2">Performance Tier</div>
                                <div className={`text-lg font-bold uppercase ${getPerformanceTierColor(metrics.performanceTier)}`}>
                                    {metrics.performanceTier}
                                </div>
                                {metrics.isLowPowerMode && (
                                    <div className="text-xs text-orange-400">Low Power Mode</div>
                                )}
                            </div>
                        </div>

                        {showAdvancedMetrics && (
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-white/10">
                                <div>
                                    <div className="text-sm text-white/70 mb-2">Render Time</div>
                                    <div className={`text-lg font-bold ${getPerformanceColor(parseFloat(metrics.renderTime), [16, 10, 5])}`}>
                                        {metrics.renderTime} ms
                                    </div>
                                    <div className="text-xs text-white/60">Per Frame</div>
                                </div>

                                <div>
                                    <div className="text-sm text-white/70 mb-2">Max Texture Size</div>
                                    <div className="text-lg font-bold text-cyan-400">
                                        {metrics.maxTextureSize}px
                                    </div>
                                    <div className="text-xs text-white/60">GPU Capability</div>
                                </div>

                                <div>
                                    <div className="text-sm text-white/70 mb-2">Device Pixel Ratio</div>
                                    <div className="text-lg font-bold text-green-400">
                                        {metrics.devicePixelRatio}x
                                    </div>
                                    <div className="text-xs text-white/60">Display Density</div>
                                </div>

                                <div>
                                    <div className="text-sm text-white/70 mb-2">CPU Cores</div>
                                    <div className="text-lg font-bold text-blue-400">
                                        {metrics.hardwareConcurrency}
                                    </div>
                                    <div className="text-xs text-white/60">Available Threads</div>
                                </div>

                                <div>
                                    <div className="text-sm text-white/70 mb-2">Graphics API</div>
                                    <div className={`text-lg font-bold ${metrics.webGPUSupported ? 'text-purple-400' : 'text-blue-400'}`}>
                                        {metrics.webGPUSupported ? 'WebGPU' : `WebGL ${metrics.webGLVersion}`}
                                    </div>
                                    <div className="text-xs text-white/60">Rendering Backend</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Collapsible Menu for Fullscreen Mode */}
            {isFullscreen && !showControls && (
                <div className="absolute top-4 right-4 z-20 flex space-x-2">
                    <button
                        onClick={() => setShowControls(true)}
                        className="px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-all backdrop-blur-sm border border-white/20 hover:scale-105"
                        title="Open Settings Menu"
                    >
                        ⚙️ Menu
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-all backdrop-blur-sm border border-white/20 hover:scale-105"
                        title="Exit Fullscreen (ESC)"
                    >
                        ✕ Exit
                    </button>
                </div>
            )}

            {/* Close Menu Button for Fullscreen */}
            {isFullscreen && showControls && (
                <div className="absolute top-4 right-4 z-30">
                    <button
                        onClick={() => setShowControls(false)}
                        className="px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-all backdrop-blur-sm border border-white/20 hover:scale-105"
                        title="Hide Menu"
                    >
                        ✕ Hide Menu
                    </button>
                </div>
            )}

            {/* Enhanced Navigation Arrows */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                <button
                    onClick={() => setCurrentBackground(prev => prev === 0 ? filteredBackgrounds.length - 1 : prev - 1)}
                    className="p-4 bg-black/40 hover:bg-black/60 rounded-full text-white text-xl transition-all backdrop-blur-sm hover:scale-110"
                    title="Previous Background"
                >
                    ←
                </button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
                <button
                    onClick={() => setCurrentBackground(prev => (prev + 1) % filteredBackgrounds.length)}
                    className="p-4 bg-black/40 hover:bg-black/60 rounded-full text-white text-xl transition-all backdrop-blur-sm hover:scale-110"
                    title="Next Background"
                >
                    →
                </button>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-2 bg-black/20 backdrop-blur-sm rounded-full p-2">
                    {filteredBackgrounds.map((config, index) => (
                        <button
                            key={config.id}
                            onClick={() => handleBackgroundChange(index)}
                            className={`w-3 h-3 rounded-full transition-all hover:scale-125 ${currentBackground === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                                }`}
                            title={config.name}
                        />
                    ))}
                </div>
                <div className="text-center mt-2 text-xs text-white/70">
                    {currentBackground + 1} / {filteredBackgrounds.length} • {currentConfig.category}
                </div>
            </div>
        </div>
    );
}
