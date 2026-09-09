import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
    Building2,
    LayoutGrid,
    CalendarCheck,
    Calendar,
    Users,
    Scissors,
    ContactRound,
    BarChart3,
    Bell,
    Settings,
    CircleHelp,
    LogOut,
    Plus,
} from "lucide-react";

function Sidebar({ companyName = "Shifa Clinic" }) {
    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutGrid,
            path: "/company/dashboard",
        },
        {
            label: "Appointments",
            icon: CalendarCheck,
            path: "/company/appointments",
        },
        {
            label: "Calendar",
            icon: Calendar,
            path: "/company/calendar",
        },
        {
            label: "Staff",
            icon: Users,
            path: "/company/staff",
        },
        {
            label: "Services",
            icon: Scissors,
            path: "/company/services",
        },
        {
            label: "Customers",
            icon: ContactRound,
            path: "/company/customers",
        },
        {
            label: "Reports",
            icon: BarChart3,
            path: "/company/reports",
        },
        {
            label: "Notifications",
            icon: Bell,
            path: "/company/notifications",
        },
        {
            label: "Settings",
            icon: Settings,
            path: "/company/settings",
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-navy text-white flex flex-col px-6 py-6 flex-shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                </div>

                <div className="min-w-0">
                    <p className="font-serif text-lg text-gold italic leading-tight">
                        Timeora
                    </p>

                    <p className="text-xs text-white/60 truncate mt-0.5">
                        {companyName}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                                    isActive
                                        ? "bg-gold/90 text-navy font-bold"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="border-t border-white/10 my-4" />

            {/* Book New */}
            <Link
                to="/company/appointments/new"
                className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-bold uppercase tracking-wide text-sm py-3 rounded-lg hover:bg-white transition mb-4"
            >
                <Plus className="w-4 h-4" />
                Book New
            </Link>

            {/* Bottom Links */}
            <div className="mt-auto flex flex-col gap-1">
                <Link
                    to="/company/help"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition"
                >
                    <CircleHelp className="w-[18px] h-[18px]" />
                    <span>Help Center</span>
                </Link>

                <Button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    <span>Logout</span>
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;
