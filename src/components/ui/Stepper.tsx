import React from 'react';
import tick from '../../assets/images/stepperTik.png'
import { useLocation } from 'react-router-dom';

interface StepperProps {
  steps:string | string[];
  currentStep: number;
  isCart?: boolean;
  onClick?: (index: number) => void;
  items?: any[];
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onClick, isCart = false, items }) => {
  const location = useLocation();
   const isCartPage = location?.pathname?.startsWith("/cart")
  return (
    <div className="bg-white rounded-lg p-3 md:p-4 w-full overflow-x-auto border">
      <div className="flex justify-between gap-2 sm:gap-4">
        {steps?.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className={`flex-1 text-center min-w-[90px] ${(index > 0 && items?.length <= 0) ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => onClick?.(index)}>
              <div
                className={`text-sm font-medium whitespace-nowrap truncate h-6  mb-[8px] ${
                  isCompleted || isActive ? isCart ? 'text-black':'text-purple-600' : 'text-black'
                }`}
              >
                {isCompleted ? (
                  <span className="inline-flex items-center gap-2 font-figTree text-base">
                    {/* <img src={tick} alt='tick' className='w-5 h-5' /> */}
                    {
                      !isCartPage &&
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                    }
                    {step?.label || step} 
                  </span>
                ) : (
                  <span className='font-figTree text-base'>{step?.label || step}</span>
                )}
              </div>
              <div
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  isCompleted
                    ?  "bg-[#A855F7] w-full"
                    : isActive
                    ? "w-full mx-auto bg-gradient-to-r from-[#A855F7] from-50% to-purple-200 to-50%"
                    : "bg-purple-100 w-full"
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
