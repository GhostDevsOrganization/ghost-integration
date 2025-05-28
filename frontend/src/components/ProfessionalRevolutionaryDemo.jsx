import React from 'react';
import { Link } from 'react-router-dom';
import ProfessionalRevolutionaryLanding from './ProfessionalRevolutionaryLanding';

const ProfessionalRevolutionaryDemo = () => {
    return (
        <div className="relative">
            {/* Navigation overlay */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                >
                    ← Back to Main
                </Link>
            </div>

            {/* Professional Revolutionary Landing */}
            <ProfessionalRevolutionaryLanding />
        </div>
    );
};

export default ProfessionalRevolutionaryDemo;
