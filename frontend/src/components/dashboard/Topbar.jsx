import React, { useState } from "react";
import {
    Bell,
    CircleHelp,
    Grid2X2,
    Search,
    UserCircle,
    ChevronDown,
} from "lucide-react";

function Topbar({
    onMenuClick,
    profileName = "Admin",
    avatarUrl = "",
    showBell = false,
    showHelp = false,
    showGrid = false,
    showSupportText = false,
    showProfileDropdown = false,
    simpleProfileIcon = false,
    profileInfo = null,
    searchPlaceholder = "Search...",
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const hasActions = showBell || showHelp || showGrid;

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray/20 bg-white px-6">
            {/* Search */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="w-full rounded-lg border border-gray/30 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none placeholder:text-slate/60 focus:border-gold focus:ring-1 focus:ring-gold"
                />
            </div>

            {/* Right Side */}
            <div className="ml-6 flex items-center gap-4">
                {/* Actions */}
                {showBell && (
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                    >
                        <Bell className="h-5 w-5" />
                    </button>
                )}

                {showHelp && (
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                    >
                        <CircleHelp className="h-5 w-5" />
                    </button>
                )}

                {showGrid && (
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                    >
                        <Grid2X2 className="h-5 w-5" />
                    </button>
                )}

                {hasActions && (
                    <div className="h-8 w-px bg-gray/30" />
                )}

                {/* Profile */}
                {profileInfo ? (
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-bold uppercase tracking-wide text-navy">
                                {profileInfo.name}
                            </p>

                            <p className="mt-px text-xs text-slate">
                                {profileInfo.role}
                            </p>
                        </div>

                        {profileInfo.avatarUrl ? (
                            <img
                                src={profileInfo.avatarUrl}
                                alt={profileInfo.name}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-beige">
                                <UserCircle className="h-6 w-6 text-slate" />
                            </div>
                        )}
                    </div>
                ) : simpleProfileIcon ? (
                    <button
                        type="button"
                        className="cursor-pointer text-slate transition hover:text-navy"
                    >
                        <UserCircle className="h-6 w-6" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={function () {
                            if (showProfileDropdown) {
                                setIsProfileOpen(!isProfileOpen);
                            }
                        }}
                        className="flex items-center gap-2 text-slate transition hover:text-navy"
                    >
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={profileName}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                            <UserCircle className="h-7 w-7" />
                        )}

                        <span className="text-sm font-bold">
                            Profile
                        </span>

                        {showProfileDropdown && (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </button>
                )}

                {showSupportText && (
                    <span className="text-xs text-slate">
                        Need Help?
                    </span>
                )}
            </div>
        </header>
    );
}

export default Topbar;