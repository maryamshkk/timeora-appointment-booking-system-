import React, { useState } from "react";
import { Key, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import RegistrationIntro from "../../components/common/RegistrationIntro";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input"; // Add this import

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !email.includes("@")) {
            return;
        }

        setIsSubmitting(true);

        // TODO: axios POST /api/auth/company/forgot-password with { email }
        // On success:
        // setSubmitted(true);
        // setIsSubmitting(false);

        // Temporary simulation (remove when API is connected)
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1000);
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row w-full overflow-x-hidden">

            {/* LEFT COLUMN - Reusable RegistrationIntro */}
            <div className="w-full md:w-1/2 bg-beige flex items-center py-12 md:py-16 px-6 md:px-12 lg:px-16 xl:px-30">
                <RegistrationIntro
                    variant="login"
                    eyebrow="ACCOUNT RECOVERY"
                    heading="Get Back Into Your Business Workspace."
                    description="Regain access to your elite scheduling tools and client management dashboard. Security protocols ensure your data remains protected."
                />
            </div>

            {/* RIGHT COLUMN - Forgot Password Form */}
            <div className="w-full md:w-1/2 bg-white flex items-center py-12 md:py-16 px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="max-w-[440px] w-full mx-auto md:mx-0">

                    {!submitted ? (
                        <>
                            {/* Small Label */}
                            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                                Company Administrator
                            </p>

                            {/* Heading */}
                            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
                                Forgot Your Password?
                            </h2>

                            {/* Description */}
                            <p className="text-base text-slate leading-relaxed max-w-[420px] mb-8">
                                No problem. Enter your business email and we'll
                                send you a link to reset your password.
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>

                                {/* Email Field */}
                                <div className="mb-6">
                                    <label className="text-xs font-bold uppercase tracking-wide text-navy mb-2 block">
                                        Business Email
                                    </label>

                                    <Input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>

                                {/* Submit Button - Fixed syntax */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Reset Link"}

                                    <ArrowRight className="w-4 h-4" />
                                </Button>

                            </form>
                        </>
                    ) : (
                        <>
                            {/* Success Message */}
                            <div className="text-center">

                                {/* Success Icon */}
                                <div className="w-20 h-20 bg-beige border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Key className="w-8 h-8 text-navy" />
                                </div>

                                {/* Heading */}
                                <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
                                    Check Your Email
                                </h2>

                                {/* Message */}
                                <p className="text-base text-slate leading-relaxed max-w-[420px] mx-auto mb-8">
                                    If an account exists for this email, a reset
                                    link has been sent. Please check your inbox
                                    and follow the instructions to reset your
                                    password.
                                </p>

                                {/* Back to Login */}
                                <Link
                                    to="/login"
                                    className="
                                        inline-block
                                        bg-navy
                                        text-white
                                        py-3
                                        px-6
                                        rounded-md
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-sm
                                        hover:bg-gold
                                        hover:text-navy
                                        transition
                                    "
                                >
                                    Back to Login
                                </Link>

                            </div>
                        </>
                    )}

                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;