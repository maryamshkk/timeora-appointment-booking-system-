import React, { useState } from "react";

import { MoreVertical, Plus, Search } from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

const customers = [
    {
        name: "Ayesha Khan",
        id: "CUS-00482",
        initials: "AK",
        avatarColor: "bg-blue-100",
        email: "ayesha@example.com",
        phone: "+92 300 1234567",
        lastAppointment: {
            date: "21 Aug",
            service: "Consultation",
        },
        upcoming: {
            date: "25 Aug",
            time: "10:00 AM",
        },
        total: 12,
        status: "Returning",
        type: "Individual",
    },
    {
        name: "Hina Malik",
        id: "CUS-00315",
        initials: "HM",
        avatarColor: "bg-blue-100",
        email: "hina@example.com",
        phone: "+92 301 9876543",
        lastAppointment: {
            date: "19 Aug",
            service: "Consultation",
        },
        upcoming: null,
        total: 8,
        status: "Returning",
        type: "Individual",
    },
    {
        name: "Maham Ali",
        id: "CUS-00501",
        initials: "MA",
        avatarColor: "bg-gold/40",
        email: "maham@example.com",
        phone: "+92 302 4567890",
        lastAppointment: null,
        upcoming: null,
        total: 0,
        status: "New",
        type: "Individual",
    },
];

