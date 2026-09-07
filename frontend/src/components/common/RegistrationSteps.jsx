import React from "react";
import { Check } from "lucide-react";

function RegistrationSteps({ currentStep = 2 }) {

    const steps = [
        {
            number: 1,
            label: "ACCOUNT",
        },
        {
            number: 2,
            label: "VERIFY",
        },
        {
            number: 3,
            label: "COMPLETE",
        },
    ];

    return (
        <div className="w-full">

            <div className="flex items-center">

                {steps.map((step, index) => {

                    const isCompleted = step.number < currentStep;
                    const isActive = step.number === currentStep;

                    return (
                        <React.Fragment key={step.number}>

                            {/* Step */}
                            <div className="flex items-center gap-2 flex-shrink-0">

                                {/* Circle */}
                                {isCompleted ? (
                                    <div className="w-6 h-6 rounded-full bg-gray/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-navy" />
                                    </div>
                                ) : isActive ? (
                                    <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">
                                            {step.number}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full border border-gray bg-white flex items-center justify-center">
                                        <span className="text-xs text-gray">
                                            {step.number}
                                        </span>
                                    </div>
                                )}

                                {/* Label */}
                                <span
                                    className={`text-xs font-bold uppercase tracking-wide ${
                                        isCompleted || isActive
                                            ? "text-navy"
                                            : "text-gray"
                                    }`}
                                >
                                    <span className="hidden sm:inline">
                                        0{step.number}{" "}
                                    </span>
                                    {step.label}
                                </span>

                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 border-t border-gray/40 mx-3" />
                            )}

                        </React.Fragment>
                    );
                })}

            </div>

            {/* Bottom Divider */}
            <div className="border-b border-gray/20 mt-5" />

        </div>
    );
}

export default RegistrationSteps;
