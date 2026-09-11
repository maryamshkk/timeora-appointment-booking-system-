import React, { useState } from "react";
import { CalendarClock, ChevronRight, Pencil } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";


const mockStaffData = {
    id: 1,
    name: "Dr. Sara Ahmed",
    role: "DOCTOR",
    professionalRole: "Senior Doctor",
    staffId: "STF-0012",
    phone: "0300 1234567",
    email: "sara@shifaclinic.com",
    status: "Active",
    availableToday: true,
    avatarUrl: "",
};

function StaffDetails() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [staffData, setStaffData] = useState(mockStaffData);

    // TODO: axios GET /api/company/staff/:staffId on mount
    // TODO: Replace mockStaffData with API response

    return (
        <div className="flex min-h-screen bg-beige">
            <Sidebar activeItem="Staff" />

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    showBell
                    hasNotification
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search appointments, staff..."
                />

                <main className="flex-1 bg-beige px-8 py-6">
                        {/* Breadcrumb */}
                    <div className="mb-3 flex items-center gap-2 text-sm">

                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            {staffData.name}
                        </span>

                    </div>

                    
                    {/* Profile Header */}
                    <div className="mb-7 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Profile Information */}
                        <div className="flex items-start gap-5">

                            {/* Avatar */}
                            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray/20">

                                {staffData.avatarUrl ? (
                                    <img
                                        src={staffData.avatarUrl}
                                        alt={staffData.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-serif text-2xl font-bold text-navy">
                                        {staffData.name
                                            .split(" ")
                                            .map((name) => name[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </span>
                                )}

                            </div>

                            {/* Info */}
                            <div>

                                <h1 className="font-serif text-3xl text-navy">
                                    {staffData.name}
                                </h1>

                                <div className="mt-1.5 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate">

                                    <span>{staffData.role}</span>

                                    <span className="text-gray">
                                        •
                                    </span>

                                    <span>{staffData.staffId}</span>

                                </div>

                                <div className="mt-2.5 flex flex-wrap gap-2">

                                    {/* Active Badge */}
                                    <span className="flex items-center gap-1.5 rounded-full border border-gray/30 bg-white px-3 py-1.5 text-xs font-bold uppercase text-navy">

                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>

                                        ACTIVE

                                    </span>

                                    {/* Available Badge */}
                                    {staffData.availableToday && (
                                        <span className="rounded-full bg-gold/20 px-3 py-1.5 text-xs font-bold uppercase text-amber-700">
                                            AVAILABLE TODAY
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Header Actions */}
                        <div className="flex flex-wrap items-center gap-3">

                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: Navigate to detailed availability page
                                    navigate(
                                        `/company/staff/${staffId}/availability`
                                    );
                                }}
                                className="flex items-center gap-2 rounded-lg border border-gray bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:border-navy"
                            >
                                <CalendarClock className="h-4 w-4" />
                                Manage Availability
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: Navigate to edit staff page
                                    navigate(
                                        `/company/staff/${staffId}/edit`
                                    );
                                }}
                                className="flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Staff
                            </button>

                        </div>

                    </div>
                </main>

                
            </div>
        </div>
    );
}
export default StaffDetails;