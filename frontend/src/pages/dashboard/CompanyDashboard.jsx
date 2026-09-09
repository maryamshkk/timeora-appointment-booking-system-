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

    // Temporary dashboard data
    const appointments = [
        {
            time: "09:00 AM",
            customer: "Ayesha Khan",
            service: "Consultation",
            staff: "Dr. Sara",
            status: "Confirmed",
        },
        {
            time: "10:00 AM",
            customer: "Hina Malik",
            service: "Follow-up",
            staff: "Dr. Sara",
            status: "Completed",
        },
        {
            time: "11:30 AM",
            customer: "Zain Ahmed",
            service: "Therapy",
            staff: "Ali",
            status: "Pending",
        },
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
        {
            time: "09:00 AM",
            title: "Consultation - Ayesha Khan",
            subtitle: "Dr. Sara",
            status: "confirmed",
        },
        {
            time: "10:00 AM",
            title: "Follow-up - Hina Malik",
            subtitle: "Completed",
            status: "completed",
        },
        {
            time: "11:30 AM",
            title: "Therapy - Zain Ahmed",
            subtitle: "Ali (Pending)",
            status: "pending",
        },
    ];

    const staffData = [
        {
            name: "Dr. Sara",
            appointments: 6,
            status: "Available",
        },
        {
            name: "Ali",
            appointments: 4,
            status: "Busy",
        },
    ];

    const recentActivityData = [
        {
            type: "booking",
            text: "New appointment booked for 2:00 PM",
            time: "10 mins ago",
        },
        {
            type: "update",
            text: "Staff schedule updated by Admin",
            time: "1 hour ago",
        },
    ];

    function getGreeting() {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        }

        if (hour < 18) {
            return "Good afternoon";
        }

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
        <div className="min-h-screen bg-beige flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar companyName={companyName} 
                        activeItem="Dashboard"
                        ctaLabel="Book New"
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
                        <Sidebar companyName={companyName} 
                                activeItem="Dashboard"
                                ctaLabel="Book New"/>
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex-1 min-w-0">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    profileName={profileName}
                />

                <main className="px-6 lg:px-8 py-6">
                    {/* Welcome Header */}
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between mb-7">
                        <div>
                            <p className="text-sm text-slate mb-1">
                                {getCurrentDate()}
                            </p>

                            <h1 className="font-serif text-2xl lg:text-3xl text-navy">
                                {getGreeting()}, {profileName}
                            </h1>

                            <p className="text-sm text-slate mt-1">
                                Here's what's happening at {companyName} today.
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-3">
                            <div className="w-auto min-w-[150px]">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                >
                                    <Plus className="w-4 h-4" />
                                    New Appointment
                                </button>
                            </div>

                            <div className="w-auto min-w-[120px]">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Add Staff
                                </button>
                            </div>

                            <div className="w-auto min-w-[125px]">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                                >
                                    <FilePlus2 className="w-4 h-4" />
                                    Add Service
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            label="TODAY'S APPOINTMENTS"
                            value={24}
                            icon={CalendarDays}
                            trend="+12%"
                        />

                        <StatCard
                            label="UPCOMING"
                            value={12}
                            icon={Clock}
                        />

                        <StatCard
                            label="COMPLETED"
                            value={8}
                            icon={CheckCircle2}
                        />

                        <StatCard
                            label="CANCELLED"
                            value={2}
                            icon={XCircle}
                        />
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.9fr)] gap-6">
                        {/* Left Column */}
                        <div className="flex flex-col gap-6 min-w-0">
                            <AppointmentsTable
                                appointments={appointments}
                            />

                            <PerformanceChart
                                data={performanceData}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6 min-w-0">
                            <ScheduleTimeline
                                schedule={scheduleData}
                            />

                            <StaffOverview
                                staff={staffData}
                            />

                            <RecentActivity
                                activities={recentActivityData}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CompanyDashboard;
