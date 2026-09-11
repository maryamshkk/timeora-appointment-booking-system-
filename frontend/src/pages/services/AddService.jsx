import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function AddService() {
    return (
        <div className="flex min-h-screen bg-beige">

            <Sidebar activeItem="Services" />

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    showBell
                    hasNotification
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/services"
                            className="text-slate hover:text-navy"
                        >
                            Services
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            Add Service
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy">
                            Add Service
                        </h1>

                        <p className="mt-1.5 text-sm text-slate">
                            Create a service that customers can book through your company.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6 lg:col-span-2">

                            {/* Basic Information */}
                            <div className="rounded-xl border border-gray/20 bg-white p-8 shadow-sm">

                                <h2 className="font-serif text-2xl text-navy">
                                    Basic Information
                                </h2>

                                <div className="mb-5 mt-4 border-b border-gray/20" />

                                {/* Service Name + Service ID */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                    {/* Service Name */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Service Name
                                        </label>

                                        <input
                                            type="text"
                                            name="serviceName"
                                            placeholder="e.g. Initial Consultation"
                                            className="
                                                w-full rounded-lg border border-gray
                                                px-4 py-2.5 font-serif text-sm text-navy
                                                outline-none
                                                focus:border-navy
                                                focus:ring-2 focus:ring-gold
                                            "
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
                                            value="SRV-001"
                                            readOnly
                                            className="
                                                w-full cursor-not-allowed rounded-lg
                                                border border-gray bg-gray/10
                                                px-4 py-2.5 font-serif text-sm text-slate
                                                outline-none
                                            "
                                        />

                                        {/* TODO: Fetch next sequential ID from backend */}
                                    </div>

                                </div>

                                {/* Description */}
                                <div className="mt-5">

                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        rows="4"
                                        placeholder="Briefly describe what this service includes..."
                                        className="
                                            w-full resize-none rounded-lg border border-gray
                                            px-4 py-2.5 font-serif text-sm text-navy
                                            outline-none
                                            focus:border-navy
                                            focus:ring-2 focus:ring-gold
                                        "
                                    />

                                </div>

                            </div>

                            {/* Pricing & Duration */}
                            <div className="rounded-xl border border-gray/20 bg-white p-8 shadow-sm">

                                <h2 className="font-serif text-2xl text-navy">
                                    Pricing & Duration
                                </h2>

                                <div className="mb-5 mt-4 border-b border-gray/20" />

                                {/* Price + Duration */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                    {/* Price */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Price (Rs.)
                                        </label>

                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate">
                                                Rs.
                                            </span>

                                            <input
                                                type="number"
                                                name="price"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="
                                                    w-full rounded-lg border border-gray
                                                    py-2.5 pl-10 pr-4 font-serif text-sm text-navy
                                                    outline-none
                                                    focus:border-navy
                                                    focus:ring-2 focus:ring-gold
                                                "
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
                                            className="
                                                w-full cursor-not-allowed rounded-lg
                                                border border-gray bg-gray/10
                                                px-4 py-2.5 font-serif text-sm text-slate
                                                outline-none
                                            "
                                        />

                                        <p className="mt-1.5 text-xs text-slate">
                                            TIMEORA appointments use fixed 1-hour slots.
                                        </p>
                                    </div>

                                </div>

                                {/* Payment Method */}
                                <div className="mt-5">

                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Payment Method
                                    </label>

                                    <div className="flex cursor-not-allowed items-center gap-2.5 rounded-lg border border-gray/20 bg-gray/10 px-4 py-3">
                                        <span className="text-slate">
                                            Rs.
                                        </span>

                                        <span className="text-sm font-bold text-navy">
                                            Cash on Reception
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Staff Assignment */}
                            <div className="rounded-xl border border-gray/20 bg-white p-8 shadow-sm">

                                <h2 className="font-serif text-2xl text-navy">
                                    Staff Assignment
                                </h2>

                                <div className="mb-3 mt-4 border-b border-gray/20" />

                                <p className="mb-4 text-sm text-slate">
                                    Select the staff members qualified to perform this service.
                                </p>

                                {/* Staff List */}
                                <div className="flex flex-col gap-2.5">

                                    {/* Dr. Sara Ahmed */}
                                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-gray/20 p-3.5 transition hover:border-navy/40">

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                <span className="text-sm font-bold text-navy">
                                                    SA
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-navy">
                                                    Dr. Sara Ahmed
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate">
                                                    Senior Specialist
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-navy bg-navy">
                                            {/* Check icon will be connected next */}
                                        </div>

                                    </div>

                                    {/* Ali Khan */}
                                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-gray/20 p-3.5 transition hover:border-navy/40">

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                <span className="text-sm font-bold text-navy">
                                                    AK
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-navy">
                                                    Ali Khan
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate">
                                                    Consultant
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-navy bg-navy">
                                            {/* Check icon will be connected next */}
                                        </div>

                                    </div>

                                    {/* Hina Malik */}
                                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-gray/20 p-3.5 transition hover:border-navy/40">

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/40">
                                                <span className="text-sm font-bold text-navy">
                                                    HM
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-navy">
                                                    Hina Malik
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate">
                                                    Therapist
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-navy bg-navy">
                                            {/* Check icon will be connected next */}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="sticky top-6 self-start">
                            {/* Summary will be added next */}
                        </div>

                    </div>


                </main>
            </div>
        </div>
    );
}

export default AddService;