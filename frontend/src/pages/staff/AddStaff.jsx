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
    {
        key: "consultation",
        label: "Consultation",
    },
    {
        key: "follow-up",
        label: "Follow-up",
    },
    {
        key: "advanced-assessment",
        label: "Advanced Assessment",
    },
    {
        key: "routine-check",
        label: "Routine Check",
    },
];


function AddStaff() {
    const photoInputRef = useRef(null);
    const navigate = useNavigate();

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
            <Sidebar activeItem="Staff" />

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    showBell
                    hasNotification
                    showHelp
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 lg:px-8">
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
                    <div className="mb-6 md:mb-8">
                        <h1 className="font-serif text-3xl text-navy sm:text-4xl">
                            Add Staff
                        </h1>

                        <p className="mt-1.5 text-sm text-slate">
                            Add a staff member to your company and assign
                            their role and availability.
                        </p>
                    </div>

                    {/* Form Card — centered */}
                    <div onSubmit={handleSubmit}
                    className="mx-auto w-full max-w-[760px] rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-6 md:p-10"
                    >
                        {/* Personal Information */}
                        <section className="mb-8">
                            <h2 className="mb-1 font-serif text-xl text-navy">
                                Personal Information
                            </h2>

                            <div className="mb-5 border-b border-gray/20" />

                            <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                {/* Photo Upload */}
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={function () {
                                            photoInputRef.current.click();
                                        }}
                                        className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray bg-beige/30 transition hover:border-navy"
                                    >
                                        {formData.photoPreviewUrl ? (
                                            <img
                                                src={formData.photoPreviewUrl}
                                                alt="Staff preview"
                                                className="h-full w-full rounded-lg object-cover"
                                            />
                                        ) : (
                                            <User className="h-7 w-7 text-gray" />
                                        )}
                                    </button>

                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />

                                    <span className="text-xs font-bold uppercase tracking-wide text-navy">
                                        Upload Photo
                                    </span>
                                </div>

                                {/* Name Fields */}
                                <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
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
                                            className="w-full rounded-lg border border-gray px-4 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold"
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
                                            className="w-full rounded-lg border border-gray px-4 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Professional Information */}
                        <section className="mb-8">
                            <h2 className="mb-1 font-serif text-xl text-navy">
                                Professional Information
                            </h2>

                            <div className="mb-5 border-b border-gray/20" />

                            {/* Role + Staff ID */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
                                            className="w-full appearance-none rounded-lg border border-gray px-4 py-2.5 pr-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold"
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
                                        className="w-full cursor-not-allowed rounded-lg border border-gray bg-gray/10 px-4 py-2.5 text-sm text-slate outline-none"
                                    />
                                </div>

                            </div>

                            {/* Services */}
                            <div className="mt-5">
                                <label className="mb-2.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                    Services (Multi-Select)
                                </label>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-gray/20 bg-beige/30 p-4 sm:grid-cols-2">
                                    {services.map(function (service) {
                                        const isSelected = selectedServices.includes(
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
                                                        handleServiceToggle(service.key);
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
                        <section className="mb-8">
                            <h2 className="mb-1 font-serif text-xl text-navy">
                                Contact Information
                            </h2>

                            <div className="mb-5 border-b border-gray/20" />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
                                            className="w-full rounded-lg border border-gray px-4 py-2.5 pl-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold"
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
                                            className="w-full rounded-lg border border-gray px-4 py-2.5 pl-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold"
                                        />
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Account Information */}
                        <section className="mb-8">
                            <h2 className="mb-1 font-serif text-xl text-navy">
                                Account Information
                            </h2>

                            <div className="mb-5 border-b border-gray/20" />

                            <div className="flex flex-col justify-between gap-4 rounded-lg border border-gray/20 bg-beige/30 p-4 sm:flex-row sm:items-center">

                                {/* Account Email */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray/30 bg-white">
                                        <UserCircle className="h-5 w-5 text-navy" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Account Email
                                        </p>

                                        <p className="mt-0.5 text-sm font-bold text-navy">
                                            {formData.email || "No email provided"}
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
                                    className="rounded-lg border-2 border-navy bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy transition hover:bg-navy hover:text-white"
                                >
                                    Send Invitation
                                </button>

                            </div>
                        </section>

                        {/* Availability */}
                        <section className="mb-8">

                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-serif text-xl text-navy">
                                    Availability
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => {
                                        // TODO: Navigate to detailed availability editor
                                        navigate("/company/staff/availability");
                                    }}
                                    className="text-xs font-bold tracking-wide text-navy hover:text-gold transition"
                                >
                                    MANAGE DETAILED AVAILABILITY
                                </button>
                            </div>

                            <div className="border-b border-gray/20 mb-5"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Weekdays */}
                                <div className="border border-gray/20 rounded-xl bg-beige/30 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-serif text-base text-navy">
                                            Monday - Friday
                                        </h3>

                                        <span className="text-xs font-bold text-navy bg-gold/60 px-2.5 py-1 rounded-full">
                                            WORKING
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate">
                                        09:00 AM - 05:00 PM
                                    </p>
                                </div>

                                {/* Weekend */}
                                <div className="border border-gray/20 rounded-xl bg-gray/10 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-serif text-base text-navy">
                                            Saturday - Sunday
                                        </h3>

                                        <span className="text-xs font-bold text-slate bg-gray/30 px-2.5 py-1 rounded-full">
                                            OFF
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate">
                                        Not Available
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* Form Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray/20 pt-6 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="rounded-lg border border-gray/30 px-6 py-3 text-sm font-bold text-navy transition hover:bg-beige"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                            >
                                Create Staff
                            </button>

                        </div>


                        
                    </div>




                </main>
            </div>
        </div>
    );
}

export default AddStaff;