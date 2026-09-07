import { useEffect, useRef, useState } from "react";
import { Clock, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import RegistrationSteps from "../../components/common/RegistrationSteps";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function VerifyOtp({ email = "" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { verifyCompanyOtp, resendCompanyOtp, loading, error } = useAuth();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(300);
    const [isExpired, setIsExpired] = useState(false);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const inputRefs = useRef([]);

    const adminEmail =
        email ||
        location.state?.adminEmail ||
        "";

    const companyId = location.state?.companyId;

    function maskEmail(emailAddress) {
        if (!emailAddress || !emailAddress.includes("@")) {
            return emailAddress;
        }

        const [username, domain] = emailAddress.split("@");

        if (username.length <= 2) {
            return `${username[0] || ""}••••@${domain}`;
        }

        return `${username[0]}•••••••${
            username[username.length - 1]
        }@${domain}`;
    }

    function handleChange(index, value) {
        if (!/^\d?$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);
        setFormError("");

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index, event) {
        if (
            event.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((previousTime) => previousTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    async function handleSubmit(event) {
        event.preventDefault();

        setFormError("");
        setSuccessMessage("");

        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            setFormError("Please enter the complete 6-digit verification code.");
            return;
        }

        if (isExpired) {
            setFormError("Your verification code has expired. Please request a new code.");
            return;
        }

        try {
            const response = await verifyCompanyOtp({
                companyId,
                email: adminEmail,
                otp: otpCode,
            });

            setSuccessMessage(
                response?.message || "Email verified successfully."
            );

            navigate("/login", {
                state: {
                    email: adminEmail,
                    message:
                        "Email verified successfully. You can now log in.",
                },
            });
        } catch (err) {
            setFormError(
                err?.message ||
                    error?.message ||
                    "Invalid verification code. Please try again."
            );
        }
    }

    async function handleResendOtp() {
        setFormError("");
        setSuccessMessage("");

        try {
            const response = await resendCompanyOtp({
                companyId,
                email: adminEmail,
            });

            setOtp(Array(6).fill(""));
            setTimeLeft(300);
            setIsExpired(false);

            setSuccessMessage(
                response?.message ||
                    "A new verification code has been sent."
            );

            inputRefs.current[0]?.focus();
        } catch (err) {
            setFormError(
                err?.message ||
                    error?.message ||
                    "Unable to resend OTP. Please try again."
            );
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
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
                        We sent a 6-digit verification code to your email
                        address:
                    </p>

                    {/* Email */}
                    <div className="mb-4 flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0 text-brown" />

                        <span className="text-sm font-bold text-navy">
                            {maskEmail(adminEmail)}
                        </span>
                    </div>

                    {/* Instruction */}
                    <p className="text-sm leading-relaxed text-slate">
                        Enter the code below to verify your email and
                        continue creating your TIMEORA company account.
                    </p>
                </div>

                {/* Verification Form */}
                <form onSubmit={handleSubmit}>

                    {/* Verification Code */}
                    <div className="mt-7">

                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-navy">
                            Verification Code
                        </p>

                        <div className="flex items-center justify-between gap-2 sm:gap-3">
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
                                    onChange={(event) =>
                                        handleChange(
                                            index,
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={(event) =>
                                        handleKeyDown(index, event)
                                    }
                                    disabled={isExpired || loading}
                                    aria-label={`Verification digit ${
                                        index + 1
                                    }`}
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
                                        transition
                                        sm:h-16 sm:w-16
                                        ${
                                            digit
                                                ? "border-navy"
                                                : "border-gray"
                                        }
                                        focus:border-navy
                                        focus:ring-2
                                        focus:ring-gold/50
                                        disabled:cursor-not-allowed
                                        disabled:bg-gray/10
                                    `}
                                />
                            ))}
                        </div>

                        {/* Error */}
                        {(formError || error?.message) && (
                            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm text-red-700">
                                    {formError || error?.message}
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {successMessage && (
                            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                <p className="text-sm text-green-700">
                                    {successMessage}
                                </p>
                            </div>
                        )}

                        {/* Countdown + Resend */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            {/* Countdown */}
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-slate" />

                                {isExpired ? (
                                    <span className="text-sm font-bold text-slate">
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

                            {/* Resend */}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading}
                                className="text-left text-sm font-bold text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-50 sm:text-right"
                            >
                                Didn't receive code? Resend OTP
                            </button>
                        </div>

                        {/* Verify Button */}
                        <div className="mt-7">
                            <Button
                                type="submit"
                                disabled={
                                    loading ||
                                    isExpired ||
                                    otp.join("").length !== 6
                                }
                                className="w-full"
                            >
                                {loading
                                    ? "Verifying..."
                                    : "Verify Email"}
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-gray/20 pt-6 text-center">
                    <p className="text-sm text-slate">
                        Wrong email address?{" "}
                        <Link
                            to="/register/company"
                            className="font-bold text-navy hover:underline"
                        >
                            Back to registration
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
