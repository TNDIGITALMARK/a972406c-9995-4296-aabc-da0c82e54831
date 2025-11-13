"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          {/* Step Circle */}
          <div
            className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm
              ${
                step < currentStep
                  ? "bg-[hsl(var(--secondary))] border-[hsl(var(--secondary))] text-white"
                  : step === currentStep
                  ? "bg-[hsl(var(--secondary))] border-[hsl(var(--secondary))] text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }
            `}
          >
            {step < currentStep ? <Check className="w-5 h-5" /> : step}
          </div>

          {/* Connector Line */}
          {step < totalSteps && (
            <div
              className={`
                w-12 h-0.5 mx-2
                ${
                  step < currentStep
                    ? "bg-[hsl(var(--secondary))]"
                    : "bg-gray-300"
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
