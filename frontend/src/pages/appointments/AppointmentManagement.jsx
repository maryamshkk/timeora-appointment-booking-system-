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
    ChevronLeft,
    ChevronRight,
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


    const appointments = [
    {
        id: 1,
        date: "21 Aug 2026",
        time: "09:00 AM",
        customer: "Eleanor Astor",
        initials: "EA",
        avatarColor: "gold",
        service: "Executive Strategy Session",
        duration: "60 min",
        staff: "M. Bennett",
        staffInitials: "MB",
        status: "Confirmed",
        payment: "Card",
    },
    {
        id: 2,
        date: "21 Aug 2026",
        time: "10:30 AM",
        customer: "Charles Harrington",
        initials: "CH",
        avatarColor: "navy",
        service: "Initial Consultation",
        duration: "45 min",
        staff: "J. Wright",
        staffInitials: "JW",
        status: "Pending",
        payment: "-",
        },
    ];

    const filteredAppointments = appointments.filter((appointment) => {
        const normalizedSearch = searchQuery.toLowerCase().trim();

        const matchesSearch =
            appointment.customer.toLowerCase().includes(normalizedSearch) ||
            appointment.service.toLowerCase().includes(normalizedSearch) ||
            appointment.staff.toLowerCase().includes(normalizedSearch);

        const matchesStatus =
            statusFilter === "all" ||
            appointment.status.toLowerCase() === statusFilter;

        const matchesStaff =
            staffFilter === "all" ||
            appointment.staff === staffFilter;

        const matchesService =
            serviceFilter === "all" ||
            appointment.service === serviceFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesStaff &&
            matchesService
        );
    });


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

                        {/* Appointment Views */}

{viewMode === "list" ? (
    <>
        {/* Appointments Table */}
        <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[950px] text-sm">
                <thead>
                    <tr className="border-b border-gray/20">
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Date
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Time
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Customer
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Service
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Staff
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Status
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                            Payment
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredAppointments.map((appointment) => (
                        <tr
                            key={appointment.id}
                            className="border-b border-gray/10 last:border-0 hover:bg-beige/30 transition"
                        >
                            <td className="px-3 py-4 whitespace-nowrap text-navy">
                                {appointment.date}
                            </td>

                            <td className="px-3 py-4 whitespace-nowrap font-bold text-navy">
                                {appointment.time}
                            </td>

                            <td className="px-3 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            appointment.avatarColor === "gold"
                                                ? "bg-gold"
                                                : "bg-navy"
                                        }`}
                                    >
                                        <span
                                            className={`text-xs font-bold ${
                                                appointment.avatarColor === "gold"
                                                    ? "text-navy"
                                                    : "text-white"
                                            }`}
                                        >
                                            {appointment.initials}
                                        </span>
                                    </div>

                                    <span className="font-bold text-navy whitespace-nowrap">
                                        {appointment.customer}
                                    </span>
                                </div>
                            </td>

                            <td className="px-3 py-4">
                                <p className="font-bold text-navy whitespace-nowrap">
                                    {appointment.service}
                                </p>

                                <p className="mt-0.5 text-xs text-slate">
                                    {appointment.duration}
                                </p>
                            </td>

                            <td className="px-3 py-4">
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <div className="w-7 h-7 rounded-full bg-beige flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-navy">
                                            {appointment.staffInitials}
                                        </span>
                                    </div>

                                    <span className="text-navy">
                                        {appointment.staff}
                                    </span>
                                </div>
                            </td>

                            <td className="px-3 py-4">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${
                                        appointment.status === "Confirmed"
                                            ? "bg-green-50 text-green-700"
                                            : appointment.status === "Pending"
                                            ? "bg-gold/20 text-amber-700"
                                            : appointment.status === "Completed"
                                            ? "bg-gray/20 text-slate"
                                            : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            appointment.status === "Confirmed"
                                                ? "bg-green-600"
                                                : appointment.status === "Pending"
                                                ? "bg-gold"
                                                : appointment.status === "Completed"
                                                ? "bg-slate"
                                                : "bg-red-600"
                                        }`}
                                    />

                                    {appointment.status}
                                </span>
                            </td>

                            <td className="px-3 py-4 font-bold text-navy">
                                {appointment.payment}
                            </td>
                        </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredAppointments.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-sm font-bold text-navy">
                                    No appointments found
                                </p>

                                <p className="mt-1 text-sm text-slate">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Columns View */}
                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                        {filteredAppointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="rounded-xl border border-gray/20 bg-white p-5 transition hover:shadow-sm"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">

                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                appointment.avatarColor === "gold"
                                                    ? "bg-gold"
                                                    : "bg-navy"
                                            }`}
                                        >
                                            <span
                                                className={`text-xs font-bold ${
                                                    appointment.avatarColor === "gold"
                                                        ? "text-navy"
                                                        : "text-white"
                                                }`}
                                            >
                                                {appointment.initials}
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-navy">
                                                {appointment.customer}
                                            </p>

                                            <p className="text-xs text-slate">
                                                {appointment.service}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                            appointment.status === "Confirmed"
                                                ? "bg-green-50 text-green-700"
                                                : appointment.status === "Pending"
                                                ? "bg-gold/20 text-amber-700"
                                                : appointment.status === "Completed"
                                                ? "bg-gray/20 text-slate"
                                                : "bg-red-50 text-red-700"
                                        }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray/20 pt-4">

                                    <div>
                                        <p className="text-xs text-slate">Date</p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {appointment.date}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate">Time</p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {appointment.time}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate">Staff</p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {appointment.staff}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate">Payment</p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {appointment.payment}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}

                        {filteredAppointments.length === 0 && (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-sm font-bold text-navy">
                                    No appointments found
                                </p>

                                <p className="mt-1 text-sm text-slate">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}

                    </div>
                </>
            )}

                        {/* Pagination */}
                        <div className="mt-5 flex flex-col gap-4 border-t border-gray/20 pt-5 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-sm text-slate">
                                Showing <span className="font-bold text-navy">1-10</span> of{" "}
                                <span className="font-bold text-navy">48</span>
                            </p>

                            <div className="flex items-center gap-2">

                                {/* Previous */}
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg border border-gray/30 transition ${
                                        currentPage === 1
                                            ? "cursor-not-allowed opacity-40"
                                            : "text-navy hover:bg-beige"
                                    }`}
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {/* Current Page */}
                                <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-navy px-3 text-sm font-bold text-white">
                                    {currentPage}
                                </span>

                                {/* Next */}
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => page + 1)}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/30 text-navy transition hover:bg-beige"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>

                            </div>
                            
                        </div>
                        
                        

                        
                </div>
                        
                </div>
            </main>
        </div>

    </div>
        

    )

}
export default AppointmentManagement;