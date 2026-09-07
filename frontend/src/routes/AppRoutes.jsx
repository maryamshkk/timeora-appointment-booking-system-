import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn } from "lucide-react";
import RoleSelectionPage from "../pages/auth/RoleSelectionPage";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RoleSelectionPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
