import React from 'react';

const NewKasportalLogo = ({ size = 'medium', className = '', animated = true }) => {
    // Determine dimensions based on size prop
    let dimensions = {
        small: { width: 24, height: 24 },
        medium: { width: 32, height: 32 },
        large: { width: 48, height: 48 },
        xlarge: { width: 64, height: 64 }
    }[size] || { width: 32, height: 32 };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <svg
                width={dimensions.width}
                height={dimensions.height}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={animated ? 'hover:scale-110 transition-transform duration-300' : ''}
            >
                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="50%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                    <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1f2937" />
                        <stop offset="100%" stopColor="#000000" />
                    </linearGradient>
                </defs>

                {/* Outer 3D Hexagon */}
                <g>
                    {/* Main hexagon face */}
                    <path
                        d="M50 8L85 28V68L50 88L15 68V28L50 8Z"
                        fill="url(#hexGradient)"
                        stroke="none"
                    />

                    {/* 3D depth effect - right side */}
                    <path
                        d="M85 28L92 32V72L85 68V28Z"
                        fill="#0891B2"
                        opacity="0.8"
                    />

                    {/* 3D depth effect - bottom */}
                    <path
                        d="M50 88L85 68L92 72L57 92L50 88Z"
                        fill="#0369A1"
                        opacity="0.9"
                    />
                </g>

                {/* Inner black hexagon */}
                <path
                    d="M50 18L75 33V63L50 78L25 63V33L50 18Z"
                    fill="url(#innerGradient)"
                    stroke="none"
                />

                {/* White swirl pattern */}
                <g fill="white">
                    {/* Central swirl elements */}
                    <path
                        d="M50 25C60 25 68 33 68 43C68 48 65 52 61 54C58 48 53 43 47 41C49 38 51 36 54 35C56 34 58 33 61 33C63 33 65 34 66 36"
                        className={animated ? 'animate-spin-slow' : ''}
                        style={{ animationDuration: '8s', transformOrigin: '50px 48px' }}
                    />

                    <path
                        d="M50 71C40 71 32 63 32 53C32 48 35 44 39 42C42 48 47 53 53 55C51 58 49 60 46 61C44 62 42 63 39 63C37 63 35 62 34 60"
                        className={animated ? 'animate-spin-slow' : ''}
                        style={{ animationDuration: '8s', animationDirection: 'reverse', transformOrigin: '50px 48px' }}
                    />

                    {/* Additional swirl arms */}
                    <path
                        d="M58 30C65 32 70 38 70 45C70 47 69 49 68 50C66 46 63 42 59 40C60 37 59 34 58 32C58 31 58 30 58 30Z"
                        className={animated ? 'animate-pulse' : ''}
                    />

                    <path
                        d="M42 66C35 64 30 58 30 51C30 49 31 47 32 46C34 50 37 54 41 56C40 59 41 62 42 64C42 65 42 66 42 66Z"
                        className={animated ? 'animate-pulse' : ''}
                        style={{ animationDelay: '0.5s' }}
                    />

                    <path
                        d="M62 55C65 52 66 48 66 44C66 42 65 41 64 40C61 42 58 45 56 48C58 50 60 52 61 54C61 54 62 55 62 55Z"
                        className={animated ? 'animate-pulse' : ''}
                        style={{ animationDelay: '1s' }}
                    />

                    <path
                        d="M38 41C35 44 34 48 34 52C34 54 35 55 36 56C39 54 42 51 44 48C42 46 40 44 39 42C39 42 38 41 38 41Z"
                        className={animated ? 'animate-pulse' : ''}
                        style={{ animationDelay: '1.5s' }}
                    />
                </g>
            </svg>
        </div>
    );
};

export default NewKasportalLogo;
