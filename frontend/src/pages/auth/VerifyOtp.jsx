import React from "react";
import { Mail } from "lucide-react";
import {Link} from "react-router-dom";

import RegistrationSteps from "../../components/common/RegistrationSteps";

function VerifyOtp( {email = "" }) {
    function maskEmail(email) {
    if (!email || !email.includes("@")) {
        return email;
    }

    const [username, domain] = email.split("@");

    if (username.length <= 2) {
        return `${username[0] || ""}••••@${domain}`;
    }

    return `${username[0]}•••••••${username[username.length - 1]}@${domain}`;
    }


    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">

            {/* Cards */}
            <div className="w-full max-w-[540px] bg-white rounded-2xl border border-gray/20 shadow-xl p-6 sm:p-8 md:p-12">
                
                {/* Step Progress */}
                <RegistrationSteps currentStep={2} />

                {/* Header */}
                <div className="mt-7">

                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        
                        <p className="text-xs font-bold uppercase tracking-wide text-gold">
                            Company Account Verification
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="font-serif font-bold text-3xl md:text-4xl text-navy mb-4">
                            Verify Your Email
                    </h1>
                    {/* Description */}
                    <p className="text-sm text-slate mb-2">
                            We sent a 6-digit verification code to your email address:
                    </p>

                    {/* Email */}
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-4 h-4 text-gold flex-shrink-0"/>

                        <span className="text-sm font-bold text-navy">
                            {maskEmail(email)}
                        </span>
                    </div>

                    {/* Instruction */}
                    <p className="text-sm text-slate leading-relaxed">
                        Enter the code below to verify your email and continue 
                        creating your TIMEORA company account.
                    </p>
                </div>

                {/* OTP section will be added */}

                {/* Footer */}
                <div className="border-t border-gray/20 mt-8 pt-6 text-center">
                    <p className="text-sm text-slate">
                        Wrong email address?{" "}
                        <Link to="/register/company" 
                            className="font-bold text-navy hover:underline">
                                Back to registration
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default VerifyOtp;