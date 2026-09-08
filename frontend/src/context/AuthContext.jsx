import React, { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
    const verifyCompanyOtp = async ({
        email,
        otp,
    }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.verifyCompanyOtp({
                
                email,
                otp,
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
    const resendCompanyOtp = async ({
        
        email,
    }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.resendCompanyOtp({
                companyId,
                email,
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
