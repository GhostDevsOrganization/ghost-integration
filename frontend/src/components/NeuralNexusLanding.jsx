import React from 'react';
import NeuralParticleSystem from './3D/NeuralParticleSystem';
import OrbitalLogo from './3D/OrbitalLogo';
import { FeatureGlassCard } from './GlassmorphicCard';
import NewKasportalLogo from './NewKasportalLogo';

const NeuralNexusLanding = () => {
    return (
        <div className="neural-theme min-h-screen relative overflow-hidden">
            {/* Neural Particle Background */}
            <NeuralParticleSystem
                particleCount={80}
                connectionDistance={120}
                performanceMode="high"
            />

            {/* Main Content */}
            <div className="neural-content min-h-screen flex flex-col items-center justify-center px-8 py-16">

                {/* Central Logo with Orbital Rings */}
