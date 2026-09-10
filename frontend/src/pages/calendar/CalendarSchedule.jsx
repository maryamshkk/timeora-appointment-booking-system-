import React, { useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function getStartOfWeek(date) {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);

    return result;
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



function CalendarSchedule() {
    
    const [viewMode, setViewMode] = useState("week");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");

    const weekStart = getStartOfWeek(currentDate);

    const visibleDays =
        viewMode === "week"
            ? Array.from({ length: 7 }, function (_, index) {
                  const date = new Date(weekStart);
                  date.setDate(weekStart.getDate() + index);
                  return date;
              })
            : [currentDate];

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

    const rangeLabel =
        viewMode === "week"
            ? formatDateRange(
                  visibleDays[0],
                  visibleDays[visibleDays.length - 1]
              )
            : formatDayDate(currentDate);

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
                    {/* Header */}
                    <div className="mb-5 flex flex-col items-start justify-between gap-4 lg:flex-row">
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
                            className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                        >
                            <Plus className="h-4 w-4" />
                            New Appointment
                        </button>

                    </div>

                    {/* Calendar Card */}
                    <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                        {/* Toolbar - coming next */}
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

                                {/* Filters + View */}
                                <div className="flex flex-wrap items-center gap-2">

                                {/* Staff */}
                                <div className="relative">
                                        <select
                                            value={staffFilter}
                                            onChange={(event) =>
                                                setStaffFilter(event.target.value)
                                            }
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
                                            onChange={(event) =>
                                                setServiceFilter(
                                                    event.target.value
                                                )
                                            }
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
                                            onClick={() => setViewMode("day")}
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
                                            onClick={() => setViewMode("week")}
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

                        {/* Calendar Grid - coming next */}
                        {/* Temporary Grid */}
                        <div className="flex min-h-[500px] items-center justify-center">
                            <div className="text-center">
                                <p className="font-serif text-lg text-navy">
                                    {viewMode === "week"
                                        ? "Week View"
                                        : "Day View"}
                                </p>

                                <p className="mt-1 text-sm text-slate">
                                    {rangeLabel}
                                </p>
                            </div>
                        </div>

                         {/* Legend - coming next */}
                        <div className="border-t border-gray/20 px-5 py-3">
                            <p className="text-xs text-slate">
                                Calendar legend coming next...
                            </p>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    )
}
export default CalendarSchedule;