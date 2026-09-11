import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import CompanyRegistration from "../pages/auth/CompanyRegister";
import VerifyOtp from "../pages/auth/VerifyOtp";
import AccountCreated from "../pages/auth/AccountCreated";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Company
import CompanyDashboard from "../pages/dashboard/CompanyDashboard";
import AppointmentManagement from "../pages/appointments/AppointmentManagement";
import AppointmentDetails from "../pages/appointments/AppointmentDetails";
import CalenderSchedule from "../pages/calendar/CalendarSchedule";
import StaffManagement from "../pages/staff/StaffManagement";
import AddStaff from "../pages/staff/AddStaff";
import StaffDetails from "../pages/staff/StaffDetails";
import ServicesManagement from "../pages/services/ServicesManagement";
import AddService from "../pages/services/AddService";



function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RoleSelectionPage />} />
                <Route path="/register/company" element={<CompanyRegistration/>} />
                <Route path="/register/verify-otp" element={<VerifyOtp />} />
                <Route path="/register/account-created" element={<AccountCreated />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/forget-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
                <Route path="/company/appointments" element={<AppointmentManagement />} />
                <Route path="/company/appointments/:appointmentId" element={<AppointmentDetails />} />
                <Route path="/company/calendar" element={<CalenderSchedule />} />
                <Route path="/company/staff" element={<StaffManagement />} />
                <Route path="/company/staff/add" element={<AddStaff />}/>
                <Route path="/company/staff/:staffId" element={<StaffDetails />} />
                <Route path="/company/services" element={<ServicesManagement />}/>
                <Route path="/company/services/add" element={<AddService />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
