import React from "react";

function StaffOverview({ staff = [] }) {
    function getStatusStyle(status) {
        const normalizedStatus = status.toLowerCase();

        if (normalizedStatus === "available") {
            return "bg-green-50 text-green-700";
        }

        if (normalizedStatus === "busy") {
            return "bg-gold/20 text-amber-700";
        }

        if (normalizedStatus === "offline") {
            return "bg-gray/20 text-slate";
        }

        return "bg-gray/20 text-slate";
    }

    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg text-navy">
                    Staff Overview
                </h2>
            </div>

            {/* Staff List */}
            {staff.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {staff.map((member, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-3"
                        >
                            {/* Staff Info */}
                            <div className="flex items-center gap-3 min-w-0">
                                {member.avatar ? (
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-navy">
                                            {member.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-navy truncate">
                                        {member.name}
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        {member.appointments} appointments
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${getStatusStyle(
                                    member.status
                                )}`}
                            >
                                {member.status}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-sm text-slate">
                        No staff data available.
                    </p>
                </div>
            )}
        </div>
    );
}

export default StaffOverview;
