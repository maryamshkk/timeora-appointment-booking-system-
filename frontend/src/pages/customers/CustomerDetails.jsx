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

    const [customerData, setCustomerData] = useState(mockCustomerData);
    const [showHistoryFilter, setShowHistoryFilter] = useState(false);

    return (
        <div className="flex min-h-screen bg-beige">
            <Sidebar activeItem="Customers" />

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showBell
                    hasNotification
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/customers"
                            className="text-slate hover:text-navy"
                        >
                            Customers
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            {customerData.profile.name}
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6 lg:col-span-2">

                            {/* Profile Header */}
                            <div className="rounded-xl border border-gray/20 bg-white p-7 shadow-sm">
                                <div className="flex items-start justify-between gap-6">

                                    {/* Customer Info */}
                                    <div className="flex items-center gap-5">

                                        {/* Avatar */}
                                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-beige">
                                            <span className="font-serif text-2xl text-navy">
                                                {customerData.profile.initials}
                                            </span>
                                        </div>

                                        {/* Name + Type */}
                                        <div>
                                            <h1 className="font-serif text-3xl leading-tight text-navy">
                                                {customerData.profile.name}
                                            </h1>

                                            <div className="mt-2 flex items-center gap-3">

                                                <span className="text-sm text-slate">
                                                    Customer
                                                </span>

                                                <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-bold text-navy">
                                                    {customerData.profile.status}
                                                </span>

                                            </div>
                                        </div>

                                    </div>

                                    {/* Create Appointment */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(`/appointments/new?customerId=${customerId}`)
                                        }
                                        className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Create Appointment
                                    </button>

                                </div>


                            </div>
                            
                            {/* upcoming appointment */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <h2 className="mb-5 font-serif text-xl text-navy">
                                    Upcoming Appointments
                                </h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[650px]">

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
                                                customerData.upcomingAppointments.map((appointment, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-gray/10 last:border-b-0"
                                                    >
                                                        <td className="py-4 text-sm text-navy">
                                                            {appointment.date}
                                                        </td>

                                                        <td className="py-4 text-sm text-slate">
                                                            {appointment.time}
                                                        </td>

                                                        <td className="py-4 text-sm font-bold text-navy">
                                                            {appointment.service}
                                                        </td>

                                                        <td className="py-4 text-sm text-slate">
                                                            {appointment.staff}
                                                        </td>

                                                        <td className="py-4">
                                                            <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-bold text-navy">
                                                                {appointment.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
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

                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

    {/* Header */}
    <div className="mb-5 flex items-center justify-between">

        <h2 className="font-serif text-xl text-navy">
            Appointment History
        </h2>

        <button
            type="button"
            onClick={() => setShowHistoryFilter(!showHistoryFilter)}
            className="flex items-center gap-2 rounded-lg border border-gray/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate transition hover:border-navy hover:text-navy"
        >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
        </button>

    </div>

    {/* Filter Panel */}
    {showHistoryFilter && (
        <div className="mb-5 rounded-lg border border-gray/20 bg-beige p-4">
            <p className="text-sm text-slate">
                Appointment history filters will be connected here.
            </p>
        </div>
    )}

    {/* History Table */}
    <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">

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
                {customerData.appointmentHistory.map((appointment, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray/10 last:border-b-0"
                    >

                        <td className="py-4 text-sm text-navy">
                            {appointment.date}
                        </td>

                        <td className="py-4 text-sm text-slate">
                            {appointment.time}
                        </td>

                        <td className="py-4 text-sm font-bold text-navy">
                            {appointment.service}
                        </td>

                        <td className="py-4 text-sm text-slate">
                            {appointment.staff}
                        </td>

                        <td className="py-4">
                            <span
                                className={
                                    appointment.status === "Cancelled"
                                        ? "rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                                        : "rounded-full bg-gray/15 px-3 py-1 text-xs font-bold text-slate"
                                }
                            >
                                {appointment.status}
                            </span>
                        </td>

                        <td className="py-4 text-sm text-slate">
                            {appointment.payment}
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    </div>

</div>

                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-6">

                                {/* Contact Info */}
                                <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                    <h2 className="mb-5 font-serif text-xl text-navy">
                                        Contact Info
                                    </h2>

                                    <div className="flex flex-col gap-5">

                                        {/* Phone */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                                <Phone className="h-4 w-4 text-navy" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate">
                                                    Phone
                                                </p>

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
                                                <p className="text-xs text-slate">
                                                    Email
                                                </p>

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

                            </div>                        
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default CustomerDetails;