import React from "react";
import {Check, MoreHorizontal} from "lucide-react";

function RegistrationIntro({
    eyebrow = "WELCOME TO TIMEORA",
    heading = "Build a Better Appointment Experience for Your Business",
    description = "Create your company account and bring appointments, staff, customers and schedules together in one organized, premium workspace.",

}){
    return(
        <div className="w-full md:w-[42%]">

            {/* Eyebrow */} 
            <p className="text-xs font-bold uppercase tracking-widest text-brown mb-4"> 
                {eyebrow} 
            </p>

            {/* Heading */} 
            <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6"> 
                {heading} 
            </h1>

            {/* Description */} 
            <p className="font-serif text-base text-slate leading-relaxed max-w-[440px] mb-8"> 
                {description} 
            </p>

            {/* Checklist */} 
            <div className="space-y-4">

                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-[14px] h-[14px] text-navy" />
                    </div>

                    <p className="font-serif text-sm text-navy"> 
                        Unified dashboard for multi-staff scheduling 
                    </p>
                </div>

                
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-[14px] h-[14px] text-navy" />
                    </div>

                    <p className="font-serif text-sm text-navy"> 
                       Automated client reminders and follow-ups 
                    </p>
                </div>


                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-[14px] h-[14px] text-navy" />
                    </div>

                    <p className="font-serif text-sm text-navy"> 
                        Detailed analytics and revenue tracking 
                    </p>
                </div>
            </div>  

            {/* Today's Schedule */}    
            <div className="bg-white rounded-xl shadow-sm border-l-4 border-gold max-w-[460px] mt-10 pb-2">


                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="font-serif text-lg text-navy">
                        Today's Schedule
                    </h2>

                    <MoreHorizontal className="w-5 h-5 text-slate" />

                </div>

                {/* Schedule Row 1 */}
                <div className="bg-beige rounded-lg mx-4 mb-3 px-4 py-3.5">
                    <p className="font-serif text-sm font-bold text-navy">
                        09:00 AM - Initial Consultation
                    </p>

                    <p className="font-serif text-xs text-slate mt-1">
                        Dr. Eleanor Vance
                    </p>
                </div>


                {/* Schedule Row 2 */}
                <div className="bg-beige rounded-lg mx-4 mb-3 px-4 py-3.5">
                    <p className="font-serif text-sm font-bold text-navy">
                        11:30 AM - Review Session
                    </p>

                    <p className="font-serif text-xs text-slate mt-1">
                        Marcus Sterling
                    </p>
                </div>

                
            </div>  
        </div>
    )
}
export default RegistrationIntro;