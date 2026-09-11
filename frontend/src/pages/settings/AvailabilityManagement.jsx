import React, { useMemo, useState } from "react";
import {
    CalendarClock,
    Copy,
    Plus,
    Save,
    Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";


const initialOperatingHours = {
    Monday: {
        enabled: true,
        windows: [
            { start: "09:00 AM", end: "06:00 PM" },
        ],
    },

    Tuesday: {
        enabled: true,
        windows: [
            { start: "09:00 AM", end: "01:00 PM" },
            { start: "02:00 PM", end: "06:00 PM" },
        ],
    },

    Wednesday: {
        enabled: true,
        windows: [
            { start: "09:00 AM", end: "06:00 PM" },
        ],
    },

    Thursday: {
        enabled: true,
        windows: [
            { start: "09:00 AM", end: "06:00 PM" },
        ],
    },

    Friday: {
        enabled: true,
        windows: [
            { start: "09:00 AM", end: "06:00 PM" },
        ],
    },

    Saturday: {
        enabled: true,
        windows: [
            { start: "10:00 AM", end: "02:00 PM" },
        ],
    },

    Sunday: {
        enabled: false,
        windows: [],
    },
};


function generateSlotsForDay(windows) {
    const items = [];

    if (!windows || windows.length === 0) {
        return items;
    }

    const sortedWindows = [...windows].sort((a, b) => {
        return convertTimeToMinutes(a.start) - convertTimeToMinutes(b.start);
    });

    sortedWindows.forEach((window, index) => {
        const startMinutes = convertTimeToMinutes(window.start);
        const endMinutes = convertTimeToMinutes(window.end);

        let currentMinutes = startMinutes;

        while (currentMinutes + 60 <= endMinutes) {
            const nextMinutes = currentMinutes + 60;

            items.push({
                type: "slot",
                label: `${formatTime(currentMinutes)} - ${formatTime(nextMinutes)}`,
            });

            currentMinutes = nextMinutes;
        }

        const nextWindow = sortedWindows[index + 1];

        if (nextWindow) {
            const nextStartMinutes = convertTimeToMinutes(
                nextWindow.start
            );

            const breakMinutes = nextStartMinutes - endMinutes;

            if (breakMinutes > 0) {
                const breakHours = Math.round(breakMinutes / 60);

                items.push({
                    type: "break",
                    label: `Break (${breakHours}h)`,
                });
            }
        }
    });

    return items;
}


function convertTimeToMinutes(time) {
    const [timePart, modifier] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);

    let convertedHours = hours;

    if (modifier === "AM" && hours === 12) {
        convertedHours = 0;
    }

    if (modifier === "PM" && hours !== 12) {
        convertedHours += 12;
    }

    return convertedHours * 60 + minutes;
}


function formatTime(totalMinutes) {
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const modifier = hours24 >= 12 ? "PM" : "AM";

    let hours12 = hours24 % 12;

    if (hours12 === 0) {
        hours12 = 12;
    }

    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}


