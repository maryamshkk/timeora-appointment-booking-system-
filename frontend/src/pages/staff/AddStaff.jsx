import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function AddStaff() {
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

                <main className="flex-1 bg-beige px-8 py-6">

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
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy">
                            Add Staff
                        </h1>

                        <p className="mt-1.5 text-sm text-slate">
                            Add a staff member to your company and assign
                            their role and availability.
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default AddStaff;