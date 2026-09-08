import api from "./api";

const authService = {
    // -----------------------------
    // Company Registration
    // -----------------------------
    companyRegister: async (formData) => {
        const payload = {
            company_name: formData.companyName,
            business_email: formData.businessEmail,
            phone_number: `${formData.countryCode}${formData.phone}`,
            business_type: Number(formData.businessType),
            full_name: formData.fullName,
            admin_email: formData.adminEmail,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            terms_accepted: formData.agreedToTerms,
        };

        const response = await api.post(
            "/auth/company/register",
            payload
        );

        return response.data;
    },

// In authService.js

// -----------------------------
// Verify Company OTP
// -----------------------------
verifyCompanyOtp: async ({ email, otp, company_id }) => {
    const payload = {
        email: email,
        otp: otp,
    };
    
    // Only include company_id if it exists
    if (company_id) {
        payload.company_id = company_id;
    }
    
    const response = await api.post(
        "/auth/company/verify-otp",
        payload
    );
    
    return response.data;
},

// -----------------------------
// Resend Company OTP
// -----------------------------
resendCompanyOtp: async ({ email, company_id }) => {
    const payload = {
        email: email,
    };
    
    // Only include company_id if it exists
    if (company_id) {
        payload.company_id = company_id;
    }
    
    const response = await api.post(
        "/auth/company/resend-otp",
        payload
    );
    
    return response.data;
},
};

export default authService;