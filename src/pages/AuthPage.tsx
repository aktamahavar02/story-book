import React from "react";
import Navbar from "@/components/ui/Navbar";
import logo from "../assets/svgs/logo.svg";
import { useSelector } from "react-redux";

type AuthProps = {
  title: string;
  description: string;
  isForgot?: boolean;
  isReset?: boolean;
  extraClass?: string;
  Component?: React.ComponentType;
};
const AuthPage: React.FC<AuthProps> = ({
  title,
  description,
  Component,
  isForgot = false,
  isReset = false,
  extraClass,
}) => {
   const isNavbarOpen = useSelector((state) => state?.bookTemplate?.isNavbarOpen);
  return (
    <>
 
       <div className="sticky top-0  z-40">
      {title !== 'Admin Login' && <Navbar />}
      </div>
      {/* <div className="min-h-[calc(100vh-97px)] flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-50 to-blue-200 lg:p-0 p-2 relative" > */}
      <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}>    
      <div className={`${isForgot ? "min-h-[calc(100vh-97px)] max-[425px]:items-center ":""} flex justify-center  px-0 sm:px-16 xl:px-0 py-4 xl:py-0 relative`}>
        <div className="absolute inset-0 left-0 right-0 -top-28 w-full bg-gradient-to-b from-purple-400/30 to-white">
          <img
            src="https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>

        {/* 👇 main auth container */}
        <div
          className={` overflow-hidden flex flex-col md:flex-row ${extraClass}  w-full mx-auto gap-2 sm:gap-2 px-4 py-0 ${
            isReset ? " mt-0 sm:mt-[7.4%] h-fit" :  isForgot ? " mt-0 sm:mt-[7.5%] h-fit" :"  md:p-12 md:pt-24"
          } mt-0`}
        >
          
          {/* left section */}
          <div
            className={` lg:${isForgot ? "w-full" : "w-1/2"}  w-full ${
              isForgot ? " md:w-full" : "md:w-1/2"
            }  md:w-1/2 px-6 lg:px-14 py-7 bg-white/70 rounded-lg flex flex-col justify-center z-10   `}
          >
            <div className="mb-8">
              <img src={logo} alt="log" className="h-16 w-20 md:h-20 md:w-20" />
            </div>
            <h2 className="  text-2xl md:text-3xl font-marcellus text-gray-900  font-normal">
              {title}
            </h2>
            <p className=" mb-6 text-left font-figTree text-sm text-neutral-600 font-normal">
              {description}
            </p>
            <Component />
          </div>

          {/* right section */}
          {!isForgot && (
            // <div className=" p-4  sm:p-6 relative flex w-full md:w-1/2 flex-col items-center justify-center bg-white/70 rounded-md px-6 py-14   ">
            <div className="relative flex w-full md:w-1/2 flex-col items-center justify-center bg-white/70 rounded-md  p-4  sm:mt-0 sm:px-6 sm:py-14 ">
              <div className="text-center mt-4">
                <h3 className=" text-[24px] sm:text-3xl font-marcellus mb-4 text-gray-800 text-center  font-normal">
                  Adored by <br /> millions worldwide
                </h3>
                <img
                  src="https://resources.wonderwraps.com/08058d48-f573-468b-9ee8-570e7fff362d/img/auth_img.png"
                  alt="Login Visual"
                  className="rotate-1 mb-0 sm:mb-6 max-w-60 lg:max-w-xl mx-auto   rounded-lg h-auto object-contain max-h-[450px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};
export default AuthPage;
