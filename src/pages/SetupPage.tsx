import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Stepper from "@/components/ui/Stepper";
import PersonalizationSection from "./PersonalisationSection";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cookie } from "../utils/cookies";
import { useDispatch, useSelector } from "react-redux";

import {
  personalizedBookGet,
} from "../../store/slices/bookTemplateSlice.js";
import PersonalizeBookChapter from "./PersonalizeBookChapter.js";
import { useIsMobile } from "@/hooks/use-mobile.js";

const SetupPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const token = cookie.get("token");
  const firstStep = location?.state;

  const stepIDPayment = location?.state;
  const editStep = location?.state;
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const previewPage = localStorage.getItem("preview");

  useEffect(() => {
    if (firstStep) {
      setStep(1);
    }
    if (id && editStep) {
      setStep(2);
    }
    if (id) {
      setStep(2);
    }

    if (stepIDPayment?.bookId && stepIDPayment?.current) {
      setStep(2);
    }
    if (stepIDPayment?.bookId) {
      dispatch(personalizedBookGet({ id: stepIDPayment?.bookId }));
    }
    if (id && previewPage) {
      setStep(3);
    }
  }, [token, id, firstStep]);

  useEffect(() => {
    if (!stepIDPayment?.bookId) {
      localStorage.removeItem("preview");
    }
  }, []);

  const steps = ["Book", "Child Info", "Personalize Your Book", "Preview"];
  const isMobile = useIsMobile();
  const navigate = useNavigate()
 const isNavbarOpen = useSelector((state) => state?.bookTemplate?.isNavbarOpen);
  return (
    <>
      {" "}
      {!isMobile &&   <div className="sticky top-0  z-40">
      <Navbar />
      </div>}
      {/* //! mobile */}
      <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}>      
      {
        location?.pathname === '/setup' &&
      <div className="md:hidden relative flex items-center justify-center  px-6  py-7 lg:bg-white bg-[#f3e1ff]">
        <div
         onClick={() => {
              navigate(`/book/space-explorer/${location?.state?.id}`);
            }}
          className="absolute left-5"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </div>
        <h1 className="font-marcellus text-2xl  text-center leading-7 text-black  whitespace-nowrap">
          Start Personalisation
        </h1>
      </div>
}
      {/* //! end mobile */}
      <div className="relative overflow-hidden ">
        {/* <div className="absolute inset-10 bg-[url('https://resources.wonderwraps.com/50f3c74c-975b-48a7-b5b0-2983f258eee8/img/fillers.png')] bg-no-repeat filter blur-sm opacity-50"></div> */}
     <div className="absolute inset-0 left-0 right-0 -top-28 w-full bg-gradient-to-b from-purple-400/30 to-white">
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>
        <div
          className="container max-w-7xl mx-auto px-0 sm:px-4 sm:py-0 relative z-10  "
          id="parent-wrapper"
        >
          {/* {isConfirm && (
          <div
            className={` w-[92vw] sm:w-[96vw] xl:w-[1365px]  border border-red-5000 fixed xl:!left-[${parentMargins?.left}] xl:!right-[${parentMargins?.right}]  flex justify-end  p-4   bottom-4 z-50   bg-white/70 backdrop-blur-md `}
          >
            <button
              onClick={() => {
                if (!completedBook) {
                  handleConfirm();
                } else {
                  navigate(`/preview-setup/${id}`);
                }
              }}
              className={`bg-gradient-to-r border w-full sm:w-36  mr-0 md:mr-9 lg:mr-9  from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition`}
            >
              {!completedBook ? "Confirm" : "Edit"}
            </button>
          </div>
        )} */}

          <div className="p-4 max-w-max mx-auto hidden sm:block">
            <Stepper steps={steps} currentStep={step} />
          </div>
          {step == 1 && (
            <div className=" p-0 sm:px-4  sm:pb-4">
              <PersonalizationSection setStep={setStep} />
            </div>
          )}
          {step == 2 && (
            <>
              <div className=" p-0 sm:px-4 ">
                <PersonalizeBookChapter step={step} setStep={setStep} />
              </div>
            </>
          )}
          {step == 3 && (
            // <div className="p-4 max-w-max mx-auto">
            // <PersonalizeBookChapter  />
            // </div>
            <PersonalizeBookChapter step={step} setStep={setStep} />
          )}
        </div>
        {/* {
        openPop &&
        <PopUpModal openPop={openPop} setOpenPop={setOpenPop} />} */}
      </div>
      </div>
    </>
  );
};

export default SetupPage;
