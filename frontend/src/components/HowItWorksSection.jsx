import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Twitter from 'lucide-react/dist/esm/icons/twitter';
import Github from 'lucide-react/dist/esm/icons/github';
import Send from 'lucide-react/dist/esm/icons/send';
import DiscordIcon from './DiscordIcon';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Book from 'lucide-react/dist/esm/icons/book';

const HowItWorksSection = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { number: 1, text: "Initiate Swap" },
        { number: 2, text: "Provide Destination Address" },
        { number: 3, text: "Receive Deposit Address" },
        { number: 4, text: "Send Funds" },
        { number: 5, text: "Exchange Processed" },
        { number: 6, text: "Receive Swapped Tokens" }
    ];

    const stepContent = [
        {
            title: "Initiate Swap",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L3 14L7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17 14L21 10L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3 14H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            description: "Select the cryptocurrencies you want to swap and enter the amount."
        },
        {
            title: "Provide Destination Address",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 20V4H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M20 16L20 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M7 7L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            description: "Enter the wallet address where you want to receive your swapped tokens."
        },
        {
            title: "Receive Deposit Address",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3.5V2M14.5 3.5V2M9 22V20.5M14.5 22V20.5M3.5 9H2M3.5 14.5H2M22 9H20.5M22 14.5H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.5 8.5C6.5 7.4 7.4 6.5 8.5 6.5H15.5C16.6 6.5 17.5 7.4 17.5 8.5V15.5C17.5 16.6 16.6 17.5 15.5 17.5H8.5C7.4 17.5 6.5 16.6 6.5 15.5V8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            description: "Get a unique deposit address for sending your source cryptocurrency."
        },
        {
            title: "Send Funds",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            description: "Send the exact amount of cryptocurrency to the provided deposit address."
        },
        {
            title: "Exchange Processed",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            description: "Our partners process your exchange at the optimal rate. Track progress in real-time."
        },
        {
            title: "Receive Swapped Tokens",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C19.90337 9.99872 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            description: "Your swapped tokens are sent to your specified destination address."
        }
    ];

    // Handle step navigation
    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const benefits = [
        { title: "Speed & Efficiency", description: "Fast transactions with automatic rate calculations" },
        { title: "Security", description: "No need to create accounts on external exchanges" },
        { title: "Simplicity", description: "User-friendly interface without complex order books" },
        { title: "Variety", description: "Access to numerous cryptocurrencies across multiple networks" }
    ];

    return (
        <section className="py-24 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4 text-white">Token Swapping</h2>
                <p className="text-base text-gray-400 max-w-3xl mx-auto text-center mb-8">
                    Seamlessly swap between a wide range of cryptocurrencies directly within the Kaspa Portal. Our integration with a leading swapping service allows you to exchange assets across different blockchain networks quickly and securely.
                </p>

                {/* Universal Token Swapping Feature */}
                <div className="mb-16">
                    <div className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-bold text-green-400 mb-4">Swap Any Cryptocurrency</h3>
                                <p className="text-gray-300 mb-6">
                                    Kasportal's advanced cross-chain technology is already implemented and fully functional, allowing you to exchange virtually any cryptocurrency for any other cryptocurrency, regardless of their native blockchains. Our integration handles all the complex cross-chain operations behind the scenes.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">Supporting 900+ cryptocurrencies across all major blockchain networks</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">Automated best-rate finding ensures you get the most favorable exchange rates</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">No account creation required - connect your wallet and start swapping immediately</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">Minimal fees compared to traditional exchanges</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Swap Visualization */}
                            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-green-400/20 p-6 flex items-center justify-center">
                                <div className="w-full max-w-md">
                                    {/* Swap Interface Mockup */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-400">You send</span>
                                                <span className="text-sm text-gray-400">Balance: 0.42 BTC</span>
                                            </div>
                                            <div className="flex bg-black/60 border border-green-400/30 rounded-lg p-3">
                                                <input
                                                    type="text"
                                                    className="bg-transparent text-white flex-grow outline-none"
                                                    placeholder="0.0"
                                                    defaultValue="0.05"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                                                    <span className="font-medium">BTC</span>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Swap icon */}
                                        <div className="flex justify-center">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500/30 transition-colors">
                                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-400">You receive (estimated)</span>
                                                <span className="text-sm text-gray-400">1 BTC ≈ 64,280 KAS</span>
                                            </div>
                                            <div className="flex bg-black/60 border border-green-400/30 rounded-lg p-3">
                                                <input
                                                    type="text"
                                                    className="bg-transparent text-white flex-grow outline-none"
                                                    placeholder="0.0"
                                                    defaultValue="3,214"
                                                    readOnly
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                                    <span className="font-medium">KAS</span>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                <span>Exchange Rate</span>
                                                <span>1 BTC = 64,280 KAS</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                <span>Network Fee</span>
                                                <span>0.0001 BTC</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>Estimated Arrival</span>
                                                <span>~20 minutes</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => window.location.href = '/features/token-swapping'}
                                            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-400 hover:to-green-500 transition-colors"
                                        >
                                            Swap Now
                                        </button>
                                    </div>
                                </div>

                                {/* Animated Particles */}
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={`swap-particle-${i}`}
                                        className="absolute rounded-full bg-green-400"
                                        style={{
                                            width: `${Math.random() * 4 + 2}px`,
                                            height: `${Math.random() * 4 + 2}px`,
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            opacity: Math.random() * 0.7 + 0.3,
                                            animation: `floatSwap ${Math.random() * 3 + 6}s linear infinite`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
                    <div className="flex justify-between items-center mb-8 relative">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                onClick={() => setCurrentStep(step.number)}
                                className={`relative z-10 flex flex-col items-center cursor-pointer transition-all duration-300 ${currentStep >= step.number ? 'opacity-100' : 'opacity-40'}`}
                            >
                                <div className={`w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2 transition-all duration-300 ${currentStep === step.number ? 'bg-green-500 text-black' : 'bg-black border border-green-500/40 text-green-400'}`}>
                                    <span>{step.number}</span>
                                </div>
                                <span className="text-xs text-center max-w-[80px] md:max-w-[120px] hidden md:block">{step.text}</span>
                            </div>
                        ))}
                        <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-green-500 to-green-500 transform -translate-y-1/2 -z-0">
                            <div
                                className="h-full bg-green-400"
                                style={{
                                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                                    transition: 'width 0.5s ease-in-out'
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="bg-black/40 border border-green-500/20 rounded-lg p-6 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mr-4 text-green-400">
                                {stepContent[currentStep - 1].icon}
                            </div>
                            <h3 className="text-xl font-bold text-green-400">{stepContent[currentStep - 1].title}</h3>
                        </div>
                        <p className="text-gray-300">{stepContent[currentStep - 1].description}</p>
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className={`px-4 py-2 rounded border border-green-500/40 text-sm ${currentStep > 1 ? 'hover:bg-green-500/20 text-green-400' : 'opacity-50 cursor-not-allowed'}`}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextStep}
                                className={`px-4 py-2 rounded text-sm ${currentStep < steps.length ? 'bg-green-500 text-black hover:bg-green-400' : 'opacity-50 cursor-not-allowed bg-gray-600'}`}
                                disabled={currentStep === steps.length}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-8 text-center text-white">Features & Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm"
                            >
                                <h4 className="text-xl font-bold mb-2 text-green-400">{benefit.title}</h4>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/features/token-swapping"
                        className="px-8 py-3 rounded-md bg-green-500 hover:bg-green-400 text-white font-semibold transition-colors duration-300 inline-flex items-center justify-center gap-2"
                    >
                        Try Token Swapping <ArrowRight size={18} />
                    </Link>
                    <p className="mt-2 text-gray-400">Experience the easiest way to exchange cryptocurrencies on Kasportal</p>
                </div>
            </div>
        </section>
    );
};

