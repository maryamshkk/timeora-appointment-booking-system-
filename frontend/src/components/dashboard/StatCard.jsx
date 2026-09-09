
import React from "react";
import { TrendingUp } from "lucide-react";

function StatCard({
    label,
    value,
    icon: Icon,
    trend,
}) {
    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">
            {/* Header */}
            <div className="flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                    {label}
                </p>

                <div className="w-9 h-9 bg-gray/10 rounded-full flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px] text-slate" />
                </div>
            </div>

            {/* Value */}
            <p className="font-serif text-3xl text-navy mt-2">
                {value}
            </p>

            {/* Trend */}
            {trend && (
                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mt-2">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </div>
            )}
        </div>
    );
}

export default StatCard;
