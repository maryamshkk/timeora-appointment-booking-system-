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


function AvailabilityManagement() {
    const navigate = useNavigate();

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
            <Sidebar activeItem="Calendar" />

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showBell
                    showSettings
                    showSupportText
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-8 py-6">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="mb-4 font-serif text-4xl text-navy">
                            Availability Management
                        </h1>

                        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-start">
                            {/* Subtitle */}
                            <p className="max-w-[440px] text-sm leading-relaxed text-slate">
                                Configure default operating hours, manage staff schedules,
                                and dictate block-out periods across your enterprise.
                            </p>

                            {/* Actions */}
                            <div className="flex gap-3">
                                {/* Discard */}
                                <button
                                    type="button"
                                    disabled={!isDirty}
                                    onClick={() =>
                                        setOperatingHours(savedSnapshot)
                                    }
                                    className="rounded-lg border-2 border-navy bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Discard Changes
                                </button>

                                {/* Save */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSavedSnapshot(operatingHours)
                                    }
                                    className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column */}
                        <div className="flex flex-col gap-6 lg:col-span-2">
                            {/* Master Operating Hours */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">
                                {/* Card Header */}
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Master Operating Hours
                                    </h2>

                                    {isDirty && (
                                        <span className="rounded-full border border-gold bg-gold/15 px-3 py-1.5 text-xs font-bold text-amber-700">
                                            Unsaved Changes
                                        </span>
                                    )}
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <div className="min-w-[760px]">
                                        {/* Table Header */}
                                        <div className="grid grid-cols-[120px_100px_1fr_80px] gap-4 border-b border-gray/20 pb-3">
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
                                                        grid grid-cols-[120px_100px_1fr_80px]
                                                        gap-4
                                                        items-start
                                                        border-b border-gray/10
                                                        py-4
                                                        last:border-b-0
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
                                                    <div className="flex flex-col gap-2">
                                                        {schedule.enabled &&
                                                            schedule.windows.map(
                                                                (
                                                                    window,
                                                                    windowIndex
                                                                ) => (
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
                                                                            onFocus={() =>
                                                                                setActiveDay(day)
                                                                            }
                                                                            className="w-28 rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
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
                                                                            onFocus={() =>
                                                                                setActiveDay(day)
                                                                            }
                                                                            className="w-28 rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                                                        />

                                                                        {schedule.windows.length > 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    removeWindow(
                                                                                        day,
                                                                                        windowIndex
                                                                                    )
                                                                                }
                                                                                className="text-gray transition hover:text-red-500"
                                                                                aria-label="Remove window"
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}

                                                        {schedule.enabled && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    addSplitShift(day)
                                                                }
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
                                                            onClick={() =>
                                                                copyDayToAll(day)
                                                            }
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

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            {/* Right-side cards will be added next */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


export default AvailabilityManagement;