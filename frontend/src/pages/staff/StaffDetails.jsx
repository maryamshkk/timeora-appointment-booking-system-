import React, { useState } from "react";

import {
    ArrowRight,
    Briefcase,
    CalendarClock,
    CalendarDays,
    CalendarPlus,
    CheckCircle2,
    ChevronRight,
    CircleUser,
    Pencil,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


import { Link, useNavigate, useParams } from "react-router-dom";


const mockStaffData = {
    id: 1,
    name: "Dr. Sara Ahmed",
    role: "DOCTOR",
    professionalRole: "Senior Doctor",
    staffId: "STF-0012",
    phone: "0300 1234567",
    email: "sara@shifaclinic.com",
    status: "Active",
    availableToday: true,
    avatarUrl: "",
};

const upcomingAppointments = [
    {
        time: "09:00 AM",
        customer: "Ayesha Khan",
        initials: "AK",
        service: "Consultation",
        status: "Confirmed",
        avatarClass: "bg-blue-100",
    },
    {
        time: "10:30 AM",
        customer: "James Lin",
        initials: "JL",
        service: "Therapy Session",
        status: "Confirmed",
        avatarClass: "bg-gold/30",
    },
    {
        time: "01:00 PM",
        customer: "Maria Rodriguez",
        initials: "MR",
        service: "Follow-up",
        status: "Pending",
        avatarClass: "bg-gray/30",
    },
];

function StaffDetails() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [staffData, setStaffData] = useState(mockStaffData);

    // TODO: axios GET /api/company/staff/:staffId on mount
    // TODO: Replace mockStaffData with API response

    return (
        <div className="flex min-h-screen bg-beige">
            <Sidebar activeItem="Staff" />

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    showBell
                    hasNotification
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search appointments, staff..."
                />

                <main className="flex-1 bg-beige px-8 py-6">
                        {/* Breadcrumb */}
                    <div className="mb-3 flex items-center gap-2 text-sm">

                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            {staffData.name}
                        </span>

                    </div>

                    
                    {/* Profile Header */}
                    <div className="mb-7 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Profile Information */}
                        <div className="flex items-start gap-5">

                            {/* Avatar */}
                            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray/20">

                                {staffData.avatarUrl ? (
                                    <img
                                        src={staffData.avatarUrl}
                                        alt={staffData.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-serif text-2xl font-bold text-navy">
                                        {staffData.name
                                            .split(" ")
                                            .map((name) => name[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </span>
                                )}

                            </div>

                            {/* Info */}
                            <div>

                                <h1 className="font-serif text-3xl text-navy">
                                    {staffData.name}
                                </h1>

                                <div className="mt-1.5 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate">

                                    <span>{staffData.role}</span>

                                    <span className="text-gray">
                                        •
                                    </span>

                                    <span>{staffData.staffId}</span>

                                </div>

                                <div className="mt-2.5 flex flex-wrap gap-2">

                                    {/* Active Badge */}
                                    <span className="flex items-center gap-1.5 rounded-full border border-gray/30 bg-white px-3 py-1.5 text-xs font-bold uppercase text-navy">

                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>

                                        ACTIVE

                                    </span>

                                    {/* Available Badge */}
                                    {staffData.availableToday && (
                                        <span className="rounded-full bg-gold/20 px-3 py-1.5 text-xs font-bold uppercase text-amber-700">
                                            AVAILABLE TODAY
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Header Actions */}
                        <div className="flex flex-wrap items-center gap-3">

                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: Navigate to detailed availability page
                                    navigate(
                                        `/company/staff/${staffId}/availability`
                                    );
                                }}
                                className="flex items-center gap-2 rounded-lg border border-gray bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:border-navy"
                            >
                                <CalendarClock className="h-4 w-4" />
                                Manage Availability
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: Navigate to edit staff page
                                    navigate(
                                        `/company/staff/${staffId}/edit`
                                    );
                                }}
                                className="flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Staff
                            </button>

                        </div>

                    </div>


                    {/* {/* Top Information Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Personal Information */}
                        <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                            <div className="mb-4 flex items-center gap-2">
                                <CircleUser className="h-[18px] w-[18px] text-slate" />

                                <h2 className="font-serif text-xl text-navy">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="mb-4 border-b border-gray/20"></div>

                            <div className="space-y-3.5">

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Full Name
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-navy">
                                        {staffData.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-navy">
                                        {staffData.phone}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Email
                                    </p>

                                    <p className="mt-1 break-words text-sm font-bold text-navy">
                                        {staffData.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Staff ID
                                    </p>

                                    <span className="mt-1 inline-block rounded bg-gray/10 px-2 py-1 text-xs font-bold text-navy">
                                        {staffData.staffId}
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* Professional Profile */}
                        <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                            <div className="mb-4 flex items-center gap-2">
                                <Briefcase className="h-[18px] w-[18px] text-slate" />

                                <h2 className="font-serif text-xl text-navy">
                                    Professional Profile
                                </h2>
                            </div>

                            <div className="mb-4 border-b border-gray/20"></div>

                            <div className="mb-3.5">
                                <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                    Role
                                </p>

                                <p className="mt-1 text-sm font-bold text-navy">
                                    {staffData.professionalRole}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray">
                                    Services
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    <span className="rounded-full border border-gray/40 bg-white px-3 py-1.5 text-xs font-bold text-navy">
                                        Consultation
                                    </span>

                                    <span className="rounded-full border border-gray/40 bg-white px-3 py-1.5 text-xs font-bold text-navy">
                                        Follow-up
                                    </span>

                                    <span className="rounded-full border border-gray/40 bg-white px-3 py-1.5 text-xs font-bold text-navy">
                                        Therapy Session
                                    </span>

                                </div>
                            </div>

                            <div className="mb-3.5 mt-3.5">
                                <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                    Joined Date
                                </p>

                                <p className="mt-1 text-sm font-bold text-navy">
                                    14 October, 2021
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                    Account Status
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />

                                    <span className="text-sm font-bold text-navy">
                                        Active & Verified
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Today's Availability */}
                        <div className="relative rounded-xl bg-navy p-6 text-white">

                            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/60">
                                Today's Availability
                            </p>

                            <h2 className="font-serif text-2xl text-white">
                                Friday, 21 Aug
                            </h2>

                            <p className="mt-1 text-sm text-white/70">
                                09:00 AM – 05:00 PM
                            </p>

                            <div className="mt-5 flex items-center justify-between">

                                <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold uppercase text-navy">
                                    Available
                                </span>

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                    <CalendarPlus className="h-4 w-4 text-white" />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Main Details Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6 lg:col-span-2">

                            {/* Upcoming Appointments */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <div className="mb-4 flex items-center justify-between">

                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-xl text-navy">
                                            Upcoming Appointments
                                        </h2>
                                    </div>

                                    <Link
                                        to="/company/appointments"
                                        className="flex items-center gap-1 text-sm font-bold text-navy hover:underline"
                                    >
                                        View All
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>

                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[600px]">

                                        <thead>
                                            <tr className="border-b border-gray/20 text-left">

                                                <th className="pb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                                    Time
                                                </th>

                                                <th className="pb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                                    Customer
                                                </th>

                                                <th className="pb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                                    Service
                                                </th>

                                                <th className="pb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                                    Status
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody>

                                            {upcomingAppointments.map((appointment) => (
                                                <tr
                                                    key={`${appointment.time}-${appointment.customer}`}
                                                    className="border-b border-gray/10"
                                                >

                                                    <td className="py-3 text-sm font-bold text-navy">
                                                        {appointment.time}
                                                    </td>

                                                    <td className="py-3">
                                                        <div className="flex items-center gap-2.5">

                                                            <div
                                                                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${appointment.avatarClass}`}
                                                            >
                                                                <span className="text-xs font-bold text-navy">
                                                                    {appointment.initials}
                                                                </span>
                                                            </div>

                                                            <span className="text-sm text-navy">
                                                                {appointment.customer}
                                                            </span>

                                                        </div>
                                                    </td>

                                                    <td className="py-3 text-sm text-slate">
                                                        {appointment.service}
                                                    </td>

                                                    <td className="py-3">

                                                        <span
                                                            className={
                                                                appointment.status === "Confirmed"
                                                                    ? "rounded-full bg-navy/10 px-2.5 py-1 text-xs font-bold uppercase text-navy"
                                                                    : "rounded-full bg-gold/20 px-2.5 py-1 text-xs font-bold uppercase text-amber-700"
                                                            }
                                                        >
                                                            {appointment.status}
                                                        </span>

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

                            {/* Staff Statistics */}
                            <div className="grid grid-cols-2 gap-4">

                                <StatCard
                                    value={6}
                                    label="TODAY"
                                />

                                <StatCard
                                    value={12}
                                    label="UPCOMING"
                                />

                                <StatCard
                                    value={4}
                                    label="COMPLETED"
                                />

                                <StatCard
                                    value={1}
                                    label="CANCELLED"
                                    valueColor="text-red-600"
                                />

                            </div>

                        </div>

                    </div>

                    

                </main>


                
            </div>
        </div>
    );
}
export default StaffDetails;