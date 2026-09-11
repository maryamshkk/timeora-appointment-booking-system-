import React from "react";

function StatCard({
    value,
    label,
    icon: Icon,
    valueColor = "text-navy",
}) {
    return (
        <div className="flex h-full w-full flex-col justify-center rounded-xl border border-gray/20 bg-white p-5 shadow-sm">

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