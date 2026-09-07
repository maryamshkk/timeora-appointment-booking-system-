import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationIntro from "../../components/common/RegistrationIntro";
import Divider from "../../components/common/ui/Divider";
import IconBox from "../../components/common/ui/IconBox";
import Input from "../../components/common/Input";
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

        navigate("/auth/company/verify-otp", {
            state: {
                companyId: response.data.company_id,
                adminEmail: response.data.admin_email,
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
        <div className="min-h-screen bg-beige px-6 py-10 md:px-10">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-10">


                {/* Left Section  */}
                <RegistrationIntro />

                {/* Right Section */}
                <form
    onSubmit={handleSubmit}
    className="w-full md:w-[58%] bg-white rounded-2xl shadow-lg p-8 md:p-12"
>
                    <h2 className="font-serif text-3xl text-navy mb-4">
                        Create Your Company Account
                    </h2>

                    <Divider />
                     
                    <div className="border-b border-gray/30 mb-8"></div>

                    {/* Company Information */}
                    <div className="flex items-center gap-2 mb-6">
                        <IconBox>
                            <Building2 className="w-4 h-4 text-brown" />
                        </IconBox>

                        <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
                            Company Information
                        </h3>
                    </div>

                    {/* Company Name  */}
                    <div className="mb-5">
                        <Input 
                            label = "Company Name"
                            type = "text"
                            name = "companyName"
                            value = {formData.companyName}
                            onChange = {handleChange}
                            placeholder = "e.g. Acme Associates"
                            required
                        />
                    </div>

                    {/* Business Email */}
                    <div className="mb-5">
                        <Input 
                            label = "Business Email"
                            type = "email"
                            name = "businessEmail"
                            value = {formData.businessEmail}
                            onChange = {handleChange}
                            placeholder = "contact@acme.com"
                            required
                        />
                    </div>
                

                {/* Phone + Business Type */} 
                
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-5">

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
                                className="
                                    h-11
                                    rounded-l-xl
                                    border border-r-0 border-gray/40
                                    bg-beige
                                    px-3
                                    font-serif text-sm text-navy
                                    outline-none
                                    cursor-pointer
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
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
                                className="
                                    h-11
                                    min-w-0
                                    flex-1
                                    rounded-r-xl
                                    border border-gray/40
                                    bg-white
                                    px-4
                                    font-serif text-sm text-navy
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
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
                                className="
                                    h-11
                                    w-full
                                    appearance-none
                                    rounded-xl
                                    border border-gray/40
                                    bg-white
                                    px-4 pr-10
                                    font-serif text-sm text-navy
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2 focus:ring-gold
                                "
                            >
                               <option value="">
    Select industry...
</option>

<option value="1">
    Healthcare
</option>

<option value="2">
    Beauty & Wellness
</option>

<option value="3">
    Education
</option>

<option value="4">
    Consulting
</option>

<option value="5">
    Fitness
</option>

<option value="6">
    Other
</option>
                             
                            </select>

                            <ChevronDown
                                className="
                                    pointer-events-none
                                    absolute right-4 top-1/2
                                    h-4 w-4
                                    -translate-y-1/2
                                    text-slate
                                "
                            />
                        </div>
                    </div>

                </div>

                
                <Divider />

                {/* Divider */}
                <div className="border-b border-gray/30 my-7"></div>

                {/* Company Administrator */}
                <div className="flex items-center gap-2 mb-6">
                    <IconBox>
                    <IdCard className="w-4 h-4 text-brown" />
                    </IconBox>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
                        Company Administrator
                    </h3>
                </div>

                {/* Full Name */}
                <div className="mb-5">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                {/* Password */}
                <div>
                    <label className="block text-sm font-serif text-navy mb-2">
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
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                text-slate
                                hover:text-navy
                            "
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    

                    {/* Password Strength */}
                            <div className="mt-2 h-[2px] w-full bg-gray/20">
                                <div className="h-full w-[40%] bg-gold"></div>
                            </div>
                </div>

                {/* Confirm Password */}
                <div>
                            <label className="block text-sm font-serif text-navy mb-2">
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
                                    
                <div className="mt-7 flex items-start gap-3">
  <input
    type="checkbox"
    name="agreedToTerms"
    checked={formData.agreedToTerms}
    onChange={handleChange}
    required
    className="
        mt-0.5
        h-4 w-4
        shrink-0
        cursor-pointer
        rounded
        border border-gray
        accent-navy
        focus:ring-2 focus:ring-gold
    "
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
<div className="mt-8">
    <Button
        type="submit"
        disabled={loading}
        className="w-full"
    >
        {loading ? "Creating Account..." : "Create Company Account"}
    </Button>
</div>

{(formError || error?.message) && (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
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