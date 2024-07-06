import React, { Fragment, useState } from "react";

type stepProps = {
  steps: any[];
  currentStep: number;
  isAccountSetup?: boolean;
  stepColor?: string;
};

const MultiStepForm = ({
  steps,
  currentStep,
  isAccountSetup,
  stepColor,
}: stepProps) => {
  return (
    <div className="md:max-w-5xl mx-auto p-4">
      <div className="md:flex items-center justify-between mb-8 hidden">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={`rounded-full h-12 w-12 flex items-center justify-center text-white ${
                  currentStep >= step.id ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                {step.id}
              </div>
              <div className="ml-2 text-xl font-medium ">{step.title}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  currentStep > step.id ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">
          {steps[currentStep - 1].title}
        </h2>
      </div>
    </div>
  );
};

export default MultiStepForm;