// Multi-Wallet Support Section Component
const MultiWalletSection = () => {
    const keyBenefits = [
        "Unified Cross-Chain View",
        "Seamless Cross-Chain Operations",
        "Enhanced Security & Control",
        "Kasware Integration (Current)",
        "Expanded Wallet Support (Coming Soon)"
    ];

    const supportedWallets = [
        { emoji: "💼", name: "Kasware" },
        { emoji: "🦊", name: "Metamask" },
        { emoji: "💰", name: "Kaspium" },
        { emoji: "☀️", name: "Raydium" },
        { emoji: "🔒", name: "Hardware Wallets" },
        { emoji: "⏳", name: "More Coming Soon" }
    ];

    const howItWorks = [
        {
            title: "1. Connect Securely",
            description: "Connect your Kasware wallet (and more coming soon) using secure, non-custodial methods."
        },
        {
            title: "2. View & Simulate",
            description: "See your combined assets and interact with DeFi simulations using your connected wallets."
        },
        {
            title: "3. Prepare for Native DeFi",
            description: "Your connected wallets will be ready for seamless interaction with native Kaspa DeFi when smart contracts are available."
        }
    ];

    return (
        <section className="py-24 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4 text-white">Multi-Wallet Support</h2>
                <p className="text-base text-gray-400 text-center mb-12 max-w-3xl mx-auto">
                    Kasportal's multi-wallet support is a core component of our Phase 1 roadmap, enabling a unified view and management of your assets across different chains. Connect your wallets securely to interact with our growing suite of DeFi simulations and future native protocols.
                </p>

                {/* Key Benefits */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold mb-8 text-center text-white">Key Benefits</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {keyBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm text-center"
                            >
                                <p className="text-green-400 font-bold">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Unified Cross-Chain View */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold mb-8 text-center text-white">Unified Cross-Chain View</h3>
                    <div className="bg-green-900/10 rounded-xl p-8 border border-green-400/20">
                        <p className="text-gray-300 text-center">
                            See the total value and distribution of your assets across all connected wallets and supported chains in one place.
                        </p>
                    </div>
                </div>

                {/* Supported Wallets */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold mb-8 text-center text-white">Supported Wallets</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {supportedWallets.map((wallet, index) => (
                            <div
                                key={index}
                                className="p-4 sm:p-6 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm text-center"
                            >
                                <div className="text-3xl sm:text-4xl mb-2">{wallet.emoji}</div>
                                <p className="text-white font-medium text-sm sm:text-base">{wallet.name}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-400 mt-6">
                        We currently support Kasware wallet integration. More wallets are being added regularly as part of our roadmap!
                    </p>
                </div>

                {/* How It Works */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold mb-8 text-center text-white">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {howItWorks.map((step, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm"
                            >
                                <h4 className="text-xl font-bold mb-4 text-green-400">{step.title}</h4>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button
                        onClick={() => {
                            // Show a notification or alert to simulate wallet connection
                            alert("Wallet connection feature is being implemented. Redirecting to wallet connection page.");
                            // Then navigate to the wallet support page using window.location
                            window.location.href = '/features/multi-wallet-support';
                        }}
                        className="px-8 py-3 rounded-md bg-green-500 hover:bg-green-400 text-white font-semibold transition-colors duration-300 inline-flex items-center justify-center gap-2"
                    >
                        Connect Your Kasware Wallet <ArrowRight size={18} />
                    </button>
                    <p className="mt-2 text-gray-400">Start managing your Kaspa assets and prepare for the future of DeFi</p>
                </div>
            </div>
        </section>
    );
};

export { HowItWorksSection, MultiWalletSection };
