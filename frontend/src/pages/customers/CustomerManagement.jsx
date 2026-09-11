import React, { useState } from "react";

import { Plus, Search } from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


function CustomerManagement() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [lastVisitFilter, setLastVisitFilter] = useState("any");
    const [typeFilter, setTypeFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    
    return (
        <div className="flex min-h-screen bg-beige">
            <Sidebar activeItem="Customers" />

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showHelp
                    showSettings
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-8 py-6">

                    {/* Header */}
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-start">
                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Customers
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                View and manage customers, appointment history,
                                and customer activity
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/customers/add")}
                            className="
                                flex items-center gap-2
                                rounded-lg
                                bg-navy
                                px-5 py-3
                                text-sm font-bold uppercase tracking-wide
                                text-white
                                transition
                                hover:bg-gold hover:text-navy
                            "
                        >
                            <Plus className="h-4 w-4" />
                            Add Customer
                        </button>
                    </div>

                    {/* Customer Stats */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            value="428"
                            label="TOTAL CUSTOMERS"
                        />

                        <StatCard
                            value="36"
                            label="NEW THIS MONTH"
                        />

                        <StatCard
                            value="214"
                            label="RETURNING"
                        />

                        <StatCard
                            value="72"
                            label="UPCOMING APPOINTMENTS"
                        />
                    </div>

                    {/* Filters */}
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                        {/* Search */}
                        <div className="relative min-w-[280px] max-w-[440px] flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search by name, email, or phone..."
                                className="
                                    w-full rounded-lg
                                    border border-gray/30
                                    bg-white
                                    py-2.5 pl-9 pr-4
                                    text-sm text-navy
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="flex flex-wrap gap-3">

                            {/* Status */}
                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="
                                    rounded-lg
                                    border border-gray/30
                                    bg-white
                                    px-4 py-2.5
                                    text-sm font-bold text-navy
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
                            >
                                <option value="all">Status: All</option>
                                <option value="new">Status: New</option>
                                <option value="returning">Status: Returning</option>
                                <option value="inactive">Status: Inactive</option>
                            </select>

                            {/* Last Visit */}
                            <select
                                value={lastVisitFilter}
                                onChange={(event) => {
                                    setLastVisitFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="
                                    rounded-lg
                                    border border-gray/30
                                    bg-white
                                    px-4 py-2.5
                                    text-sm font-bold text-navy
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
                            >
                                <option value="any">Last Visit: Any</option>
                                <option value="7">Last 7 Days</option>
                                <option value="30">Last 30 Days</option>
                                <option value="90">Last 90 Days</option>
                                <option value="over90">Over 90 Days</option>
                            </select>

                            {/* Customer Type */}
                            <select
                                value={typeFilter}
                                onChange={(event) => {
                                    setTypeFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="
                                    rounded-lg
                                    border border-gray/30
                                    bg-white
                                    px-4 py-2.5
                                    text-sm font-bold text-navy
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
                            >
                                <option value="all">Type: All</option>
                                <option value="individual">Individual</option>
                                <option value="corporate">Corporate</option>
                            </select>

                        </div>
                    </div>




                </main>
            </div>
        </div>
    );
}

export default CustomerManagement;