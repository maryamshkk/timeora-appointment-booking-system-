import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Key } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError("Please enter your business email address.");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        // TODO: axios POST /api/auth/company/forgot-password with { email }
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            // In production, you would handle the response:
            // if (response.data.success) { setSubmitted(true); }
        }, 1500);
    };

    // If submitted, show confirmation message
    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Column - Marketing */}
                <div className="w-full md:w-1/2 bg-beige flex flex-col justify-center items-center px-8 py-10 md:px-16 md:py-12">
                    <div className="w-full max-w-[440px]">
                        <p className="text-xs font-bold uppercase tracking-widest text-brown mb-4">
                            ACCOUNT RECOVERY
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6">
                            Get Back Into Your Business Workspace.
                        </h1>
                        <p className="text-base text-slate leading-relaxed max-w-[440px] mb-14">
                            Regain access to your elite scheduling tools and client management dashboard. Security protocols ensure your data remains protected.
                        </p>

                        {/* Illustration */}
                        <div className="hidden sm:block w-64 h-64 relative border border-gray/30 bg-white/40 flex items-center justify-center">
                            {/* Envelope SVG */}
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* Envelope body */}
                                <rect
                                    x="20"
                                    y="50"
                                    width="160"
                                    height="100"
                                    rx="4"
                                    fill="none"
                                    stroke="#C3C6CF"
                                    strokeWidth="2"
                                />
                                {/* Envelope flap - left diagonal */}
                                <line
                                    x1="20"
                                    y1="50"
                                    x2="100"
                                    y2="110"
                                    stroke="#C3C6CF"
                                    strokeWidth="2"
                                />
                                {/* Envelope flap - right diagonal */}
                                <line
                                    x1="180"
                                    y1="50"
                                    x2="100"
                                    y2="110"
                                    stroke="#C3C6CF"
                                    strokeWidth="2"
                                />
                                {/* Envelope bottom lines for 3D effect */}
                                <line
                                    x1="20"
                                    y1="150"
                                    x2="100"
                                    y2="110"
                                    stroke="#C3C6CF"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="180"
                                    y1="150"
                                    x2="100"
                                    y2="110"
                                    stroke="#C3C6CF"
                                    strokeWidth="2"
                                />
                            </svg>

                            {/* Key Badge */}
                            <div className="w-24 h-24 bg-white border-2 border-gold flex items-center justify-center relative z-10">
                                <Key className="w-7 h-7 text-navy" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Confirmation */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-8 py-10 md:px-16 md:py-12">
                    <div className="w-full max-w-[420px]">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                            COMPANY ADMINISTRATOR
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
                            Check Your Email
                        </h2>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                            <p className="text-green-800 text-base leading-relaxed">
                                If an account exists for <strong>{email}</strong>, a password reset link has been sent to your email address.
                            </p>
                        </div>
                        <p className="text-sm text-slate mb-6">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        <Button
                            onClick={() => {
                                setSubmitted(false);
                                setEmail("");
                            }}
                            className="text-navy font-bold hover:underline text-sm"
                        >
                            ← Back to reset password
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Column - Marketing */}
            <div className="w-full md:w-1/2 bg-beige flex flex-col justify-center items-center px-8 py-10 md:px-16 md:py-12">
                <div className="w-full max-w-[440px]">
                    <p className="text-xs font-bold uppercase tracking-widest text-brown mb-4">
                        ACCOUNT RECOVERY
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6">
                        Get Back Into Your Business Workspace.
                    </h1>
                    <p className="text-base text-slate leading-relaxed max-w-[440px] mb-14">
                        Regain access to your elite scheduling tools and client management dashboard. Security protocols ensure your data remains protected.
                    </p>

                    {/* Illustration */}
                    <div className="hidden sm:block w-64 h-64 relative border border-gray/30 bg-white/40 flex items-center justify-center">
                        {/* Envelope SVG */}
                        <svg
                            width="200"
                            height="200"
                            viewBox="0 0 200 200"
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Envelope body */}
                            <rect
                                x="20"
                                y="50"
                                width="160"
                                height="100"
                                rx="4"
                                fill="none"
                                stroke="#C3C6CF"
                                strokeWidth="2"
                            />
                            {/* Envelope flap - left diagonal */}
                            <line
                                x1="20"
                                y1="50"
                                x2="100"
                                y2="110"
                                stroke="#C3C6CF"
                                strokeWidth="2"
                            />
                            {/* Envelope flap - right diagonal */}
                            <line
                                x1="180"
                                y1="50"
                                x2="100"
                                y2="110"
                                stroke="#C3C6CF"
                                strokeWidth="2"
                            />
                            {/* Envelope bottom lines for 3D effect */}
                            <line
                                x1="20"
                                y1="150"
                                x2="100"
                                y2="110"
                                stroke="#C3C6CF"
                                strokeWidth="2"
                            />
                            <line
                                x1="180"
                                y1="150"
                                x2="100"
                                y2="110"
                                stroke="#C3C6CF"
                                strokeWidth="2"
                            />
                        </svg>

                        {/* Key Badge */}
                        <div className="w-24 h-24 bg-white border-2 border-gold flex items-center justify-center relative z-10">
                            <Key className="w-7 h-7 text-navy" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-8 py-10 md:px-16 md:py-12">
                <div className="w-full max-w-[420px]">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                        COMPANY ADMINISTRATOR
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
                        Forgot Your Password?
                    </h2>
                    <p className="text-base text-slate leading-relaxed max-w-[420px] mb-8">
                        No problem. Enter your business email and we'll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-xs font-bold uppercase tracking-wide text-navy mb-2"
                            >
                                Business Email
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                disabled={isSubmitting}
                                
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-600 font-serif">
                                    {error}
                                </p>
                            )}
                        </div>

                                                
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Send Reset Link
                                <ArrowRight className="w-4 h-4" />
                                
                            </span>
                        </Button>
</form>


                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-slate hover:text-navy transition font-serif"
                        >
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;