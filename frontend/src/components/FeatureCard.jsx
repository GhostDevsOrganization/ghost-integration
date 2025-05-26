import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, route, color, comingSoon, delay }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route && !comingSoon) {
            navigate(route);
            // Scroll to top when navigating
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div
            className={`group relative p-8 bg-[var(--secondary-bg)] backdrop-blur-2xl border border-[var(--text-secondary)]/20 rounded-3xl hover:border-[var(--accent-primary)]/60 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-2xl shadow-[var(--primary-bg)]/30 hover:shadow-[var(--accent-primary)]/30 ${!comingSoon ? 'cursor-pointer' : 'cursor-default'}`}
            style={{ animationDelay: `${delay}s` }}
            onClick={handleClick}
        >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${color || 'from-teal-500/10 to-purple-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ${i % 3 === 0 ? 'bg-teal-400' :
                            i % 3 === 1 ? 'bg-purple-400' :
                                'bg-blue-400'
                            }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`,
                            transform: 'translateY(20px)',
                        }}
                    />
                ))}
            </div>

            {/* Icon container */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <div className="text-teal-400 group-hover:text-white transition-colors duration-300">
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className="text-center relative z-10">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                    {title}
                    {comingSoon && (
                        <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 text-[var(--accent-primary)] rounded-full border border-[var(--accent-primary)]/30 backdrop-blur-sm">
                            Coming Soon
                        </span>
                    )}
                </h3>
                <p className="text-[var(--text-secondary)] group-hover:text-[var(--text-tertiary)] transition-colors duration-300 leading-relaxed font-medium">
                    {description}
                </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 border-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Glow effect - positioned correctly */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[var(--accent-primary)]/0 via-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
        </div>
    );
};

export default FeatureCard;
