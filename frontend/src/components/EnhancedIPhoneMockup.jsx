import React, { useEffect, useState } from 'react';

export default function EnhancedIPhoneMockup() {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        // Start animation immediately
        setShouldAnimate(false);

        // Set up interval to trigger animation every 20 seconds
        const interval = setInterval(() => {
            setShouldAnimate(false);
            // Small delay to reset animation
            setTimeout(() => setShouldAnimate(false), 100);
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    // Define the styles as a JavaScript object
    const floatKeyframes = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .animate-float {
            animation: float 6s ease-in-out 1;
        }
    `;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Add the style using a standard style tag */}
            <style>{floatKeyframes}</style>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* iPhone Mockup Column */}
                <div className="flex justify-center">
                    <div className={`relative group ${shouldAnimate ? 'animate-float' : ''}`}>
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-[60px] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* iPhone Frame - Single clean frame */}
                        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] aspect-[9/19] bg-[#1a1a1a] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-2 sm:p-3 shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02] mx-auto">

                            {/* Screen - Direct child, no extra bezels */}
                            <div className="relative w-full h-full bg-black rounded-[25px] sm:rounded-[35px] md:rounded-[45px] overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] sm:w-[150px] md:w-[180px] h-[20px] sm:h-[25px] md:h-[30px] bg-[#1a1a1a] rounded-b-[15px] sm:rounded-b-[18px] md:rounded-b-[20px] z-[100]" />

                                {/* Status Bar */}
                                <div className="absolute top-0 left-0 right-0 h-8 sm:h-9 md:h-11 flex justify-between items-center px-4 sm:px-6 md:px-8 z-[99] text-white text-xs sm:text-sm font-medium">
                                    <div>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                    <div className="flex items-center gap-1">
                                        <div>📶</div>
                                        <div>📶</div>
                                        <div>🔋</div>
                                    </div>
                                </div>

                                {/* Clean Phone Screen with Updated Logo */}
                                <div className="w-full h-full rounded-xl pt-8 sm:pt-9 md:pt-11 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                                    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 sm:space-y-6 px-4">
                                        {/* Updated Logo - using the SVG from header */}
                                        <div className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 flex items-center justify-center">
                                            <svg
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="transform hover:scale-110 transition-transform duration-500"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM12.4306 9.70695C12.742 9.33317 13.2633 9.30058 13.6052 9.62118L19.1798 14.8165C19.4894 15.1054 19.4894 15.5841 19.1798 15.873L13.6052 21.0683C13.2633 21.3889 12.742 21.3563 12.4306 19.9991V9.70695Z"
                                                    fill="url(#gradient)"
                                                />
                                                <defs>
                                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#14b8a6" />
                                                        <stop offset="100%" stopColor="#8b5cf6" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>

                                        {/* App Title */}
                                        <div className="text-center space-y-1 sm:space-y-2">
                                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                                Kasportal
                                            </h2>
                                            <p className="text-xs sm:text-sm text-gray-400">
                                                Your Gateway to Kaspa
                                            </p>
                                        </div>

                                        {/* Feature indicators */}
                                        <div className="flex space-x-3 sm:space-x-4 mt-2 sm:mt-4">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Physical buttons - Responsive sizing */}
                            <div className="absolute top-20 sm:top-24 md:top-32 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-8 sm:h-12 md:h-16 bg-[#2a2a2a] rounded-l-lg" />
                            <div className="absolute top-32 sm:top-40 md:top-52 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-6 sm:h-8 md:h-12 bg-[#2a2a2a] rounded-l-lg" />
                            <div className="absolute top-44 sm:top-56 md:top-72 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-6 sm:h-8 md:h-12 bg-[#2a2a2a] rounded-l-lg" />
                            <div className="absolute top-28 sm:top-36 md:top-44 -right-0.5 sm:-right-1 w-0.5 sm:w-1 h-10 sm:h-14 md:h-20 bg-[#2a2a2a] rounded-r-lg" />
                        </div>
                    </div>
                </div>

                {/* Content Column */}
                <div className="flex flex-col justify-center text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                        Kaspa, Mobile
                    </h1>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center lg:justify-start">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 bg-white/5 border border-white/20 rounded-full text-xs sm:text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 text-gray-300">
                            <span>⚡</span> Instant
                        </div>
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 bg-white/5 border border-white/20 rounded-full text-xs sm:text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 text-gray-300">
                            <span>🔒</span> Secure
                        </div>
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 bg-white/5 border border-white/20 rounded-full text-xs sm:text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 text-gray-300">
                            <span>📱</span> Easy
                        </div>
                    </div>

                    <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                        Powered by Kaspa's lightning-fast blockDAG. Manage, monitor, and send your crypto everywhere you go.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 transition-transform duration-300 text-white text-sm sm:text-base">
                            <div className="text-center">
                                <div className="text-sm sm:text-base">Access now via</div>
                                <div className="text-xs opacity-80">mobile browser</div>
                            </div>
                        </button>

                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-xl p-2">
                            <img
                                src="/images/KASQR.svg"
                                alt="Kasportal QR Code"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
