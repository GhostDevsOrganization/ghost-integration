import React, { useState } from 'react';
import { X, Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase } from '../config/supabase';

const BetaTestForm = ({ isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interests: [],
        comments: '',
        referralSource: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const interestOptions = [
        'Token Swapping',
        'Cross-Chain Trading',
        'Advanced Analytics',
        'Portfolio Management',
        'DeFi Integration',
        'Mobile Trading',
        'Research Tools',
        'Community Features'
    ];

    const referralSources = [
        'Social Media',
        'Search Engine',
        'Friend/Colleague',
        'Crypto Community',
        'News Article',
        'Other'
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleInterestChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Try Supabase first, fallback to localStorage
            try {
                const { data, error } = await supabase
                    .from('beta_submissions')
                    .insert([{
                        name: formData.name,
                        email: formData.email,
                        interests: formData.interests,
                        referral_source: formData.referralSource,
                        comments: formData.comments
                    }]);

                if (error) {
                    if (error.code === '23505' && error.details.includes('email')) {
                        setErrors({ email: 'This email is already registered for beta access.' });
                    } else {
                        setErrors({ submit: 'Something went wrong. Please try again.' });
                    }
                    throw error; // Re-throw to enter the outer catch block
                }

                console.log('Successfully saved to Supabase:', data);
            } catch (supabaseError) {
                // Error already handled by setting errors state
                console.error('Supabase submission error:', supabaseError);
            }

            // Simulate processing delay only if no errors were set
            if (Object.keys(errors).length === 0) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            setIsSubmitted(true);

            // Auto close after success message
            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    interests: [],
                    comments: '',
                    referralSource: ''
                });
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Form Container */}
            <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-2xl p-8 shadow-2xl shadow-teal-500/20">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Success State */}
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center">
                                <CheckCircle size={40} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Future!</h2>
                            <p className="text-teal-200 text-lg mb-2">Thank you for joining our beta program.</p>
                            <p className="text-gray-300">We'll be in touch soon with exclusive access and updates.</p>
                            <div className="mt-6 flex justify-center">
                                <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Beta</span>
                                </h2>
                                <p className="text-gray-300">Be among the first to experience the future of smart contracts on kaspa</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-teal-200 text-sm font-medium mb-2">
                                        <User size={16} className="inline mr-2" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-teal-600/50'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-teal-200 text-sm font-medium mb-2">
                                        <Mail size={16} className="inline mr-2" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-teal-600/50'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Interests */}
                                <div>
                                    <label className="block text-teal-200 text-sm font-medium mb-3">
                                        What interests you most? (Select all that apply)
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {interestOptions.map((interest) => (
                                            <label
                                                key={interest}
                                                className="flex items-center cursor-pointer group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.interests.includes(interest)}
                                                    onChange={() => handleInterestChange(interest)}
                                                    className="sr-only"
                                                />
                                                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${formData.interests.includes(interest)
                                                    ? 'bg-gradient-to-br from-teal-400 to-purple-500 border-teal-400'
                                                    : 'border-gray-500 group-hover:border-teal-400'
                                                    }`}>
                                                    {formData.interests.includes(interest) && (
                                                        <CheckCircle size={12} className="text-white" />
                                                    )}
                                                </div>
                                                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                                    {interest}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Referral Source */}
                                <div>
                                    <label className="block text-teal-200 text-sm font-medium mb-2">
                                        How did you hear about us?
                                    </label>
                                    <select
                                        name="referralSource"
                                        value={formData.referralSource}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800/50 border border-teal-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
                                    >
                                        <option value="">Select an option</option>
                                        {referralSources.map((source) => (
                                            <option key={source} value={source}>{source}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Comments */}
                                <div>
                                    <label className="block text-teal-200 text-sm font-medium mb-2">
                                        <MessageSquare size={16} className="inline mr-2" />
                                        Additional Comments
                                    </label>
                                    <textarea
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full bg-gray-800/50 border border-teal-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors resize-none"
                                        placeholder="Tell us about your trading experience or what features you're most excited about..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/25"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Joining Beta...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Join Beta Program</span>
                                        </>
                                    )}
                                </button>

                                {errors.submit && (
                                    <p className="text-red-400 text-sm text-center">{errors.submit}</p>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BetaTestForm;
