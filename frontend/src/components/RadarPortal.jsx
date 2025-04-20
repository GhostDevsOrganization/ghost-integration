import { useState, useEffect, useRef } from 'react';

// RadarPortal component - add this as a new file in your components folder
export const RadarPortal = ({ onEnterPortal, isActive, mousePosition }) => {
    const [scannerActive, setScannerActive] = useState(false);
    const [portalReady, setPortalReady] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [radarSweep, setRadarSweep] = useState(0);
    const [portalGlow, setPortalGlow] = useState(1);
    const [smallElements, setSmallElements] = useState([]);

    const portalRef = useRef(null);

    // Generate random small elements (blips on the radar)
    useEffect(() => {
        const elements = [];
        for (let i = 0; i < 25; i++) {
            elements.push({
                size: Math.random() * 4 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                blinking: Math.random() > 0.7,
                blinkSpeed: Math.random() * 2 + 1,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
        setSmallElements(elements);
    }, []);

    // Activate scanner on load
    useEffect(() => {
        const timer = setTimeout(() => {
            setScannerActive(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Radar sweep animation
    useEffect(() => {
        if (!scannerActive) return;

        const sweepInterval = setInterval(() => {
            setRadarSweep(prev => {
                // When sweep completes a full rotation, trigger portal ready
                if (prev >= 359) {
                    if (!portalReady) {
                        setTimeout(() => setPortalReady(true), 500);
                    }
                    return 0;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(sweepInterval);
    }, [scannerActive, portalReady]);

    // Ring rotation animation
    useEffect(() => {
        if (!scannerActive) return;

        const rotationInterval = setInterval(() => {
            setRotation(prev => (prev + 0.2) % 360);
        }, 30);

        return () => clearInterval(rotationInterval);
    }, [scannerActive]);

    // Portal glow pulsing effect
    useEffect(() => {
        if (!portalReady) return;

        const glowInterval = setInterval(() => {
            setPortalGlow(prev => prev === 1 ? 1.2 : 1);
        }, 2000);

        return () => clearInterval(glowInterval);
    }, [portalReady]);

    // Handle portal entry
    const handleEnterPortal = () => {
        if (!portalReady) return;

        // Trigger the parent component's onEnterPortal function
        if (onEnterPortal) onEnterPortal();
    };

    return (
        <div
            ref={portalRef}
            className={`relative w-64 h-64 md:w-96 md:h-96 mb-12 transition-all duration-1500 ease-in-out
                  ${isActive ? 'scale-150 opacity-100' : 'scale-100 opacity-90'}`}
            style={{
                transition: isActive ? 'all 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `scale(${isActive ? 1.5 : 1}) translate(${mousePosition.x * 15 * 0.2}px, ${mousePosition.y * 15 * 0.2}px)`,
            }}
        >
            {/* Background small elements (radar blips) */}
            {smallElements.map((element, i) => (
                <div
                    key={`element-${i}`}
                    className={`absolute rounded-sm bg-green-400 ${element.blinking ? 'animate-pulse' : ''}`}
                    style={{
                        width: `${element.size}px`,
                        height: `${element.size}px`,
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        opacity: element.opacity * 0.8, // Slightly reduce opacity
                        animationDuration: `${element.blinkSpeed * 1.5}s`, // Slow down blinking
                        zIndex: 5
                    }}
                />
            ))}

            {/* Outermost ring - solid */}
            <div className="absolute w-full h-full rounded-full border border-green-500/20 z-10"></div> {/* Reduced opacity */}

            {/* Second ring - dotted */}
            <div className="absolute w-4/5 h-4/5 rounded-full border border-green-500/15 border-dashed z-10" // Reduced opacity
                style={{ top: '10%', left: '10%' }}></div>

            {/* Third ring - solid with rotation */}
            <div
                className="absolute w-3/5 h-3/5 rounded-full border border-green-500/30 z-10" // Reduced opacity
                style={{
                    top: '20%',
                    left: '20%',
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.8s ease-in-out' // Smoother transition
                }}
            ></div>

            {/* Fourth ring - dotted with opposite rotation */}
            <div
                className="absolute w-2/5 h-2/5 rounded-full border border-green-500/15 border-dashed z-10" // Reduced opacity
                style={{
                    top: '30%',
                    left: '30%',
                    transform: `rotate(-${rotation * 1.2}deg)`, // Slightly slower opposite rotation
                    transition: 'transform 0.8s ease-in-out' // Smoother transition
                }}
            ></div>

            {/* Crosshair lines */}
            <div className="absolute inset-0 flex items-center z-10">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div> {/* Reduced opacity */}
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-green-400/30 to-transparent"></div> {/* Reduced opacity */}
            </div>

            {/* Radar sweeping line */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div
                    className="h-px w-1/2 bg-gradient-to-r from-green-400/0 via-green-400/70 to-green-400/0 origin-center" // Adjusted gradient and origin
                    style={{
                        transform: `rotate(${radarSweep}deg)`,
                        boxShadow: '0 0 12px rgba(74, 222, 128, 0.8)' // Increased glow
                    }}
                ></div>
            </div>

            {/* Elliptical orbital paths */}
            {portalReady && (
                <>
                    <div
                        className="absolute w-28 h-36 rounded-full border border-green-400/20 z-10" // Reduced opacity
                        style={{ top: 'calc(50% - 18px)', left: 'calc(50% - 14px)', transform: 'rotate(45deg)' }}
                    ></div>
                    <div
                        className="absolute w-28 h-36 rounded-full border border-green-400/20 z-10" // Reduced opacity
                        style={{ top: 'calc(50% - 18px)', left: 'calc(50% - 14px)', transform: 'rotate(-45deg)' }}
                    ></div>
                </>
            )}

            {/* Portal button */}
            <div
                className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-28 h-28 rounded-full flex items-center justify-center z-30
          transition-all duration-300 text-center cursor-pointer {/* Reduced duration */}
          bg-black/80 backdrop-blur-sm border border-green-500/40 {/* Adjusted opacity */}
          hover:border-green-400/70 hover:bg-black/60 {/* Adjusted opacity */}
          ${portalReady ? 'opacity-100' : 'opacity-50 pointer-events-none'} {/* Adjusted opacity */}
          ${isActive ? 'opacity-0' : ''}
        `}
                onClick={handleEnterPortal}
                style={{
                    boxShadow: portalReady ? `0 0 25px ${portalGlow * 4}px rgba(34, 197, 94, 0.5)` : 'none', // Increased glow and opacity
                    transition: 'box-shadow 0.5s ease-in-out, opacity 0.5s ease', // Reduced duration
                    pointerEvents: isActive ? 'none' : (portalReady ? 'auto' : 'none')
                }}
            >
                <span className="text-white font-semibold text-base tracking-wider"> {/* Adjusted font weight and tracking */}
                    Enter Portal
                </span>
            </div>

            {/* PORTAL text positioned below the button */}
            <div
                className={`
          absolute left-1/2 transform -translate-x-1/2 z-30
          text-center text-green-400 font-semibold text-xl tracking-widest {/* Adjusted font weight and size */}
          transition-all duration-500 {/* Reduced duration */}
          ${portalReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} {/* Adjusted scale */}
          ${isActive ? 'opacity-0' : ''}
        `}
                style={{
                    bottom: '-2.5rem', // Adjusted position
                    textShadow: portalReady ? `0 0 15px rgba(74, 222, 128, ${portalGlow * 0.7})` : 'none', // Increased glow and opacity
                    transition: 'text-shadow 0.5s ease-in-out, opacity 0.5s ease' // Reduced duration
                }}
            >
                PORTAL
            </div>

            {/* Square elements for decoration */}
            {portalReady && (
                <>
                    <div className="absolute right-[20%] bottom-[20%] w-2 h-2 bg-green-400/50 z-10"></div> {/* Adjusted position, size, and opacity */}
                    <div className="absolute right-[25%] bottom-[25%] w-1 h-1 bg-green-400/40 z-10"></div> {/* Adjusted position, size, and opacity */}
                    <div className="absolute right-[30%] top-[30%] w-1 h-3 bg-green-400/30 z-10"></div> {/* Adjusted position, size, and opacity */}
                </>
            )}

            {/* Core glow effect */}
            <div className="absolute inset-0 flex items-center justify-center z-15">
                <div className="w-1/5 h-1/5 rounded-full bg-green-400/30 filter blur-lg" // Adjusted size, opacity, and blur
                    style={{
                        transform: `scale(${portalGlow * 1.1})`, // Slightly increased scale effect
                        transition: 'transform 1s ease-in-out' // Reduced duration
                    }}></div>
            </div>
        </div>
    );
};
