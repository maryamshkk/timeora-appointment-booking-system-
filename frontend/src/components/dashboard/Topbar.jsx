import React, { useState } from "react";
import {
    Menu,
    Bell,
    CircleHelp,
    Grid2X2,
    Search,
    UserCircle,
    ChevronDown,
    Settings,
} from "lucide-react";

function Topbar({
    onMenuClick,
    profileName = "Admin",
    avatarUrl = "",
    showBell = false,
    hasNotification = false,
    showHelp = false,
    showGrid = false,
    showSettings = false,
    showSupportText = false,
    showProfileDropdown = false,
    simpleProfileIcon = false,
    profileInfo = null,
    searchPlaceholder = "Search...",
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const hasActions = showBell || showHelp || showGrid || showSettings;

    return (
        <header className="flex h-16 items-center justify-between gap-3 border-b border-gray/20 bg-white px-3 sm:px-4 md:px-6">
            {/* Left — hamburger + search */}
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                {/* Hamburger — mobile/tablet only */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5" />
                </button>

                {/* Search */}
                <div className="relative min-w-0 max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full rounded-lg border border-gray/30 bg-white py-2 pl-9 pr-3 text-sm text-navy outline-none placeholder:text-slate/60 focus:border-gold focus:ring-1 focus:ring-gold sm:py-2.5 sm:pr-4"
                    />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
                {/* Bell */}
                {showBell && (
                    <button
                        type="button"
                        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5" />

                        {hasNotification && (
                            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                    </button>
                )}

                {/* Help */}
                {showHelp && (
                    <button
                        type="button"
                        className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy sm:flex"
                        aria-label="Help"
                    >
                        <CircleHelp className="h-5 w-5" />
                    </button>
                )}

                {/* Grid */}
                {showGrid && (
                    <button
                        type="button"
                        className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy sm:flex"
                        aria-label="Apps"
                    >
                        <Grid2X2 className="h-5 w-5" />
                    </button>
                )}

                {/* Settings */}
                {showSettings && (
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                        aria-label="Settings"
                    >
                        <Settings className="h-5 w-5" />
                    </button>
                )}

                {hasActions && (
                    <div className="hidden h-8 w-px bg-gray/30 sm:block" />
                )}

                {/* Profile */}
                {profileInfo ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
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
                        className="flex h-9 w-9 cursor-pointer items-center justify-center text-slate transition hover:text-navy"
                        aria-label="Profile"
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
                        aria-label="Profile"
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

                        <span className="hidden text-sm font-bold sm:block">
                            Profile
                        </span>

                        {showProfileDropdown && (
                            <ChevronDown className="hidden h-4 w-4 sm:block" />
                        )}
                    </button>
                )}

                {showSupportText && (
                    <span className="hidden text-xs text-slate md:block">
                        Need Help?
                    </span>
                )}
            </div>
        </header>
    );
}

export default Topbar;