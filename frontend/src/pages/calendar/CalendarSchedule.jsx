import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import CalendarScheduleView from "../../components/dashboard/CalendarScheduleView";

function CalendarSchedule() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Calendar"
                    ctaLabel="Book Appointment"
                />
            </div>

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
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:mb-5 md:flex-row md:items-center">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl">
                                Calendar / Schedule
                            </h1>
                            <p className="mt-1 text-xs text-slate sm:text-sm">
                                Manage appointments, staff schedules, and daily availability.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/company/appointments/new")}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            New Appointment
                        </button>
                    </div>

                    <CalendarScheduleView
                        onViewDetails={(appointment) =>
                            navigate(`/company/appointments/${appointment.id}`)
                        }
                        onCreateAppointment={() =>
                            navigate("/company/appointments/new")
                        }
                    />
                </main>
            </div>
        </div>
    );
}

export default CalendarSchedule;