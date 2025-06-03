import React, { useEffect, useState } from 'react';

export default function EnhancedIPhoneMockupMobile() {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShouldAnimate(true);
            setTimeout(() => setShouldAnimate(false), 100);
        }, 20000);
        return () => clearInterval(interval);
    }, []);

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
            <style>{floatKeyframes}</style>

            <div className="flex flex-col items-center space-y-8">
                {/* Mobile iPhone Mockup */}
                <div className="flex justify-center">
                    <div className={`relative group ${shouldAnimate ? 'animate-float' : ''}`}>
                        {/* Glow effect optimized for mobile */}
                        <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                        {/* Simplified iPhone Frame for mobile */}
                        <div className="relative w-[280px] h-[560px] bg-[#1a1a1a] rounded-[40px] p-2 shadow-xl">
                            {/* Inner bezel */}
                            <div className="absolute inset-[1px] bg-[#2a2a2a] rounded-[39px]" />
                            <div className="absolute inset-[3px] bg-[#1a1a1a] rounded-[37px]" />

                            {/* Screen */}
                            <div className="relative w-full h-full bg-black rounded-[32px] overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140px] h-[24px] bg-[#1a1a1a] rounded-b-[16px] z-[100]" />

                                {/* Status Bar */}
                                <div className="absolute top-0 left-0 right-0 h-8 flex justify-between items-center px-6 z-[99] text-white text-xs font-medium">
                                    <div>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                    <div className="flex items-center gap-1">
                                        <div>📶</div>
                                        <div>🔋</div>
                                    </div>
                                </div>

                                {/* App Screen Content */}
                                <div className="w-full h-full rounded-xl pt-8 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                                    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                                        {/* Logo */}
                                        <img
                                            src="/icons/logo.png"
                                            alt="Kasportal Logo"
                                            className="w-32 h-32 object-contain transform hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* App Title */}
                                        <div className="text-center space-y-1">
                                            <h2 className="text-xl font-bold text-white">Kasportal</h2>
                                            <p className="text-xs text-gray-400">Your Gateway to Kaspa</p>
                                        </div>

                                        {/* Feature indicators */}
                                        <div className="flex space-x-3 mt-3">
                                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Physical buttons - simplified for mobile */}
                            <div className="absolute top-24 -left-0.5 w-0.5 h-12 bg-[#2a2a2a] rounded-l-lg" />
                            <div className="absolute top-40 -left-0.5 w-0.5 h-8 bg-[#2a2a2a] rounded-l-lg" />
                            <div className="absolute top-32 -right-0.5 w-0.5 h-16 bg-[#2a2a2a] rounded-r-lg" />
                        </div>
                    </div>
                </div>

                {/* Mobile-optimized content */}
                <div className="text-center max-w-sm">
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                        Kaspa, Mobile
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        <div className="px-3 py-1 bg-white/10 border border-gray-300 rounded-full text-sm flex items-center gap-1 text-gray-600">
                            <span>⚡</span> Instant
                        </div>
                        <div className="px-3 py-1 bg-white/10 border border-gray-300 rounded-full text-sm flex items-center gap-1 text-gray-600">
                            <span>🔒</span> Secure
                        </div>
                        <div className="px-3 py-1 bg-white/10 border border-gray-300 rounded-full text-sm flex items-center gap-1 text-gray-600">
                            <span>📱</span> Easy
                        </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Access Kasportal directly from your mobile browser. No app download required.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <div className="text-sm">Access Now</div>
                                <div className="text-xs opacity-80">Mobile Browser</div>
                            </div>
                        </button>

                        <div className="w-16 h-16 bg-white rounded-lg p-1">
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
