import React from "react";

function StatCard({
    value,
    label,
    icon: Icon,
    valueColor = "text-navy",
    accentColor = null,
}) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
            {accentColor && (
                <div
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${accentColor}`}
                />
            )}

            {Icon && (
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-beige">
                    <Icon className="h-4.5 w-4.5 text-navy" />
                </div>
            )}

            <p className={`font-serif text-2xl font-bold ${valueColor}`}>
                {value}
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate">
                {label}
            </p>
        </div>
    );
}

export default StatCard;