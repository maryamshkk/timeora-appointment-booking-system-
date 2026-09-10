import React, { useRef, useState } from "react";
import { ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";


function AddStaff() {
    const photoInputRef = useRef(null);

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
                    <div className="mx-auto w-full max-w-[760px] rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-6 md:p-10">
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
                    </div>

                    
                </main>
            </div>
        </div>
    );
}

export default AddStaff;