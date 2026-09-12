import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

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

    result.setDate(result.getDate() - day);
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

    const calendarStartMinutes = START_HOUR * 60;

    const top =
        ((startMinutes - calendarStartMinutes) / 60) * SLOT_HEIGHT;

    const height =
        ((endMinutes - startMinutes) / 60) * SLOT_HEIGHT;

    return {
        top: `${top}px`,
        height: `${height}px`,
    };
}

function getStatusColor(status) {
    if (status === "confirmed") {
        return "border-l-navy bg-navy/5";
    }

    if (status === "pending") {
        return "border-l-gold bg-gold/15";
    }

    if (status === "completed") {
        return "border-l-gray bg-gray/15";
    }

    if (status === "cancelled") {
        return "border-l-red-500 bg-red-50";
    }

    return "border-l-gray bg-gray/10";
}

function formatDateRange(startDate, endDate) {
    const start = startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const end = endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return `${start} – ${end}`;
}

function formatDayDate(date) {
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

function CalendarScheduleView() {
    const [viewMode, setViewMode] = useState("week");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");

    const weekStart = getStartOfWeek(currentDate);

    const visibleDays = [];

    if (viewMode === "week") {
        for (let index = 0; index < 7; index++) {
            const date = new Date(weekStart);

            date.setDate(weekStart.getDate() + index);

            visibleDays.push(date);
        }
    } else {
        visibleDays.push(new Date(currentDate));
    }

    const hours = [];

    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
        hours.push(hour);
    }

    function handleToday() {
        setCurrentDate(new Date());
    }

    function handlePrevious() {
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

    const filteredAppointments = appointments.filter((appointment) => {
        const matchesStaff =
            staffFilter === "all" ||
            appointment.staff === staffFilter;

        const matchesService =
            serviceFilter === "all" ||
            appointment.service === serviceFilter;

        return matchesStaff && matchesService;
    });

    const rangeLabel =
        viewMode === "week"
            ? formatDateRange(
                  visibleDays[0],
                  visibleDays[visibleDays.length - 1]
              )
            : formatDayDate(visibleDays[0]);

    return (
        <div className="rounded-xl border border-gray/20 bg-white shadow-sm">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray/20 p-4">

                <div className="flex flex-wrap items-center gap-2">

                    <button
                        type="button"
                        onClick={handleToday}
                        className="rounded-lg border border-gray/30 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:bg-beige"
                    >
                        Today
                    </button>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <h2 className="ml-2 font-serif text-lg text-navy">
                        {rangeLabel}
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                    {/* Staff Filter */}
                    <select
                        value={staffFilter}
                        onChange={(event) =>
                            setStaffFilter(event.target.value)
                        }
                        className="rounded-lg border border-gray/30 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                    >
                        <option value="all">All Staff</option>
                        <option value="Dr. Sara">Dr. Sara</option>
                        <option value="Ali">Ali</option>
                        <option value="Hassan">Hassan</option>
                    </select>

                    {/* Service Filter */}
                    <select
                        value={serviceFilter}
                        onChange={(event) =>
                            setServiceFilter(event.target.value)
                        }
                        className="rounded-lg border border-gray/30 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                    >
                        <option value="all">All Services</option>
                        <option value="Consultation">
                            Consultation
                        </option>
                        <option value="Follow-up">
                            Follow-up
                        </option>
                    </select>

                    {/* View Toggle */}
                    <div className="flex overflow-hidden rounded-lg border border-gray/30 bg-white">
                        <button
                            type="button"
                            onClick={() => setViewMode("day")}
                            className={`px-4 py-2 text-sm font-bold transition ${
                                viewMode === "day"
                                    ? "bg-beige text-navy"
                                    : "text-slate hover:bg-beige"
                            }`}
                        >
                            Day
                        </button>

                        <button
                            type="button"
                            onClick={() => setViewMode("week")}
                            className={`px-4 py-2 text-sm font-bold transition ${
                                viewMode === "week"
                                    ? "bg-beige text-navy"
                                    : "text-slate hover:bg-beige"
                            }`}
                        >
                            Week
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="overflow-x-auto">
                <div
                    className="min-w-[900px]"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `90px repeat(${visibleDays.length}, minmax(120px, 1fr))`,
                    }}
                >

                    {/* Empty Header */}
                    <div className="border-r border-b border-gray/20 bg-beige/30" />

                    {/* Day Headers */}
                    {visibleDays.map((date) => {
                        const dayName = date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "short",
                            }
                        );

                        return (
                            <div
                                key={date.toISOString()}
                                className="border-r border-b border-gray/20 bg-white px-3 py-3 text-center"
                            >
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    {dayName}
                                </p>

                                <p className="mt-1 font-serif text-xl text-navy">
                                    {date.getDate()}
                                </p>
                            </div>
                        );
                    })}

                    {/* Time Rows */}
                    {hours.map((hour) => (
                        <React.Fragment key={hour}>

                            {/* Time */}
                            <div
                                className="border-r border-b border-gray/20 bg-beige/20 px-3 py-2 text-right text-xs font-bold text-slate"
                                style={{
                                    height: `${SLOT_HEIGHT}px`,
                                }}
                            >
                                {hour}:00
                            </div>

                            {/* Day Cells */}
                            {visibleDays.map((date) => {
                                const dayName =
                                    date.toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: "short",
                                        }
                                    );

                                const dayAppointments =
                                    filteredAppointments.filter(
                                        (appointment) =>
                                            appointment.day ===
                                            dayName
                                    );

                                return (
                                    <div
                                        key={`${date.toISOString()}-${hour}`}
                                        className="relative border-r border-b border-gray/20 bg-white"
                                        style={{
                                            height: `${SLOT_HEIGHT}px`,
                                        }}
                                    >

                                        {/* Lunch Break */}
                                        {hour === 12 && (
                                            <div className="absolute inset-0 bg-beige/30" />
                                        )}

                                        {/* Appointments */}
                                        {dayAppointments.map(
                                            (appointment) => {
                                                const startMinutes =
                                                    getMinutes(
                                                        appointment.startTime
                                                    );

                                                const endMinutes =
                                                    getMinutes(
                                                        appointment.endTime
                                                    );

                                                const hourStart =
                                                    hour * 60;

                                                const hourEnd =
                                                    (hour + 1) * 60;

                                                const overlapsHour =
                                                    startMinutes <
                                                        hourEnd &&
                                                    endMinutes >
                                                        hourStart;

                                                if (!overlapsHour) {
                                                    return null;
                                                }

                                                const style =
                                                    getBlockStyle(
                                                        appointment.startTime,
                                                        appointment.endTime
                                                    );

                                                return (
                                                    <button
                                                        key={appointment.id}
                                                        type="button"
                                                        className={`absolute left-1 right-1 z-10 overflow-hidden rounded-md border-l-4 p-2 text-left shadow-sm transition hover:shadow-md ${getStatusColor(
                                                            appointment.status
                                                        )}`}
                                                        style={{
                                                            top: style.top,
                                                            height: style.height,
                                                        }}
                                                    >
                                                        <p className="truncate text-xs font-bold text-navy">
                                                            {
                                                                appointment.customer
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 truncate text-[11px] text-slate">
                                                            {appointment.service ||
                                                                "Appointment"}
                                                        </p>

                                                        <p className="mt-0.5 truncate text-[10px] text-slate">
                                                            {
                                                                appointment.startTime
                                                            }{" "}
                                                            –{" "}
                                                            {
                                                                appointment.endTime
                                                            }
                                                        </p>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-5 border-t border-gray/20 px-5 py-4">

                <div className="flex items-center gap-2 text-xs text-slate">
                    <span className="h-2.5 w-2.5 rounded-full bg-navy" />
                    Confirmed
                </div>

                <div className="flex items-center gap-2 text-xs text-slate">
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                    Pending
                </div>

                <div className="flex items-center gap-2 text-xs text-slate">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray" />
                    Completed
                </div>

                <div className="flex items-center gap-2 text-xs text-slate">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    Cancelled
                </div>
            </div>
        </div>
    );
}

export default CalendarScheduleView;
