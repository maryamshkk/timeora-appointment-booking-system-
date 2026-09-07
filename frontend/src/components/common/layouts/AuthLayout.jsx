import React from "react";

function AuthLayout({ children }){

    return(
        <div className="min-h-screen bg-beige font-serif text-navy">
            <main className="flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>
        </div>
    )
}
export default AuthLayout;