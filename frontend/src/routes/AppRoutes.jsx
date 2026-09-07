import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn } from "lucide-react";
import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import CompanyRegistration from "../pages/auth/CompanyRegister";


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RoleSelectionPage />} />
                <Route path="/register/company" element={<CompanyRegistration/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
