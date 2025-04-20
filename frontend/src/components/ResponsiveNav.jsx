import React, { useState } from 'react';
import { Menu, X, Home, ChevronDown } from 'lucide-react';

const ResponsiveNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="w-full py-4 px-6 z-50 fixed top-0 left-0 bg-black/80 backdrop-blur-md border-b border-green-800/50">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-2xl font-bold">
                        <span className="text-green-400">Kas</span><span className="text-white">portal</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="/" className="text-white hover:text-green-400 transition-colors">Home</a>
                    <a href="/features/token-swapping" className="text-white hover:text-green-400 transition-colors">Token Swapping</a>
                    <a href="/swap" className="text-white hover:text-green-400 transition-colors">Swap</a>
                    <a href="/tokens" className="text-white hover:text-green-400 transition-colors">Tokens</a>

                    <div className="relative">
                        <button
                            className="flex items-center text-white hover:text-green-400 transition-colors"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Resources <ChevronDown size={16} className="ml-1" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-green-800/50 rounded-md shadow-lg py-1">
                                <a href="/docs" className="block px-4 py-2 text-white hover:bg-green-800/20">Documentation</a>
                                <a href="/faq" className="block px-4 py-2 text-white hover:bg-green-800/20">FAQ</a>
                                <a href="/community" className="block px-4 py-2 text-white hover:bg-green-800/20">Community</a>
                            </div>
                        )}
                    </div>

                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors">
                        Connect Wallet
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden mt-4 pb-4">
                    <div className="flex flex-col space-y-4">
                        <a href="/" className="text-white hover:text-green-400 transition-colors">Home</a>
                        <a href="/features/token-swapping" className="text-white hover:text-green-400 transition-colors">Token Swapping</a>
                        <a href="/swap" className="text-white hover:text-green-400 transition-colors">Swap</a>
                        <a href="/tokens" className="text-white hover:text-green-400 transition-colors">Tokens</a>
                        <a href="/docs" className="text-white hover:text-green-400 transition-colors">Documentation</a>
                        <a href="/faq" className="text-white hover:text-green-400 transition-colors">FAQ</a>
                        <a href="/community" className="text-white hover:text-green-400 transition-colors">Community</a>

                        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors w-full">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default ResponsiveNav;
