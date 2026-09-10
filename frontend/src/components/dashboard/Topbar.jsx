import React, { useState } from "react";
import {
    Menu,
    Search,
    Bell,
    CircleHelp,
    Grid3X3,
    ChevronDown,
    UserCircle
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
    searchPlaceholder = "Search...",
}) {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const hasIcons = showBell || showHelp || showGrid;

    return (
        <header className="sticky top-0 z-10 w-full border-b border-gray/20 bg-white px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between gap-4">

                {/* Left */}
                <div className="flex flex-1 items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition hover:bg-beige lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="relative w-full max-w-[500px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                        <input
                            type="text"
                            name="search"
                            placeholder={searchPlaceholder}
                            className="w-full rounded-lg border border-gray/20 bg-gray/10 py-2.5 pl-10 pr-4 text-sm text-navy outline-none placeholder:text-slate focus:ring-2 focus:ring-gold"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 lg:gap-5">

                    {showBell && (
                        <button
                            type="button"
                            className="relative text-slate transition hover:text-navy"
                            aria-label="Notifications"
                        >
                            <Bell className="h-5 w-5" />

                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
                        </button>
                    )}

                    {showHelp && (
                        <button
                            type="button"
                            className="text-slate transition hover:text-navy"
                            aria-label="Help"
                        >
                            <CircleHelp className="h-5 w-5" />
                        </button>
                    )}

                    {showGrid && (
                        <button
                            type="button"
                            className="text-slate transition hover:text-navy"
                            aria-label="Apps"
                        >
                            <Grid3X3 className="h-5 w-5" />
                        </button>
                    )}

                    {hasIcons && (
                        <div className="h-6 border-l border-gray/30" />
                    )}

                    {showSupportText && (
                        <button
                            type="button"
                            className="hidden text-sm text-slate transition hover:text-navy sm:block"
                        >
                            Support
                        </button>
                    )}

                    {/* Profile */}
                    <div className="relative">
                        {simpleProfileIcon ? (
                            <button
                                type="button"
                                className="cursor-pointer text-slate transition hover:text-navy"
                                aria-label="Profile"
                            >
                                <UserCircle className="h-6 w-6" />
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        showProfileDropdown &&
                                        setProfileMenuOpen(!profileMenuOpen)
                                    }
                                    className="flex items-center gap-2.5"
                                >
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={profileName}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray/30">
                                            <span className="text-sm font-bold text-navy">
                                                {profileName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}

                                    <span className="hidden text-sm font-bold text-navy sm:block">
                                        Profile
                                    </span>

                                    {showProfileDropdown && (
                                        <ChevronDown className="h-3.5 w-3.5 text-slate" />
                                    )}
                                </button>

                                {showProfileDropdown && profileMenuOpen && (
                                    <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-gray/20 bg-white p-4 shadow-lg">
                                        <p className="text-sm text-slate">
                                            Profile menu coming soon.
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;