function CustomerManagement() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [lastVisitFilter, setLastVisitFilter] = useState("any");
    const [typeFilter, setTypeFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    const filteredCustomers = customers.filter((customer) => {
        const searchValue = searchQuery.toLowerCase().trim();

        const matchesSearch =
            !searchValue ||
            customer.name.toLowerCase().includes(searchValue) ||
            customer.email.toLowerCase().includes(searchValue) ||
            customer.phone.toLowerCase().includes(searchValue);

        const matchesStatus =
            statusFilter === "all" ||
            customer.status.toLowerCase() === statusFilter;

        const matchesType =
            typeFilter === "all" ||
            customer.type.toLowerCase() === typeFilter;

        const matchesLastVisit =
            lastVisitFilter === "any" || customer.lastAppointment !== null;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesType &&
            matchesLastVisit
        );
    });

    const pageSize = 10;
    const totalCustomers = 428;
    const totalPages = Math.ceil(totalCustomers / pageSize);

    const startCustomer = (currentPage - 1) * pageSize + 1;
    const endCustomer = Math.min(
        currentPage * pageSize,
        totalCustomers
    );

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
                            onClick={() => navigate("/company/customers/add")}
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
                        <StatCard value="428" label="TOTAL CUSTOMERS" />
                        <StatCard value="36" label="NEW THIS MONTH" />
                        <StatCard value="214" label="RETURNING" />
                        <StatCard value="72" label="UPCOMING APPOINTMENTS" />
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

                    {/* Customer Table */}
                    <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-[1000px] w-full">
                                <thead>
                                    <tr className="border-b border-gray/20 bg-beige/40">
                                        <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Customer
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Contact
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Last Appointment
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Upcoming
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Total
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </th>

                                        <th className="w-12 px-5 py-3.5"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredCustomers.map((customer, index) => (
                                        <tr
                                            key={customer.id}
                                            onClick={() =>
                                                navigate(`/company/customers/${customer.id}`)
                                            }
                                            className="
                                                cursor-pointer
                                                border-b border-gray/10
                                                transition
                                                hover:bg-beige/20
                                            "
                                        >
                                            {/* Customer */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`
                                                            flex h-10 w-10 flex-shrink-0
                                                            items-center justify-center
                                                            rounded-full
                                                            ${customer.avatarColor}
                                                        `}
                                                    >
                                                        <span className="text-sm font-bold text-navy">
                                                            {customer.initials}
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-navy">
                                                            {customer.name}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-gray">
                                                            {customer.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm text-slate">
                                                    {customer.email}
                                                </p>
                                            </td>

                                            {/* Last Appointment */}
                                            <td className="px-5 py-4">
                                                {customer.lastAppointment ? (
                                                    <>
                                                        <p className="text-sm text-navy">
                                                            {customer.lastAppointment.date}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate">
                                                            {customer.lastAppointment.service}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* Upcoming */}
                                            <td className="px-5 py-4">
                                                {customer.upcoming ? (
                                                    <>
                                                        <p className="text-sm text-navy">
                                                            {customer.upcoming.date}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate">
                                                            {customer.upcoming.time}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* Total */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-bold text-navy">
                                                    {customer.total}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                {customer.status === "Returning" && (
                                                    <span className="inline-flex rounded-full bg-gold/20 px-2.5 py-1 text-xs font-bold uppercase text-amber-700">
                                                        Returning
                                                    </span>
                                                )}

                                                {customer.status === "New" && (
                                                    <span className="inline-flex rounded-full bg-gray/20 px-2.5 py-1 text-xs font-bold uppercase text-slate">
                                                        New
                                                    </span>
                                                )}

                                                {customer.status === "Inactive" && (
                                                    <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold uppercase text-red-500">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="relative px-5 py-4">
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        setOpenMenuIndex(
                                                            openMenuIndex === index ? null : index
                                                        );
                                                    }}
                                                    className="
                                                        rounded-md p-1.5
                                                        text-slate
                                                        transition
                                                        hover:bg-beige
                                                        hover:text-navy
                                                    "
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                {openMenuIndex === index && (
                                                    <div
                                                        onClick={(event) => event.stopPropagation()}
                                                        className="
                                                            absolute
                                                            right-5
                                                            top-12
                                                            z-20
                                                            w-40
                                                            rounded-lg
                                                            border border-gray/20
                                                            bg-white
                                                            p-1
                                                            shadow-lg
                                                        "
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(`/customers/${customer.id}`)
                                                            }
                                                            className="
                                                                w-full rounded-md
                                                                px-3 py-2
                                                                text-left text-sm
                                                                text-navy
                                                                hover:bg-beige
                                                            "
                                                        >
                                                            View Profile
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // TODO: navigate to customer edit page
                                                                setOpenMenuIndex(null);
                                                            }}
                                                            className="
                                                                w-full rounded-md
                                                                px-3 py-2
                                                                text-left text-sm
                                                                text-navy
                                                                hover:bg-beige
                                                            "
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // TODO: deactivate customer API
                                                                setOpenMenuIndex(null);
                                                            }}
                                                            className="
                                                                w-full rounded-md
                                                                px-3 py-2
                                                                text-left text-sm
                                                                text-red-500
                                                                hover:bg-red-50
                                                            "
                                                        >
                                                            Deactivate
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredCustomers.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-5 py-10 text-center text-sm text-slate"
                                            >
                                                No customers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="flex items-center justify-between border-t border-gray/20 px-5 py-4">
                            {/* Results */}
                            <p className="text-sm text-slate">
                                Showing {startCustomer}-{endCustomer} of {totalCustomers} customers
                            </p>

                            {/* Pagination */}
                            <div className="flex items-center gap-4 text-sm">
                                {/* Previous */}
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => Math.max(1, page - 1))
                                    }
                                    className={`
                                        ${
                                            currentPage === 1
                                                ? "cursor-not-allowed text-gray"
                                                : "cursor-pointer text-slate hover:text-navy"
                                        }
                                    `}
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {[1, 2, 3]
                                    .filter((page) => page <= totalPages)
                                    .map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            className={`
                                                font-bold
                                                ${
                                                    currentPage === page
                                                        ? "flex h-7 w-7 items-center justify-center rounded-md bg-navy text-white"
                                                        : "text-navy hover:underline"
                                                }
                                            `}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                {/* Next */}
                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((page) =>
                                            Math.min(totalPages, page + 1)
                                        )
                                    }
                                    className={`
                                        font-bold
                                        ${
                                            currentPage === totalPages
                                                ? "cursor-not-allowed text-gray"
                                                : "cursor-pointer text-navy hover:underline"
                                        }
                                    `}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CustomerManagement;