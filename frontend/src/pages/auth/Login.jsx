import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function CompanyLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic required-field check
        if (!formData.email.trim() || !formData.password.trim()) {
            setError("Please enter both email and password.");
            return;
        }

        // TODO: axios POST /api/auth/company/login with { email, password, rememberMe }
        console.log("Login attempt:", formData);
    };

    return (
        <div className="min-h-screen bg-beige flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 md:px-10 lg:px-[40px] pt-8">
                {/* Logo */}
                <Link to="/" className="font-serif italic text-xl text-navy">
                    Timeora
                </Link>

                {/* Sign Up Link */}
                <p className="text-sm text-slate">
                    New to Timeora?{" "}
                    <Link
                        to="/register/company"
                        className="font-bold text-navy hover:underline"
                    >
                        Create a Company Account
                    </Link>
                </p>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row">
                {/* Left Column - Dashboard Preview */}
                <div className="hidden md:flex md:w-1/2 items-center py-12 md:py-16 px-4 lg:px-8">
                    <div className="w-full max-w-[440px] mx-auto">
                        {/* Eyebrow */}
                        <p className="text-xs font-bold uppercase tracking-widest text-slate mb-4">
                            WELCOME BACK
                        </p>

                        {/* Heading */}
                        <h1 className="font-serif text-4xl lg:text-5xl text-navy leading-tight mb-5 max-w-[420px]">
                            Your Business, In Perfect Time.
                        </h1>

                        {/* Description */}
                        <p className="text-base text-slate leading-relaxed max-w-[420px] mb-12">
                            Sign in to manage appointments, staff, schedules, 
                            customers and your business operations from one 
                            organized workspace.
                        </p>

                        {/* Dashboard Preview Mockup */}
                        <div className="bg-white rounded-xl shadow-md border border-gray/20 p-5">
                            {/* Mock header row */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="bg-gray/30 h-3 w-32 rounded-full" />
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-gold" />
                                    <div className="w-5 h-5 rounded-full bg-gray/30" />
                                </div>
                            </div>
                            
                            <div className="border-b border-gray/20 mb-4" />

                            {/* 2x2 Grid of Widgets */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Widget 1 - Top Left */}
                                <div className="bg-beige rounded-lg p-3.5 flex items-center gap-3">
                                    <div className="bg-gray/30 w-9 h-9 rounded-md flex-shrink-0" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="h-2 w-20 bg-gray/40 rounded-full" />
                                        <div className="h-2 w-12 bg-gold rounded-full" />
                                    </div>
                                </div>

                                {/* Widget 2 - Top Right */}
                                <div className="bg-navy rounded-lg p-3.5 flex flex-col justify-center gap-2">
                                    <div className="h-2 w-16 bg-white/40 rounded-full" />
                                    <div className="h-6 w-20 bg-white rounded-md" />
                                </div>

                                {/* Widget 3 - Bottom Left */}
                                <div className="bg-beige rounded-lg p-3.5 flex items-center gap-3">
                                    <div className="bg-gray/30 w-9 h-9 rounded-md flex-shrink-0" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="h-2 w-20 bg-gray/40 rounded-full" />
                                        <div className="h-2 w-12 bg-navy rounded-full" />
                                    </div>
                                </div>

                                {/* Widget 4 - Bottom Right */}
                                <div className="bg-gray/10 rounded-lg p-3.5 flex items-center justify-center">
                                    <div className="h-2 w-16 bg-gray/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider - with reduced margin */}
                <div className="hidden md:block border-l border-gray/30 mx-4 lg:mx-6" />

                {/* Right Column - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center py-12 md:py-16 px-6 md:px-8 lg:px-10">
                    <div className="w-full max-w-[420px]">
                        {/* Company Admin Badge */}
                        <div className="inline-block bg-white border border-gray/30 rounded-full px-3 py-1 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wide text-navy">
                                Company Administrator
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-2">
                            Welcome Back
                        </h2>

                        {/* Subtitle */}
                        <p className="text-base text-slate mb-7">
                            Sign in to your Timeora company account.
                        </p>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Business Email Field */}
                            <div className="mb-5">
                                <label className="text-sm font-bold text-navy mb-2 block">
                                    Business Email
                                </label>
                                <div className="relative">
                                    <Mail className="w-[18px] h-[18px] text-slate absolute top-1/2 left-3.5 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="admin@company.com"
                                        required
                                        className="w-full bg-white border border-gray rounded-lg py-3 pl-11 pr-4 text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                                <label className="text-sm font-bold text-navy mb-2 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-[18px] h-[18px] text-slate absolute top-1/2 left-3.5 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-white border border-gray rounded-lg py-3 pl-11 pr-11 text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-[18px] h-[18px] text-slate" />
                                        ) : (
                                            <Eye className="w-[18px] h-[18px] text-slate" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex justify-between items-center mb-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 border-gray rounded-sm accent-navy cursor-pointer"
                                    />
                                    <span className="text-sm text-slate">Remember me</span>
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-bold text-navy hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-navy text-white py-3.5 rounded-lg font-bold hover:bg-gold hover:text-navy transition flex items-center justify-center gap-2"
                            >
                                Sign In
                                <ArrowRight className="w-[18px] h-[18px]" />
                            </button>
                        </form>

                        {/* Security Note */}
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <Lock className="w-[14px] h-[14px] text-slate" />
                            <span className="text-xs text-slate">
                                Sign in securely with 256-bit encryption
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyLogin;