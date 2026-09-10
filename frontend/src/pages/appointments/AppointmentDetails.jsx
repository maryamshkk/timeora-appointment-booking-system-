import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    CalendarDays,
    Clock3,
    UserRound,
    Phone,
    Mail,
    FileText,
    CheckCircle2,
    MoreVertical,
    ChevronRight,
    X,
    RefreshCw,
    Receipt,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const mockAppointmentData = {
    status: "Confirmed",

    dateTime: {
        date: "21 August 2026",
        start: "09:00 AM",
        end: "09:30 AM",
    },

    duration: "30 minutes",
    service: "Consultation",
    staffMember: "Dr. Sara",

    customer: {
        name: "Ayesha Khan",
        phone: "+92 321 4567890",
        email: "ayesha.khan@example.com",
        id: "CUS-00124",
        photoUrl: "",
    },

    notes: "Customer requested an early consultation.",

    timeline: [
        {
            title: "Reminder Scheduled",
            timestamp: "20 Aug 2026, 09:00 AM",
        },
        {
            title: "Appointment Confirmed",
            timestamp: "19 Aug 2026, 02:15 PM by System",
        },
        {
            title: "Appointment Created",
            timestamp: "19 Aug 2026, 02:10 PM by Admin",
        },
    ],

    payment: {
        method: "Cash on Reception",
        status: "Pending",
        amount: "PKR 3,000",
    },

    communications: [
        {
            type: "confirmation",
            title: "Confirmation Email",
            detail: "Sent on 19 Aug",
        },
        {
            type: "reminder",
            title: "Reminder Email",
            detail: "Scheduled for 20 Aug",
        },
    ],

    meta: {
        appointmentId: "APT-2026-0048",
        createdAt: "19 Aug 2026 by Admin",
        updatedAt: "20 Aug 2026 by Admin",
    },
};

