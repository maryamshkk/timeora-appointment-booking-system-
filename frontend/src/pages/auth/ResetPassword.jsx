import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Clock,
    Lock,
    RotateCw,
    Eye,
    EyeOff,
    CheckCircle2,
} from "lucide-react";

import RegistrationIntro from "../../components/common/RegistrationIntro";
import Button from "../../components/common/Button";

function ResetPassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        Math.floor(strengthScore / 2),
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

    // Submit handler
        function handleSubmit(e) {
            e.preventDefault();

            if (!isFormValid || !token) {
                return;
            }

            // TODO: API call will be added in the next step
            // POST /api/auth/company/reset-password
            // {
            //     token: token,
            //     newPassword: newPassword
            // }

            navigate("/login");
        }


return (
    <div className="min-h-screen bg-beige flex flex-col overflow-x-hidden">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 md:px-10 lg:px-[40px] pt-8">
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

        {/* Main Content will be added next */}
        {/* Main Content */} 
        <div className="flex-1 flex flex-col md:flex-row w-full"> 
            {/* Left Column */} 
            <div className="w-full md:w-1/2 flex items-center py-12 md:py-16 px-6 md:px-12 lg:px-16 xl:px-24"> 
            <RegistrationIntro 
                variant="password-reset" 
                eyebrow="PASSWORD RESET" 
                heading="Create A New Password." 
                description="Choose a strong password to protect access to your Timeora company workspace." /> 
                </div> {/* Vertical Divider */} 
                <div className="hidden md:block border-l border-gray/30" /> 
                {/* Right Column will be added next */} 
                                
                {/* Right Column */}
                
                {/* Right Column */}
                <div className="w-full md:w-1/2 flex items-center justify-center py-12 md:py-16 px-6 md:px-12 lg:px-16 xl:px-24">
                    <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-lg border border-gray/20 p-8 md:p-10">

                        {/* Small Label */}
                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
                            Company Administrator
                        </p>

                        {/* Heading */}
                        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-7">
                            Reset Your Password
                        </h2>

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
                                    className="w-full border border-gray rounded-lg px-4 py-3 pr-11 text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-[18px] h-[18px] text-slate" />
                                    ) : (
                                        <Eye className="w-[18px] h-[18px] text-slate" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Bar */}
                            <div className="flex gap-1.5 mt-2.5">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className={`h-1.5 flex-1 rounded-full ${
                                            index < barFillCount
                                                ? "bg-navy"
                                                : "bg-gray/30"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Password Strength Text */}
                            <p className="text-xs text-slate mt-1.5">
                                Password strength

                                {newPassword && (
                                    <span
                                        className={
                                            strengthScore <= 1
                                                ? "text-red-500"
                                                : strengthScore <= 3
                                                ? "text-gold"
                                                : "text-green-600"
                                        }
                                    >
                                        {" — "}

                                        {strengthScore <= 1
                                            ? "Weak"
                                            : strengthScore <= 3
                                            ? "Medium"
                                            : "Strong"}
                                    </span>
                                )}
                            </p>
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
                                    className="w-full border border-gray rounded-lg px-4 py-3 pr-11 text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-[18px] h-[18px] text-slate" />
                                    ) : (
                                        <Eye className="w-[18px] h-[18px] text-slate" />
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

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Reset Password
                        </Button>


                    </div>
                </div>



            </div>
    </div>
);

}

export default ResetPassword;
