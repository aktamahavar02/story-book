import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  previewGet,
  payment,
  personalizedBookGet,
} from "../../store/slices/bookTemplateSlice.js";
import { CardContent } from "@/components/ui/card.js";
import { Crown, Lock } from "lucide-react";

import Navbar from "@/components/ui/Navbar.js";
import { Loader } from "@/components/ui/Loader.js";
import book from "../assets/images/cropped-book.png";
import loadingImage from "../assets/images/purple.gif";
interface BookPreviewProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  from?: string;
  message?: string;
  divRef?: RefObject<HTMLDivElement>; // 👈 add this
  blurAfter?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const BookPreview: React.FC<BookPreviewProps> = ({ from, message, divRef }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(previewGet({ id: id }));
  }, []);

  const previewData = useSelector((state) => state?.bookTemplate?.previewList);
  const loading = useSelector((state) => state?.bookTemplate?.isPreview);

  const previewDataHeader = previewData?.data;
  const previewImage = previewData?.data?.images;
  const paymentPending = previewData?.data?.paymentStatus === "pending";

  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const selected = document.getElementById(`thumb-${selectedIndex}`);
    selected?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedIndex]);

  const handlePreviewMore = () => {
    dispatch(payment({ id: id }));
  };

  const paymentData = useSelector((state) => state?.bookTemplate?.payment);

  useEffect(() => {
    if (paymentData?.url) {
      window.location.href = paymentData?.url;
    }
  }, [paymentData?.url]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const [open, setOpen] = useState(false);

  const personalId = useSelector(
    (state) => state?.bookTemplate?.personalizedBookList
  );
  const bookData = personalId?.data;
  const imageShow = bookData?.originalImage;

  const [image, setImage] = useState(imageShow);

  const convertUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  useEffect(() => {
    if (typeof imageShow === "string" && imageShow.startsWith("http")) {
      convertUrlToBase64(imageShow).then(setImage);
    }
  }, [imageShow]);
  const lockAfter = 16;
  return (
    <>
      {/* <Navbar/> */}
      <div className="w-full h-full overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[500px] w-full">
            <div className="flex items-center justify-center mt-10"> <img src={loadingImage} alt="image" className="w-28" /> </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between p-4">
              <div>
                <div className=" text-xl font-figTree">
                  {previewDataHeader?.title}
                </div>
                <div className="text-sm font-figTree">
                  First Name : <strong>{previewDataHeader?.childName}</strong>{" "}
                  <span className="pl-2">
                    Age: {previewDataHeader?.childAge}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setOpen(!open)}
                  className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 w-36 hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition"
                >
                  Change
                </button>
                {open && (
                  <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 font-figTree text-sm">
                    <ul className="py-1 text-gray-700">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Change Language
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate("/setup", { state: 1 });
                        }}
                      >
                        Change Child Info
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Request Changes
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex  md:flex-row lg:flex-row p-4 gap-4 min-h-screen ">
              <div className=" w-[35%] lg:w-[25%] hidden md:block">
                <div className="grid grid-cols-1 gap-2 ">
                  {previewImage?.map((img, index) => {
                    const firstNum = (index - 1) * 2 + 1;
                    const secondNum = firstNum + 1;
                    const isLocked = index <= lockAfter;
                    return (
                      <div
                        key={index}
                        id={`thumb-${index}`}
                        onClick={() => {
                          setSelectedIndex(index);
                          scrollToSection(img?.chapterNumber);
                        }}
                        className={clsx(
                          "cursor-pointer  rounded-md ",
                          selectedIndex === index ? "border-purple-500" : "null"
                        )}
                      >
                        <div className="relative w-full  overflow-hidden">
                          {index === 0 && (
                            <div>
                              <div className="border border-gray-200">
                                <img
                                  src={img?.scaledTextOverlayImage}
                                  alt={`page-${index}`}
                                  className={clsx(
                                    "object-cover transition duration-300"
                                  )}
                                />
                                <p className="text-sm text-center text-gray-500  font-bold ">
                                  {index === 0 && "Cover"}
                                </p>
                              </div>
                              <div className="   border border-gray-200 mt-4">
                                <div
                                  className="relative bg-no-repeat bg-cover bg-center  p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
                                  style={{
                                    backgroundImage: `url(${book})`,
                                    backgroundSize: "100% 100%",
                                  }}
                                >
                                  {/* Top Section */}
                                  <div className="relative z-10 text-center flex flex-col justify-center items-center w-full text-30px mb-10">
                                    <div className="mt-4">
                                      <div className="w-[50px] h-[50px] rounded-full border-4 border-white mx-auto shadow-md overflow-hidden">
                                        <img
                                          src={image}
                                          crossOrigin="anonymous"
                                          alt="Child"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </div>

                                    {/* Message Section */}
                                    {message.trim() && (
                                      <div className="flex flex-col gap-2 mx-auto relative mt-2 text-center">
                                        {message
                                          .split("\n\n")
                                          .map((paragraph, idx) => (
                                            <div
                                              key={idx}
                                              className="relative z-10 p-[4px] rounded-[32px] hover:scale-[1.03] transition-transform duration-300"
                                            >
                                              <div className="bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#fff5b3]  rounded-[26px] p-2 shadow-inner text-center relative">
                                                <p className="whitespace-pre-line font-unkempt text-sx text-gray-700 leading-relaxed tracking-wide">
                                                  {paragraph.trim()}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* From Section */}
                                  {from.trim() && (
                                    <div className="absolute bottom-4  w-40 mt-2 left-1/2 text-center transform -translate-x-1/2 bg-[#d4fcfc] inline-block px-2 py-2 md:py-1  md:px-1  rounded-full font-bold font-[Georgia] shadow-sm z-10 text-xs">
                                      {from}
                                    </div>
                                  )}
                                </div>

                                <p className="text-sm text-center text-gray-500  font-bold mt-1 ">
                                  Dedication
                                </p>
                              </div>
                            </div>
                          )}

                          {index >= 1 && (
                            <div className="relative w-full bg-white  border border-gray-300 overflow-hidden z-10  ">
                              {/* Middle shadow line */}
                              <div className="absolute top-0 left-1/2  h-full z-20 -translate-x-1/2 pointer-events-none ">
                                <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                              </div>
                              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>

                              {/* ✅ Single Page Content */}
                              <div className="relative flex items-center justify-center">
                                <img
                                  src={img?.scaledTextOverlayImage}
                                  alt={`page${index}`}
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {index >= 1 && (
                          <div className="flex justify-between items-center gap-x-4 px-10  border border-gray-200 ">
                            <div className="text-center">{firstNum}</div>
                            <div className="text-center">{secondNum}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {paymentPending && (
                    <div className="mt-4">
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 relative w-full">
                        <img
                          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
                          alt="Locked Preview"
                          className="w-full h-full object-cover  filter blur-sm"
                        />
                        <div className="absolute inset-0 bg-black/30  flex items-center justify-center">
                          <div className="text-center text-white">
                            <Lock className="h-12 w-12 mx-auto mb-2" />
                            <p className="font-medium">More pages available!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Preview Image */}
              <div className=" grid grid-cols-1 sm:grid-cols-1 gap-4 place-items-center w-full ">
                {previewImage?.map((img, index) => {
                  const isLocked = index <= lockAfter;
                  return (
                    <div
                      className=" max-w-max mx-auto "
                      id={img?.chapterNumber}
                    >
                      {index === 0 && (
                        <>
                          <div
                            key={index}
                            className="relative  flex justify-center items-center   overflow-hidden shadow-md  aspect-square w-60 sm:w-80 md:w-80 lg:w-96 drop-shadow-lg"
                          >
                            <img
                              src={img?.scaledTextOverlayImage}
                              alt={`page-${index}`}
                              className={`w-full h-full object-cover`}
                            />
                          </div>

                          <div
                            ref={divRef}
                            className="relative bg-no-repeat bg-cover bg-center  p-4  aspect-square mt-4 w-60 sm:w-80  md:w-80 lg:w-96 drop-shadow-lg"
                            style={{
                              backgroundImage: `url(${book})`,
                              backgroundSize: "100% 100%",
                            }}
                          >
                            {/* Top Section */}
                            <div className="relative z-10 text-center flex flex-col justify-center items-center w-full text-30px mb-10">
                              <div className="mt-4">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-full border-4 border-white mx-auto shadow-md overflow-hidden">
                                  <img
                                    src={image}
                                    crossOrigin="anonymous"
                                    alt="Child"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Message Section */}
                              {message.trim() && (
                                <div className="flex flex-col gap-3 w-[80%] mx-auto relative mt-2 text-center mb-9">
                                  {message
                                    .split("\n\n")
                                    .map((paragraph, idx) => (
                                      <div
                                        key={idx}
                                        className="relative z-10 p-[4px] rounded-[32px] hover:scale-[1.03] transition-transform duration-300"
                                      >
                                        <div className="bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#fff5b3] rounded-[26px] p-2 lg:p-4 shadow-inner text-center relative">
                                          <p className="whitespace-pre-line font-unkempt text-base text-gray-700 leading-relaxed tracking-wide">
                                            {paragraph.trim()}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>

                            {/* From Section */}
                            {from.trim() && (
                              <div className="absolute bottom-8 mt-2 left-1/2 text-center transform -translate-x-1/2 bg-[#d4fcfc] inline-block px-2 sm:px-6 py-2 rounded-full font-bold text-xs font-[Georgia] shadow-sm z-10">
                                {from}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      {/* <img
                        src={img?.scaledTextOverlayImage}
                        alt={`page-${index}`}
                        // className={` w-full h-full object-cover   `}
                      /> */}

                      {/* <img src={img?.dedicationPageImage} alt="image"/> */}
                      {index >= 1 && (
                        <div className="relative w-[98%] bg-white  border border-gray-300 overflow-hidden z-10 drop-shadow-lg">
                          {/* Middle shadow line */}
                          <div className="absolute top-0 left-1/2  h-full z-20 -translate-x-1/2 pointer-events-none ">
                            <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                          </div>
                          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>

                          {/* ✅ Single Page Content */}
                          <div className="relative flex items-center justify-center">
                            <img
                              src={img?.scaledTextOverlayImage}
                              alt={`page${index}`}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}

                {paymentPending && (
                  <div className="w-[100%]">
                    <div>
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100  flex items-center justify-center mb-4 relative  w-[98%] ">
                        <img
                          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
                          alt="Page 5"
                          className="w-full h-full object-cover  filter blur-lg"
                        />
                        <div className="absolute inset-0 bg-black/30  flex items-center justify-center">
                          <div className="text-center text-white">
                            <Lock className="h-12 w-12 mx-auto mb-2" />
                            <p className="font-medium">More pages available!</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <button
                          onClick={handlePreviewMore}
                          className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 w-36 hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookPreview;
