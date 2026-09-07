import api from "./api";

const authService = {
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
};

export default authService;