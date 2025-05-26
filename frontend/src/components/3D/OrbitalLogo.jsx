import React, { useRef, useEffect } from 'react';

const OrbitalLogo = ({
    children,
    size = 200,
    glowIntensity = 0.8,
    orbitSpeed1 = 25,
    orbitSpeed2 = 35,
    showOrbits = true
}) => {
    const logoRef = useRef(null);

    useEffect(() => {
        const logo = logoRef.current;
        if (!logo) return;

        // Add glow animation
        const glowKeyframes = [
            {
                boxShadow: `0 0 ${60 * glowIntensity}px rgba(74, 158, 255, ${0.8 * glowIntensity}), inset 0 0 ${30 * glowIntensity}px rgba(255, 255, 255, ${0.3 * glowIntensity})`
            },
            {
                boxShadow: `0 0 ${100 * glowIntensity}px rgba(74, 158, 255, ${1 * glowIntensity}), inset 0 0 ${40 * glowIntensity}px rgba(255, 255, 255, ${0.5 * glowIntensity})`
            },
            {
                boxShadow: `0 0 ${60 * glowIntensity}px rgba(74, 158, 255, ${0.8 * glowIntensity}), inset 0 0 ${30 * glowIntensity}px rgba(255, 255, 255, ${0.3 * glowIntensity})`
            }
        ];

        const glowAnimation = logo.animate(glowKeyframes, {
            duration: 3000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });

        return () => {
            if (glowAnimation) {
                glowAnimation.cancel();
            }
        };
    }, [glowIntensity]);

    const containerStyle = {
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        marginBottom: '3rem'
    };

    const logoStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        background: 'transparent'
    };

    const orbitStyle1 = {
        position: 'absolute',
        width: `${size * 1.5}px`,
        height: `${size * 1.5}px`,
        top: `${-size * 0.25}px`,
        left: `${-size * 0.25}px`,
        border: '2px solid rgba(74, 158, 255, 0.3)',
        borderRadius: '50%',
        animation: `rotate ${orbitSpeed1}s linear infinite`,
        pointerEvents: 'none'
    };

    const orbitStyle2 = {
        position: 'absolute',
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        top: `${-size * 0.5}px`,
        left: `${-size * 0.5}px`,
        border: '2px solid rgba(74, 158, 255, 0.2)',
        borderRadius: '50%',
        animation: `rotate ${orbitSpeed2}s linear infinite reverse`,
        pointerEvents: 'none'
    };

    return (
        <>
            <style jsx>{`
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes glow {
                    0%, 100% { 
                        box-shadow: 0 0 ${60 * glowIntensity}px rgba(74, 158, 255, ${0.8 * glowIntensity}), 
                                    inset 0 0 ${30 * glowIntensity}px rgba(255, 255, 255, ${0.3 * glowIntensity}); 
                    }
                    50% { 
                        box-shadow: 0 0 ${100 * glowIntensity}px rgba(74, 158, 255, ${1 * glowIntensity}), 
                                    inset 0 0 ${40 * glowIntensity}px rgba(255, 255, 255, ${0.5 * glowIntensity}); 
                    }
                }
            `}</style>

            <div style={containerStyle}>
                {showOrbits && (
                    <>
                        <div style={orbitStyle1}></div>
                        <div style={orbitStyle2}></div>
                    </>
                )}
                <div ref={logoRef} style={logoStyle}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default OrbitalLogo;
