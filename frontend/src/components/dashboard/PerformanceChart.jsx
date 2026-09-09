import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";

function PerformanceChart({ data = [] }) {
    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg text-navy">
                    Appointment Performance
                </h2>

                <button
                    type="button"
                    className="flex items-center gap-2 bg-white border border-gray/30 rounded-lg px-3 py-1.5 text-xs font-bold text-navy"
                >
                    Last 7 Days
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Chart */}
            <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="#E4E2DD"
                        />

                        <XAxis
                            dataKey="day"
                            axisLine={{
                                stroke: "#C3C6CF",
                            }}
                            tickLine={false}
                            tick={{
                                fill: "#43474E",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            hide
                        />

                        <Line
                            type="linear"
                            dataKey="appointments"
                            stroke="#000C1E"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="flex items-center justify-center h-[280px]">
                    <p className="text-sm text-slate">
                        No appointment performance data available.
                    </p>
                </div>
            )}
        </div>
    );
}

export default PerformanceChart;
