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

    return (
        <div className="flex items-center justify-center p-8 overflow-hidden relative">
            {/* Main content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
                {/* iPhone Mockup */}
                <div className={`relative group ${shouldAnimate ? 'animate-float' : ''}`}>
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-[60px] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* iPhone Frame */}
                    <div className="relative w-[380px] h-[780px] bg-[#1a1a1a] rounded-[50px] p-3 shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02]">
                        {/* Inner bezel */}
                        <div className="absolute inset-[2px] bg-[#2a2a2a] rounded-[48px]" />
                        <div className="absolute inset-[4px] bg-[#1a1a1a] rounded-[46px]" />

                        {/* Screen */}
                        <div className="relative w-full h-full bg-black rounded-[38px] overflow-hidden">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[210px] h-[30px] bg-[#1a1a1a] rounded-b-[20px] z-[100]" />

                            {/* Status Bar */}
                            <div className="absolute top-0 left-0 right-0 h-11 flex justify-between items-center px-8 z-[99] text-white text-sm font-medium">
                                <div>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                <div className="flex items-center gap-1">
                                    <div>📶</div>
                                    <div>📶</div>
                                    <div>🔋</div>
                                </div>
                            </div>

                            {/* Clean Phone Screen with Your SVG */}
                            <div className="w-full h-full rounded-xl pt-11 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                                <div className="flex items-center justify-center w-full h-full">
                                    {/* Your SVG will be integrated here */}
                                    <img
                                        src="/images/kasportal-app-screenshot.png"
                                        alt="Kasportal App Screenshot"
                                        className="w-64 h-auto max-w-full rounded-lg drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Physical buttons */}
                        <div className="absolute top-32 -left-1 w-1 h-16 bg-[#2a2a2a] rounded-l-lg" />
                        <div className="absolute top-52 -left-1 w-1 h-12 bg-[#2a2a2a] rounded-l-lg" />
                        <div className="absolute top-72 -left-1 w-1 h-12 bg-[#2a2a2a] rounded-l-lg" />
                        <div className="absolute top-44 -right-1 w-1 h-20 bg-[#2a2a2a] rounded-r-lg" />
                    </div>
                </div>

                {/* Side Content */}
                <div className="max-w-md text-center lg:text-left">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                        Kaspa, Mobile
                    </h1>
                    

                    <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                        <div className="px-4 py-2 text-gray-600 bg-white/5 border border-white/20 rounded-full text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 text-gray-300">
                            <span>⚡</span> Instant
                        </div>
                        <div className="px-4 py-2 text-gray-600 bg-white/5 border border-white/20 rounded-full text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 text-gray-300">
                            <span>🔒</span> Secure
                        </div>
                        <div className="px-4 py-2 text-gray-600 bg-white/5 border border-white/20 rounded-full text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 text-gray-300">
                            <span>📱</span> Easy
                        </div>
                    </div>
                <p className="text-xl  text-gray-600 mb-8 leading-relaxed">
                        Powered by Kaspa's lightning-fast blockDAG. Manage, monitor, and send your crypto everywhere you go.
                    </p>
                    <div className="flex gap-4 items-center justify-center lg:justify-start">
                        <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <div className="text-base">Access now via</div>
                                <div className="text-xs opacity-80">mobile browser</div>
                            </div>
                        </button>

                        <div className="w-24 h-24 bg-white rounded-xl p-2">
                            <div className="w-full h-full bg-black rounded-lg flex items-center justify-center text-xs font-mono">
                                QR CODE
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out 1;
        }
      `}</style>
        </div>
    );
}
