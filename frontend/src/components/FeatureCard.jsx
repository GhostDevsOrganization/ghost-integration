import React from 'react';

const FeatureCard = ({ icon, title, description, comingSoon }) => {
    return (
        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-b from-green-900/20 to-black border border-green-400/10 p-6 transition-all duration-300 hover:border-green-400/30 hover:shadow-lg hover:shadow-green-400/5">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Decorative lines */}
            <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-green-400 to-transparent group-hover:w-full transition-all duration-700"></div>
            <div className="absolute bottom-0 right-0 h-px w-0 bg-gradient-to-l from-green-400 to-transparent group-hover:w-full transition-all duration-700"></div>

            <div className="mb-4 text-green-400 p-3 bg-green-400/10 rounded-lg inline-block">{icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-400 transition-colors duration-300">
                {title} {comingSoon && <span className="ml-2 text-xs text-green-500">(Coming Soon)</span>}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
        </div>
    );
};

export default FeatureCard;
