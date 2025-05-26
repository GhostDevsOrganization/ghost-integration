import { useState } from 'react';
import { Repeat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Swap3DPreview() {
    const navigate = useNavigate();
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setRotateY((x - 0.5) * 30);
        setRotateX((y - 0.5) * -30);
    };

    return (
        <section className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Experience 3D Trading
                </h2>
                <p className="text-xl text-gray-200/90 max-w-3xl mx-auto">
                    Preview our revolutionary swap interface with real-time 3D visualization
                </p>
            </div>

            <div className="flex justify-center" style={{ perspective: '1500px' }}>
                <div
                    className="relative w-full max-w-2xl"
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.1s ease-out'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
                >
                    {/* Main swap card */}
                    <div className="bg-gradient-to-br from-purple-900/50 to-teal-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-8 text-center">Instant Swap</h3>

                        {/* From */}
                        <div className="mb-6">
                            <div className="bg-black/40 rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-transform">
                                <div className="flex justify-between items-center">
                                    <input
                                        type="text"
                                        defaultValue="1.0"
                                        className="bg-transparent text-4xl text-white outline-none w-full"
                                        readOnly
                                    />
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                                        <span className="text-2xl">Ξ</span>
                                        <span>ETH</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Animated swap icon */}
                        <div className="flex justify-center my-8">
                            <div className="relative w-16 h-16 group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full animate-spin-slow" />
                                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Repeat className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* To */}
                        <div className="mb-8">
                            <div className="bg-black/40 rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-transform">
                                <div className="flex justify-between items-center">
                                    <input
                                        type="text"
                                        defaultValue="1,234.56"
                                        readOnly
                                        className="bg-transparent text-4xl text-white outline-none w-full"
                                    />
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                                        <span className="text-2xl">K</span>
                                        <span>KAS</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Rate</div>
                                <div className="text-lg text-white">1:1234.56</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Fee</div>
                                <div className="text-lg text-white">$0.02</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400">Time</div>
                                <div className="text-lg text-white">~15s</div>
                            </div>
                        </div>

                        {/* Swap button */}
                        <button
                            onClick={() => navigate('/features/token-swapping')}
                            className="w-full py-5 bg-gradient-to-r from-teal-600 to-purple-600 rounded-2xl font-bold text-white text-xl hover:scale-105 transition-transform duration-300 shadow-2xl shadow-purple-500/50"
                        >
                            Try Swap Now
                        </button>
                    </div>

                    {/* 3D shadow effect */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-teal-900/30 rounded-3xl blur-xl"
                        style={{
                            transform: 'translateZ(-50px) scale(0.9)',
                            opacity: 0.5
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
