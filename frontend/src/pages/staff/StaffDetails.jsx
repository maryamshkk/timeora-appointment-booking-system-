import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowRight,
    Briefcase,
    CalendarClock,
    CalendarDays,
    CalendarPlus,
    CalendarRange,
    CheckCircle2,
    ChevronRight,
    CircleUser,
    History,
    Pencil,
    Scissors,
    TrendingUp,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

const mockStaffData = {
    id: 1,
    name: "Dr. Sara Ahmed",
    role: "DOCTOR",
    professionalRole: "Senior Doctor",
    staffId: "STF-0012",
    phone: "+1 (555) 123-4567",
    email: "sara.ahmed@timeora.com",
    status: "Active",
    availableToday: true,
    avatarUrl: "",
    joinedDate: "14 October, 2021",
    todayDate: "Friday, 21 Aug",
    todayHours: "09:00 AM – 05:00 PM",
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

const appointmentChartData = [
    { day: "Mon", count: 10 },
    { day: "Tue", count: 8 },
    { day: "Wed", count: 6 },
    { day: "Thu", count: 16 },
    { day: "Fri", count: 11 },
    { day: "Sat", count: 17 },
    { day: "Sun", count: 3 },
];

const weeklyHours = [
    { day: "Mon", hours: "09:00 AM – 05:00 PM" },
    { day: "Tue", hours: "09:00 AM – 05:00 PM" },
    { day: "Wed", hours: "09:00 AM – 05:00 PM" },
    { day: "Thu", hours: "09:00 AM – 05:00 PM" },
    { day: "Fri", hours: "09:00 AM – 05:00 PM", isToday: true },
    { day: "Sat", hours: "OFF" },
    { day: "Sun", hours: "OFF" },
];

const assignedServices = [
    { name: "Consultation", subtitle: "GENERAL CHECKUP", duration: "1 Hr" },
    { name: "Follow-up", subtitle: "POST-TREATMENT", duration: "30 Min" },
    { name: "Therapy Session", subtitle: "SPECIALIZED CARE", duration: "1 Hr" },
];

const recentActivity = [
    { time: "Today, 08:45 AM", text: "Checked in for the day." },
    { time: "Yesterday, 04:30 PM", text: "Updated availability for next week." },
    { time: "18 Aug, 11:15 AM", text: "Completed appointment with James Lin." },
];

const staffStats = [
    { value: 6, label: "TODAY" },
    { value: 12, label: "UPCOMING" },
    { value: 4, label: "COMPLETED" },
    { value: 1, label: "CANCELLED", valueColor: "text-red-600" },
];

function StaffDetails() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [staffData] = useState(mockStaffData);
    const [chartRange, setChartRange] = useState("7");

    // TODO: axios GET /api/company/staff/:staffId on mount

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
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
                            activeItem="Staff"
                            ctaLabel="Add Staff"
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
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search appointments, staff..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Breadcrumb */}
                    <div className="mb-3 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="truncate font-bold text-navy">
                            {staffData.name}
                        </span>
                    </div>

                    {/* Profile Header */}
                    <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:mb-7 lg:flex-row lg:items-start lg:justify-between">
                        {/* Profile Info */}
                        <div className="flex items-start gap-3 sm:gap-5">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                                {staffData.avatarUrl ? (
                                    <img
                                        src={staffData.avatarUrl}
                                        alt={staffData.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-serif text-lg font-bold text-navy sm:text-xl lg:text-2xl">
                                        {staffData.name
                                            .split(" ")
                                            .map((name) => name[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <h1 className="font-serif text-xl text-navy sm:text-2xl lg:text-3xl">
                                    {staffData.name}
                                </h1>

                                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate sm:gap-2 sm:text-sm">
                                    <span>{staffData.role}</span>

                                    <span className="text-gray">•</span>

                                    <span>{staffData.staffId}</span>
                                </div>

                                <div className="mt-2.5 flex flex-wrap gap-2">
                                    <span className="flex items-center gap-1.5 rounded-full border border-gray/30 bg-white px-2.5 py-1 text-[10px] font-bold uppercase text-navy sm:px-3 sm:py-1.5 sm:text-xs">
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                        ACTIVE
                                    </span>

                                    {staffData.availableToday && (
                                        <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700 sm:px-3 sm:py-1.5 sm:text-xs">
                                            AVAILABLE TODAY
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Header Actions */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    navigate(
                                        `/company/staff/${staffId}/availability`
                                    );
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:border-navy sm:w-auto sm:px-5"
                            >
                                <CalendarClock className="h-4 w-4" />
                                Manage Availability
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    navigate(`/company/staff/${staffId}/edit`);
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Staff
                            </button>
                        </div>
                    </div>

                    {/* ===== MAIN LAYOUT ===== */}
                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
                        {/* ===== LEFT SIDE (2 cols) ===== */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 lg:gap-6">
                            {/* Top row: Personal Info + Professional Profile */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:gap-6">
                                {/* Personal Information */}
                                <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                    <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                        <CircleUser className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
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
                                            <p className="mt-1 break-all text-sm font-bold text-navy">
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
                                <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                    <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                        <Briefcase className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
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
                                            <span className="rounded-full border border-gray/40 bg-white px-2.5 py-1 text-xs font-bold text-navy sm:px-3 sm:py-1.5">
                                                Consultation
                                            </span>
                                            <span className="rounded-full border border-gray/40 bg-white px-2.5 py-1 text-xs font-bold text-navy sm:px-3 sm:py-1.5">
                                                Follow-up
                                            </span>
                                            <span className="rounded-full border border-gray/40 bg-white px-2.5 py-1 text-xs font-bold text-navy sm:px-3 sm:py-1.5">
                                                Therapy Session
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-3.5 mt-3.5">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                            Joined Date
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {staffData.joinedDate}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                            Account Status
                                        </p>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                            <span className="text-sm font-bold text-navy">
                                                Active &amp; Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Appointments */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Upcoming Appointments
                                        </h2>
                                    </div>

                                    <Link
                                        to="/company/appointments"
                                        className="flex items-center gap-1 text-xs font-bold text-navy hover:underline sm:text-sm"
                                    >
                                        View All
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>

                                <div className="-mx-4 overflow-x-auto sm:-mx-5 lg:-mx-6">
                                    <div className="inline-block min-w-full px-4 sm:px-5 lg:px-6">
                                        <table className="w-full min-w-[560px]">
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
                                                {upcomingAppointments.map(
                                                    (appointment) => (
                                                        <tr
                                                            key={`${appointment.time}-${appointment.customer}`}
                                                            className="border-b border-gray/10"
                                                        >
                                                            <td className="py-3 text-xs font-bold text-navy sm:text-sm">
                                                                {
                                                                    appointment.time
                                                                }
                                                            </td>

                                                            <td className="py-3">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div
                                                                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${appointment.avatarClass}`}
                                                                    >
                                                                        <span className="text-xs font-bold text-navy">
                                                                            {
                                                                                appointment.initials
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <span className="text-xs text-navy sm:text-sm">
                                                                        {
                                                                            appointment.customer
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td className="py-3 text-xs text-slate sm:text-sm">
                                                                {
                                                                    appointment.service
                                                                }
                                                            </td>

                                                            <td className="py-3">
                                                                <span
                                                                    className={
                                                                        appointment.status ===
                                                                        "Confirmed"
                                                                            ? "rounded-full bg-navy/10 px-2 py-1 text-[10px] font-bold uppercase text-navy sm:px-2.5 sm:text-xs"
                                                                            : "rounded-full bg-gold/20 px-2 py-1 text-[10px] font-bold uppercase text-amber-700 sm:px-2.5 sm:text-xs"
                                                                    }
                                                                >
                                                                    {
                                                                        appointment.status
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Activity */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Appointment Activity
                                        </h2>
                                    </div>

                                    <div className="flex w-fit items-center gap-1 rounded-lg bg-gray/10 p-1">
                                        {["7", "30", "90"].map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                onClick={() =>
                                                    setChartRange(range)
                                                }
                                                className={
                                                    chartRange === range
                                                        ? "rounded-md bg-white px-2.5 py-1.5 text-[10px] font-bold text-navy shadow-sm sm:px-3 sm:text-xs"
                                                        : "rounded-md px-2.5 py-1.5 text-[10px] font-bold text-slate sm:px-3 sm:text-xs"
                                                }
                                            >
                                                {range} DAYS
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[220px] w-full sm:h-[260px] lg:h-[280px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart
                                            data={appointmentChartData}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="appointmentAreaGradient"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#000C1E"
                                                        stopOpacity={0.15}
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#000C1E"
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>

                                            <CartesianGrid
                                                vertical={false}
                                                stroke="#E4E2DD"
                                            />

                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#43474E",
                                                    fontSize: 12,
                                                }}
                                            />

                                            <YAxis
                                                domain={[0, 20]}
                                                ticks={[0, 5, 10, 15, 20]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#43474E",
                                                    fontSize: 12,
                                                }}
                                            />

                                            <Tooltip
                                                contentStyle={{
                                                    border: "1px solid #C3C6CF",
                                                    borderRadius: "8px",
                                                    fontSize: "12px",
                                                }}
                                                labelStyle={{
                                                    color: "#000C1E",
                                                    fontWeight: "700",
                                                }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#000C1E"
                                                strokeWidth={2.5}
                                                fill="url(#appointmentAreaGradient)"
                                                dot={{
                                                    fill: "#FED488",
                                                    stroke: "#FED488",
                                                    r: 5,
                                                }}
                                                activeDot={{
                                                    fill: "#FED488",
                                                    stroke: "#000C1E",
                                                    strokeWidth: 2,
                                                    r: 6,
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* ===== RIGHT COLUMN (1 col) ===== */}
                        <div className="flex h-full flex-col gap-4 md:gap-5 lg:gap-6">
                            {/* Today's Availability */}
                            <div className="relative rounded-xl bg-navy p-4 text-white sm:p-5 lg:p-6">
                                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/60">
                                    Today's Availability
                                </p>

                                <h2 className="font-serif text-xl text-white sm:text-2xl">
                                    {staffData.todayDate}
                                </h2>

                                <p className="mt-1 text-sm text-white/70">
                                    {staffData.todayHours}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold uppercase text-navy">
                                        Available
                                    </span>

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                        <CalendarPlus className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Stat Cards 2×2 */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {staffStats.map((stat) => (
                                    <StatCard
                                        key={stat.label}
                                        value={stat.value}
                                        label={stat.label}
                                        valueColor={stat.valueColor}
                                    />
                                ))}
                            </div>

                            {/* Weekly Hours */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                    <CalendarRange className="h-[18px] w-[18px] text-slate" />

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Weekly Hours
                                    </h2>
                                </div>

                                <div className="mb-2 border-b border-gray/20"></div>

                                <div>
                                    {weeklyHours.map((item, index) => (
                                        <div
                                            key={item.day}
                                            className={`
                                                flex items-center justify-between gap-3
                                                border-b border-gray/10
                                                py-2.5
                                                ${
                                                    index ===
                                                    weeklyHours.length - 1
                                                        ? "border-b-0"
                                                        : ""
                                                }
                                                ${
                                                    item.isToday
                                                        ? "border-l-4 border-navy bg-beige/30 pl-2.5"
                                                        : ""
                                                }
                                            `}
                                        >
                                            <span
                                                className={
                                                    item.isToday
                                                        ? "text-xs font-bold text-navy sm:text-sm"
                                                        : "text-xs text-slate sm:text-sm"
                                                }
                                            >
                                                {item.day}
                                            </span>

                                            <span
                                                className={
                                                    item.hours === "OFF"
                                                        ? "text-xs font-bold text-gray sm:text-sm"
                                                        : "text-xs text-navy sm:text-sm"
                                                }
                                            >
                                                {item.hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Assigned Services */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                    <Scissors className="h-[18px] w-[18px] text-slate" />

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Assigned Services
                                    </h2>
                                </div>

                                <div className="mb-1 border-b border-gray/20"></div>

                                <div>
                                    {assignedServices.map((service, index) => (
                                        <div
                                            key={service.name}
                                            className={`
                                                flex items-start justify-between gap-4
                                                py-3
                                                ${
                                                    index ===
                                                    assignedServices.length - 1
                                                        ? ""
                                                        : "border-b border-gray/10"
                                                }
                                            `}
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-navy">
                                                    {service.name}
                                                </p>

                                                <p className="mt-1 text-xs uppercase text-gray">
                                                    {service.subtitle}
                                                </p>
                                            </div>

                                            <span className="flex-shrink-0 rounded bg-gray/10 px-2.5 py-1 text-xs font-bold text-navy">
                                                {service.duration}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="flex flex-1 flex-col rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                    <History className="h-[18px] w-[18px] text-slate" />

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Recent Activity
                                    </h2>
                                </div>

                                <div className="mb-4 border-b border-gray/20"></div>

                                <div className="relative">
                                    <div className="absolute bottom-3 left-[3px] top-3 w-px bg-gray/20"></div>

                                    <div className="space-y-5">
                                        {recentActivity.map(
                                            (activity, index) => (
                                                <div
                                                    key={`${activity.time}-${activity.text}`}
                                                    className="relative flex gap-3"
                                                >
                                                    <div className="relative z-10 mt-1 flex h-2 w-2 flex-shrink-0">
                                                        <span
                                                            className={
                                                                index === 0
                                                                    ? "h-2 w-2 rounded-full bg-navy"
                                                                    : "h-2 w-2 rounded-full bg-gray"
                                                            }
                                                        ></span>
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray">
                                                            {activity.time}
                                                        </p>

                                                        <p className="mt-0.5 text-sm text-navy">
                                                            {activity.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto border-t border-gray/10 pt-4 text-center">
                                    <button
                                        type="button"
                                        className="text-xs font-bold uppercase tracking-wide text-navy hover:underline"
                                    >
                                        View Full Log
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

export default StaffDetails;