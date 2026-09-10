import React, { useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { useNavigate } from "react-router-dom";


const START_HOUR = 8;
const END_HOUR = 18;
const SLOT_HEIGHT = 60;

const appointments = [
    {
        id: "o1",
        day: "Mon",
        startTime: "09:00",
        endTime: "10:00",
        customer: "Ayesha Khan",
        service: "Consultation",
        staff: "Dr. Sara",
        status: "confirmed",
    },
    {
        id: "o2",
        day: "Mon",
        startTime: "10:30",
        endTime: "11:30",
        customer: "Hina Malik",
        service: "Follow-up",
        staff: "Ali",
        status: "pending",
    },
    {
        id: "o3",
        day: "Thu",
        startTime: "14:00",
        endTime: "14:30",
        customer: "Zaina I.",
        service: "Consultation",
        staff: "",
        status: "completed",
    },
    {
        id: "o4",
        day: "Thu",
        startTime: "15:00",
        endTime: "16:00",
        customer: "Omar T.",
        service: "Consultation",
        staff: "Hassan",
        status: "confirmed",
    },
    {
        id: "o5",
        day: "Fri",
        startTime: "09:00",
        endTime: "09:30",
        customer: "S. Ahmad",
        service: "",
        staff: "",
        status: "cancelled",
    },
];

function getStartOfWeek(date) {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);

    return result;
}

function getMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}

function getBlockStyle(startTime, endTime) {
    const startMinutes = getMinutes(startTime);
    const endMinutes = getMinutes(endTime);
    const baseMinutes = START_HOUR * 60;

    return {
        top: `${startMinutes - baseMinutes}px`,
        height: `${endMinutes - startMinutes}px`,
    };
}

function getStatusColor(status) {
    const colors = {
        confirmed: "border-l-navy bg-navy/5",
        pending: "border-l-gold bg-gold/15",
        completed: "border-l-gray bg-gray/15",
        cancelled: "border-l-red-500 bg-red-50",
    };

    return colors[status] || "border-l-gray bg-gray/10";
}

function getCurrentTimePosition() {
    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const startMinutes = START_HOUR * 60;
    const endMinutes = END_HOUR * 60;

    if (
        currentMinutes < startMinutes ||
        currentMinutes > endMinutes
    ) {
        return null;
    }

    return currentMinutes - startMinutes;
}

function formatDateRange(startDate, endDate) {
    const start = startDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
    });

    const end = endDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return `${start} – ${end}`;
}

