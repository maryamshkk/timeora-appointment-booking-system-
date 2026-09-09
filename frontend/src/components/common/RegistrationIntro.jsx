import React from "react";
import { Check, MoreHorizontal, Lock, RotateCw } from "lucide-react";

function RegistrationIntro({
    variant = "default",
    eyebrow = "WELCOME TO TIMEORA",
    heading = "Build a Better Appointment Experience for Your Business",
    description = "Create your company account and bring appointments, staff, customers and schedules together in one organized, premium workspace.",
}) {
    return (
        <div className="w-full md:w-[42%]">
            <p className="text-xs font-bold uppercase tracking-widest text-slate mb-4">
                {eyebrow}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6">
                {heading}
            </h1>

            <p className="font-serif text-base text-slate leading-relaxed max-w-[440px] mb-8">
                {description}
            </p>

            {variant === "password-reset" ? (
                /* Password Reset Illustration */
                <div className="hidden md:block relative h-64 w-full max-w-[380px] mt-20">
                    {/* Back Card */}
                    <div
                        className="absolute top-0 left-0 w-44 h-56 bg-beige border border-gray/30 rounded-xl rotate-[-6deg]"
                        style={{ backgroundColor: "#D4D2CB" }}
                    />

                    {/* Front Card */}
                    <div className="absolute top-4 left-6 w-48 h-60 bg-white rounded-xl shadow-md border border-gray/20 flex items-center justify-center">
                        <div className="relative">
                            {/* Lock Badge */}
                            <div className="w-20 h-20 bg-white border-2 border-gold rounded-lg flex items-center justify-center">
                                <Lock className="w-6 h-6 text-navy" />
                            </div>

                            {/* Rotate Indicator */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-navy rounded-full flex items-center justify-center">
                                <RotateCw className="w-3 h-3 text-gold" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Default Registration Content */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-[14px] h-[14px] text-navy" />
                            </div>

                            <p className="font-serif text-sm text-navy">
                                Unified dashboard for multi-staff scheduling
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-[14px] h-[14px] text-navy" />
                            </div>

                            <p className="font-serif text-sm text-navy">
                                Automated client reminders and follow-ups
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-[14px] h-[14px] text-navy" />
                            </div>

                            <p className="font-serif text-sm text-navy">
                                Detailed analytics and revenue tracking
                            </p>
                        </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-white rounded-xl shadow-sm border-l-4 border-gold max-w-[460px] mt-10">
                        <div className="flex items-center justify-between px-6 py-5">
                            <h2 className="font-serif text-lg text-navy">
                                Today's Schedule
                            </h2>

                            <MoreHorizontal className="w-5 h-5 text-slate" />
                        </div>

                        <div className="bg-beige rounded-lg mx-4 mb-3 px-4 py-3.5">
                            <p className="font-serif text-sm font-bold text-navy">
                                09:00 AM - Initial Consultation
                            </p>

                            <p className="font-serif text-xs text-slate mt-1">
                                Dr. Eleanor Vance
                            </p>
                        </div>

                        <div className="bg-beige rounded-lg mx-4 mb-4 px-4 py-3.5">
                            <p className="font-serif text-sm font-bold text-navy">
                                11:30 AM - Review Session
                            </p>

                            <p className="font-serif text-xs text-slate mt-1">
                                Marcus Sterling
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default RegistrationIntro;
