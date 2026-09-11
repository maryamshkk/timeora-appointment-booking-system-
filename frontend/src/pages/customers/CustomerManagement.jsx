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

    const [sidebarOpen, setSidebarOpen] = useState(false);
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
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Customers"
                    ctaLabel="Add Customer"
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
                            activeItem="Customers"
                            ctaLabel="Add Customer"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showHelp
                    showSettings
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Header */}
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Customers
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                                View and manage customers, appointment history,
                                and customer activity
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/company/customers/add")}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            Add Customer
                        </button>
                    </div>

                    {/* Customer Stats */}
                    <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 md:mb-6 lg:grid-cols-4">
                        <StatCard value="428" label="TOTAL CUSTOMERS" />
                        <StatCard value="36" label="NEW THIS MONTH" />
                        <StatCard value="214" label="RETURNING" />
                        <StatCard value="72" label="UPCOMING APPOINTMENTS" />
                    </div>

                    {/* Filters */}
                    <div className="mb-4 flex flex-col gap-3 sm:mb-5 md:flex-row md:flex-wrap md:items-center md:justify-between">
                        {/* Search */}
                        <div className="relative w-full md:max-w-[440px] md:flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search by name, email, or phone..."
                                className="w-full rounded-lg border border-gray/30 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold"
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:w-auto md:gap-3">
                            {/* Status */}
                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-xs font-bold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:text-sm"
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
                                className="w-full rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-xs font-bold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:text-sm"
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
                                className="w-full rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-xs font-bold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:text-sm"
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
                            <table className="w-full min-w-[900px]">
                                <thead>
                                    <tr className="border-b border-gray/20 bg-beige/40">
                                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-5 md:py-3.5">
                                            Customer
                                        </th>

                                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-5 md:py-3.5">
                                            Contact
                                        </th>

                                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-5 md:py-3.5">
                                            Last Appointment
                                        </th>

                                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-5 md:py-3.5">
                                            Upcoming
                                        </th>

                                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-5 md:py-3.5">
                                            Total
                                        </th>

                                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate md:px-5 md:py-3.5">
                                            Status
                                        </th>

                                        <th className="w-12 px-3 py-3 md:px-5 md:py-3.5"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredCustomers.map((customer, index) => (
                                        <tr
                                            key={customer.id}
                                            onClick={() =>
                                                navigate(`/company/customers/${customer.id}`)
                                            }
                                            className="cursor-pointer border-b border-gray/10 transition hover:bg-beige/20"
                                        >
                                            {/* Customer */}
                                            <td className="px-3 py-3 md:px-5 md:py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full md:h-10 md:w-10 ${customer.avatarColor}`}
                                                    >
                                                        <span className="text-xs font-bold text-navy md:text-sm">
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
                                            <td className="px-3 py-3 md:px-5 md:py-4">
                                                <p className="text-xs text-slate sm:text-sm">
                                                    {customer.email}
                                                </p>
                                            </td>

                                            {/* Last Appointment */}
                                            <td className="px-3 py-3 md:px-5 md:py-4">
                                                {customer.lastAppointment ? (
                                                    <>
                                                        <p className="text-xs text-navy sm:text-sm">
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
                                            <td className="px-3 py-3 md:px-5 md:py-4">
                                                {customer.upcoming ? (
                                                    <>
                                                        <p className="text-xs text-navy sm:text-sm">
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
                                            <td className="px-3 py-3 md:px-5 md:py-4">
                                                <p className="text-sm font-bold text-navy">
                                                    {customer.total}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-3 py-3 md:px-5 md:py-4">
                                                {customer.status === "Returning" && (
                                                    <span className="inline-flex whitespace-nowrap rounded-full bg-gold/20 px-2 py-1 text-[10px] font-bold uppercase text-amber-700 md:px-2.5 md:text-xs">
                                                        Returning
                                                    </span>
                                                )}

                                                {customer.status === "New" && (
                                                    <span className="inline-flex whitespace-nowrap rounded-full bg-gray/20 px-2 py-1 text-[10px] font-bold uppercase text-slate md:px-2.5 md:text-xs">
                                                        New
                                                    </span>
                                                )}

                                                {customer.status === "Inactive" && (
                                                    <span className="inline-flex whitespace-nowrap rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase text-red-500 md:px-2.5 md:text-xs">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="relative px-3 py-3 md:px-5 md:py-4">
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        setOpenMenuIndex(
                                                            openMenuIndex === index ? null : index
                                                        );
                                                    }}
                                                    className="rounded-md p-1.5 text-slate transition hover:bg-beige hover:text-navy"
                                                    aria-label="Actions"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                {openMenuIndex === index && (
                                                    <div
                                                        onClick={(event) => event.stopPropagation()}
                                                        className="absolute right-3 top-12 z-20 w-40 rounded-lg border border-gray/20 bg-white p-1 shadow-lg md:right-5"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(`/customers/${customer.id}`)
                                                            }
                                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-navy hover:bg-beige"
                                                        >
                                                            View Profile
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // TODO: navigate to customer edit page
                                                                setOpenMenuIndex(null);
                                                            }}
                                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-navy hover:bg-beige"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // TODO: deactivate customer API
                                                                setOpenMenuIndex(null);
                                                            }}
                                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
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
                        <div className="flex flex-col items-center gap-3 border-t border-gray/20 px-3 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
                            {/* Results */}
                            <p className="text-xs text-slate sm:text-sm">
                                Showing {startCustomer}-{endCustomer} of {totalCustomers} customers
                            </p>

                            {/* Pagination */}
                            <div className="flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
                                {/* Previous */}
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => Math.max(1, page - 1))
                                    }
                                    className={
                                        currentPage === 1
                                            ? "cursor-not-allowed text-gray"
                                            : "cursor-pointer text-slate hover:text-navy"
                                    }
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
                                            className={`font-bold ${
                                                currentPage === page
                                                    ? "flex h-7 w-7 items-center justify-center rounded-md bg-navy text-white"
                                                    : "text-navy hover:underline"
                                            }`}
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
                                    className={`font-bold ${
                                        currentPage === totalPages
                                            ? "cursor-not-allowed text-gray"
                                            : "cursor-pointer text-navy hover:underline"
                                    }`}
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