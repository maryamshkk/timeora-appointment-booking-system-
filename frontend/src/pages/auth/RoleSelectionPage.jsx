import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { Building2, User } from "lucide-react";

function RoleSelectionPage() {
    let navigate = useNavigate();

    function HandleCompanyRegister() {
        navigate("/register/company");
    }

    function HandleCustomerRegister() {
        navigate("/register/customer");
    }

    return (
        
    )
}
export default RoleSelectionPage;