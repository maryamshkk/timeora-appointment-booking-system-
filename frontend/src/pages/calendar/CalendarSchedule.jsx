import React, { useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function CalendarSchedule() {
    
    const [viewMode, setViewMode] = useState("week");

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

                    </div>
                </main>

            </div>
        </div>
    )
}
export default CalendarSchedule;