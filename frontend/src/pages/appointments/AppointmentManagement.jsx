import React, { useMemo, useState } from "react";
import {
    Calendar,
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
import CalendarScheduleView from "../../components/dashboard/CalendarScheduleView";

// TODO: axios GET /api/company/bookings
// Query params: date, search, page
const bookings = [
    {
        id: 1,
        date: "2026-09-12",
        time: "09:00 - 10:00",
        customer: "Ayesha Khan",
        service: "Consultation",
        staff: "Dr. Sara Ahmed",
        status: "Confirmed",
        payment: { type: "method", value: "Cash on Reception" },
    },
    {
        id: 2,
        date: "2026-09-12",
        time: "10:30 - 11:30",
        customer: "Hina Malik",
        service: "Follow-up",
        staff: "Dr. Sara Ahmed",
        status: "Completed",
        payment: { type: "paid" },
    },
    {
        id: 3,
        date: "2026-09-13",
        time: "13:00 - 14:00",
        customer: "Maham Ali",
        service: "Consultation",
        staff: "Ali Khan",
        status: "Cancelled",
        payment: { type: "none" },
    },
    {
        id: 4,
        date: "2026-09-13",
        time: "15:00 - 15:30",
        customer: "Omar Tariq",
        service: "Consultation",
        staff: "Ali Khan",
        status: "Pending",
        payment: { type: "none" },
    },
    {
        id: 5,
        date: "2026-09-14",
        time: "11:00 - 12:00",
        customer: "Sana Iqbal",
        service: "Follow-up",
        staff: "Dr. Sara Ahmed",
        status: "Confirmed",
        payment: { type: "paid" },
    },
    {
        id: 6,
        date: "2026-09-14",
        time: "14:00 - 15:00",
        customer: "Bilal Raza",
        service: "Consultation",
        staff: "Ali Khan",
        status: "Confirmed",
        payment: { type: "method", value: "Cash on Reception" },
    },
    {
        id: 7,
        date: "2026-09-15",
        time: "09:30 - 10:00",
        customer: "Fatima Noor",
        service: "Follow-up",
        staff: "Dr. Sara Ahmed",
        status: "Pending",
        payment: { type: "none" },
    },
    {
        id: 8,
        date: "2026-09-15",
        time: "12:00 - 13:00",
        customer: "Usman Shah",
        service: "Consultation",
        staff: "Ali Khan",
        status: "Completed",
        payment: { type: "paid" },
    },
    {
        id: 9,
        date: "2026-09-16",
        time: "10:00 - 11:00",
        customer: "Nida Rehman",
        service: "Consultation",
        staff: "Dr. Sara Ahmed",
        status: "Cancelled",
        payment: { type: "none" },
    },
    {
        id: 10,
        date: "2026-09-16",
        time: "16:00 - 17:00",
        customer: "Kamran Yousaf",
        service: "Follow-up",
        staff: "Ali Khan",
        status: "Confirmed",
        payment: { type: "method", value: "Cash on Reception" },
    },
    {
        id: 11,
        date: "2026-09-17",
        time: "11:30 - 12:30",
        customer: "Rabia Saeed",
        service: "Consultation",
        staff: "Dr. Sara Ahmed",
        status: "Completed",
        payment: { type: "paid" },
    },
    {
        id: 12,
        date: "2026-09-17",
        time: "15:00 - 16:00",
        customer: "Hamza Iqbal",
        service: "Follow-up",
        staff: "Ali Khan",
        status: "Pending",
        payment: { type: "none" },
    },
];

function AppointmentManagement() {
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("list");

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [bookingDate, setBookingDate] = useState("");

    const [openActionId, setOpenActionId] = useState(null);

    // TODO: axios GET /api/company/bookings
    // Query params: date, search, page
    const filteredBookings = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return bookings.filter((booking) => {
            const matchesSearch =
                !query ||
                [
                    booking.customer,
                    booking.service,
                    booking.staff,
                    booking.status,
                    booking.payment?.value,
                ]
                    .filter(Boolean)
                    .some((value) => value.toLowerCase().includes(query));

            const matchesDate =
                !bookingDate || booking.date === bookingDate;

            const matchesStatus =
                statusFilter === "all" || booking.status === statusFilter;

            const matchesStaff =
                staffFilter === "all" || booking.staff === staffFilter;

            const matchesService =
                serviceFilter === "all" ||
                booking.service === serviceFilter;

            const matchesPayment =
                paymentFilter === "all" ||
                booking.payment?.type === paymentFilter;

            return (
                matchesSearch &&
                matchesDate &&
                matchesStatus &&
                matchesStaff &&
                matchesService &&
                matchesPayment
            );
        });
    }, [
        searchQuery,
        bookingDate,
        statusFilter,
        staffFilter,
        serviceFilter,
        paymentFilter,
    ]);

    // Pagination
    const itemsPerPage = 10;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredBookings.length / itemsPerPage)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedBookings = filteredBookings.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const activeFilterCount =
        (bookingDate ? 1 : 0) +
        (statusFilter !== "all" ? 1 : 0) +
        (staffFilter !== "all" ? 1 : 0) +
        (serviceFilter !== "all" ? 1 : 0) +
        (paymentFilter !== "all" ? 1 : 0);

    function getStatusAccent(status) {
        if (status === "Confirmed") return "bg-navy";
        if (status === "Completed") return "bg-gray";
        if (status === "Cancelled") return "bg-red-400";
        if (status === "Pending") return "bg-gold";
        return "bg-gray";
    }

    function getStatusStyle(status) {
        if (status === "Confirmed") return "bg-navy/10 text-navy";
        if (status === "Completed") return "bg-gray/15 text-slate";
        if (status === "Cancelled") return "bg-red-50 text-red-600";
        if (status === "Pending") return "bg-gold/20 text-amber-700";
        return "bg-gray/15 text-slate";
    }

    function clearFilters() {
        setStatusFilter("all");
        setStaffFilter("all");
        setServiceFilter("all");
        setPaymentFilter("all");
        setBookingDate("");
        setSearchQuery("");
        setCurrentPage(1);
    }

    function handleToday() {
        const today = new Date();
        const iso = today.toISOString().slice(0, 10);
        setBookingDate(iso);
        setCurrentPage(1);
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
                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Appointment Management
                            </h1>
                            <p className="mt-1.5 text-sm text-slate">
                                View and manage appointments across your company.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/company/appointments/create")}
                            className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                        >
                            <Plus className="h-4 w-4" />
                            Create Appointment
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard value={24} label="Today" accentColor="bg-navy" />
                        <StatCard value={12} label="Upcoming" accentColor="bg-gold" />
                        <StatCard value={8} label="Completed" accentColor="bg-gray" />
                        <StatCard value={2} label="Cancelled" accentColor="bg-red-400" />
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
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(event) => {
                                            setBookingDate(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-[42px] rounded-lg border border-gray/30 bg-white pl-9 pr-3 text-sm font-bold text-navy outline-none transition hover:border-navy focus:border-navy"
                                    />

                                    {bookingDate && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBookingDate("");
                                                setCurrentPage(1);
                                            }}
                                            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate transition hover:bg-beige hover:text-navy"
                                            aria-label="Clear date"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleToday}
                                    className="h-[42px] rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy transition hover:border-navy"
                                >
                                    Today
                                </button>
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
                                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition ${
                                    showFilters || activeFilterCount > 0
                                        ? "border-navy bg-navy text-white"
                                        : "border-gray/30 bg-white text-navy hover:border-navy"
                                }`}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters

                                {activeFilterCount > 0 && (
                                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-navy">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="mb-4 rounded-xl border border-gray/20 bg-beige/30 p-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {/* Status */}
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Status
                                    </label>

                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Staff */}
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Staff
                                    </label>

                                    <select
                                        value={staffFilter}
                                        onChange={(event) => {
                                            setStaffFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Staff</option>
                                        <option value="Dr. Sara Ahmed">Dr. Sara Ahmed</option>
                                        <option value="Ali Khan">Ali Khan</option>
                                    </select>
                                </div>

                                {/* Service */}
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Service
                                    </label>

                                    <select
                                        value={serviceFilter}
                                        onChange={(event) => {
                                            setServiceFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Services</option>
                                        <option value="Consultation">Consultation</option>
                                        <option value="Follow-up">Follow-up</option>
                                    </select>
                                </div>

                                {/* Payment */}
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Payment
                                    </label>

                                    <select
                                        value={paymentFilter}
                                        onChange={(event) => {
                                            setPaymentFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Payments</option>
                                        <option value="paid">Paid</option>
                                        <option value="method">Cash on Reception</option>
                                        <option value="none">Unpaid</option>
                                    </select>
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="text-xs font-bold text-navy hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Booking Content */}
                    {viewMode === "list" ? (
                        <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">
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
                                    {paginatedBookings.length > 0 ? (
                                        paginatedBookings.map((booking, index) => (
                                            <div
                                                key={booking.id}
                                                className={`relative grid grid-cols-[8px_140px_1.3fr_1fr_1.2fr_120px_1.2fr_60px] items-center gap-4 px-5 py-4 transition hover:bg-beige/20 ${
                                                    index !== paginatedBookings.length - 1
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
                                                        <span className="text-sm text-gray">—</span>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="relative flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenActionId(
                                                                openActionId === booking.id
                                                                    ? null
                                                                    : booking.id
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>

                                                    {openActionId === booking.id && (
                                                        <div className="absolute right-0 top-9 z-30 w-44 rounded-lg border border-gray/20 bg-white py-1 shadow-lg">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenActionId(null);
                                                                    navigate(
                                                                        `/company/appointments/${booking.id}`
                                                                    );
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-sm text-navy hover:bg-beige"
                                                            >
                                                                View Details
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenActionId(null);
                                                                    navigate(
                                                                        `/company/appointments/${booking.id}/edit`
                                                                    );
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-sm text-navy hover:bg-beige"
                                                            >
                                                                Edit / Reschedule
                                                            </button>

                                                            {booking.status !== "Cancelled" &&
                                                                booking.status !== "Completed" && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            // TODO: cancel booking API
                                                                        }}
                                                                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                                                    >
                                                                        Cancel Appointment
                                                                    </button>
                                                                )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-5 py-12 text-center">
                                            <p className="text-sm text-slate">
                                                No bookings found.
                                            </p>

                                            {activeFilterCount > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={clearFilters}
                                                    className="mt-3 text-xs font-bold text-navy hover:underline"
                                                >
                                                    Clear filters
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer — Dynamic Pagination */}
                            <div className="flex items-center justify-between border-t border-gray/20 px-5 py-4">
                                <p className="text-xs text-slate">
                                    {filteredBookings.length === 0
                                        ? "0 bookings"
                                        : `${startIndex + 1}-${Math.min(
                                              startIndex + itemsPerPage,
                                              filteredBookings.length
                                          )} of ${filteredBookings.length}`}
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

                                    <span className="text-xs font-bold text-navy">
                                        {currentPage} / {totalPages}
                                    </span>

                                    <button
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((page) => page + 1)
                                        }
                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CalendarScheduleView
                            onViewDetails={(appointment) =>
                                navigate(`/company/appointments/${appointment.id}`)
                            }
                            onCreateAppointment={() =>
                                navigate("/company/appointments/new")
                            }
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default AppointmentManagement;