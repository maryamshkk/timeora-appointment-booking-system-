import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function StaffManagement() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Sidebar */}
            <Sidebar activeItem="Staff" />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showBell
                    showHelp
                    profileInfo={{
                        name: "A. ADMIN",
                        role: "Administrator",
                        avatarUrl: "/path/to/avatar.jpg",
                    }}
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-8 py-6">

                    {/* Page Header */}
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Staff
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                Manage your team, schedules, availability, and
                                appointment workload.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={function () {
                                navigate("/company/staff/add");
                            }}
                            className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy"
                        >
                            <Plus className="h-4 w-4" />
                            Add Staff
                        </button>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default StaffManagement;