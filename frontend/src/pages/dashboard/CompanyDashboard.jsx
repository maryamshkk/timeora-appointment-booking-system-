import React, {useState} from "react";
import { CalendarDays, Clock, CheckCircle2, XCircle, Plus, UserPlus, FilePlus2 } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Statcard from "../../components/dashboard/StatCard";
import AppointmentsTable from "../../components/dashboard/AppointmentTable";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import ScheduleTimeline from "../../components/dashboard/ScheduleTimeline";
import StaffOverview from "../../components/dashboard/StaffOverview";
import RecentActivity from "../../components/dashboard/RecentActivity";

function CompanyDashboard(
    companyName = "Shifa Clinic", 
    profileName = "Admin",
){
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    // TODO: axios GET /api/company/dashboard 
    // // Temporary dashboard data 
    const appointments = [ { 
        time: "09:00 AM", 
        customer: "Ayesha Khan", 
        service: "Consultation", 
        staff: "Dr. Sara", 
        status: "Confirmed", 
    }, 
    { 
        time: "10:00 AM", 
        customer: "Hina Malik", 
        service: "Follow-up", 
        staff: "Dr. Sara", 
        status: "Completed", 
    }, 
    { 
        time: "11:30 AM", 
        customer: "Zain Ahmed", 
        service: "Therapy", 
        staff: "Ali", 
        status: "Pending", 
    }, 
];

        const performanceData = [ 
            { day: "Mon", appointments: 8 }, 
            { day: "Tue", appointments: 14 }, 
            { day: "Wed", appointments: 11 }, 
            { day: "Thu", appointments: 9 }, 
            { day: "Fri", appointments: 18 }, 
            { day: "Sat", appointments: 15 }, 
            { day: "Sun", appointments: 6 }, 
        ];

        const staffData = [ 
            { name: "Dr. Sara", 
                appointments: 6, 
                status: "Available", 
            }, 
            { 
                name: "Ali", 
                appointments: 4, 
                status: "Busy", 
            },
        ];

        const recentActivityData = [ 
            {
                type: "booking", 
                text: "New appointment booked for 2:00 PM", 
                time: "10 mins ago", 
            }, 
            { 
                type: "update", 
                text: "Staff schedule updated by Admin", 
                time: "1 hour ago", 
            }, 
        ];

        function getGreeting() {
            const hour = new Date().getHours(); 
            if (hour < 12) { 
                return "Good morning"; } 
            if (hour < 18) { 
                return "Good afternoon"; 
            } 
            return "Good evening"; 
        }

        function getCurrentDate() 
        { 
            return new Date().toLocaleDateString("en-US", 
                { 
                    weekday: "long", 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric", 
                }); 
        }

        return (
            <div className="min-h-screen bg-beige flex">


            </div>
        )


}
export default CompanyDashboard;