function AppointmentDetails() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [appointment, setAppointment] = useState(mockAppointmentData);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    useEffect(() => {
        // TODO: axios GET /api/company/appointments/:appointmentId
    }, [appointmentId]);

    function handleCancel() {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) {
            return;
        }
        // TODO: axios PATCH /api/company/appointments/:id/cancel
    }

    function handleReschedule() {
        navigate(`/company/appointments/${appointmentId}/reschedule`);
    }

    function handleCreateReceipt() {
        // TODO: axios POST /api/company/appointments/:id/receipt
    }

    const statusClasses = {
        Confirmed: "border-green-600/30 bg-green-50 text-green-700",
        Pending: "border-gold bg-gold/20 text-navy",
        Cancelled: "border-red-600/30 bg-red-50 text-red-700",
        Completed: "border-green-600/30 bg-green-50 text-green-700",
    };

    const statusClass =
        statusClasses[appointment.status] ||
        "border-gray/30 bg-gray/10 text-slate";

    return (
        <div className="flex min-h-screen bg-beige">
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

                    <div className="fixed left-0 top-0 z-40 h-screen overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Appointments"
                            ctaLabel="Book Appointment"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige p-3 md:p-6 lg:px-8 lg:py-6">
                    {/* Breadcrumb */}
                    <div className="mb-4 flex items-center gap-2 text-sm md:mb-5">
                        <Link
                            to="/company/appointments"
                            className="text-slate transition hover:text-navy"
                        >
                            Appointments
                        </Link>

                        <ChevronRight className="h-4 w-4 text-gray" />

                        <span className="font-bold text-navy">
                            Appointment Details
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-4 flex flex-col gap-3 md:mb-6 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl lg:text-5xl">
                                Appointment Details
                            </h1>

                            <p className="mt-1 text-sm text-slate md:mt-2">
                                Appointment #
                                {appointment.meta.appointmentId || appointmentId}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-sm font-bold text-slate transition hover:border-red-500/30 hover:text-red-600 sm:flex-none md:px-4"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleReschedule}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:flex-none md:px-4"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Reschedule
                            </button>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowMoreMenu((previous) => !previous)
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray/30 bg-white text-slate transition hover:bg-gray/10 hover:text-navy"
                                    aria-label="More options"
                                >
                                    <MoreVertical className="h-5 w-5" />
                                </button>

                                {showMoreMenu && (
                                    <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-lg border border-gray/20 bg-white p-2 shadow-lg">
                                        <button
                                            type="button"
                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate hover:bg-beige"
                                        >
                                            Edit Appointment
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate hover:bg-beige"
                                        >
                                            Send Reminder
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
                        {/* LEFT */}
                        <div className="space-y-4 md:space-y-6 lg:col-span-2">
                            {/* Appointment Summary */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <h2 className="font-serif text-xl text-navy md:text-2xl">
                                        Appointment Summary
                                    </h2>

                                    <span
                                        className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}
                                    >
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Date & Time
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {appointment.dateTime.date}
                                            </p>
                                            <p className="text-sm text-slate">
                                                {appointment.dateTime.start} -{" "}
                                                {appointment.dateTime.end}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock3 className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Duration
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {appointment.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FileText className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Service
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {appointment.service}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <UserRound className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Staff
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {appointment.staffMember}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy md:text-2xl">
                                        Customer Information
                                    </h2>

                                    <button
                                        type="button"
                                        className="text-sm font-bold text-navy hover:text-slate"
                                    >
                                        View Customer
                                    </button>
                                </div>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:gap-5">
                                    {appointment.customer.photoUrl ? (
                                        <img
                                            src={appointment.customer.photoUrl}
                                            alt={appointment.customer.name}
                                            className="h-14 w-14 rounded-xl object-cover md:h-16 md:w-16"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-lg font-bold text-gold md:h-16 md:w-16">
                                            {appointment.customer.name
                                                .split(" ")
                                                .map((name) => name.charAt(0))
                                                .join("")
                                                .slice(0, 2)}
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <h3 className="font-serif text-lg text-navy md:text-xl">
                                            {appointment.customer.name}
                                        </h3>

                                        <div className="mt-2 flex flex-col gap-2 text-sm text-slate sm:flex-row sm:gap-5">
                                            <span className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 flex-shrink-0" />
                                                {appointment.customer.phone}
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 flex-shrink-0" />
                                                <span className="break-all">
                                                    {appointment.customer.email}
                                                </span>
                                            </span>
                                        </div>

                                        <p className="mt-2 text-xs text-slate">
                                            Customer ID:{" "}
                                            <span className="font-bold text-navy">
                                                {appointment.customer.id}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Notes
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="rounded-lg border border-dashed border-gray/50 bg-beige/40 p-4">
                                    <p className="text-sm italic leading-6 text-slate">
                                        {appointment.notes ||
                                            "No notes have been added for this appointment."}
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Timeline
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="relative ml-2">
                                    <div className="absolute left-[5px] top-2 h-[calc(100%-20px)] w-px bg-gray/30" />

                                    <div className="space-y-5 md:space-y-7">
                                        {appointment.timeline.map(
                                            (item, index) => (
                                                <div
                                                    key={item.title}
                                                    className="relative flex gap-4 md:gap-5"
                                                >
                                                    <div
                                                        className={`relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 ${
                                                            index ===
                                                            appointment.timeline
                                                                .length -
                                                                1
                                                                ? "border-navy bg-navy"
                                                                : "border-navy bg-white"
                                                        }`}
                                                    />

                                                    <div>
                                                        <p className="font-bold text-navy">
                                                            {item.title}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate">
                                                            {item.timestamp}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Payment */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Payment Information
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="space-y-4">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate">
                                            Method
                                        </span>
                                        <span className="text-right text-sm font-bold text-navy">
                                            {appointment.payment.method}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate">
                                            Status
                                        </span>
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                                appointment.payment.status === "Paid"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gold/20 text-navy"
                                            }`}
                                        >
                                            {appointment.payment.status}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate">
                                            Amount
                                        </span>
                                        <span className="font-serif text-lg text-navy">
                                            {appointment.payment.amount}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleCreateReceipt}
                                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                    >
                                        <Receipt className="h-4 w-4" />
                                        Create Receipt
                                    </button>
                                </div>
                            </div>

                            {/* Communications */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Communications
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="space-y-4 md:space-y-5">
                                    {appointment.communications.map(
                                        (communication) => {
                                            const Icon =
                                                communication.type ===
                                                "confirmation"
                                                    ? CheckCircle2
                                                    : Clock3;

                                            return (
                                                <div
                                                    key={communication.title}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate" />

                                                    <div>
                                                        <p className="font-bold text-navy">
                                                            {
                                                                communication.title
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate">
                                                            {
                                                                communication.detail
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Details
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointment ID
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {appointment.meta.appointmentId}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Created
                                        </p>
                                        <p className="mt-1 text-sm text-slate">
                                            {appointment.meta.createdAt}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Updated
                                        </p>
                                        <p className="mt-1 text-sm text-slate">
                                            {appointment.meta.updatedAt}
                                        </p>
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

export default AppointmentDetails;