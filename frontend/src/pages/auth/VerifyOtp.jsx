import { useEffect, useRef, useState, useCallback } from "react";
import { Clock, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import RegistrationSteps from "../../components/common/RegistrationSteps";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function VerifyOtp({ email = "" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { verifyCompanyOtp, resendCompanyOtp, loading, error, clearError } = useAuth();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isExpired, setIsExpired] = useState(false);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);

    const adminEmail = email || location.state?.adminEmail || "";
    const companyId = location.state?.companyId || null;
    const registrationMessage = location.state?.message || "";

    // Redirect if no email or companyId (user landed here directly)
    useEffect(() => {
        if (!adminEmail || !companyId) {
            navigate("/register/company", { 
                replace: true,
                state: { 
                    error: "Please complete registration first." 
                }
            });
        }
    }, [adminEmail, companyId, navigate]);

    // Clear auth context error when component mounts
    useEffect(() => {
        if (clearError) {
            clearError();
        }
        setFormError("");
        setSuccessMessage("");
        
        // Focus first input on mount
        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);
    }, [clearError]);

    function maskEmail(emailAddress) {
        if (!emailAddress || !emailAddress.includes("@")) {
            return emailAddress;
        }

        const [username, domain] = emailAddress.split("@");

        if (username.length <= 2) {
            return `${username[0] || ""}••••@${domain}`;
        }

        const visibleStart = username.slice(0, 2);
        const visibleEnd = username.slice(-1);
        const maskedMiddle = "•".repeat(Math.max(username.length - 3, 1));
        
        return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
    }

    function handleChange(index, value) {
        // Only allow digits
        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setFormError("");
        
        // Clear error from context when user starts typing again
        if (clearError) {
            clearError();
        }

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index, event) {
        if (event.key === "Backspace") {
            if (!otp[index] && index > 0) {
                // Move to previous input and clear it
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            }
        } else if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (event.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handlePaste(event) {
        event.preventDefault();
        const pastedData = event.clipboardData.getData("text").trim();
        
        // Extract digits from pasted content
        const digits = pastedData.replace(/\D/g, "").slice(0, 6);
        
        if (digits.length > 0) {
            const newOtp = Array(6).fill("");
            digits.split("").forEach((digit, index) => {
                if (index < 6) {
                    newOtp[index] = digit;
                }
            });
            
            setOtp(newOtp);
            setFormError("");
            
            // Focus last filled input or next empty
            const focusIndex = digits.length < 6 ? digits.length : 5;
            inputRefs.current[focusIndex]?.focus();
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    // Timer effect - fixed dependency
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isExpired]);

    async function handleSubmit(event) {
        event.preventDefault();
        
        setFormError("");
        setSuccessMessage("");
        
        if (clearError) {
            clearError();
        }

        const otpCode = otp.join("");

        // Validation
        if (otpCode.length !== 6) {
            setFormError("Please enter the complete 6-digit verification code.");
            inputRefs.current[otp.findIndex(digit => !digit)]?.focus();
            return;
        }

        if (isExpired || timeLeft <= 0) {
            setFormError("Your verification code has expired. Please request a new code.");
            return;
        }

        try {
            const response = await verifyCompanyOtp({
                email: adminEmail,
                otp: otpCode,
                company_id: companyId, // Add companyId if backend expects it
            });

            setSuccessMessage(response?.message || "Email verified successfully.");

            // Store token if returned
            if (response?.data?.token) {
                localStorage.setItem("authToken", response.data.token);
            }

            // Delay navigation for better UX
            setTimeout(() => {
                navigate("/register/account-created", {
                    state: {
                        email: adminEmail,
                        message: "Email verified successfully. You can now log in.",
                    },
                });
            }, 1500);

        } catch (err) {
            const errorMessage = err?.response?.data?.message || 
                               err?.message || 
                               error?.message ||
                               "Invalid verification code. Please try again.";
            
            setFormError(errorMessage);
            
            // Clear OTP on error for security
            setOtp(Array(6).fill(""));
            inputRefs.current[0]?.focus();
        }
    }

    async function handleResendOtp() {
        setFormError("");
        setSuccessMessage("");
        
        if (clearError) {
            clearError();
        }

        setIsResending(true);

        try {
            const response = await resendCompanyOtp({
                email: adminEmail,
                company_id: companyId, // Add companyId if backend expects it
            });

            setOtp(Array(6).fill(""));
            setTimeLeft(300);
            setIsExpired(false);
            setSuccessMessage(response?.message || "A new verification code has been sent to your email.");
            
            // Focus first input
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);

        } catch (err) {
            const errorMessage = err?.response?.data?.message || 
                               err?.message || 
                               error?.message ||
                               "Unable to resend OTP. Please try again.";
            setFormError(errorMessage);
        } finally {
            setIsResending(false);
        }
    }

    // If no email/companyId, don't render the form
    if (!adminEmail || !companyId) {
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <div className="w-full max-w-[540px] rounded-2xl border border-gray/20 bg-white p-6 shadow-xl sm:p-8 md:p-12">
                {/* Step Progress */}
                <RegistrationSteps currentStep={2} />

                {/* Header */}
                <div className="mt-7">
                    {/* Eyebrow */}
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <p className="text-xs font-bold uppercase tracking-wide text-brown">
                            Company Account Verification
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="mb-4 font-serif text-3xl font-bold text-navy md:text-4xl">
                        Verify Your Email
                    </h1>

                    {/* Description */}
                    <p className="mb-2 text-sm text-slate">
                        We sent a 6-digit verification code to:
                    </p>

                    {/* Email */}
                    <div className="mb-4 flex items-center gap-2 rounded-lg bg-beige/50 px-3 py-2">
                        <Mail className="h-4 w-4 shrink-0 text-brown" />
                        <span className="text-sm font-bold text-navy">
                            {maskEmail(adminEmail)}
                        </span>
                    </div>

                    {/* Instruction */}
                    <p className="text-sm leading-relaxed text-slate">
                        Enter the code below to verify your email and complete your company registration.
                    </p>
                </div>

                {/* Verification Form */}
                <form onSubmit={handleSubmit}>
                    {/* Verification Code Input */}
                    <div className="mt-7">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-navy">
                            Verification Code
                        </p>

                        <div 
                            className="flex items-center justify-between gap-2 sm:gap-3"
                            onPaste={handlePaste}
                        >
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(element) => {
                                        inputRefs.current[index] = element;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(event) => handleChange(index, event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(index, event)}
                                    onFocus={(event) => event.target.select()}
                                    disabled={isExpired || loading || isResending}
                                    aria-label={`Verification digit ${index + 1}`}
                                    className={`
                                        h-12 w-12
                                        rounded-lg
                                        border-2
                                        text-center
                                        font-serif
                                        text-2xl
                                        font-bold
                                        text-navy
                                        outline-none
                                        transition-all
                                        duration-200
                                        sm:h-16 sm:w-16
                                        ${digit ? "border-navy bg-white" : "border-gray bg-white"}
                                        ${isExpired ? "opacity-50" : ""}
                                        focus:border-navy
                                        focus:ring-2
                                        focus:ring-gold/50
                                        disabled:cursor-not-allowed
                                        disabled:bg-gray/10
                                    `}
                                />
                            ))}
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                                <p className="text-sm text-green-700">{successMessage}</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {(formError || error?.message) && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {formError || error?.message}
                                </p>
                            </div>
                        )}

                        {/* Countdown + Resend */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            {/* Countdown */}
                            <div className="flex items-center gap-2">
                                <Clock className={`h-4 w-4 ${isExpired ? "text-red-500" : "text-slate"}`} />
                                {isExpired ? (
                                    <span className="text-sm font-bold text-red-500">
                                        Code expired
                                    </span>
                                ) : (
                                    <span className="text-sm text-slate">
                                        Code expires in:{" "}
                                        <span className="font-bold text-navy">
                                            {formatTime(timeLeft)}
                                        </span>
                                    </span>
                                )}
                            </div>

                            {/* Resend Button */}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading || isResending}
                                className="text-left text-sm font-bold text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-50 sm:text-right"
                            >
                                {isResending ? "Sending..." : "Didn't receive code? Resend OTP"}
                            </button>
                        </div>

                        {/* Verify Button */}
                        <div className="mt-7">
                            <Button
                                type="submit"
                                disabled={
                                    loading || 
                                    isResending || 
                                    isExpired || 
                                    otp.join("").length !== 6
                                }
                                className="w-full"
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-gray/20 pt-6 text-center">
                    <p className="text-sm text-slate">
                        Wrong email address?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/register/company")}
                            className="font-bold text-navy hover:underline"
                        >
                            Back to registration
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;