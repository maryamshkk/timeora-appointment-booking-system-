import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function CustomerManagement() {
    const navigate = useNavigate();

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

                    {/* Customer content will be added next */}

                </main>
            </div>
        </div>
    );
}

export default CustomerManagement;