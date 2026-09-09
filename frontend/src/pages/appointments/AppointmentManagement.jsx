import React, { useState } from "react";
import {
    CalendarDays,
    ArrowLeftRight,
    CheckCircle2,
    XCircle,
    Plus,
    Search,
    Calendar,
    ChevronDown,
    List,
    Columns3,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


function AppointmentManagement(){
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
        const [statusFilter, setStatusFilter] = useState("all");
        const [staffFilter, setStaffFilter] = useState("all");
        const [serviceFilter, setServiceFilter] = useState("all");
        const [viewMode, setViewMode] = useState("list");
        const [currentPage, setCurrentPage] = useState(1);
    
    
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
                            
                            {/* Row 1 */}
        <div className="flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="relative w-full md:w-[260px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search appointments..."
                        className="w-full rounded-lg border border-gray/30 bg-white pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold"
                    />
            </div>


            {/* Date */}
            <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-sm font-bold text-navy hover:bg-beige transition"
            >
                <Calendar className="w-4 h-4 text-slate" />
                21 August 2026
                <ChevronDown className="w-4 h-4 text-slate" />
            </button>

            <div className="hidden md:block h-7 w-px bg-gray/30" />

            {/* Status */}
            <div className="relative">
                <select
                    value={statusFilter}
                    onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold"
                >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            </div>

            {/* Staff */}
            <div className="relative">
                <select
                    value={staffFilter}
                    onChange={(event) => {
                        setStaffFilter(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold"
                >
                    <option value="all">All Staff</option>
                    <option value="M. Bennett">M. Bennett</option>
                    <option value="J. Wright">J. Wright</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            </div>
                    
            {/* Staff */}
            <div className="relative">
                        <select
                            value={staffFilter}
                            onChange={(event) => {
                                setStaffFilter(event.target.value);
                                setCurrentPage(1);
                            }}
                            className="appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold"
                        >
                            <option value="all">All Staff</option>
                            <option value="M. Bennett">M. Bennett</option>
                            <option value="J. Wright">J. Wright</option>
                        </select>

                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            </div>
        </div>

        {/* Row 2 */}
        <div className="mt-3 flex flex-wrap items-center gap-3">

            {/* Services */}
            <div className="relative">
                <select
                    value={serviceFilter}
                    onChange={(event) => {
                        setServiceFilter(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold"
                >
                    <option value="all">All Services</option>
                    <option value="Executive Strategy Session">
                        Executive Strategy Session
                    </option>
                    <option value="Initial Consultation">
                        Initial Consultation
                    </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            </div>
        </div>

         {/* View Toggle */}
        <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center rounded-lg border border-gray/30 overflow-hidden">

                <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-bold transition ${
                        viewMode === "list"
                            ? "bg-navy text-white"
                            : "bg-white text-slate hover:bg-beige"
                    }`}
                    aria-label="List view"
                >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                </button>

                <button
                    type="button"
                    onClick={() => setViewMode("columns")}
                    className={`flex items-center gap-2 border-l border-gray/30 px-3 py-2 text-sm font-bold transition ${
                        viewMode === "columns"
                            ? "bg-navy text-white"
                            : "bg-white text-slate hover:bg-beige"
                    }`}
                    aria-label="Columns view"
                >
                    <Columns3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Columns</span>
                </button>

            </div>
        </div>

                        {/* Divider */}
        <div className="mt-5 border-t border-gray/20" />


                        </div>
                    </div>
                </main>
            </div>

            </div>
        

    )

}
export default AppointmentManagement;