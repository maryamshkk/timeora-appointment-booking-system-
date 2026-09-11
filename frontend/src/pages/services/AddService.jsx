import React, { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const staffList = [
    {
        id: "sa",
        name: "Dr. Sara Ahmed",
        role: "Senior Specialist",
        initials: "SA",
        color: "bg-blue-100",
        textColor: "text-navy",
    },
    {
        id: "ak",
        name: "Ali Khan",
        role: "Consultant",
        initials: "AK",
        color: "bg-blue-100",
        textColor: "text-navy",
    },
    {
        id: "hm",
        name: "Hina Malik",
        role: "Therapist",
        initials: "HM",
        color: "bg-gold/40",
        textColor: "text-navy",
    },
];

function AddService() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedStaffIds, setSelectedStaffIds] = useState([
        "sa",
        "ak",
        "hm",
    ]);

    const [formData, setFormData] = useState({
        serviceName: "",
        serviceId: "SRV-001",
        description: "",
        price: "",
        isActive: true,
    });

    function handleStaffToggle(staffId) {
        setSelectedStaffIds((currentIds) => {
            if (currentIds.includes(staffId)) {
                return currentIds.filter((id) => id !== staffId);
            }

            return [...currentIds, staffId];
        });
    }

    function handleStatusToggle() {
        setFormData((currentData) => ({
            ...currentData,
            isActive: !currentData.isActive,
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.serviceName || !formData.price) {
            return;
        }

        const payload = {
            service_name: formData.serviceName,
            service_id: formData.serviceId,
            description: formData.description,
            price: formData.price,
            duration: 60,
            payment_method: "cash_on_reception",
            staff_ids: selectedStaffIds,
            is_active: formData.isActive,
        };

        // TODO: Axios POST /api/company/services
        // On success:
        // navigate("/company/services");
    }

    const isFormValid = Boolean(formData.serviceName && formData.price);

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Services"
                    ctaLabel="Add Service"
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
                            activeItem="Services"
                            ctaLabel="Add Service"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/services"
                            className="text-slate transition hover:text-navy"
                        >
                            Services
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            Add Service
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                            Add Service
                        </h1>

                        <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                            Create a service that customers can book through your company.
                        </p>
                    </div>

                    {/* Main Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6"
                    >
                        {/* Left Column */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 lg:gap-6">
                            {/* Basic Information */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Basic Information
                                </h2>

                                <div className="mb-4 mt-3 border-b border-gray/20 sm:mb-5 sm:mt-4" />

                                {/* Service Name + Service ID */}
                                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    {/* Service Name */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Service Name
                                        </label>

                                        <input
                                            type="text"
                                            name="serviceName"
                                            value={formData.serviceName}
                                            onChange={handleChange}
                                            placeholder="e.g. Initial Consultation"
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />
                                    </div>

                                    {/* Service ID */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Service ID
                                        </label>

                                        <input
                                            type="text"
                                            name="serviceId"
                                            value={formData.serviceId}
                                            readOnly
                                            className="w-full cursor-not-allowed rounded-lg border border-gray bg-gray/10 px-3 py-2.5 text-sm text-slate outline-none sm:px-4"
                                        />

                                        {/* TODO: Fetch next sequential ID from backend */}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-4 sm:mt-5">
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Briefly describe what this service includes..."
                                        className="w-full resize-none rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                    />
                                </div>
                            </div>

                            {/* Pricing & Duration */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Pricing &amp; Duration
                                </h2>

                                <div className="mb-4 mt-3 border-b border-gray/20 sm:mb-5 sm:mt-4" />

                                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    {/* Price */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Price (Rs.)
                                        </label>

                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate sm:left-4">
                                                Rs.
                                            </span>

                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full rounded-lg border border-gray py-2.5 pl-10 pr-3 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:pr-4"
                                            />
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Duration
                                        </label>

                                        <input
                                            type="text"
                                            value="1 hour"
                                            readOnly
                                            className="w-full cursor-not-allowed rounded-lg border border-gray bg-gray/10 px-3 py-2.5 text-sm text-slate outline-none sm:px-4"
                                        />

                                        <p className="mt-1.5 text-xs text-slate">
                                            TIMEORA appointments use fixed 1-hour slots.
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mt-4 sm:mt-5">
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Payment Method
                                    </label>

                                    <div className="flex cursor-not-allowed items-center gap-2.5 rounded-lg border border-gray/20 bg-gray/10 px-3 py-3 sm:px-4">
                                        <span className="text-slate">Rs.</span>

                                        <span className="text-sm font-bold text-navy">
                                            Cash on Reception
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Staff Assignment */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Staff Assignment
                                </h2>

                                <div className="mb-3 mt-3 border-b border-gray/20 sm:mt-4" />

                                <p className="mb-4 text-xs text-slate sm:text-sm">
                                    Select the staff members qualified to perform this service.
                                </p>

                                <div className="flex flex-col gap-2.5">
                                    {staffList.map((staff) => {
                                        const isSelected = selectedStaffIds.includes(
                                            staff.id
                                        );

                                        return (
                                            <div
                                                key={staff.id}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() =>
                                                    handleStaffToggle(staff.id)
                                                }
                                                onKeyDown={(event) => {
                                                    if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                    ) {
                                                        event.preventDefault();
                                                        handleStaffToggle(
                                                            staff.id
                                                        );
                                                    }
                                                }}
                                                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition sm:p-3.5 ${
                                                    isSelected
                                                        ? "border-navy/40 bg-navy/[0.02]"
                                                        : "border-gray/20 hover:border-navy/40"
                                                }`}
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div
                                                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${staff.color}`}
                                                    >
                                                        <span
                                                            className={`text-sm font-bold ${staff.textColor}`}
                                                        >
                                                            {staff.initials}
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-bold text-navy">
                                                            {staff.name}
                                                        </p>

                                                        <p className="mt-0.5 truncate text-xs text-slate">
                                                            {staff.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition ${
                                                        isSelected
                                                            ? "border-navy bg-navy"
                                                            : "border-gray bg-white"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <Check className="h-3.5 w-3.5 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Service Status */}
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Service Status
                                </h2>

                                <div className="mb-4 mt-3 border-b border-gray/20 sm:mt-4" />

                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <p className="max-w-[500px] text-xs leading-relaxed text-slate sm:text-sm">
                                        Service availability automatically follows company hours and assigned
                                        staff schedules. Toggle to quickly hide this service from booking.
                                    </p>

                                    <div className="flex flex-shrink-0 items-center gap-3">
                                        <span className="text-sm font-bold text-navy">
                                            ACTIVE
                                        </span>

                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={formData.isActive}
                                            onClick={handleStatusToggle}
                                            className={`relative flex h-6 w-12 items-center rounded-full transition-colors ${
                                                formData.isActive
                                                    ? "bg-navy"
                                                    : "bg-gray/40"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
                                                    formData.isActive
                                                        ? "translate-x-6"
                                                        : "translate-x-0.5"
                                                }`}
                                            >
                                                {formData.isActive && (
                                                    <Check className="h-3 w-3 text-navy" />
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="hidden lg:block">
                            <div className="sticky top-6 flex flex-col gap-4 md:gap-5 lg:gap-6">
                                {/* Service Summary */}
                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm lg:p-7">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Service Summary
                                    </h2>

                                    <div className="my-4 border-b border-gray/30 sm:my-5" />

                                    {/* Service Name */}
                                    <div className="mb-5 sm:mb-6">
                                        <p
                                            className={`font-serif text-base font-bold ${
                                                formData.serviceName
                                                    ? "text-navy"
                                                    : "text-gray italic"
                                            }`}
                                        >
                                            {formData.serviceName || "Untitled Service"}
                                        </p>
                                    </div>

                                    {/* Price & Duration */}
                                    <div className="mb-5 grid grid-cols-2 gap-4 sm:mb-6">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Price
                                            </p>

                                            <p className="mt-1 font-serif text-lg font-bold text-navy">
                                                Rs. {formData.price || "0.00"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Duration
                                            </p>

                                            <p className="mt-1 font-serif text-lg font-bold text-navy">
                                                1 hour
                                            </p>
                                        </div>
                                    </div>

                                    {/* Assigned Staff */}
                                    <div>
                                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                            Assigned Staff
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {staffList
                                                .filter((staff) =>
                                                    selectedStaffIds.includes(staff.id)
                                                )
                                                .map((staff) => (
                                                    <span
                                                        key={staff.id}
                                                        className="rounded-full bg-beige px-3 py-1.5 text-xs font-bold text-navy"
                                                    >
                                                        {staff.name}
                                                    </span>
                                                ))}

                                            {selectedStaffIds.length === 0 && (
                                                <span className="text-sm italic text-gray">
                                                    No staff assigned yet
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Rules */}
                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm lg:p-7">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Booking Rules
                                    </h2>

                                    <div className="my-4 border-b border-gray/30 sm:my-5" />

                                    <div className="rounded-lg bg-beige p-4">
                                        <ul className="space-y-3 text-xs text-slate sm:text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brown" />
                                                Customers can book this service based on staff availability.
                                            </li>

                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brown" />
                                                Appointment duration is fixed at 1 hour.
                                            </li>

                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brown" />
                                                Payment is collected as Cash on Reception.
                                            </li>

                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brown" />
                                                Only active services are available for customer booking.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray/30 pt-5 sm:flex-row sm:justify-end sm:pt-6 lg:col-span-3">
                            <Link
                                to="/company/services"
                                className="rounded-lg border border-gray px-6 py-3 text-center text-sm font-bold text-slate transition hover:border-navy hover:text-navy"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Create Service
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default AddService;