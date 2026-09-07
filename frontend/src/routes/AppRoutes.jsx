import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn } from "lucide-react";
import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import CompanyRegistration from "../pages/auth/CompanyRegister";
import VerifyOtp from "../pages/auth/VerifyOtp";


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RoleSelectionPage />} />
                <Route path="/register/company" element={<CompanyRegistration/>} />
                <Route path="/register/verify-otp" element={<VerifyOtp />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
