import React from "react";
import { Menu, Search, Bell, CircleHelp, Grid3X3 } from "lucide-react";

function Topbar({
    onMenuClick,
    profileName = "Admin",
    avatarUrl = "",
    variant = "full",
}) {
    const isCompact = variant === "compact";

    return (
        <header className="sticky top-0 z-10 w-full bg-white border-b border-gray/20 px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">

                {/* Left Side */}
                <div className="flex items-center gap-3 flex-1">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate hover:bg-beige transition"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div
                        className={`relative w-full ${
                            isCompact ? "max-w-[500px]" : "max-w-[400px]"
                        }`}
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />

                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            className="w-full bg-gray/10 border border-gray/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-slate outline-none focus:ring-2 focus:ring-gold"
                        />
                    </div>
                </div>

                {/* Compact Variant */}
                {isCompact ? (
                    <div className="flex items-center gap-4 lg:gap-5">

                        <button
                            type="button"
                            className="text-slate hover:text-navy transition"
                            aria-label="Help"
                        >
                            <CircleHelp className="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            className="text-slate hover:text-navy transition"
                            aria-label="Apps"
                        >
                            <Grid3X3 className="w-5 h-5" />
                        </button>

                        <div className="border-l border-gray/30 h-6" />

                        <div className="flex items-center">
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
                ) : (
                    /* Full Variant */
                    <div className="flex items-center gap-4 lg:gap-5">

                        <button
                            type="button"
                            className="relative text-slate hover:text-navy transition"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5" />

                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gold rounded-full" />
                        </button>

                        <button
                            type="button"
                            className="text-slate hover:text-navy transition"
                            aria-label="Help"
                        >
                            <CircleHelp className="w-5 h-5" />
                        </button>

                        <div className="hidden sm:block border-l border-gray/30 h-6" />

                        <button
                            type="button"
                            className="hidden sm:block text-sm text-slate hover:text-navy transition"
                        >
                            Support
                        </button>

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
                )}
            </div>
        </header>
    );
}

export default Topbar;