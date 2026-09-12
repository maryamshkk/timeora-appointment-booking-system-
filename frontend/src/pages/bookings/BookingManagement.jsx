import React, { useMemo, useState } from "react";
import {
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    List,
    MoreHorizontal,
    Plus,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


// TODO: axios GET /api/company/bookings
// Query params: date, search, page
const bookings = [
    {
        id: 1,
        time: "09:00 - 10:00",
        customer: "Ayesha Khan",
        service: "Consultation",
        staff: "Dr. Sara Ahmed",
        status: "Confirmed",
        payment: {
            type: "method",
            value: "Cash on Reception",
        },
    },
    {
        id: 2,
        time: "10:30 - 11:30",
        customer: "Hina Malik",
        service: "Follow-up",
        staff: "Dr. Sara Ahmed",
        status: "Completed",
        payment: {
            type: "paid",
        },
    },
    {
        id: 3,
        time: "13:00 - 14:00",
        customer: "Maham Ali",
        service: "Consultation",
        staff: "Ali Khan",
        status: "Cancelled",
        payment: {
            type: "none",
        },
    },
];

function BookingManagement() {
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("list");

    const [selectedDate, setSelectedDate] = useState(
        new Date(2026, 7, 21)
    );

    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [showFilters, setShowFilters] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    // TODO: axios GET /api/company/bookings
    // Query params: date, search, page
    const filteredBookings = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return bookings;
        }

        return bookings.filter((booking) =>
            [
                booking.customer,
                booking.service,
                booking.staff,
                booking.status,
                booking.payment?.value,
            ]
                .filter(Boolean)
                .some((value) =>
                    value.toLowerCase().includes(query)
                )
        );
    }, [searchQuery]);

    function formatSelectedDate(date) {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    }

    function getStatusAccent(status) {
        if (status === "Confirmed") {
            return "bg-navy";
        }

        if (status === "Completed") {
            return "bg-gray";
        }

        if (status === "Cancelled") {
            return "bg-red-400";
        }

        if (status === "Pending") {
            return "bg-gold";
        }

        return "bg-gray";
    }

    function getStatusStyle(status) {
        if (status === "Confirmed") {
            return "bg-navy/10 text-navy";
        }

        if (status === "Completed") {
            return "bg-gray/15 text-slate";
        }

        if (status === "Cancelled") {
            return "bg-red-50 text-red-600";
        }

        if (status === "Pending") {
            return "bg-gold/20 text-amber-700";
        }

        return "bg-gray/15 text-slate";
    }

    return (
        <div className="flex min-h-screen bg-beige">
            <Sidebar activeItem="Appointments" />

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showBell
                    hasNotification
                    profileInfo={{ name: "Company Profile" }}
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-8 py-6">

                    {/* Header */}
                    <div className="mb-6 flex flex-col items-start justify-between gap-5 md:flex-row md:items-start">
                        <div className="rounded-xl border border-gray/20 bg-white p-12 text-center shadow-sm">
    <Calendar className="mx-auto mb-3 h-8 w-8 text-slate" />

    <h2 className="font-serif text-xl text-navy">
        Calendar View
    </h2>

    <p className="mt-2 text-sm text-slate">
        View and manage your appointments from the company calendar.
    </p>

    <button
        type="button"
        onClick={() => navigate("/company/calendar")}
        className="mt-5 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
    >
        Open Calendar
    </button>
</div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/company/appointments/new")
                            }
                            className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                        >
                            <Plus className="h-4 w-4" />
                            Create Appointment
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <StatCard
                            value={24}
                            label="Today"
                            accentColor="bg-navy"
                        />

                        <StatCard
                            value={12}
                            label="Upcoming"
                            accentColor="bg-gold"
                        />

                        <StatCard
                            value={8}
                            label="Completed"
                            accentColor="bg-gray"
                        />

                        <StatCard
                            value={2}
                            label="Cancelled"
                            accentColor="bg-red-400"
                        />

                    </div>

                    {/* Toolbar */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                        {/* Left Controls */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* View Toggle */}
                            <div className="flex overflow-hidden rounded-lg border border-gray/30 bg-white">

                                <button
                                    type="button"
                                    onClick={() => setViewMode("list")}
                                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition ${
                                        viewMode === "list"
                                            ? "bg-beige text-navy"
                                            : "text-slate hover:bg-beige/50"
                                    }`}
                                >
                                    <List className="h-4 w-4" />
                                    List
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setViewMode("calendar")}
                                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition ${
                                        viewMode === "calendar"
                                            ? "bg-beige text-navy"
                                            : "text-slate hover:bg-beige/50"
                                    }`}
                                >
                                    <Calendar className="h-4 w-4" />
                                    Calendar
                                </button>

                            </div>

                            {/* Date Picker */}
                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDatePicker((current) => !current)
                                    }
                                    className="flex items-center gap-2 rounded-lg border border-gray/30 bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:border-navy"
                                >
                                    <Calendar className="h-4 w-4" />

                                    <span>
                                        {formatSelectedDate(selectedDate)}
                                    </span>

                                    <ChevronDown className="h-3.5 w-3.5 text-slate" />
                                </button>

                                {showDatePicker && (
                                    <div className="absolute left-0 top-full z-20 mt-2 rounded-lg border border-gray/20 bg-white px-4 py-3 shadow-lg">
                                        <p className="text-xs text-slate">
                                            Date picker coming soon.
                                        </p>
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Right Controls */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Search */}
                            <div className="relative min-w-[220px]">

                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => {
                                        setSearchQuery(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search bookings..."
                                    className="w-full rounded-lg border border-gray/30 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none transition focus:border-navy"
                                />

                            </div>

                            {/* Filters */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowFilters((current) => !current)
                                }
                                className="flex items-center gap-2 rounded-lg border border-gray/30 bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:border-navy"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters
                            </button>

                        </div>

                    </div>

                    {/* Temporary Filter Panel */}
                    {showFilters && (
                        <div className="mb-4 rounded-lg border border-gray/20 bg-white px-5 py-4 shadow-sm">
                            <p className="text-sm text-slate">
                                Booking filters coming soon.
                            </p>
                        </div>
                    )}

                    {/* Booking Content */}
                    {viewMode === "list" ? (
                        <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <div className="min-w-[1050px]">

                                    {/* Header */}
                                    <div className="grid grid-cols-[8px_140px_1.3fr_1fr_1.2fr_120px_1.2fr_60px] items-center gap-4 border-b border-gray/20 bg-beige/40 px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate">

                                        <span></span>
                                        <span>Time</span>
                                        <span>Customer</span>
                                        <span>Service</span>
                                        <span>Staff</span>
                                        <span>Status</span>
                                        <span>Payment</span>
                                        <span>Actions</span>

                                    </div>

                                    {/* Rows */}
                                    {filteredBookings.length > 0 ? (
                                        filteredBookings.map((booking, index) => (
                                            <div
                                                key={booking.id}
                                                className={`relative grid grid-cols-[8px_140px_1.3fr_1fr_1.2fr_120px_1.2fr_60px] items-center gap-4 px-5 py-4 transition hover:bg-beige/20 ${
                                                    index !== filteredBookings.length - 1
                                                        ? "border-b border-gray/10"
                                                        : ""
                                                }`}
                                            >

                                                {/* Status Accent */}
                                                <span
                                                    className={`absolute bottom-2 left-0 top-2 w-1 rounded-full ${getStatusAccent(
                                                        booking.status
                                                    )}`}
                                                />

                                                {/* Gutter */}
                                                <span></span>

                                                {/* Time */}
                                                <span
                                                    className={`text-sm font-bold ${
                                                        booking.status === "Cancelled"
                                                            ? "text-gray line-through"
                                                            : "text-navy"
                                                    }`}
                                                >
                                                    {booking.time}
                                                </span>

                                                {/* Customer */}
                                                <span className="text-sm font-bold text-navy">
                                                    {booking.customer}
                                                </span>

                                                {/* Service */}
                                                <span
                                                    className={`text-sm ${
                                                        booking.status === "Cancelled"
                                                            ? "text-gray line-through"
                                                            : "text-navy"
                                                    }`}
                                                >
                                                    {booking.service}
                                                </span>

                                                {/* Staff */}
                                                <span className="text-sm text-navy">
                                                    {booking.staff}
                                                </span>

                                                {/* Status */}
                                                <span
                                                    className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getStatusStyle(
                                                        booking.status
                                                    )}`}
                                                >
                                                    {booking.status}
                                                </span>

                                                {/* Payment */}
                                                <div>
                                                    {booking.payment.type === "paid" && (
                                                        <span className="flex items-center gap-1.5 text-sm font-bold text-navy">
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-navy" />
                                                            Paid
                                                        </span>
                                                    )}

                                                    {booking.payment.type === "method" && (
                                                        <span className="text-sm text-slate">
                                                            {booking.payment.value}
                                                        </span>
                                                    )}

                                                    {booking.payment.type === "none" && (
                                                        <span className="text-sm text-gray">
                                                            —
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <button
                                                    type="button"
                                                    title="More actions"
                                                    onClick={() => {
                                                        // TODO: open booking action menu
                                                    }}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition hover:bg-beige"
                                                >
                                                    <MoreHorizontal className="h-[18px] w-[18px]" />
                                                </button>

                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-5 py-12 text-center">
                                            <p className="text-sm text-slate">
                                                No bookings found.
                                            </p>
                                        </div>
                                    )}

                                </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-gray/20 px-5 py-4">

                                    <p className="text-sm text-slate">
                                        Showing 1-10 of 42 appointments
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <button
                                            type="button"
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.max(1, page - 1)
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setCurrentPage((page) => page + 1)
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>

                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="rounded-xl border border-gray/20 bg-white p-12 text-center shadow-sm">
                            <Calendar className="mx-auto mb-3 h-8 w-8 text-slate" />

                            <h2 className="font-serif text-xl text-navy">
                                Calendar View
                            </h2>

                            <p className="mt-2 text-sm text-slate">
                                Calendar view coming soon.
                            </p>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

export default BookingManagement;