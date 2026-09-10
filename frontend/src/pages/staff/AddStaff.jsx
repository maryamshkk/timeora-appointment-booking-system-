import React, { useRef, useState } from "react";
import {
    ChevronRight,
    ChevronDown,
    User,
    Phone,
    Mail,
    UserCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const services = [
    { key: "consultation", label: "Consultation" },
    { key: "follow-up", label: "Follow-up" },
    { key: "advanced-assessment", label: "Advanced Assessment" },
    { key: "routine-check", label: "Routine Check" },
];

function AddStaff() {
    const photoInputRef = useRef(null);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        photoFile: null,
        photoPreviewUrl: "",
        firstName: "",
        lastName: "",
        role: "",
        staffId: "STF-0012",
        phone: "",
        email: "",
    });

    const [selectedServices, setSelectedServices] = useState([
        "consultation",
        "follow-up",
    ]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handlePhotoChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setFormData({
            ...formData,
            photoFile: file,
            photoPreviewUrl: previewUrl,
        });
    }

    function handleServiceToggle(serviceKey) {
        setSelectedServices(function (currentServices) {
            if (currentServices.includes(serviceKey)) {
                return currentServices.filter(function (key) {
                    return key !== serviceKey;
                });
            }

            return [...currentServices, serviceKey];
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.firstName.trim()) {
            return;
        }

        if (!formData.lastName.trim()) {
            return;
        }

        if (!formData.role) {
            return;
        }

        if (!formData.phone.trim() && !formData.email.trim()) {
            return;
        }

        // TODO: axios POST /api/company/staff
        // TODO: Send formData + selectedServices to backend

        navigate("/company/staff");
    }

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

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    showHelp
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            Add Staff
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Add Staff
                        </h1>

                        <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                            Add a staff member to your company and assign
                            their role and availability.
                        </p>
                    </div>

                    {/* Form Card — centered */}
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto w-full max-w-[760px] rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-6 md:p-10"
                    >
                        {/* Personal Information */}
                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Personal Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start">
                                {/* Photo Upload */}
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={function () {
                                            photoInputRef.current.click();
                                        }}
                                        className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray bg-beige/30 transition hover:border-navy sm:h-24 sm:w-24"
                                    >
                                        {formData.photoPreviewUrl ? (
                                            <img
                                                src={formData.photoPreviewUrl}
                                                alt="Staff preview"
                                                className="h-full w-full rounded-lg object-cover"
                                            />
                                        ) : (
                                            <User className="h-6 w-6 text-gray sm:h-7 sm:w-7" />
                                        )}
                                    </button>

                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-wide text-navy sm:text-xs">
                                        Upload Photo
                                    </span>
                                </div>

                                {/* Name Fields */}
                                <div className="grid flex-1 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    {/* First Name */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
                                            required
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            required
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Professional Information */}
                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Professional Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            {/* Role + Staff ID */}
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                {/* Role */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Role
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                            className="w-full appearance-none rounded-lg border border-gray px-3 py-2.5 pr-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        >
                                            <option value="">
                                                Select a role
                                            </option>

                                            <option value="Doctor">
                                                Doctor
                                            </option>

                                            <option value="Nurse">
                                                Nurse
                                            </option>

                                            <option value="Receptionist">
                                                Receptionist
                                            </option>

                                            <option value="Therapist">
                                                Therapist
                                            </option>

                                            <option value="Consultant">
                                                Consultant
                                            </option>

                                            <option value="Admin">
                                                Admin
                                            </option>
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                    </div>
                                </div>

                                {/* Staff ID */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Staff ID
                                    </label>

                                    <input
                                        type="text"
                                        name="staffId"
                                        value={formData.staffId}
                                        readOnly
                                        className="w-full cursor-not-allowed rounded-lg border border-gray bg-gray/10 px-3 py-2.5 text-sm text-slate outline-none sm:px-4"
                                    />
                                </div>
                            </div>

                            {/* Services */}
                            <div className="mt-4 sm:mt-5">
                                <label className="mb-2.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                    Services (Multi-Select)
                                </label>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-gray/20 bg-beige/30 p-3 sm:grid-cols-2 sm:p-4">
                                    {services.map(function (service) {
                                        const isSelected =
                                            selectedServices.includes(
                                                service.key
                                            );

                                        return (
                                            <label
                                                key={service.key}
                                                className="flex cursor-pointer items-center gap-2.5"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={function () {
                                                        handleServiceToggle(
                                                            service.key
                                                        );
                                                    }}
                                                    className="h-5 w-5 cursor-pointer accent-navy"
                                                />

                                                <span className="text-sm text-navy">
                                                    {service.label}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Contact Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                {/* Phone */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Phone Number
                                    </label>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(555) 000-0000"
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 pl-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="staff@example.com"
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 pl-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Account Information */}
                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Account Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="flex flex-col justify-between gap-3 rounded-lg border border-gray/20 bg-beige/30 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
                                {/* Account Email */}
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray/30 bg-white">
                                        <UserCircle className="h-5 w-5 text-navy" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate sm:text-xs">
                                            Account Email
                                        </p>

                                        <p className="mt-0.5 truncate text-sm font-bold text-navy">
                                            {formData.email ||
                                                "No email provided"}
                                        </p>
                                    </div>
                                </div>

                                {/* Send Invitation */}
                                <button
                                    type="button"
                                    onClick={function (event) {
                                        event.preventDefault();

                                        // TODO: axios POST /api/company/staff/invite
                                    }}
                                    className="w-full rounded-lg border-2 border-navy bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy transition hover:bg-navy hover:text-white sm:w-auto"
                                >
                                    Send Invitation
                                </button>
                            </div>
                        </section>

                        {/* Availability */}
                        <section className="mb-6 sm:mb-8">
                            <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="font-serif text-lg text-navy sm:text-xl">
                                    Availability
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => {
                                        // TODO: Navigate to detailed availability editor
                                        navigate(
                                            "/company/staff/availability"
                                        );
                                    }}
                                    className="self-start text-[10px] font-bold tracking-wide text-navy transition hover:text-gold sm:self-auto sm:text-xs"
                                >
                                    MANAGE DETAILED AVAILABILITY
                                </button>
                            </div>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                {/* Weekdays */}
                                <div className="rounded-xl border border-gray/20 bg-beige/30 p-4 sm:p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-serif text-sm text-navy sm:text-base">
                                            Monday - Friday
                                        </h3>

                                        <span className="rounded-full bg-gold/60 px-2 py-1 text-[10px] font-bold text-navy sm:px-2.5 sm:text-xs">
                                            WORKING
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate sm:text-sm">
                                        09:00 AM - 05:00 PM
                                    </p>
                                </div>

                                {/* Weekend */}
                                <div className="rounded-xl border border-gray/20 bg-gray/10 p-4 sm:p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-serif text-sm text-navy sm:text-base">
                                            Saturday - Sunday
                                        </h3>

                                        <span className="rounded-full bg-gray/30 px-2 py-1 text-[10px] font-bold text-slate sm:px-2.5 sm:text-xs">
                                            OFF
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate sm:text-sm">
                                        Not Available
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Form Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray/20 pt-5 sm:flex-row sm:justify-end sm:pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full rounded-lg border border-gray/30 px-6 py-3 text-sm font-bold text-navy transition hover:bg-beige sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto"
                            >
                                Create Staff
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default AddStaff;