import React from 'react'
import child_1 from "../../assets/images/child_1_1.png";
import child_2 from "../../assets/images/child_1_2.png";
import child_3 from "../../assets/images/child_1_3.png";
import child_2_1 from "../../assets/images/child_2_1.png";
import child_2_2 from "../../assets/images/child_2_2 .png";
import child_2_3 from "../../assets/images/child_2_3.png";
import child_3_1 from "../../assets/images/child_3_1.png";
import child_3_2 from "../../assets/images/child_3_2.png";
import child_3_3 from "../../assets/images/child_3_3.png";
import arrow_1 from "../../assets/svgs/arrow1.svg";
import arrow_2 from "../../assets/svgs/arrow2.svg";
import arrow_3 from "../../assets/svgs/arrow3.svg";

const CharacterView = () => {
  return (
     <>
<div
  className="flex flex-col gap-10 md:gap-16 w-full h-full p-9 md:p-[70px]"
  style={{
    background: "linear-gradient(129.35deg, #FF698C 27.47%, #A00B2E 182.17%)"
  }}
>
        <div className="text-center flex flex-col gap-4 md:gap-0 mb-6">
            <h3 className="text-xs md:text-sm font-semibold font-figTree tracking-[3px] md:leading-10 uppercase text-white">Customize
                Faces, Expressions, and Angles</h3>
            <h1 className="text-[28px] leading-8 md:text-[34px] font-marcellus md:leading-[44px] text-white">To bring your character to life!</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
                <div className="flex">
                    <img src={child_1} alt="" className="aspect-square rounded-full w-[157px] h-[157px] relative" />
                    <img src={child_2} alt="" className="aspect-square rounded-full w-[126.18px] h-[126.18px] [@media(min-width:1px)_and_(max-width:320px)]:w-[100px] [@media(min-width:1px)_and_(max-width:320px)]:h-[100px] relative top-10 md:top-8" />
                </div>
                <div className="flex justify-center">
                    <div className="flex">
                        <div className="h-fit flex justify-end">
                            <img src={arrow_1} alt="" className="w-16 h-16 md:w-28 md:h-28 relative right-5 md:right-7" />
                        </div>
                        <img src={child_3} className='aspect-square rounded-full w-[112px] relative bottom-7 right-7 md:right-10' />
                    </div>
                </div>
                <div className="font-myNerve text-[26px] md:text-[34px] leading-8 relative right-16 bottom-8 md:bottom-0 md:top-3 text-white">Many Styles</div>
            </div>
            <div className="flex flex-col pt-8 md:pt-0">
                <div className="font-myNerve text-[26px] md:text-[34px] relative bottom-12 md:bottom-10 left-28 leading-8 w-fit text-white [@media(min-width:1px)_and_(max-width:375px)]:max-w-[150px]">Full
                    of Expressions
                </div>
                <div className="h-0 w-full">
                    <img src={arrow_2} alt="" className="w-16 h-16 md:w-28 md:h-28 relative bottom-12 left-44" />
                </div>
                <div className="flex justify-center md:pt-8">
                    <img src={child_2_1} alt="" className="aspect-square rounded-full w-[117px] h-[117px] relative" />
                    <img src={child_2_2} alt="" className="aspect-square rounded-full w-[126.18px] h-[126.18px] relative top-9" />
                </div>
                <div className="flex justify-center">
                    <img src={child_2_3} alt="" className="aspect-square rounded-full max-w-[162px] relative right-11 bottom-2" />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex">
                    <div>
                        <img src={child_3_1} alt="" className="aspect-square rounded-full max-w-[126.18px] relative" />
                        <img src={child_3_3} alt="" className="aspect-square rounded-full max-w-[120px] relative" />
                    </div>
                    <div className="flex items-center">
                        <img src={child_3_2} alt="" className="aspect-square rounded-full max-w-[173px] relative" />
                    </div>
                </div>
                <div className="h-0">
                    <img src={arrow_3} alt="" className="w-16 h-16 md:w-28 md:h-28 relative bottom-12 left-10" />
                </div>
                <div className="font-myNerve text-[26px] md:text-[34px] leading-8 relative top-4 md:top-16 left-12 md:left-0 text-white">
                    Different Angels
                </div>
            </div>
        </div>
    </div>
     </>
  )
}

export default CharacterView

