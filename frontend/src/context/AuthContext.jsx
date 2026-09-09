import React, { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Clear error function
    const clearError = () => {
        setError(null);
    };

    // -----------------------------
    // Company Registration
    // -----------------------------
    const registerCompany = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.companyRegister(formData);
            return response;
        } catch (error) {
            const responseData = error.response?.data;
            const apiError = {
                message:
                    responseData?.message ||
                    "Registration failed. Please try again.",
                errors: responseData?.errors || {},
            };
            setError(apiError);
            throw apiError;
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // Verify Company OTP
    // -----------------------------
    const verifyCompanyOtp = async ({ email, otp, company_id }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.verifyCompanyOtp({
                email,
                otp,
                company_id,
            });
            return response;
        } catch (error) {
            const responseData = error.response?.data;
            const apiError = {
                message:
                    responseData?.message ||
                    "Invalid verification code. Please try again.",
                errors: responseData?.errors || {},
            };
            setError(apiError);
            throw apiError;
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // Resend Company OTP
    // -----------------------------
    const resendCompanyOtp = async ({ email, company_id }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.resendCompanyOtp({
                email,
                company_id,
            });
            return response;
        } catch (error) {
            const responseData = error.response?.data;
            const apiError = {
                message:
                    responseData?.message ||
                    "Unable to resend OTP. Please try again.",
                errors: responseData?.errors || {},
            };
            setError(apiError);
            throw apiError;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
        error,
        clearError,
        registerCompany,
        verifyCompanyOtp,
        resendCompanyOtp,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}