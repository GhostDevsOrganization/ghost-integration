import { useState, useEffect } from 'react';

const HolographicStats = () => {
    const [isVisible, setIsVisible] = useState(false);

    const stats = [
        { label: "Development Progress", value: "75%", growth: 85 },
        { label: "Features Completed", value: "12/16", growth: 75 },
        { label: "Beta Testing Phase", value: "Q2 2025", growth: 60 },
        { label: "Mobile App Progress", value: "40%", growth: 40 }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('holographic-stats');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return (
        <section id="holographic-stats" className="py-32 px-4 relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(45, 212, 191, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(45, 212, 191, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        animation: 'grid-move 20s linear infinite'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                    Live Platform Metrics
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative group transform hover:scale-105 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                transitionDelay: `${index * 0.2}s`
                            }}
                        >
                            {/* Holographic layers */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-purple-600/20 rounded-2xl blur-xl" />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-purple-600/10 rounded-2xl transform rotate-3" />

                            {/* Card */}
                            <div className="relative bg-black/50 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-8">
                                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-400 mb-4">{stat.label}</div>
                                <div className={`text-sm font-medium ${stat.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.growth > 0 ? '+' : ''}{stat.growth}%
                                </div>

                                {/* Progress bar */}
                                <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full transition-all duration-1000"
                                        style={{
                                            width: isVisible ? `${Math.abs(stat.growth) * 3}%` : '0%',
                                            transitionDelay: `${index * 0.2}s`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HolographicStats;
