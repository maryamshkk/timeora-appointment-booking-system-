import React from "react";
import {
    CalendarCheck,
    RotateCw,
} from "lucide-react";

function RecentActivity({ activities = [] }) {
    function getActivityIcon(type) {
        if (type === "booking") {
            return CalendarCheck;
        }

        if (type === "update") {
            return RotateCw;
        }

        return CalendarCheck;
    }

    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg text-navy">
                    Recent Activity
                </h2>
            </div>

            {/* Activities */}
            {activities.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {activities.map((activity, index) => {
                        const Icon = getActivityIcon(activity.type);

                        return (
                            <div
                                key={index}
                                className="flex items-start gap-3"
                            >
                                {/* Icon */}
                                <div className="w-9 h-9 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-4 h-4 text-navy" />
                                </div>

                                {/* Activity Info */}
                                <div className="min-w-0">
                                    <p className="text-sm text-navy leading-5">
                                        {activity.text}
                                    </p>

                                    <p className="text-xs text-slate mt-1">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-sm text-slate">
                        No recent activity.
                    </p>
                </div>
            )}
        </div>
    );
}

export default RecentActivity;
