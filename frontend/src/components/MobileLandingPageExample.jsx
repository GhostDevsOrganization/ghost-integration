import React, { useState, useEffect } from 'react';

// Example of mobile-optimized LandingPage section
const MobileLandingPageExample = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Hero Section - Mobile Optimized */}
            <section className="relative">
                {/* Conditional 3D Background */}
                {!isMobile && <QuantumBackground />}

                {/* Mobile-friendly gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-purple-50 opacity-90" />

                {/* Content with responsive padding */}
                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-20">
                    {/* Responsive Typography */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
                        <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome to Ghost Integration
                        </span>
                    </h1>

                    {/* Mobile-optimized description */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12">
                        Experience seamless blockchain integration with our cutting-edge platform
                    </p>

                    {/* Mobile-friendly button group */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                        <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full font-bold text-base md:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </button>
                        <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-teal-500 text-teal-600 rounded-full font-bold text-base md:text-lg hover:bg-teal-50 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section - Mobile Optimized Grid */}
            <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
                    Key Features
                </h2>

                {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            {/* Different icon sizes for mobile/desktop */}
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-4 md:mb-6" />

                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4">
                                Feature {item}
                            </h3>

                            <p className="text-sm md:text-base text-gray-600">
                                Description of this amazing feature that works perfectly on all devices
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mobile-Optimized Stats Section */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Stack on mobile, grid on desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { label: 'Users', value: '10K+' },
                            { label: 'Transactions', value: '1M+' },
                            { label: 'Partners', value: '50+' },
                            { label: 'Countries', value: '100+' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-1 md:mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Navigation FAB */}
            <button
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full text-white shadow-lg flex items-center justify-center md:hidden"
                aria-label="Navigation menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    );
};

// Mobile Touch Gesture Hook Example
const useMobileGestures = () => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            console.log('Swiped left');
            // Handle left swipe
        }
        if (isRightSwipe) {
            console.log('Swiped right');
            // Handle right swipe
        }
    };

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    };
};

// Performance Optimization Component
const MobileOptimizedImage = ({ src, alt, className }) => {
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={className}>
            {isInView ? (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
        </div>
    );
};

export default MobileLandingPageExample;
