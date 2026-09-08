import React from "react";
import { Check, CheckCircle, Mail, Building2, ArrowRight } from "lucide-react";
import RegistrationSteps from "../../components/common/RegistrationSteps";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

function AccountCreated() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get email and other data from location state
    const email = location.state?.email || "";
    const companyName = location.state?.companyName || "";
    const companyId = location.state?.companyId || "";

    function maskEmail(emailAddress) {
        if (!emailAddress || !emailAddress.includes("@")) {
            return emailAddress || "Email address";
        }
        
        const [username, domain] = emailAddress.split("@");
        
        if (username.length <= 2) {
            return `${username[0] || ""}••••@${domain}`;
        }
        
        // Show first 2 characters and last character for better UX
        const visibleStart = username.slice(0, 2);
        const visibleEnd = username.slice(-1);
        const maskedMiddle = "•".repeat(Math.max(username.length - 3, 1));
        
        return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
    }

    // Handle continue button click
    const handleContinue = () => {
        navigate("/login", {
            state: {
                email: email,
                message: "Account created successfully. Please login to continue."
            }
        });
    };

    return (
        <div className="min-h-screen bg-beige flex flex-col items-center justify-center px-4 py-10">
            <div className="w-full max-w-[620px] bg-white rounded-2xl border border-gray/20 shadow-xl p-6 sm:p-8 md:p-12">
                {/* Step Progress - All Completed */}
                <RegistrationSteps currentStep={3} />

                {/* Success Icon */}
                <div className="flex justify-center mb-8 mt-10">
                    <div className="w-20 h-20 bg-beige border border-gray/40 rounded-md rotate-45 flex items-center justify-center">
                        <Check className="w-7 h-7 text-navy -rotate-45" />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center">
                    <h1 className="font-serif font-bold text-3xl md:text-4xl text-navy">
                        Company Account Created
                    </h1>

                    <p className="font-serif text-sm md:text-base text-slate leading-relaxed mt-4 max-w-[480px] mx-auto">
                        Your email has been verified and your TIMEORA company
                        account is ready.
                    </p>
                </div>

                {/* Account Details Card */}
                <div className="bg-beige rounded-xl border border-gray/20 p-6 mt-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-navy">
                        Company Account Details
                    </p>

                    <div className="border-t border-gray/30 my-5" />

                    {/* Company Name (if available) */}
                    {companyName && (
                        <div className="flex items-center gap-3 mb-4">
                            <Building2 className="w-5 h-5 text-navy flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate">Company Name</p>
                                <p className="text-sm font-medium text-navy truncate">
                                    {companyName}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Account Created Status */}
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-slate">Account Status</p>
                            <p className="text-sm font-medium text-navy">
                                Account created successfully
                            </p>
                        </div>
                    </div>

                    {/* Email Verified Status */}
                    <div className="flex items-center gap-3 mt-4">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-slate">Email Status</p>
                            <p className="text-sm font-medium text-navy">
                                Email verified
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray/30 my-5" />

                    {/* Verified Email Address */}
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate mb-1">
                                Verified Email Address
                            </p>
                            <p className="text-sm font-mono text-navy break-all">
                                {maskEmail(email)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                    <Button 
                        type="button" 
                        onClick={handleContinue}
                        className="w-full"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Go to Company Portal
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </Button>
                    
                    <p className="text-sm text-slate text-center leading-relaxed mt-4">
                        Your account is ready. You can complete your company 
                        profile and business setup from the Company Portal.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountCreated;