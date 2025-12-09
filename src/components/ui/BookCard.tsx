import React from "react";
import discountCurve from "../../assets/svgs/discount.svg";
import { Loader } from "./Loader";
import loading from "../../assets/images/loading.gif";

type BookCardProps = {
  title: string;
  description?: string;
  ageRange?: string;
  imageUrl: string;
  discount?: string;
  btnText?: () => void;
  gender?: string;
  name?: string;
  extraClass?: string;
  idealFor?: string;
  isCart?: boolean;
  isHome?: boolean;
  isSpace?: boolean;
  isOrder?: boolean;
  isBook?: boolean;
  onPersonalise?: () => void;
};

const BookCard: React.FC<BookCardProps> = ({
  title,
  description,
  ageRange,
  imageUrl,
  discount,
  gender,
  extraClass = "",
  btnText,
  name,
  onPersonalise,
  isCart,
  isSpace,
  isBook,
  isHome,
  idealFor,
  isOrder,
}) => {
  return (
    <div className={`w-full  flex flex-col ${extraClass} relative`}>
      <div className="relative ">
        <div
          style={{
            filter: "drop-shadow(-12px 12px 8px rgba(0, 0, 0, .5))",
            transform: "perspective(1000px) rotateY(3deg)",
          }}
        >
          <div
            className="relative w-full h-full bg-transparent cursor-pointer"
            onClick={onPersonalise}
          >
            <img
              src={imageUrl}
              // src="https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c16831b373e95cf8d1cd26/chapter/68c16848b373e95cf8d1cd2b/pageImageOptions/68c168a5d0608d6082c76f88/generatedImage/68c168b1d0608d6082c76f9f.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20250911%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250911T100643Z&X-Amz-Expires=3600&X-Amz-Signature=cfa86726addf9623aeca8837b6695264689ccd859f12443b692471483b9908d7&X-Amz-SignedHeaders=host&x-id=GetObject"
              alt="cover"
              className=" aspect-square w-full h-full  rounded-tr-md rounded-br-md"
            />

            <div className="absolute top-0 h-full bg-white/50 blur-sm left-0 w-2 "></div>
            <div className="absolute top-0 h-full bg-black/10 left-[3%] w-[1.5px]"></div>
            <div className="absolute top-0 h-full bg-black/20 blur-sm left-[3%] w-1"></div>
          </div>
        </div>

        <div>
          {/* <div className="relative w-full h-full">
            <img
              src={imageUrl}
              // src="https://storage.wonderwraps.com/8c68b31f-3bab-4793-b5ca-e8d6de718f02/conversions/image-preview.jpeg"
              style={{ display: "block", borderLeft: "2px solid white" }}
              alt="cover"
              // id={selectPicShow?.id}
              // className="bg-gray-200 aspect-square w-full h-full rounded-md"
            />

            <div className="absolute top-0 h-full bg-white/50 blur-sm left-0 w-2 "></div>
            <div className="absolute top-0 h-full bg-black/10 left-[3%] w-[1.5px]"></div>
            <div className="absolute top-0 h-full bg-black/20 blur-sm left-[3%] w-1"></div>
          </div> */}
        </div>

        {discount && (
          <div className="absolute md:-top-2 md:-right-4 lg:-top-1 lg:-right-4 -top-[0px] -right-[4px] text-white  font-extrabold font-figTree ">
            <div className="absolute top-[8px] right-1.5 lg:top-3.5 lg:right-2.5 md:top-3 md:right-2.5 text-xs lg:text-lg md:text-lg text-discount ">
              {discount}
            </div>
            <img
              src={discountCurve}
              className="w-9 h-9 lg:h-16 lg:w-16 md:h-16 md:w-16 "
              alt="new-paypal "
            />
          </div>
        )}
      </div>

      <div className={`pt-4 flex flex-col`}>
        {/* <h3 className="lg:text-lg text-base font-marcellus text-gray-900 lg:text-left text-center">
          {title}
        </h3> */}
        <div
          className={` flex flex-col gap-2  ${
            isHome
              ? "h-[135px] sm:h-[117px] md:h-[114px] lg:h-[119px] xl:h-[80px] [@media(min-width:375px)_and_(max-width:425px)]:h-[142px] "
              : isSpace || isBook
              ? " [@media(min-width:375px)_and_(max-width:424px)]:!h-[142px]  h-[135px] sm:h-32 md:h-[134px] lg:h-[142px]  xl:h-[105px] "
              : ""
          }`}
        >
          <h3
            className={`text-base font-marcellus text-black text-center ${
              isBook ? "md:text-left" : "sm:text-left"
            } lg:text-lg 
           line-clamp-2  md:line-clamp-1 lg:max-w-full`}
          >
            {/* {title} {idealFor} */}
            {title?.replaceAll(
              "{{{{childName}}}}",
              idealFor
                ? idealFor.charAt(0).toUpperCase() +
                    idealFor.slice(1).toLowerCase()
                : ""
            )}
          </h3>
          {/* <p className="text-xs font-figTree text-gray-600 sm:text-left text-center  mb-0 lg:mb-3 xl:mb-0  ">
            {description?.split(" ").slice(0, 8).join(" ")}
            {description?.split(" ").length > 10 ? "..." : ""}
          </p>  */}
          <p
            className={`text-xs font-figTree text-black ${
              isBook ? " text-center md:text-left" : "sm:text-left"
            } text-center  mb-0 ${
              isSpace || isBook ? "" : "lg:mb-3"
            } xl:mb-0 line-clamp-2  md:line-clamp-2`}
          >
            {description}
          </p>

          <div
            className={`flex justify-center  ${isSpace ? "" : ""} ${
              isBook
                ? "hidden md:flex md:justify-start xl:mb-3"
                : "sm:justify-start"
            } gap-1 sm:gap-2`}
          >
            {name && (
              <p className="text-xs font-figTree text-black ">Name: {name}</p>
            )}
            {ageRange && (
              <p className={`text-xs font-figTree text-black  `}>
                Age: {ageRange}
              </p>
            )}
          </div>
        </div>

        {/* <div className=" flex items-center justify-center px-10 sm:block ">
          {" "}
          <button
            onClick={onPersonalise}
            className="absolute lg:relative w-32 sm:mx-0  lg:left-0 bottom-0 bg-gradient-to-r from-purple-500 to-pink-500 sm:w-36 hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition lg:mt-1"
          >
            {btnText || "Personalise"}
          </button>
        </div>  */}
        <div
          className={`flex items-center justify-center px-10 sm:px-0 ${
            isBook ? "md:block" : "sm:block"
          }`}
        >
          {" "}
          <button
            onClick={onPersonalise}
            className={`absolute xl:relative h-[40px] font-bold  rounded-[4px] ${
              isCart
                ? "[@media(min-width:375px)_and_(max-width:424px)]:w-40 sm:w-52"
                : isOrder
                ? "w-36  sm:w-[160px]"
                : "w-32  sm:w-[121px]"
            }   sm:mx-0  lg:left-0   bottom-0 bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree text-white ${
              isCart
                ? " [@media(min-width:1px)_and_(max-width:425px)]:text-[10px]  sm:text-sm"
                : " text-sm"
            } py-2 ${isCart ? "px-1" : "px-4"} sm:px-6 rounded transition `}
          >
            {btnText || "Personalize"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
