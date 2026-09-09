import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Lock,
    RotateCw,
    Eye,
    EyeOff,
    CheckCircle2,
} from "lucide-react";
import Button from "../../components/common/Button";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Password requirements
    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    // Password strength
    const strengthScore = [
        hasMinLength,
        hasUppercase,
        hasLowercase,
        hasNumber,
    ].filter(Boolean).length;

    const barFillCount = Math.min(
        Math.floor(strengthScore / 1.5),
        3
    );

    // Confirm password validation
    const passwordsMatch =
        confirmPassword.length > 0 &&
        newPassword === confirmPassword;

    // Final form validation
    const isFormValid =
        hasMinLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        passwordsMatch;

    // Password requirement list
    const requirements = [
        {
            label: "At least 8 characters",
            met: hasMinLength,
        },
        {
            label: "1 uppercase letter",
            met: hasUppercase,
        },
        {
            label: "1 lowercase letter",
            met: hasLowercase,
        },
        {
            label: "1 number",
            met: hasNumber,
        },
    ];

    // Get strength text
    const getStrengthText = () => {
        if (newPassword.length === 0) return "Password strength";
        if (strengthScore <= 1) return "Password strength — Weak";
        if (strengthScore <= 2) return "Password strength — Medium";
        return "Password strength — Strong";
    };

    const getStrengthColor = () => {
        if (newPassword.length === 0) return "text-slate";
        if (strengthScore <= 1) return "text-red-500";
        if (strengthScore <= 2) return "text-gold";
        return "text-green-600";
    };

    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!token) {
            setError("Invalid reset link. Please request a new password reset.");
            return;
        }

        if (!isFormValid) {
            setError("Please meet all password requirements.");
            return;
        }

        setIsSubmitting(true);

        // TODO: API call will be added in the next step
        // axios POST /api/auth/company/reset-password
        // {
        //     token: token,
        //     newPassword: newPassword
        // }

        setTimeout(() => {
            setIsSubmitting(false);
            navigate("/login", {
                state: {
                    message: "Password reset successful. Please log in with your new password."
                }
            });
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-beige flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-8 md:px-16 pt-8 pb-4">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <span className="font-serif text-xl font-bold text-navy">
                        Timeora
                    </span>
                </div>

                {/* Back to Login */}
                <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-sm text-slate">
                        Remember your password?
                    </span>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="bg-white border border-gray rounded-lg px-4 py-2 text-sm font-bold text-navy hover:border-navy transition"
                    >
                        Back to Login
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row w-full">
                {/* Left Column - Centered with margin */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-16">
                    <div className="max-w-[440px] mx-auto md:mx-0 md:ml-auto md:mr-8">
                        {/* Eyebrow */}
                        <p className="text-xs font-bold uppercase tracking-widest text-brown mb-4">
                            PASSWORD RESET
                        </p>

                        {/* Heading */}
                        <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-5">
                            Create A New Password.
                        </h1>

                        {/* Description */}
                        <p className="text-base text-slate leading-relaxed mb-20">
                            Choose a strong password to protect access to your Timeora company workspace.
                        </p>

                        {/* Stacked Cards Illustration */}
                        <div className="hidden md:block relative h-64 w-full max-w-[380px]">
                            {/* Back Card */}
                            <div className="absolute top-0 left-0 w-44 h-56 bg-beige/60 rounded-xl border border-gray/30 rotate-[-6deg] translate-x-4 translate-y-4"></div>
                            
                            {/* Front Card */}
                            <div className="absolute top-0 left-6 w-48 h-60 bg-white rounded-xl shadow-md border border-gray/20 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white border-2 border-gold rounded-lg flex items-center justify-center relative">
                                    <Lock className="w-6 h-6 text-navy" />
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                        <RotateCw className="w-3 h-3 text-navy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block border-l border-gray/30"></div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 py-12 md:py-16">
                    <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-lg border border-gray/20 p-8 md:p-10">
                        {/* Small Label */}
                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
                            Company Administrator
                        </p>

                        {/* Heading */}
                        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-7">
                            Reset Your Password
                        </h2>

                        <form onSubmit={handleSubmit}>
                            {/* New Password Field */}
                            <div className="mb-5">
                                <label className="text-xs font-bold uppercase tracking-wide text-navy mb-2 block">
                                    New Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        required
                                        className="w-full border border-gray rounded-lg px-4 py-3 pr-11 text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition font-serif"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate hover:text-navy transition"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-[18px] h-[18px]" />
                                        ) : (
                                            <Eye className="w-[18px] h-[18px]" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Bar */}
                                <div className="mt-2.5">
                                    <div className="flex gap-1.5">
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className={`h-1.5 flex-1 rounded-full transition ${
                                                    index < barFillCount
                                                        ? "bg-navy"
                                                        : "bg-gray/30"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs mt-1.5 ${getStrengthColor()}`}>
                                        {getStrengthText()}
                                    </p>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-5">
                                <label className="text-xs font-bold uppercase tracking-wide text-navy mb-2 block">
                                    Confirm New Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter new password"
                                        required
                                        className="w-full border border-gray rounded-lg px-4 py-3 pr-11 text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition font-serif"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate hover:text-navy transition"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-[18px] h-[18px]" />
                                        ) : (
                                            <Eye className="w-[18px] h-[18px]" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-beige rounded-lg border border-gray/30 p-5 mb-6">
                                <p className="text-xs font-bold uppercase tracking-wide text-navy mb-3">
                                    Password Requirements
                                </p>

                                <div className="space-y-2">
                                    {requirements.map((requirement, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle2
                                                className={`w-4 h-4 flex-shrink-0 ${
                                                    requirement.met
                                                        ? "text-navy"
                                                        : "text-gray"
                                                }`}
                                            />
                                            <span
                                                className={`text-sm ${
                                                    requirement.met
                                                        ? "text-navy"
                                                        : "text-slate"
                                                }`}
                                            >
                                                {requirement.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;