function AvailabilityManagement() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [operatingHours, setOperatingHours] = useState(
        initialOperatingHours
    );

    const [savedSnapshot, setSavedSnapshot] = useState(
        initialOperatingHours
    );

    const [activeDay, setActiveDay] = useState("Tuesday");

    const [staffSchedules, setStaffSchedules] = useState([
        {
            id: 1,
            name: "Dr. Sara",
            scheduleType: "Custom Hours",
        },
    ]);

    const [blockedPeriods, setBlockedPeriods] = useState([
        {
            title: "Staff Meeting",
            subtitle: "Every Friday, 01:00 PM - 02:00 PM",
        },
    ]);

    const [showBlockedPeriodForm, setShowBlockedPeriodForm] = useState(false);

    const isDirty = useMemo(
        () =>
            JSON.stringify(operatingHours) !==
            JSON.stringify(savedSnapshot),
        [operatingHours, savedSnapshot]
    );

    const activeDaySlots = useMemo(() => {
        const schedule = operatingHours[activeDay];

        if (!schedule || !schedule.enabled) {
            return [];
        }

        return generateSlotsForDay(schedule.windows);
    }, [operatingHours, activeDay]);

    function handleSave(event) {
        event.preventDefault();

        // TODO: axios PUT /api/company/availability

        setSavedSnapshot(
            JSON.parse(JSON.stringify(operatingHours))
        );
    }


    function handleDiscard() {
        setOperatingHours(
            JSON.parse(JSON.stringify(savedSnapshot))
        );
    }

    function toggleDayEnabled(day) {
        setOperatingHours((current) => ({
            ...current,
            [day]: {
                ...current[day],
                enabled: !current[day].enabled,
            },
        }));

        setActiveDay(day);
    }

    function updateWindowTime(day, windowIndex, field, value) {
        setOperatingHours((current) => ({
            ...current,
            [day]: {
                ...current[day],
                windows: current[day].windows.map((window, index) =>
                    index === windowIndex
                        ? {
                              ...window,
                              [field]: value,
                          }
                        : window
                ),
            },
        }));

        setActiveDay(day);
    }

    function addSplitShift(day) {
        setOperatingHours((current) => ({
            ...current,
            [day]: {
                ...current[day],
                windows: [
                    ...current[day].windows,
                    {
                        start: "01:00 PM",
                        end: "02:00 PM",
                    },
                ],
            },
        }));

        setActiveDay(day);
    }

    function removeWindow(day, windowIndex) {
        setOperatingHours((current) => ({
            ...current,
            [day]: {
                ...current[day],
                windows: current[day].windows.filter(
                    (_, index) => index !== windowIndex
                ),
            },
        }));

        setActiveDay(day);
    }

    function copyDayToAll(day) {
        const sourceWindows = operatingHours[day].windows;

        setOperatingHours((current) => {
            const updatedHours = { ...current };

            Object.keys(updatedHours).forEach((currentDay) => {
                if (
                    currentDay !== day &&
                    updatedHours[currentDay].enabled
                ) {
                    updatedHours[currentDay] = {
                        ...updatedHours[currentDay],
                        windows: sourceWindows.map((window) => ({
                            ...window,
                        })),
                    };
                }
            });

            return updatedHours;
        });

        setActiveDay(day);
    }

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Calendar"
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

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Calendar"
                            ctaLabel="Book Appointment"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showSettings
                    showSupportText
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Page Header */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="mb-3 font-serif text-2xl text-navy sm:mb-4 sm:text-3xl lg:text-4xl">
                            Availability Management
                        </h1>

                        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-start md:gap-5">
                            {/* Subtitle */}
                            <p className="max-w-[440px] text-xs leading-relaxed text-slate sm:text-sm">
                                Configure default operating hours, manage staff schedules,
                                and dictate block-out periods across your enterprise.
                            </p>

                            {/* Actions */}
                            <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:w-auto">
                                {/* Discard */}
                                <button
                                    type="button"
                                    onClick={handleDiscard}
                                    disabled={!isDirty}
                                    className="rounded-lg border-2 border-navy bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-3 sm:text-sm"
                                >
                                    Discard Changes
                                </button>

                                {/* Save */}
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy sm:px-5 sm:py-3 sm:text-sm"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 lg:gap-6">
                            {/* Master Operating Hours */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                {/* Card Header */}
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5">
                                    <h2 className="font-serif text-lg text-navy sm:text-xl md:text-2xl">
                                        Master Operating Hours
                                    </h2>

                                    {isDirty && (
                                        <span className="rounded-full border border-gold bg-gold/15 px-2.5 py-1 text-[10px] font-bold text-amber-700 sm:px-3 sm:py-1.5 sm:text-xs">
                                            Unsaved Changes
                                        </span>
                                    )}
                                </div>

                                {/* Table */}
                                <div className="-mx-4 overflow-x-auto sm:-mx-5 md:-mx-6">
                                    <div className="inline-block min-w-full px-4 sm:px-5 md:px-6">
                                        <div className="min-w-[720px]">
                                            {/* Table Header */}
                                            <div className="grid grid-cols-[100px_80px_1fr_60px] gap-3 border-b border-gray/20 pb-3 md:grid-cols-[120px_100px_1fr_80px] md:gap-4">
                                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Day
                                                </span>

                                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Status
                                                </span>

                                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Operating Window
                                                </span>

                                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Actions
                                                </span>
                                            </div>

                                            {/* Days */}
                                            {Object.entries(operatingHours).map(
                                                ([day, schedule]) => (
                                                    <div
                                                        key={day}
                                                        className={`
                                                            grid grid-cols-[100px_80px_1fr_60px]
                                                            items-start
                                                            gap-3
                                                            border-b border-gray/10
                                                            py-4
                                                            last:border-b-0
                                                            md:grid-cols-[120px_100px_1fr_80px]
                                                            md:gap-4
                                                            ${
                                                                activeDay === day
                                                                    ? "border-l-4 border-gold bg-gold/5 pl-3"
                                                                    : ""
                                                            }
                                                        `}
                                                    >
                                                        {/* Day */}
                                                        <div className="pt-2">
                                                            <span className="text-sm font-bold text-navy">
                                                                {day}
                                                            </span>
                                                        </div>

                                                        {/* Toggle */}
                                                        <div className="pt-1">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleDayEnabled(day)
                                                                }
                                                                className={`
                                                                    relative
                                                                    h-6
                                                                    w-12
                                                                    rounded-full
                                                                    transition
                                                                    ${
                                                                        schedule.enabled
                                                                            ? "bg-navy"
                                                                            : "bg-gray/30"
                                                                    }
                                                                `}
                                                            >
                                                                <span
                                                                    className={`
                                                                        absolute
                                                                        top-1
                                                                        flex
                                                                        h-4
                                                                        w-4
                                                                        items-center
                                                                        justify-center
                                                                        rounded-full
                                                                        bg-white
                                                                        shadow-sm
                                                                        transition
                                                                        ${
                                                                            schedule.enabled
                                                                                ? "left-7"
                                                                                : "left-1"
                                                                        }
                                                                    `}
                                                                >
                                                                    {schedule.enabled && (
                                                                        <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                                                                    )}
                                                                </span>
                                                            </button>
                                                        </div>

                                                        {/* Operating Windows */}
                                                        <div
                                                            className={
                                                                schedule.enabled
                                                                    ? "flex flex-col gap-2"
                                                                    : "pointer-events-none flex flex-col gap-2 opacity-40"
                                                            }
                                                        >
                                                            {schedule.windows.map((window, windowIndex) => (
                                                                <div
                                                                    key={windowIndex}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        value={window.start}
                                                                        onChange={(event) =>
                                                                            updateWindowTime(
                                                                                day,
                                                                                windowIndex,
                                                                                "start",
                                                                                event.target.value
                                                                            )
                                                                        }
                                                                        onFocus={() => setActiveDay(day)}
                                                                        disabled={!schedule.enabled}
                                                                        className="w-24 rounded-lg border border-gray px-2 py-1.5 text-xs text-navy outline-none focus:border-navy disabled:bg-gray/10 sm:w-28 sm:px-3 sm:py-2 sm:text-sm"
                                                                    />

                                                                    <span className="text-gray">
                                                                        —
                                                                    </span>

                                                                    <input
                                                                        type="text"
                                                                        value={window.end}
                                                                        onChange={(event) =>
                                                                            updateWindowTime(
                                                                                day,
                                                                                windowIndex,
                                                                                "end",
                                                                                event.target.value
                                                                            )
                                                                        }
                                                                        onFocus={() => setActiveDay(day)}
                                                                        disabled={!schedule.enabled}
                                                                        className="w-24 rounded-lg border border-gray px-2 py-1.5 text-xs text-navy outline-none focus:border-navy disabled:bg-gray/10 sm:w-28 sm:px-3 sm:py-2 sm:text-sm"
                                                                    />

                                                                    {schedule.windows.length > 1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeWindow(day, windowIndex)
                                                                            }
                                                                            disabled={!schedule.enabled}
                                                                            className="text-gray transition hover:text-red-500"
                                                                            aria-label="Remove window"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}

                                                            {schedule.enabled && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addSplitShift(day)}
                                                                    className="w-fit text-xs font-bold text-navy hover:underline"
                                                                >
                                                                    + Add split shift
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* Duplicate */}
                                                        <div className="flex justify-start pt-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => copyDayToAll(day)}
                                                                title="Duplicate to all days"
                                                                className="text-slate transition hover:text-navy"
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Slot Generation Preview */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                <div className="mb-4 flex items-center gap-2 sm:mb-5">
                                    <CalendarClock className="h-4 w-4 text-navy" />

                                    <h2 className="font-serif text-base text-navy sm:text-lg">
                                        Slot Generation Preview ({activeDay})
                                    </h2>
                                </div>

                                {activeDaySlots.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
                                        {activeDaySlots.map((item, index) => (
                                            <div
                                                key={`${item.type}-${index}`}
                                                className={
                                                    item.type === "break"
                                                        ? "rounded-lg border border-dashed border-gray/40 bg-gray/10 px-2.5 py-2 text-center text-xs italic text-gray sm:px-3 sm:py-2.5 sm:text-sm"
                                                        : "rounded-lg border border-gray/30 bg-white px-2.5 py-2 text-center text-xs font-bold text-navy sm:px-3 sm:py-2.5 sm:text-sm"
                                                }
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="py-4 text-center text-sm text-slate">
                                        No slots available for this day.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                            {/* Staff Schedules */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                <h2 className="mb-4 font-serif text-lg text-navy sm:mb-5 sm:text-xl">
                                    Staff Schedules
                                </h2>

                                <div className="flex flex-col">
                                    {staffSchedules.map((staff, index) => (
                                        <div
                                            key={staff.id}
                                            className={`
                                                flex items-center justify-between gap-3
                                                py-3
                                                ${
                                                    index !== staffSchedules.length - 1
                                                        ? "border-b border-gray/10"
                                                        : ""
                                                }
                                            `}
                                        >
                                            {/* Staff Info */}
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-beige">
                                                    <span className="font-serif text-sm font-bold text-navy">
                                                        {staff.name
                                                            .split(" ")
                                                            .map((name) => name.charAt(0))
                                                            .join("")
                                                            .slice(0, 2)}
                                                    </span>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-navy">
                                                        {staff.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray">
                                                        {staff.scheduleType}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(`/staff/${staff.id}/availability`)
                                                }
                                                className="flex-shrink-0 rounded-lg border border-gray px-3 py-2 text-[10px] font-bold uppercase text-navy transition hover:border-navy sm:px-4 sm:text-xs"
                                            >
                                                Manage
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Blocked Periods */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                                {/* Header */}
                                <div className="mb-4 flex items-center justify-between sm:mb-5">
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Blocked Periods
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowBlockedPeriodForm(!showBlockedPeriodForm)
                                        }
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white transition hover:bg-gold hover:text-navy"
                                        aria-label="Add blocked period"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Temporary Add Form State */}
                                {showBlockedPeriodForm && (
                                    <div className="mb-4 rounded-lg border border-gray/20 bg-beige/30 p-3 sm:p-4">
                                        <p className="text-xs text-slate sm:text-sm">
                                            Blocked period form will be added here.
                                        </p>
                                    </div>
                                )}

                                {/* Blocked Period List */}
                                {blockedPeriods.length > 0 ? (
                                    <div className="flex flex-col gap-2.5">
                                        {blockedPeriods.map((period, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start justify-between gap-3 rounded-lg border border-gray/20 bg-beige/30 px-3 py-3 sm:px-4 sm:py-3.5"
                                            >
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold uppercase tracking-wide text-navy sm:text-sm">
                                                        {period.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate sm:text-sm">
                                                        {period.subtitle}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        // TODO: axios DELETE /api/company/blocked-periods/:id
                                                        setBlockedPeriods((current) =>
                                                            current.filter(
                                                                (_, periodIndex) =>
                                                                    periodIndex !== index
                                                            )
                                                        );
                                                    }}
                                                    className="flex-shrink-0 text-gray transition hover:text-red-500"
                                                    title="Remove blocked period"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-6 text-center">
                                        <p className="text-sm text-slate">
                                            No blocked periods configured.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


export default AvailabilityManagement;