function formatDayDate(date) {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function isToday(date) {
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

function CalendarSchedule() {
    const [viewMode, setViewMode] = useState("week");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    
    const weekStart = getStartOfWeek(currentDate);
    const navigate = useNavigate();


    const visibleDays =
        viewMode === "week"
            ? Array.from({ length: 7 }, function (_, index) {
                  const date = new Date(weekStart);

                  date.setDate(weekStart.getDate() + index);

                  return date;
              })
            : [currentDate];

    const hours = Array.from(
        { length: END_HOUR - START_HOUR + 1 },
        function (_, index) {
            return START_HOUR + index;
        }
    );

    const filteredAppointments = appointments.filter(function (appointment) {
        const staffMatches =
            staffFilter === "all" ||
            appointment.staff === staffFilter;

        const serviceMatches =
            serviceFilter === "all" ||
            appointment.service === serviceFilter;

        return staffMatches && serviceMatches;
    });

    const currentTimePosition = getCurrentTimePosition();

    const rangeLabel =
        viewMode === "week"
            ? formatDateRange(
                  visibleDays[0],
                  visibleDays[visibleDays.length - 1]
              )
            : formatDayDate(currentDate);

    function handleToday() {
        setCurrentDate(new Date());
    }

    function handlePrev() {
        const date = new Date(currentDate);

        if (viewMode === "week") {
            date.setDate(date.getDate() - 7);
        } else {
            date.setDate(date.getDate() - 1);
        }

        setCurrentDate(date);
    }

    function handleNext() {
        const date = new Date(currentDate);

        if (viewMode === "week") {
            date.setDate(date.getDate() + 7);
        } else {
            date.setDate(date.getDate() + 1);
        }

        setCurrentDate(date);
    }

    return (
        <div className="flex min-h-screen bg-beige">
            <Sidebar activeItem="Calendar" />

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 lg:px-8 lg:py-6">

                    {/* Page Header */}
                    <div className="mb-5 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <div>
                            <h1 className="font-serif text-3xl text-navy">
                                Calendar / Schedule
                            </h1>

                            <p className="mt-1 text-sm text-slate">
                                Manage appointments, staff schedules, and daily
                                availability.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={function () {
                                navigate("/company/appointments/new");
                            }}
                            className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                        >
                            <Plus className="h-4 w-4" />
                            New Appointment
                        </button>
                    </div>

                    {/* Calendar Card */}
                    <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                        {/* Toolbar */}
                        <div className="border-b border-gray/20 p-4 sm:px-5">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                                {/* Date Navigation */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleToday}
                                        className="rounded-md border border-gray/30 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold hover:bg-gold/10"
                                    >
                                        Today
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray/30 text-slate transition hover:border-gold hover:text-navy"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray/30 text-slate transition hover:border-gold hover:text-navy"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                    <h2 className="ml-1 font-serif text-lg text-navy sm:ml-2">
                                        {rangeLabel}
                                    </h2>
                                </div>

                                {/* Filters */}
                                <div className="flex flex-wrap items-center gap-2">

                                    {/* Staff */}
                                    <div className="relative">
                                        <select
                                            value={staffFilter}
                                            onChange={function (event) {
                                                setStaffFilter(
                                                    event.target.value
                                                );
                                            }}
                                            className="appearance-none rounded-md border border-gray/30 bg-white py-2 pl-3 pr-9 text-sm text-slate outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                        >
                                            <option value="all">
                                                All Staff
                                            </option>

                                            <option value="Dr. Sara">
                                                Dr. Sara
                                            </option>

                                            <option value="Ali">
                                                Ali
                                            </option>

                                            <option value="Hassan">
                                                Hassan
                                            </option>
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                    </div>

                                    {/* Service */}
                                    <div className="relative">
                                        <select
                                            value={serviceFilter}
                                            onChange={function (event) {
                                                setServiceFilter(
                                                    event.target.value
                                                );
                                            }}
                                            className="appearance-none rounded-md border border-gray/30 bg-white py-2 pl-3 pr-9 text-sm text-slate outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                        >
                                            <option value="all">
                                                All Services
                                            </option>

                                            <option value="Consultation">
                                                Consultation
                                            </option>

                                            <option value="Follow-up">
                                                Follow-up
                                            </option>

                                            <option value="Therapy">
                                                Therapy
                                            </option>
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                    </div>

                                    {/* Day / Week */}
                                    <div className="flex items-center rounded-md border border-gray/30 bg-beige p-1">
                                        <button
                                            type="button"
                                            onClick={function () {
                                                setViewMode("day");
                                            }}
                                            className={`rounded px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                                                viewMode === "day"
                                                    ? "bg-white text-navy shadow-sm"
                                                    : "text-slate hover:text-navy"
                                            }`}
                                        >
                                            Day
                                        </button>

                                        <button
                                            type="button"
                                            onClick={function () {
                                                setViewMode("week");
                                            }}
                                            className={`rounded px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                                                viewMode === "week"
                                                    ? "bg-white text-navy shadow-sm"
                                                    : "text-slate hover:text-navy"
                                            }`}
                                        >
                                            Week
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="overflow-x-auto">
                            <div
                                className="min-w-[850px]"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        viewMode === "week"
                                            ? "64px repeat(7, minmax(120px, 1fr))"
                                            : "64px minmax(500px, 1fr)",
                                }}
                            >

                                {/* Empty Header */}
                                <div className="border-b border-r border-gray/20 bg-white" />

                                {/* Day Headers */}
                                {visibleDays.map(function (day) {
                                    const dayName =
                                        day.toLocaleDateString("en-US", {
                                            weekday: "short",
                                        });

                                    const dayNumber = day.getDate();

                                    return (
                                        <div
                                            key={day.toISOString()}
                                            className={`border-b border-gray/20 px-3 py-3 text-center ${
                                                isToday(day)
                                                    ? "bg-beige"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                {dayName}
                                            </p>

                                            <p
                                                className={`mt-1 font-serif text-xl ${
                                                    isToday(day)
                                                        ? "text-brown"
                                                        : "text-navy"
                                                }`}
                                            >
                                                {dayNumber}
                                            </p>
                                        </div>
                                    );
                                })}

                                {/* Time Column */}
                                <div className="relative bg-white">
                                    {hours.map(function (hour) {
                                        return (
                                            <div
                                                key={hour}
                                                className="flex h-[60px] items-start justify-end border-b border-r border-gray/20 pr-2 pt-2"
                                            >
                                                <span className="text-[11px] text-slate">
                                                    {hour > 12
                                                        ? hour - 12
                                                        : hour}
                                                    :00{" "}
                                                    {hour >= 12
                                                        ? "PM"
                                                        : "AM"}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Day Columns */}
                                {visibleDays.map(function (day) {
                                    const dayName =
                                        day.toLocaleDateString("en-US", {
                                            weekday: "short",
                                        });

                                    const dayAppointments =
                                        filteredAppointments.filter(
                                            function (appointment) {
                                                return (
                                                    appointment.day ===
                                                    dayName
                                                );
                                            }
                                        );

                                    return (
                                        <div
                                            key={day.toISOString()}
                                            className="relative"
                                        >

                                            {/* Hour Grid */}
                                            {hours.map(function (hour) {
                                                return (
                                                    <div
                                                        key={hour}
                                                        className="h-[60px] border-b border-r border-gray/20"
                                                    />
                                                );
                                            })}

                                            {/* Lunch Break */}
                                            <div
                                                className="pointer-events-none absolute left-0 right-0 bg-gray/10"
                                                style={{
                                                    top: `${
                                                        (12 - START_HOUR) *
                                                        SLOT_HEIGHT
                                                    }px`,
                                                    height: `${SLOT_HEIGHT}px`,
                                                }}
                                            >
                                                <div className="flex h-full items-center justify-center">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate/60">
                                                        Lunch Break
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Current Time Indicator */}
                                            {isToday(day) &&
                                                currentTimePosition !== null && (
                                                    <div
                                                        className="pointer-events-none absolute left-0 right-0 z-20"
                                                        style={{
                                                            top: `${currentTimePosition}px`,
                                                        }}
                                                    >
                                                        <div className="relative h-px bg-gold">
                                                            <span className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-gold" />
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Appointments */}
                                            {dayAppointments.map(
                                                function (appointment) {
                                                    const blockStyle =
                                                        getBlockStyle(
                                                            appointment.startTime,
                                                            appointment.endTime
                                                        );

                                                    const duration =
                                                        getMinutes(
                                                            appointment.endTime
                                                        ) -
                                                        getMinutes(
                                                            appointment.startTime
                                                        );

                                                    const isCompact =
                                                        duration <= 30;

                                                    return (
                                                        <div
                                                            key={appointment.id}
                                                            onClick={function () {
                                                                setSelectedAppointment(appointment);
                                                            }}
                                                            className={`absolute left-1 right-1 cursor-pointer overflow-hidden rounded-md border-l-4 px-2 py-1 shadow-sm transition hover:shadow-md ${getStatusColor(
                                                                appointment.status
                                                            )}`}
                                                            style={blockStyle}
                                                        >
                                                                                                                    {isCompact ? (
                                                                <div
                                                                    className={`truncate text-xs font-bold ${
                                                                        appointment.status ===
                                                                        "cancelled"
                                                                            ? "text-red-500 line-through"
                                                                            : "text-navy"
                                                                    }`}
                                                                >
                                                                    {
                                                                        appointment.startTime
                                                                    }{" "}
                                                                    ·{" "}
                                                                    {
                                                                        appointment.customer
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <p
                                                                        className={`text-xs font-bold ${
                                                                            appointment.status ===
                                                                            "cancelled"
                                                                                ? "text-red-500 line-through"
                                                                                : "text-navy"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            appointment.startTime
                                                                        }{" "}
                                                                        –{" "}
                                                                        {
                                                                            appointment.endTime
                                                                        }
                                                                    </p>

                                                                    <p className="mt-0.5 truncate text-xs font-bold text-navy">
                                                                        {
                                                                            appointment.customer
                                                                        }
                                                                    </p>

                                                                    {appointment.service && (
                                                                        <p className="truncate text-[11px] text-slate">
                                                                            {
                                                                                appointment.service
                                                                            }

                                                                            {appointment.staff &&
                                                                                ` · ${appointment.staff}`}
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-5 border-t border-gray/20 px-5 py-4">
                            <span className="text-xs font-bold text-navy">
                                Status
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-sm bg-navy" />
                                <span className="text-xs text-slate">
                                    Confirmed
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-sm bg-gold" />
                                <span className="text-xs text-slate">
                                    Pending
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-sm bg-gray" />
                                <span className="text-xs text-slate">
                                    Completed
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-sm bg-red-500" />
                                <span className="text-xs text-slate">
                                    Cancelled
                                </span>
                            </div>
                        </div>
                    </div>

                    {selectedAppointment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end bg-navy/20">
                        <div className="h-full w-full max-w-md bg-white p-6 shadow-xl">

                            <div className="flex items-start justify-between border-b border-gray/20 pb-5">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate">
                                        Appointment Details
                                    </p>

                                    <h2 className="mt-1 font-serif text-2xl text-navy">
                                        {selectedAppointment.customer}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={function () {
                                        setSelectedAppointment(null);
                                    }}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-xl text-slate transition hover:bg-beige hover:text-navy"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="mt-6 space-y-5">

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Time
                                    </p>

                                    <p className="mt-1 text-sm text-navy">
                                        {selectedAppointment.startTime} –{" "}
                                        {selectedAppointment.endTime}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Service
                                    </p>

                                    <p className="mt-1 text-sm text-navy">
                                        {selectedAppointment.service || "Not specified"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Staff
                                    </p>

                                    <p className="mt-1 text-sm text-navy">
                                        {selectedAppointment.staff || "Not assigned"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Status
                                    </p>

                                    <span className="mt-2 inline-flex rounded-full bg-beige px-3 py-1 text-xs font-bold capitalize text-navy">
                                        {selectedAppointment.status}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                type="button"
                                onClick={function () {
                                    navigate(
                                        `/company/appointments/${selectedAppointment.id}`
                                    );
                                }}
                                className="flex-1 rounded-lg bg-navy py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                            >
                                View Details
                            </button> 

                                <button
                                    type="button"
                                    onClick={function () {
                                        setSelectedAppointment(null);
                                    }}
                                    className="rounded-lg border border-gray/30 px-5 py-3 text-sm font-bold text-slate transition hover:border-navy hover:text-navy"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </main>
            </div>
        </div>
    );
}

export default CalendarSchedule;