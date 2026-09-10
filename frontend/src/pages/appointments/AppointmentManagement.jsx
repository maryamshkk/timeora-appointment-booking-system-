import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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


function AppointmentManagement() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [viewMode, setViewMode] = useState("list");
    const [currentPage, setCurrentPage] = useState(1);

    const stats = [
        { label: "Today's Appointments", value: "24", icon: CalendarDays },
        { label: "Upcoming", value: "12", icon: ArrowLeftRight },
        { label: "Completed", value: "8", icon: CheckCircle2 },
        { label: "Cancelled", value: "2", icon: XCircle },
    ];

    const appointments = [
        {
            id: "APT-2026-0048",
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
            staffFilter === "all" || appointment.staff === staffFilter;

        const matchesService =
            serviceFilter === "all" ||
            appointment.service === serviceFilter;

        return matchesSearch && matchesStatus && matchesStaff && matchesService;
    });

    function goToDetails(id) {
        navigate(`/company/appointments/${id}`);
    }

    return (
        <div className="flex min-h-screen bg-beige/30">
            {/* Desktop Sidebar — inline */}
            <div className="hidden lg:block">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Appointments"
                    ctaLabel="Book Appointment"
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
                    showHelp
                    showGrid
                    profileName="Admin"
                />

                <main className="p-3 md:p-6 lg:p-8">
                    {/* Page Header */}
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:mb-8 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl">
                                Appointments
                            </h1>

                            <p className="mt-1 text-sm text-slate">
                                Manage, track, and organize all your appointments.
                            </p>
                        </div>

                        <button
                        type="button"
                        onClick={function () {
                            navigate(`/company/appointments/new`);
                        }}
                        className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                    >
                        <Plus className="h-4 w-4" />
                        New Appointment
                    </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.label}
                                label={stat.label}
                                value={stat.value}
                                icon={stat.icon}
                            />
                        ))}
                    </div>

                    {/* Appointments Content */}
                    <div className="mt-4 md:mt-6">
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-3 md:p-6">
                            {/* Filters */}
                            <div className="flex flex-col gap-2 md:gap-3 md:flex-row md:flex-wrap md:items-center">
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

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-sm font-bold text-navy hover:bg-beige transition md:w-auto md:justify-start"
                                >
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate" />
                                        21 August 2026
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-slate" />
                                </button>

                                <div className="hidden md:block h-7 w-px bg-gray/30" />

                                <div className="relative w-full md:w-auto">
                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold md:w-auto"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                                </div>

                                <div className="relative w-full md:w-auto">
                                    <select
                                        value={staffFilter}
                                        onChange={(event) => {
                                            setStaffFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold md:w-auto"
                                    >
                                        <option value="all">All Staff</option>
                                        <option value="M. Bennett">M. Bennett</option>
                                        <option value="J. Wright">J. Wright</option>
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                                </div>

                                <div className="relative w-full md:w-auto">
                                    <select
                                        value={serviceFilter}
                                        onChange={(event) => {
                                            setServiceFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full appearance-none rounded-lg border border-gray/30 bg-white py-2.5 pl-3 pr-9 text-sm font-bold text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold md:w-auto"
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
                                <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray/30 md:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode("list")}
                                        className={`flex flex-1 items-center justify-center gap-2 px-3 py-2 text-sm font-bold transition md:flex-none ${
                                            viewMode === "list"
                                                ? "bg-navy text-white"
                                                : "bg-white text-slate hover:bg-beige"
                                        }`}
                                        aria-label="List view"
                                    >
                                        <List className="w-4 h-4" />
                                        <span className="hidden md:inline">List</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setViewMode("columns")}
                                        className={`flex flex-1 items-center justify-center gap-2 border-l border-gray/30 px-3 py-2 text-sm font-bold transition md:flex-none ${
                                            viewMode === "columns"
                                                ? "bg-navy text-white"
                                                : "bg-white text-slate hover:bg-beige"
                                        }`}
                                        aria-label="Columns view"
                                    >
                                        <Columns3 className="w-4 h-4" />
                                        <span className="hidden md:inline">Columns</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 border-t border-gray/20 md:mt-5" />

                            {/* Views */}
                            {viewMode === "list" ? (
                                <>
                                    <div className="mt-4 overflow-x-auto md:mt-5">
                                        <table className="w-full min-w-[1050px] text-sm">
                                            <thead>
                                                <tr className="border-b border-gray/20">
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Date</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Time</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Customer</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Service</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Staff</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Status</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Payment</th>
                                                    <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-3 md:py-3">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filteredAppointments.map((appointment) => (
                                                    <tr
                                                        key={appointment.id}
                                                        onClick={() => goToDetails(appointment.id)}
                                                        className="cursor-pointer border-b border-gray/10 last:border-0 hover:bg-beige/30 transition"
                                                    >
                                                        <td className="px-2 py-3 whitespace-nowrap text-navy md:px-3 md:py-4">
                                                            {appointment.date}
                                                        </td>

                                                        <td className="px-2 py-3 whitespace-nowrap font-bold text-navy md:px-3 md:py-4">
                                                            {appointment.time}
                                                        </td>

                                                        <td className="px-2 py-3 md:px-3 md:py-4">
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

                                                        <td className="px-2 py-3 md:px-3 md:py-4">
                                                            <p className="font-bold text-navy whitespace-nowrap">
                                                                {appointment.service}
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-slate">
                                                                {appointment.duration}
                                                            </p>
                                                        </td>

                                                        <td className="px-2 py-3 md:px-3 md:py-4">
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

                                                        <td className="px-2 py-3 md:px-3 md:py-4">
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

                                                        <td className="px-2 py-3 font-bold text-navy md:px-3 md:py-4">
                                                            {appointment.payment}
                                                        </td>

                                                        <td className="px-2 py-3 md:px-3 md:py-4">
                                                            <button
                                                                type="button"
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    goToDetails(appointment.id);
                                                                }}
                                                                className="text-sm font-bold text-navy hover:text-slate"
                                                            >
                                                                View Details
                                                            </button>
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
                                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-5 md:gap-4 xl:grid-cols-3">
                                        {filteredAppointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                onClick={() => goToDetails(appointment.id)}
                                                className="cursor-pointer rounded-xl border border-gray/20 bg-white p-4 shadow-md transition hover:shadow-lg md:p-5"
                                            >
                                                <div className="flex items-center justify-between gap-3 ">
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

                                                <button
                                                type="button"
                                                onClick={function () {
                                                    navigate(
                                                        `/company/appointments/${selectedAppointment.id}`
                                                    );
                                                }}
                                                className="flex-1 rounded-lg bg-navy py-3 px-3 mt-5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy border border-b-mauve-500"
                                            >
                                                View Details
                                            </button>
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
                            <div className="mt-4 flex flex-col items-center gap-3 border-t border-gray/20 pt-4 sm:flex-row sm:items-center sm:justify-between md:mt-5 md:gap-4 md:pt-5">
                                <p className="text-sm text-slate">
                                    Showing <span className="font-bold text-navy">1-10</span> of{" "}
                                    <span className="font-bold text-navy">48</span>
                                </p>

                                <div className="flex items-center gap-2">
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

                                    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-navy px-3 text-sm font-bold text-white">
                                        {currentPage}
                                    </span>

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
    );
}

export default AppointmentManagement;