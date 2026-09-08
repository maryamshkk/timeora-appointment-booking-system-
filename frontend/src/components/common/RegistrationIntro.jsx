import React from "react";
import { Check, MoreHorizontal } from "lucide-react";

function RegistrationIntro({
    eyebrow = "WELCOME TO TIMEORA",
    heading = "Build a Better Appointment Experience for Your Business",
    description = "Create your company account and bring appointments, staff, customers and schedules together in one organized, premium workspace.",
    checklistItems = [
        "Unified dashboard for multi-staff scheduling",
        "Automated client reminders and follow-ups",
        "Detailed analytics and revenue tracking",
    ],
    showSchedule = true,
    showChecklist = true,
    scheduleData = {
        title: "Today's Schedule",
        appointments: [
            {
                time: "09:00 AM",
                title: "Initial Consultation",
                person: "Dr. Eleanor Vance",
            },
            {
                time: "11:30 AM",
                title: "Review Session",
                person: "Marcus Sterling",
            },
        ],
    },
    variant = "default",
    className = "",
}) {
    // Login variant with dashboard preview
    if (variant === "login") {
        return (
            <div className={`w-full px-6 md:px-16 ${className}`}>
                {/* Eyebrow */}
                <p className="text-xs font-bold uppercase tracking-widest text-slate mb-4">
                    {eyebrow}
                </p>

                {/* Heading */}
                <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-5 max-w-[420px]">
                    {heading}
                </h1>

                {/* Description */}
                <p className="text-base text-slate leading-relaxed max-w-[420px] mb-16">
                    {description}
                </p>

                {/* Dashboard Preview Mockup */}
                <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray/20 max-w-[460px] p-5">
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
        );
    }

    // Default variant (registration pages)
    return (
        <div className={`w-full md:w-[42%] ${className}`}>
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-widest text-brown mb-4">
                {eyebrow}
            </p>

            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6">
                {heading}
            </h1>

            {/* Description */}
            <p className="font-serif text-base text-slate leading-relaxed max-w-[440px] mb-8">
                {description}
            </p>

            {/* Checklist */}
            {showChecklist && checklistItems.length > 0 && (
                <div className="space-y-4">
                    {checklistItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-[14px] h-[14px] text-navy" />
                            </div>
                            <p className="font-serif text-sm text-navy">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Today's Schedule */}
            {showSchedule && (
                <div className="bg-white rounded-xl shadow-sm border-l-4 border-gold max-w-[460px] mt-10 pb-2">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5">
                        <h2 className="font-serif text-lg text-navy">
                            {scheduleData?.title || "Today's Schedule"}
                        </h2>
                        <MoreHorizontal className="w-5 h-5 text-slate" />
                    </div>

                    {/* Schedule Rows */}
                    {scheduleData?.appointments?.map((appointment, index) => (
                        <div key={index} className="bg-beige rounded-lg mx-4 mb-3 px-4 py-3.5">
                            <p className="font-serif text-sm font-bold text-navy">
                                {appointment.time} - {appointment.title}
                            </p>
                            <p className="font-serif text-xs text-slate mt-1">
                                {appointment.person}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RegistrationIntro;