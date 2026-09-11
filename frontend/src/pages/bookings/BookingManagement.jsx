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
                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Booking Management
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                View and manage appointments across your company.
                            </p>
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

                </main>
            </div>
        </div>
    );
}

export default BookingManagement;