import React from "react";
import {
    Plus,
    Users,
    UserCheck,
    CalendarCheck,
    UserMinus,
    Search, 
    ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


function StaffManagement() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [roleFilter, setRoleFilter] = React.useState("all");


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

                    {/* Staff Stats */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            label="TOTAL STAFF"
                            value={12}
                            icon={Users}
                        />

                        <StatCard
                            label="ACTIVE"
                            value={10}
                            icon={UserCheck}
                        />

                        <StatCard
                            label="AVAILABLE TODAY"
                            value={7}
                            icon={CalendarCheck}
                        />

                        <StatCard
                            label="ON LEAVE"
                            value={2}
                            icon={UserMinus}
                        />
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                        {/* Search */}
                        <div className="relative min-w-[280px] max-w-[420px] flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={function (event) {
                                    setSearchQuery(event.target.value);
                                }}
                                placeholder="Search by name, role, or staff ID..."
                                className="w-full rounded-lg border border-gray/30 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none placeholder:text-slate/60 focus:border-gold focus:ring-1 focus:ring-gold"
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="flex flex-wrap gap-3">

                            {/* Status */}
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={function (event) {
                                        setStatusFilter(event.target.value);
                                    }}
                                    className="appearance-none rounded-lg border border-gray/30 bg-white px-4 py-2.5 pr-9 text-sm font-bold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                >
                                    <option value="all">Status: All</option>
                                    <option value="Active">Status: Active</option>
                                    <option value="On Leave">Status: On Leave</option>
                                    <option value="Inactive">Status: Inactive</option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
                            </div>

                            {/* Role */}
                            <div className="relative">
                                <select
                                    value={roleFilter}
                                    onChange={function (event) {
                                        setRoleFilter(event.target.value);
                                    }}
                                    className="appearance-none rounded-lg border border-gray/30 bg-white px-4 py-2.5 pr-9 text-sm font-bold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                >
                                    <option value="all">Role: All</option>
                                    <option value="Doctor">Role: Doctor</option>
                                    <option value="Therapist">Role: Therapist</option>
                                    <option value="Receptionist">Role: Receptionist</option>
                                    <option value="Admin">Role: Admin</option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
                            </div>

                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default StaffManagement;