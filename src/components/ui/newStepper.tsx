import React, { useEffect, useState } from "react";
import tick from "../../assets/images/stepperTik.png";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface StepperBatchProps {
  steps: { label: string }[];
  currentStep: number;
  batchSize?: number;
  isMobile?: boolean;
  isFromScratch?: boolean;
}

const StepperBatch: React.FC<StepperBatchProps> = ({
  steps,
  currentStep,
  batchSize = 4,
  isMobile,
  isFromScratch = false,
}) => {
  const [effectiveBatchSize, setEffectiveBatchSize] = useState(batchSize);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 426) {
        setEffectiveBatchSize(isMobile ? 1 : 1);
      } else if (window.innerWidth < 769) {
        setEffectiveBatchSize(1);
      } else {
        setEffectiveBatchSize(batchSize);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [batchSize]);

  // batching logic
  const currentBatch = Math.floor(currentStep / effectiveBatchSize);
  const startIndex = currentBatch * effectiveBatchSize;
  const endIndex = startIndex + effectiveBatchSize;
  const visibleSteps = steps?.slice(startIndex, endIndex);
  return (
    <>
      {isFromScratch ? (
        <>
          <div>
            {visibleSteps?.map((stepObj, index) => {
              const step = stepObj?.label;
              return (
                <div>
                  <div className="relative flex items-center justify-center">
                    {/* Back Button */}
                    <div
                      className="absolute left-0 block lg:hidden"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      <IoChevronBack size={window?.innerWidth <= 400 ? 20 : 25} />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-marcellus text-center [@media(min-width:375px)_and_(max-width:400px)]:text-xl 
                    [@media(min-width:320px)_and_(max-width:374px)]:text-lg [@media(min-width:1px)_and_(max-width:319px)]:text-base">
                      {step}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg p-3 md:p-4 w-full border overflow-x-auto">
          <div className="flex justify-between gap-2 sm:gap-4">
            {visibleSteps?.map((stepObj, index) => {
              const step = stepObj?.label;
              const globalIndex = startIndex + index;
              const isCompleted = globalIndex < currentStep;
              const isActive = globalIndex === currentStep;

              return (
                <div
                  key={globalIndex}
                  className="flex-1 text-center min-w-[90px]"
                >
                  <div
                    className={`text-sm font-medium whitespace-nowrap truncate  h-6 mb-[8px] ${
                      isCompleted || isActive ? "text-purple-600" : "text-black"
                    }`}
                  >
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 font-figTree text-base   ">
                        {/* <img src={tick} alt="tick" className="w-5 h-5" /> */}
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg>
                        {step}
                      </span>
                    ) : (
                      <span className="font-figTree text-base  ">{step}</span>
                    )}
                  </div>
                  <div
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-purple-600 w-full"
                        : isActive
                        ? "w-full mx-auto bg-gradient-to-r from-purple-600 from-50% to-purple-200 to-50%"
                        : "bg-purple-100 w-full"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default StepperBatch;
