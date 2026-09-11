import React, { useState } from "react";

import {
    CalendarDays,
    ChevronRight,
    IdCard,
    Mail,
    Phone,
    Plus,
    SlidersHorizontal,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


const mockCustomerData = {
    profile: {
        name: "Ayesha Khan",
        initials: "AK",
        status: "Returning Customer",
    },
    contact: {
        phone: "+92 300 1234567",
        email: "ayesha@example.com",
        customerId: "CUS-00482",
        joined: "15 June 2026",
    },
    upcomingAppointments: [
        {
            date: "25 Aug 2026",
            time: "10:00 AM",
            service: "Consultation",
            staff: "Dr. Sara Ahmed",
            status: "Confirmed",
        },
    ],
    appointmentHistory: [
        {
            date: "21 Aug 2026",
            time: "--",
            service: "Consultation",
            staff: "Dr. Sara Ahmed",
            status: "Completed",
            payment: "Cash",
        },
        {
            date: "14 Aug 2026",
            time: "--",
            service: "Follow-up",
            staff: "Dr. Sara Ahmed",
            status: "Completed",
            payment: "Cash",
        },
        {
            date: "08 Aug 2026",
            time: "--",
            service: "Consultation",
            staff: "Ali Khan",
            status: "Cancelled",
            payment: "-",
        },
    ],
    summary: {
        total: 12,
        completed: 9,
        upcoming: 2,
        cancelled: 1,
    },
    preferences: {
        topServices: [
            {
                name: "Consultation",
                count: 8,
            },
            {
                name: "Follow-up",
                count: 3,
            },
            {
                name: "Therapy Session",
                count: 1,
            },
        ],
        frequentStaff: [
            {
                name: "Dr. Sara Ahmed",
                count: 9,
            },
            {
                name: "Ali Khan",
                count: 3,
            },
        ],
    },
};

function CustomerDetails() {
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [customerData, setCustomerData] = useState(mockCustomerData);
    const [showHistoryFilter, setShowHistoryFilter] = useState(false);

    // TODO: axios GET /api/company/customers/:customerId on mount

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Customers"
                    ctaLabel="Add Customer"
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
                            companyName="Shifa Clinic"
                            activeItem="Customers"
                            ctaLabel="Add Customer"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Breadcrumb */}
                    <div className="mb-3 flex items-center gap-2 text-sm sm:mb-4">
                        <Link
                            to="/company/customers"
                            className="text-slate transition hover:text-navy"
                        >
                            Customers
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="truncate font-bold text-navy">
                            {customerData.profile.name}
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 lg:gap-6">
                            {/* Profile Header */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-7">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                    {/* Customer Info */}
                                    <div className="flex items-start gap-3 sm:items-center sm:gap-5">
                                        {/* Avatar */}
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-beige sm:h-16 sm:w-16">
                                            <span className="font-serif text-xl text-navy sm:text-2xl">
                                                {customerData.profile.initials}
                                            </span>
                                        </div>

                                        {/* Name + Type */}
                                        <div className="min-w-0">
                                            <h1 className="font-serif text-xl leading-tight text-navy sm:text-2xl lg:text-3xl">
                                                {customerData.profile.name}
                                            </h1>

                                            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                                                <span className="text-xs text-slate sm:text-sm">
                                                    Customer
                                                </span>

                                                <span className="rounded-full bg-gold/30 px-2.5 py-1 text-[10px] font-bold text-navy sm:px-3 sm:text-xs">
                                                    {customerData.profile.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Create Appointment */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/appointments/new?customerId=${customerId}`
                                            )
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Create Appointment
                                    </button>
                                </div>
                            </div>

                            {/* Upcoming Appointments */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                <h2 className="mb-4 font-serif text-lg text-navy sm:mb-5 sm:text-xl">
                                    Upcoming Appointments
                                </h2>

                                <div className="-mx-4 overflow-x-auto sm:-mx-5 md:-mx-6">
                                    <div className="inline-block min-w-full px-4 sm:px-5 md:px-6">
                                        <table className="w-full min-w-[600px]">
                                            <thead>
                                                <tr className="border-b border-gray/20">
                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Date
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Time
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Service
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Staff
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {customerData.upcomingAppointments.length > 0 ? (
                                                    customerData.upcomingAppointments.map(
                                                        (appointment, index) => (
                                                            <tr
                                                                key={index}
                                                                className="border-b border-gray/10 last:border-b-0"
                                                            >
                                                                <td className="py-3 text-xs text-navy sm:text-sm md:py-4">
                                                                    {appointment.date}
                                                                </td>

                                                                <td className="py-3 text-xs text-slate sm:text-sm md:py-4">
                                                                    {appointment.time}
                                                                </td>

                                                                <td className="py-3 text-xs font-bold text-navy sm:text-sm md:py-4">
                                                                    {appointment.service}
                                                                </td>

                                                                <td className="py-3 text-xs text-slate sm:text-sm md:py-4">
                                                                    {appointment.staff}
                                                                </td>

                                                                <td className="py-3 md:py-4">
                                                                    <span className="inline-flex whitespace-nowrap rounded-full bg-gold/30 px-2.5 py-1 text-[10px] font-bold text-navy sm:px-3 sm:text-xs">
                                                                        {appointment.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="5"
                                                            className="py-8 text-center text-sm text-slate"
                                                        >
                                                            No upcoming appointments.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment History */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                {/* Header */}
                                <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Appointment History
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowHistoryFilter(!showHistoryFilter)
                                        }
                                        className="flex items-center gap-2 rounded-lg border border-gray/30 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-slate transition hover:border-navy hover:text-navy sm:text-xs"
                                    >
                                        <SlidersHorizontal className="h-3.5 w-3.5" />
                                        Filter
                                    </button>
                                </div>

                                {/* Filter Panel */}
                                {showHistoryFilter && (
                                    <div className="mb-4 rounded-lg border border-gray/20 bg-beige p-3 sm:mb-5 sm:p-4">
                                        <p className="text-xs text-slate sm:text-sm">
                                            Appointment history filters will be connected here.
                                        </p>
                                    </div>
                                )}

                                {/* History Table */}
                                <div className="-mx-4 overflow-x-auto sm:-mx-5 md:-mx-6">
                                    <div className="inline-block min-w-full px-4 sm:px-5 md:px-6">
                                        <table className="w-full min-w-[750px]">
                                            <thead>
                                                <tr className="border-b border-gray/20">
                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Date
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Time
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Service
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Staff
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Status
                                                    </th>

                                                    <th className="pb-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                        Payment
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {customerData.appointmentHistory.map(
                                                    (appointment, index) => (
                                                        <tr
                                                            key={index}
                                                            className="border-b border-gray/10 last:border-b-0"
                                                        >
                                                            <td className="py-3 text-xs text-navy sm:text-sm md:py-4">
                                                                {appointment.date}
                                                            </td>

                                                            <td className="py-3 text-xs text-slate sm:text-sm md:py-4">
                                                                {appointment.time}
                                                            </td>

                                                            <td className="py-3 text-xs font-bold text-navy sm:text-sm md:py-4">
                                                                {appointment.service}
                                                            </td>

                                                            <td className="py-3 text-xs text-slate sm:text-sm md:py-4">
                                                                {appointment.staff}
                                                            </td>

                                                            <td className="py-3 md:py-4">
                                                                <span
                                                                    className={
                                                                        appointment.status ===
                                                                        "Cancelled"
                                                                            ? "inline-flex whitespace-nowrap rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600 sm:px-3 sm:text-xs"
                                                                            : "inline-flex whitespace-nowrap rounded-full bg-gray/15 px-2.5 py-1 text-[10px] font-bold text-slate sm:px-3 sm:text-xs"
                                                                    }
                                                                >
                                                                    {appointment.status}
                                                                </span>
                                                            </td>

                                                            <td className="py-3 text-xs text-slate sm:text-sm md:py-4">
                                                                {appointment.payment}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                            {/* Contact Info */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                <h2 className="mb-4 font-serif text-lg text-navy sm:mb-5 sm:text-xl">
                                    Contact Info
                                </h2>

                                <div className="flex flex-col gap-4 sm:gap-5">
                                    {/* Phone */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                            <Phone className="h-4 w-4 text-navy" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate">Phone</p>

                                            <p className="text-sm font-bold text-navy">
                                                {customerData.contact.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                            <Mail className="h-4 w-4 text-navy" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate">Email</p>

                                            <p className="truncate text-sm font-bold text-navy">
                                                {customerData.contact.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Customer ID */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                            <IdCard className="h-4 w-4 text-navy" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate">
                                                Customer ID
                                            </p>

                                            <p className="text-sm font-bold text-navy">
                                                {customerData.contact.customerId}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Joined */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                            <CalendarDays className="h-4 w-4 text-navy" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate">
                                                Joined
                                            </p>

                                            <p className="text-sm font-bold text-navy">
                                                {customerData.contact.joined}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                <h2 className="font-serif text-lg text-navy sm:text-xl">
                                    Summary
                                </h2>

                                <div className="my-4 border-b border-gray/20 sm:my-5" />

                                <div className="grid grid-cols-2 gap-3">
                                    <StatCard
                                        value={customerData.summary.total}
                                        label="Total Appointments"
                                    />

                                    <StatCard
                                        value={customerData.summary.completed}
                                        label="Completed"
                                        valueColor="text-amber-700"
                                    />

                                    <StatCard
                                        value={customerData.summary.upcoming}
                                        label="Upcoming"
                                    />

                                    <StatCard
                                        value={customerData.summary.cancelled}
                                        label="Cancelled"
                                        valueColor="text-red-600"
                                    />
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                <h2 className="font-serif text-lg text-navy sm:text-xl">
                                    Preferences
                                </h2>

                                <div className="my-4 border-b border-gray/20 sm:my-5" />

                                {/* Top Services */}
                                <div>
                                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                        Top Services
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {customerData.preferences.topServices.map(
                                            (service, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between gap-3"
                                                >
                                                    <span className="truncate text-sm text-navy">
                                                        {service.name}
                                                    </span>

                                                    <span className="flex-shrink-0 text-sm font-bold text-slate">
                                                        {service.count}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="my-4 border-b border-gray/20 sm:my-5" />

                                {/* Frequent Staff */}
                                <div>
                                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                        Frequent Staff
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {customerData.preferences.frequentStaff.map(
                                            (staff, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between gap-3"
                                                >
                                                    <span className="truncate text-sm text-navy">
                                                        {staff.name}
                                                    </span>

                                                    <span className="flex-shrink-0 text-sm font-bold text-slate">
                                                        {staff.count}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CustomerDetails;