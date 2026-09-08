
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Clock,
    Lock,
    RotateCw,
    Eye,
    EyeOff,
    CheckCircle2,
} from "lucide-react";

import RegistrationIntro from "../../components/common/RegistrationIntro";
import Button from "../../components/common/Button";

function ResetPassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
            Reset Password
        </div>
    );
}

export default ResetPassword;
