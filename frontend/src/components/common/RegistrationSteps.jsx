import React from "react";
import { Check } from "lucide-react";

function RegistrationSteps({ currentStep = 2, variant = "default" }) {
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

    // For completion variant, show all steps as completed
    if (variant === "complete") {
        return (
            <div className="w-full">
                <div className="flex items-center justify-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            {/* Step */}
                            <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
                                {/* Circle */}
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy">
                                    <Check className="h-3 w-3 text-white" />
                                </div>

                                {/* Label — hidden on very small screens */}
                                <span className="hidden text-xs font-bold uppercase tracking-wide text-navy sm:inline">
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="mx-1 min-w-[16px] flex-1 border-t border-navy/30 sm:mx-2 sm:min-w-[24px] md:mx-3 md:min-w-[40px]" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom Divider */}
                <div className="mt-4 border-b border-gray/20 sm:mt-5" />
            </div>
        );
    }

    // Default variant
    return (
        <div className="w-full">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const isCompleted = step.number < currentStep;
                    const isActive = step.number === currentStep;

                    return (
                        <React.Fragment key={step.number}>
                            {/* Step */}
                            <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
                                {/* Circle */}
                                {isCompleted ? (
                                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray/20">
                                        <Check className="h-3 w-3 text-navy" />
                                    </div>
                                ) : isActive ? (
                                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy">
                                        <span className="text-xs font-bold text-white">
                                            {step.number}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray bg-white">
                                        <span className="text-xs text-gray">
                                            {step.number}
                                        </span>
                                    </div>
                                )}

                                {/* Label — hidden below sm */}
                                <span
                                    className={`hidden text-xs font-bold uppercase tracking-wide sm:inline ${
                                        isCompleted || isActive
                                            ? "text-navy"
                                            : "text-gray"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="mx-1 min-w-[16px] flex-1 border-t border-gray/40 sm:mx-2 sm:min-w-[24px] md:mx-3 md:min-w-[40px]" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Bottom Divider */}
            <div className="mt-4 border-b border-gray/20 sm:mt-5" />
        </div>
    );
}

export default RegistrationSteps;