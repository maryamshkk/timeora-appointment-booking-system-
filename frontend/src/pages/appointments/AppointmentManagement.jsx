import React, { useState } from "react";
import {
    CalendarDays,
    ArrowLeftRight,
    CheckCircle2,
    XCircle,
    Plus,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


function AppointmentManagement(){
        const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
        {
            label: "Today's Appointments",
            value: "24",
            icon: CalendarDays,
        },
        {
            label: "Upcoming",
            value: "12",
            icon: ArrowLeftRight,
        },
        {
            label: "Completed",
            value: "8",
            icon: CheckCircle2,
        },
        {
            label: "Cancelled",
            value: "2",
            icon: XCircle,
        },
    ];


    return (
        <div className="min-h-screen bg-beige/30 flex">
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
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-navy/40"
                        onClick={() => setSidebarOpen(false)}
                    />

                    <div className="relative z-50 h-full w-64">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Appointments"
                            ctaLabel="Book Appointment"
                        />
                    </div>
                </div>
            )}

            {/* Main Area */}
            <div className="flex-1 min-w-0">
                 <Topbar
                    variant="compact"
                    profileName="Admin"
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="p-6 lg:p-8">

                    {/* Page Header */}
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">

                        <div>
                            <h1 className="font-serif text-3xl text-navy">
                                Appointments
                            </h1>

                            <p className="mt-1 text-sm text-slate">
                                Manage, track, and organize all your appointments.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                        >
                            <Plus className="w-4 h-4" />
                            New Appointment
                        </button>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.label}
                                label={stat.label}
                                value={stat.value}
                                icon={stat.icon}
                            />
                        ))}
                    </div>


                    {/* Appointments Content - Step 4 */}
                    <div className="mt-6">
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <p className="text-sm text-slate">
                                Appointment management content will be added next.
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            
        </div>
        

    )

}
export default AppointmentManagement;