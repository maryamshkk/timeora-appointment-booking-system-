import React from "react";
import {
    Menu,
    Search,
    Bell,
    CircleHelp,
} from "lucide-react";

function Topbar({
    onMenuClick,
    profileName = "Admin",
    avatarUrl = "",
}) {
    return (
        <header className="sticky top-0 z-10 w-full bg-white border-b border-gray/20 px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
                {/* Left */}
                <div className="flex items-center gap-3 flex-1">
                    {/* Mobile Menu */}
                    <Button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    {/* Search */}
                    <div className="relative w-full max-w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />

                        <Input
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 lg:gap-5">
                    {/* Notifications */}
                    <Button
                        type="button"
                        className="relative text-slate hover:text-navy transition"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5" />

                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gold rounded-full" />
                    </Button>

                    {/* Help */}
                    <Button
                        type="button"
                        className="text-slate hover:text-navy transition"
                        aria-label="Help"
                    >
                        <CircleHelp className="w-5 h-5" />
                    </Button>

                    {/* Divider */}
                    <div className="hidden sm:block border-l border-gray/30 h-6" />

                    {/* Support */}
                    <Button
                        type="button"
                        className="hidden sm:block text-sm text-slate hover:text-navy transition"
                    >
                        Support
                    </Button>

                    {/* Profile */}
                    <div className="flex items-center gap-2.5">
                        <span className="hidden sm:block text-sm font-bold text-navy">
                            {profileName}
                        </span>

                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={profileName}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gray/30 flex items-center justify-center">
                                <span className="text-sm font-bold text-navy">
                                    {profileName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
