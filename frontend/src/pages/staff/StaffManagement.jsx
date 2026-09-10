import React, { useState } from "react";
import {
    Plus,
    Users,
    UserCheck,
    CalendarCheck,
    UserMinus,
    Search,
    ChevronDown,
    Mail,
    Phone,
    UserX,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


const staffMembers = [
    {
        id: 1,
        name: "Dr. Sara Ahmed",
        role: "General Physician",
        status: "Active",
        email: "sara@shifaclinic.com",
        phone: "0300 1234567",
        appointmentsToday: 6,
    },
    {
        id: 2,
        name: "Ali Raza",
        role: "Physiotherapist",
        status: "Active",
        email: "ali@shifaclinic.com",
        phone: "0301 2345678",
        appointmentsToday: 4,
    },
    {
        id: 3,
        name: "Hassan Iqbal",
        role: "Consultant",
        status: "On Leave",
        email: "hassan@shifaclinic.com",
        phone: "0302 3456789",
        appointmentsToday: 0,
    },
    {
        id: 4,
        name: "Dr. Fatima Noor",
        role: "Dentist",
        status: "Active",
        email: "fatima@shifaclinic.com",
        phone: "0303 4567890",
        appointmentsToday: 5,
    },
    {
        id: 5,
        name: "Bilal Sheikh",
        role: "Receptionist",
        status: "Active",
        email: "bilal@shifaclinic.com",
        phone: "0304 5678901",
        appointmentsToday: 2,
    },
    {
        id: 6,
        name: "Ayesha Malik",
        role: "Nurse",
        status: "Inactive",
        email: "ayesha@shifaclinic.com",
        phone: "0305 6789012",
        appointmentsToday: 0,
    },
];

function StaffManagement() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");

    const filteredStaff = staffMembers.filter(function (staff) {
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
            staff.name.toLowerCase().includes(query) ||
            staff.role.toLowerCase().includes(query) ||
            String(staff.id).includes(query);

        const matchesStatus =
            statusFilter === "all" || staff.status === statusFilter;

        const matchesRole =
            roleFilter === "all" ||
            staff.role.toLowerCase().includes(roleFilter.toLowerCase());

        return matchesSearch && matchesStatus && matchesRole;
    });

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
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
                            activeItem="Staff"
                            ctaLabel="Add Staff"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showHelp
                    profileName="A. Admin"
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Page Header */}
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Staff
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                                Manage your team, schedules, availability, and
                                appointment workload.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={function () {
                                navigate(`/company/staff/add`);
                            }}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            Add Staff
                        </button>
                    </div>

                    {/* Staff Stats */}
                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:mb-6 xl:grid-cols-4">
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
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="relative w-full md:max-w-[420px] md:flex-1">
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
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                            {/* Status */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={statusFilter}
                                    onChange={function (event) {
                                        setStatusFilter(event.target.value);
                                    }}
                                    className="w-full appearance-none rounded-lg border border-gray/30 bg-white px-4 py-2.5 pr-9 text-sm font-bold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:w-auto"
                                >
                                    <option value="all">Status: All</option>
                                    <option value="Active">
                                        Status: Active
                                    </option>
                                    <option value="On Leave">
                                        Status: On Leave
                                    </option>
                                    <option value="Inactive">
                                        Status: Inactive
                                    </option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
                            </div>

                            {/* Role */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={roleFilter}
                                    onChange={function (event) {
                                        setRoleFilter(event.target.value);
                                    }}
                                    className="w-full appearance-none rounded-lg border border-gray/30 bg-white px-4 py-2.5 pr-9 text-sm font-bold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:w-auto"
                                >
                                    <option value="all">Role: All</option>
                                    <option value="Doctor">
                                        Role: Doctor
                                    </option>
                                    <option value="Therapist">
                                        Role: Therapist
                                    </option>
                                    <option value="Receptionist">
                                        Role: Receptionist
                                    </option>
                                    <option value="Admin">Role: Admin</option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
                            </div>
                        </div>
                    </div>

                    {/* Staff Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map(function (staff) {
                                const initials = staff.name
                                    .split(" ")
                                    .map(function (namePart) {
                                        return namePart.charAt(0);
                                    })
                                    .slice(0, 2)
                                    .join("");

                                const statusClass =
                                    staff.status === "Active"
                                        ? "bg-green-50 text-green-700"
                                        : staff.status === "On Leave"
                                        ? "bg-gold/20 text-amber-700"
                                        : "bg-gray/20 text-slate";

                                return (
                                    <div
                                        key={staff.id}
                                        onClick={function () {
                                            navigate(
                                                `/company/staff/${staff.id}`
                                            );
                                        }}
                                        className="cursor-pointer rounded-xl border border-gray/20 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                                    >
                                        {/* Top Row */}
                                        <div className="mb-3 flex items-start gap-3">
                                            {/* Avatar */}
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray/20 sm:h-14 sm:w-14">
                                                <span className="text-sm font-bold text-navy">
                                                    {initials}
                                                </span>
                                            </div>

                                            {/* Name / Role */}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate font-serif text-base text-navy sm:text-lg">
                                                    {staff.name}
                                                </h3>

                                                <p className="mt-0.5 truncate text-xs text-slate sm:text-sm">
                                                    {staff.role}
                                                </p>
                                            </div>

                                            {/* Status */}
                                            <span
                                                className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:px-2.5 sm:py-1 sm:text-xs ${statusClass}`}
                                            >
                                                {staff.status}
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray/15" />

                                        {/* Contact Information */}
                                        <div className="mt-3">
                                            <div className="mb-2 flex items-center gap-2 text-xs text-slate sm:text-sm">
                                                <Mail className="h-3.5 w-3.5 flex-shrink-0" />

                                                <span className="truncate">
                                                    {staff.email}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-slate sm:text-sm">
                                                <Phone className="h-3.5 w-3.5 flex-shrink-0" />

                                                <span>{staff.phone}</span>
                                            </div>
                                        </div>

                                        {/* Bottom Row */}
                                        <div className="mt-3 flex items-center justify-between border-t border-gray/15 pt-3">
                                            <div>
                                                <p className="text-[10px] text-slate sm:text-xs">
                                                    Today's Appointments
                                                </p>

                                                <p className="mt-0.5 text-xs font-bold text-navy sm:text-sm">
                                                    {staff.appointmentsToday}{" "}
                                                    today
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={function (event) {
                                                    event.stopPropagation();
                                                    navigate(
                                                        "/company/calendar"
                                                    );
                                                }}
                                                className="text-xs font-bold text-navy hover:underline"
                                            >
                                                View Schedule
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            /* Empty State */
                            <div className="col-span-full flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-gray/20 bg-white px-4 sm:min-h-[280px]">
                                <UserX className="h-8 w-8 text-gray sm:h-10 sm:w-10" />

                                <p className="mt-4 text-sm font-bold text-slate">
                                    No staff members found
                                </p>

                                <p className="mt-1 text-xs text-gray sm:text-sm">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default StaffManagement;