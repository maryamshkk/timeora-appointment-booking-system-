import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function CreateAppointment() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-beige/30">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Appointments"
                    ctaLabel="Book Appointment"
                />
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Appointments"
                            ctaLabel="Book Appointment"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    profileInfo={{ name: "Company Profile" }}
                    searchPlaceholder="Search..."
                />

                <main className="bg-beige px-4 py-5 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                        <Link
                            to="/company/appointments"
                            className="text-slate hover:text-navy transition"
                        >
                            Appointments
                        </Link>

                        <ChevronRight
                            className="h-3 w-3 text-gray"
                        />

                        <span className="text-navy">
                            Create Appointment
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-2xl text-navy">
                            Create Appointment
                        </h1>

                        <p className="mt-1 text-sm text-slate">
                            Schedule a new appointment for a customer.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Left Column */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Step 1 */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy">
                                    1. Customer
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="py-8 text-center text-sm text-slate">
                                    Customer selection will be added next.
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy">
                                    2. Service
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="py-8 text-center text-sm text-slate">
                                    Service selection will be added next.
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy">
                                    3. Staff
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="py-8 text-center text-sm text-slate">
                                    Staff selection will be added next.
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy">
                                    4. Date & Time
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="py-8 text-center text-sm text-slate">
                                    Date and time selection will be added next.
                                </div>
                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="lg:sticky lg:top-6 lg:self-start">

                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">

                                <h2 className="font-serif text-xl text-navy">
                                    Appointment Summary
                                </h2>

                                <div className="mt-4 border-b border-gray/20" />

                                <div className="py-8 text-center text-sm text-slate">
                                    Appointment summary will be added next.
                                </div>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default CreateAppointment;
