import React from "react";

function ScheduleTimeline({ schedule = [] }) {
    function getStatusStyle(status) {
        const normalizedStatus = status.toLowerCase();

        if (normalizedStatus === "confirmed") {
            return {
                dot: "bg-navy",
            };
        }

        if (normalizedStatus === "completed") {
            return {
                dot: "bg-slate",
            };
        }

        if (normalizedStatus === "pending") {
            return {
                dot: "bg-gold",
            };
        }

        return {
            dot: "bg-gray",
        };
    }

    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
            {/* Header */}
            <div className="mb-5">
                <h2 className="font-serif text-lg text-navy">
                    Today's Schedule
                </h2>
            </div>

            {/* Timeline */}
            {schedule.length > 0 ? (
                <div className="relative pl-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gray/30" />

                    <div className="flex flex-col gap-6">
                        {schedule.map((item, index) => {
                            const statusStyle = getStatusStyle(item.status);

                            return (
                                <div
                                    key={index}
                                    className="relative"
                                >
                                    {/* Timeline Dot */}
                                    <span
                                        className={`absolute -left-[24px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ring-1 ring-gray/20 ${statusStyle.dot}`}
                                    />

                                    {/* Time */}
                                    <p className="text-xs font-bold text-slate mb-1">
                                        {item.time}
                                    </p>

                                    {/* Title */}
                                    <p className="text-sm font-bold text-navy">
                                        {item.title}
                                    </p>

                                    {/* Subtitle */}
                                    <p className="text-xs text-slate mt-0.5">
                                        {item.subtitle}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-sm text-slate">
                        No schedule available for today.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ScheduleTimeline;
