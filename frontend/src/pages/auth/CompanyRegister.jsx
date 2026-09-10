import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationIntro from "../../components/common/RegistrationIntro";
import Divider from "../../components/common/ui/Divider";
import IconBox from "../../components/common/ui/IconBox";
import Input from "../../components/common/Input";
import RegistrationSteps from "../../components/common/RegistrationSteps";
import {
    Building2,
    ChevronDown,
    IdCard,
    Eye,
    EyeOff,
} from "lucide-react";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function CompanyRegistration() {
    const navigate = useNavigate();
    const { registerCompany, loading, error } = useAuth();
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        companyName: "",
        businessEmail: "",
        countryCode: "+92",
        phone: "",
        businessType: "",
        fullName: "",
        adminEmail: "",
        password: "",
        confirmPassword: "",
        agreedToTerms: false,
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setFormError("");
        setSuccessMessage("");

        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        try {
            const response = await registerCompany(formData);

            setSuccessMessage(
                response.message || "Registration successful."
            );

            navigate("/register/verify-otp", {
                state: {
                    companyId: response?.data?.company_id,
                    adminEmail: response?.data?.admin_email,
                },
            });
        } catch (error) {
            setFormError(
                error.message ||
                    "Registration failed. Please check your information."
            );
        }
    }

    return (
        <div className="min-h-screen bg-beige px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 lg:px-10">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 md:gap-8 lg:flex-row lg:items-start lg:gap-10">
                {/* Left Section */}
                <RegistrationIntro />

                {/* Right Section — Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[640px] rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8 lg:w-[58%] lg:max-w-none lg:p-12"
                >
                    <RegistrationSteps currentStep={1} />

                    <h2 className="mb-4 font-serif text-xl text-navy sm:text-2xl md:text-3xl">
                        Create Your Company Account
                    </h2>

                    <Divider />

                    <div className="mb-6 border-b border-gray/30 md:mb-8" />

                    {/* Company Information */}
                    <div className="mb-5 flex items-center gap-2 md:mb-6">
                        <IconBox>
                            <Building2 className="h-4 w-4 text-brown" />
                        </IconBox>

                        <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
                            Company Information
                        </h3>
                    </div>

                    {/* Company Name */}
                    <div className="mb-4 md:mb-5">
                        <Input
                            label="Company Name"
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="e.g. Acme Associates"
                            required
                        />
                    </div>

                    {/* Business Email */}
                    <div className="mb-4 md:mb-5">
                        <Input
                            label="Business Email"
                            type="email"
                            name="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleChange}
                            placeholder="contact@acme.com"
                            required
                        />
                    </div>

                    {/* Phone + Business Type */}
                    <div className="mb-4 grid grid-cols-1 gap-4 md:mb-5 md:grid-cols-2 md:gap-5">
                        {/* Phone Number */}
                        <div>
                            <label className="mb-2 block font-serif text-sm text-navy">
                                Phone Number
                            </label>

                            <div className="flex h-11">
                                {/* Country Code */}
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="h-11 cursor-pointer rounded-l-xl border border-r-0 border-gray/40 bg-beige px-2 font-serif text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold sm:px-3"
                                >
                                    <option value="+92">+92</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option>
                                    <option value="+971">+971</option>
                                    <option value="+91">+91</option>
                                </select>

                                {/* Phone Input */}
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="300 1234567"
                                    required
                                    className="h-11 min-w-0 flex-1 rounded-r-xl border border-gray/40 bg-white px-3 font-serif text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                />
                            </div>
                        </div>

                        {/* Business Type */}
                        <div>
                            <label className="mb-2 block font-serif text-sm text-navy">
                                Business Type
                            </label>

                            <div className="relative">
                                <select
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full appearance-none rounded-xl border border-gray/40 bg-white px-3 pr-10 font-serif text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                >
                                    <option value="">Select industry...</option>
                                    <option value="1">Healthcare</option>
                                    <option value="2">Beauty &amp; Wellness</option>
                                    <option value="3">Education</option>
                                    <option value="4">Consulting</option>
                                    <option value="5">Fitness</option>
                                    <option value="6">Other</option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className="my-5 border-b border-gray/30 md:my-7" />

                    {/* Company Administrator */}
                    <div className="mb-5 flex items-center gap-2 md:mb-6">
                        <IconBox>
                            <IdCard className="h-4 w-4 text-brown" />
                        </IconBox>

                        <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
                            Company Administrator
                        </h3>
                    </div>

                    {/* Full Name */}
                    <div className="mb-4 md:mb-5">
                        <Input
                            label="Full Name"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    {/* Admin Email */}
                    <Input
                        label="Admin Email (Login)"
                        type="email"
                        name="adminEmail"
                        value={formData.adminEmail}
                        onChange={handleChange}
                        placeholder="jane.doe@acme.com"
                        required
                    />

                    {/* Password Fields */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
                        {/* Password */}
                        <div>
                            <label className="mb-2 block font-serif text-sm text-navy">
                                Password
                            </label>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-navy"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength */}
                            <div className="mt-2 h-[2px] w-full bg-gray/20">
                                <div className="h-full w-[40%] bg-gold" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block font-serif text-sm text-navy">
                                Confirm Password
                            </label>

                            <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Terms & Privacy */}
                    <div className="mt-6 flex items-start gap-3 md:mt-7">
                        <input
                            type="checkbox"
                            name="agreedToTerms"
                            checked={formData.agreedToTerms}
                            onChange={handleChange}
                            required
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-gray accent-navy focus:ring-2 focus:ring-gold"
                        />

                        <p className="font-serif text-xs leading-relaxed text-slate">
                            I agree to{" "}
                            <a
                                href="/terms"
                                className="font-bold text-navy transition hover:underline"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy-policy"
                                className="font-bold text-navy transition hover:underline"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 md:mt-8">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? "Creating Account..." : "Create Company Account"}
                        </Button>
                    </div>

                    {/* Error */}
                    {(formError || error?.message) && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <p className="font-serif text-sm text-red-700">
                                {formError || error?.message}
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CompanyRegistration;