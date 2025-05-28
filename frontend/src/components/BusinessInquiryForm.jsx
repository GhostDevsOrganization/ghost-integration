import React, { useState } from "react";
import { Building2, Mail, User, AlertCircle, Send } from "lucide-react";

export function BusinessInquiryForm({ className = "", onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        inquiryType: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters.";
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.company || formData.company.length < 2) {
            newErrors.company = "Company name must be at least 2 characters.";
        }

        if (!formData.inquiryType) {
            newErrors.inquiryType = "Please select an inquiry type.";
        }

        if (!formData.message || formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (onSubmit) {
                await onSubmit(formData);
            } else {
                // Default behavior - send email
                const subject = `Business Inquiry: ${formData.inquiryType}`;
                const body = `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`;
                window.location.href = `mailto:support@kasportal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }

            // Reset form
            setFormData({
                name: "",
                email: "",
                company: "",
                inquiryType: "",
                message: "",
            });
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <div className={`w-full max-w-lg mx-auto ${className}`}>
            <div className="relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-2xl hover:shadow-xl hover:border-teal-300 transition-all duration-700">
                <div className="mb-8">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Business Inquiry
                    </h3>
                    <p className="text-gray-600 text-lg">
                        Fill out the form below to get in touch with our team.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="John Doe"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.name ? "border-red-300" : "border-gray-200"
                                    }`}
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.email ? "border-red-300" : "border-gray-200"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Company Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleChange("company", e.target.value)}
                                placeholder="Your Company"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.company ? "border-red-300" : "border-gray-200"
                                    }`}
                            />
                        </div>
                        {errors.company && (
                            <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                        )}
                    </div>

                    {/* Inquiry Type Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Inquiry Type
                        </label>
                        <select
                            value={formData.inquiryType}
                            onChange={(e) => handleChange("inquiryType", e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.inquiryType ? "border-red-300" : "border-gray-200"
                                }`}
                        >
                            <option value="">Select inquiry type</option>
                            <option value="general">General Inquiry</option>
                            <option value="partnership">Partnership</option>
                            <option value="enterprise">Enterprise Solutions</option>
                            <option value="integration">API Integration</option>
                            <option value="investment">Investment Opportunities</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.inquiryType && (
                            <p className="mt-1 text-sm text-red-600">{errors.inquiryType}</p>
                        )}
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            placeholder="Please describe your inquiry in detail..."
                            rows={5}
                            className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${errors.message ? "border-red-300" : "border-gray-200"
                                }`}
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit Inquiry
                                <Send className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Your information is secure and will never be shared with third parties.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessInquiryForm;
