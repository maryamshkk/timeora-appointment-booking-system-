import React, { useState } from "react";
import {
    CalendarDays,
    Clock,
    CheckCircle2,
    XCircle,
    Plus,
    UserPlus,
    FilePlus2,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import AppointmentsTable from "../../components/dashboard/AppointmentsTable";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import ScheduleTimeline from "../../components/dashboard/ScheduleTimeline";
import StaffOverview from "../../components/dashboard/StaffOverview";
import RecentActivity from "../../components/dashboard/RecentActivity";

function CompanyDashboard({
    companyName = "Shifa Clinic",
    profileName = "Admin",
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // TODO: axios GET /api/company/dashboard

    const appointments = [
        { time: "09:00 AM", customer: "Ayesha Khan", service: "Consultation", staff: "Dr. Sara", status: "Confirmed" },
        { time: "10:00 AM", customer: "Hina Malik", service: "Follow-up", staff: "Dr. Sara", status: "Completed" },
        { time: "11:30 AM", customer: "Zain Ahmed", service: "Therapy", staff: "Ali", status: "Pending" },
    ];

    const performanceData = [
        { day: "Mon", appointments: 8 },
        { day: "Tue", appointments: 14 },
        { day: "Wed", appointments: 11 },
        { day: "Thu", appointments: 9 },
        { day: "Fri", appointments: 18 },
        { day: "Sat", appointments: 15 },
        { day: "Sun", appointments: 6 },
    ];

    const scheduleData = [
        { time: "09:00 AM", title: "Consultation - Ayesha Khan", subtitle: "Dr. Sara", status: "confirmed" },
        { time: "10:00 AM", title: "Follow-up - Hina Malik", subtitle: "Completed", status: "completed" },
        { time: "11:30 AM", title: "Therapy - Zain Ahmed", subtitle: "Ali (Pending)", status: "pending" },
    ];

    const staffData = [
        { name: "Dr. Sara", appointments: 6, status: "Available" },
        { name: "Ali", appointments: 4, status: "Busy" },
    ];

    const recentActivityData = [
        { type: "booking", text: "New appointment booked for 2:00 PM", time: "10 mins ago" },
        { type: "update", text: "Staff schedule updated by Admin", time: "1 hour ago" },
    ];

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName={companyName}
                    activeItem="Dashboard"
                    ctaLabel="Book New"
                />
            </div>

            {/* Mobile Sidebar — overlay */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName={companyName}
                            activeItem="Dashboard"
                            ctaLabel="Book New"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    profileName={profileName}
                    showBell
                    showHelp
                    showSupportText
                />

                <main className="px-3 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Welcome Header */}
                    <div className="mb-5 flex flex-col gap-4 sm:mb-6 md:mb-7 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <p className="mb-1 text-xs text-slate sm:text-sm">
                                {getCurrentDate()}
                            </p>

                            <h1 className="font-serif text-xl text-navy sm:text-2xl lg:text-3xl">
                                {getGreeting()}, {profileName}
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:text-sm">
                                Here's what's happening at {companyName} today.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto"
                            >
                                <Plus className="w-4 h-4" />
                                New Appointment
                            </button>

                            <button
                                type="button"
                                
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white sm:w-auto"
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Staff
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white sm:w-auto"
                            >
                                <FilePlus2 className="w-4 h-4" />
                                Add Service
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:mb-6 xl:grid-cols-4">
                        <StatCard label="TODAY'S APPOINTMENTS" value={24} icon={CalendarDays} trend="+12%" />
                        <StatCard label="UPCOMING" value={12} icon={Clock} />
                        <StatCard label="COMPLETED" value={8} icon={CheckCircle2} />
                        <StatCard label="CANCELLED" value={2} icon={XCircle} />
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.9fr)]">
                        <div className="flex min-w-0 flex-col gap-4 md:gap-6">
                            <AppointmentsTable appointments={appointments} />
                            <PerformanceChart data={performanceData} />
                        </div>

                        <div className="flex min-w-0 flex-col gap-4 md:gap-6">
                            <ScheduleTimeline schedule={scheduleData} />
                            <StaffOverview staff={staffData} />
                            <RecentActivity activities={recentActivityData} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CompanyDashboard;