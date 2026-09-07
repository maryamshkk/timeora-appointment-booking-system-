import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { User } from "lucide-react";
import Navbar from "../../components/common/layouts/Navbar";
import Footer from "../../components/common/layouts/Footer";
import IconBox from "../../components/common/ui/IconBox";
import Divider from "../../components/common/ui/Divider";
import Button  from "../../components/common/Button";
import { Building2 } from "lucide-react";

function RoleSelectionPage() {
    let navigate = useNavigate();


    return (

        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 bg-beige px-6 py-16">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    
                    {/* Heading */} 
                    <h1 className="font-serif text-4xl md:text-5xl text-navy text-center mb-3"> 
                        Create Your Account 
                    </h1>

                    <p className="text-sm text-slate tracking-wide text-center mb-12"> 
                        Choose how you want to use TIMEORA 
                    </p>

                    {/* Role Cards */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Card */} 
                        <div className="bg-white rounded-xl border border-gray/40 shadow-sm p-8 flex flex-col">
                            <IconBox>
                                <Building2 className="w-[22px] h-[22px] text-navy" />
                            </IconBox>

                            <h2 className="mt-2 text-sm font-bold text-navy tracking-wide">
                                COMPANY
                            </h2>

                            <Divider />

                            <p className="text-sm text-slate leading-relaxed mb-6 flex-grow"> 
                                Manage your business, staff, services, schedules and appointments. 
                            </p>

                            <Button 
                                onClick={() => {
                                    // TODO: axios POST call for role registration
                                    navigate("/register/company");
                                }}
                                >
                                    Register as Company
                            </Button>
                            
                        </div>

                        {/* Customer Card */} 
                        <div className="bg-white rounded-xl border border-gray/40 shadow-sm p-8 flex flex-col"> 
                        <IconBox> 
                            <User className="w-[22px] h-[22px] text-navy" /> 
                                </IconBox> 
                                <h2 className="mt-2 text-sm font-bold text-navy tracking-wide"> 
                                    CUSTOMER 
                                </h2> 
                                
                                <Divider /> 
                                <p className="text-sm text-slate leading-relaxed mb-6 flex-grow"> 
                                    Find a company and manage your appointments. 
                                </p>

                                
                                <Button onClick={() => { 
                                    // TODO: axios POST call for role registration 
                                    navigate("/register/customer"); }} 
                                > 
                                    Register as Customer 
                                </Button>

                        </div>

                    </div>

                    {/* Login Link */} 
                    <p className="text-sm text-slate text-center mt-10"> 
                        Already have an account?{" "} 
                        
                        <Link to="/login" className="font-bold text-navy hover:underline" 
                        > 
                        Login 
                        </Link> 

                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default RoleSelectionPage;