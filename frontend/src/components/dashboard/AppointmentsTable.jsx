
import React from "react";
import { Link } from "react-router-dom";

function AppointmentsTable({ appointments = [] }) {
    function getStatusStyle(status) {
        const normalizedStatus = status.toLowerCase();

        if (normalizedStatus === "confirmed") {
            return {
                wrapper: "bg-navy/10 text-navy",
                dot: "bg-navy",
            };
        }

        if (normalizedStatus === "completed") {
            return {
                wrapper: "bg-gray/20 text-slate",
                dot: "bg-slate",
            };
        }

        if (normalizedStatus === "pending") {
            return {
                wrapper: "bg-gold/20 text-amber-700",
                dot: "bg-gold",
            };
        }

        return {
            wrapper: "bg-gray/20 text-slate",
            dot: "bg-slate",
        };
    }

    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg text-navy">
                    Today's Appointments
                </h2>

                <Link
                    to="/company/appointments"
                    className="text-sm font-bold text-navy hover:underline"
                >
                    View All
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray/20">
                            <th className="text-left text-xs font-bold uppercase tracking-wide text-slate pb-3 pr-4">
                                Time
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wide text-slate pb-3 px-4">
                                Customer
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wide text-slate pb-3 px-4">
                                Service
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wide text-slate pb-3 px-4">
                                Staff
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wide text-slate pb-3 pl-4">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map((appointment, index) => {
                            const statusStyle = getStatusStyle(
                                appointment.status
                            );

                            return (
                                <tr
                                    key={index}
                                    className="border-b border-gray/10 last:border-b-0 hover:bg-beige/40 transition"
                                >
                                    <td className="font-bold text-navy py-3.5 pr-4 whitespace-nowrap">
                                        {appointment.time}
                                    </td>

                                    <td className="text-navy py-3.5 px-4 whitespace-nowrap">
                                        {appointment.customer}
                                    </td>

                                    <td className="text-slate py-3.5 px-4 whitespace-nowrap">
                                        {appointment.service}
                                    </td>

                                    <td className="text-slate py-3.5 px-4 whitespace-nowrap">
                                        {appointment.staff}
                                    </td>

                                    <td className="py-3.5 pl-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle.wrapper}`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                                            />
                                            {appointment.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {appointments.length === 0 && (
                <div className="py-8 text-center">
                    <p className="text-sm text-slate">
                        No appointments scheduled for today.
                    </p>
                </div>
            )}
        </div>
    );
}

export default AppointmentsTable;
