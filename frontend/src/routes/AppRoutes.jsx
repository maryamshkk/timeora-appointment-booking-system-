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
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
