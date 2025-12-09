import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import face from "../../assets/svgs/face.svg";
import hat from "../../assets/svgs/hat.svg";
import sun from "../../assets/svgs/sun.svg";
import fullFace from "../../assets/svgs/fullFace.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  imageUploadHandle,
  guestLogin,
} from "../../../store/slices/loginSlice.js";
import { personalizationCreate } from "../../../store/slices/bookTemplateSlice.js";
import group from "../../assets/images/group.png";
import faceDemo from "../../assets/images/face-demo.jpg";
import { Info } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import right from "../../assets/svgs/right.svg";
import { cookie } from "../../utils/cookies.js";
import face1 from "../../assets/images/face1.png";
import face2 from "../../assets/images/face2.png";
import face3 from "../../assets/images/face3.png";
import face4 from "../../assets/images/face4.png";
import face5 from "../../assets/images/face5.png";
import face6 from "../../assets/images/face6.png";
import { useIsMobile } from "@/hooks/use-mobile.js";
import noFar from "../../assets/images/no-far-away.png";
import frontFacing from "../../assets/images/front-facing.png";
import coveringFace from "../../assets/images/covering-face.png";
import faceClear from "../../assets/images/face-clear.png";
import BasicLoader from "./basicLoader.js";
import { countryList, currencyList } from "../../../store/slices/loginSlice.js";
import { Helmet } from "react-helmet-async";
import axios from "axios";

interface FormValues {
  childName: string;
  childAge: string | number;
  childGender: string;
  originalImage: string;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

interface PersonalizationForm {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const guidelines = [
  { icon: face, alt: "Solo Face", label: "Solo & Front-Facing" },
  { icon: sun, alt: "Bright Pic", label: "Bright & Clear Pics" },
  {
    icon: hat,
    alt: "No Hats",
    label: (
      <>
        No Hats, Sunglasses,
        <br />
        or Filters
      </>
    ),
  },
  { icon: fullFace, alt: "Full Face", label: "Full Face, No Blur" },
];

const PersonalizationForm: React.FC<PersonalizationForm> = ({
  setStep,
  preview,
  setPreview,
}) => {
  // const [preview, setPreview] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isOpenTips, setIsOpenTips] = useState(false);
  const location = useLocation();
  const ageRange = location?.state?.ageRange;
  const dispatch = useDispatch();
  const image = useSelector((state: any) => state?.auth?.uploadImageLink);
  const profileData = useSelector((state: any) => state?.auth?.profile);
  const isLoading = useSelector((state: any) => state?.auth?.isImageUpload);
  const isAuthLoader = useSelector((state: any) => state?.auth?.isLoading);
  const uploadedImageUrl = image?.url?.split("?")[0] || "";
  const modelsLoaded = useRef(false);
  const { customTemplateCategoryIds } = location.state || {};
  const navigate = useNavigate();
  const loader = useSelector((state: any) => state?.bookTemplate?.isLoading);
  const token = cookie.get("token");
  const summaryData = localStorage.getItem("summary");
  const isMobile = useIsMobile();
  useEffect(() => {
    const loadModels = async () => {
      try {
        const isAllLoaded = await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(
            "https://justadudewhohacks.github.io/face-api.js/models"
          ),
          faceapi.nets.faceLandmark68Net.loadFromUri(
            "https://justadudewhohacks.github.io/face-api.js/models"
          ),
          faceapi.nets.faceRecognitionNet.loadFromUri(
            "https://justadudewhohacks.github.io/face-api.js/models"
          ),
        ]);
        modelsLoaded.current = true;
      } catch (err) {
        console.error("❌ Error loading models", err);
      }
    };
    loadModels();
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    // reset input value so the same file can be reselected
    event.target.value = "";

    if (!modelsLoaded.current) {
      setImageError("Face detection models are still loading. Please wait.");
      return;
    }

    setIsImageLoading(true);
    setImageError(null);

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setImageError("Only JPG and PNG files are allowed.");
      setIsImageLoading(false);
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setImageError("File size must be less than 10MB.");
      setIsImageLoading(false);
      return;
    }

    try {
      const img = await faceapi.bufferToImage(file);
      if (img.width < 400 || img.height < 400) {
        setImageError("Image resolution must be at least 400x400 pixels.");
        setIsImageLoading(false);
        return;
      }
      if (img.width > 6000 || img.height > 6000) {
        setImageError("Image resolution must not exceed 6000x6000 pixels.");
        setIsImageLoading(false);
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0);

      const detections = await faceapi.detectAllFaces(canvas);

      if (detections.length !== 1) {
        setImageError(
          "Please upload a clear SOLO, FRONT-FACING photo of the child."
        );
        setIsImageLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      setImageError(null);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFieldValue("originalImage", file);
      setIsImageLoading(false);
    } catch (error) {
      console.error("Face validation error:", error);
      setImageError("Face detection failed. Please try again.");
      setIsImageLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    childName: Yup.string()
      .required("Child's name is required")
      .max(
        25,
        "Your child's name is too long. For the best book layout, please use a shorter name or nickname."
      )
      .matches(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    // childAge: Yup.string().required("Child's age is required"),
    childAge: Yup.number()
      .test(
        "age-range",
        "Heads up! Your child's age isn't in the book's age range, so illustrations may look a bit different.",
        function (value) {
          if (!ageRange) return true; // Skip validation if no ageRange provided
          const { minAge, maxAge } = ageRange; // you can access external data here
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            Number.isNaN(value)
          )
            return false;
          return value >= minAge && value <= maxAge;
        }
      )
      .required("Child's age is required"),
    childGender: Yup.string().required("Gender is required"),
    originalImage: Yup.mixed().required("Photo is required"),
  });


  const currencyData = useSelector((state) => state?.bookTemplate?.currency);
  const countryGet = useSelector((state) => state?.bookTemplate?.country);
  const handleSubmitForm = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const file = values.originalImage;

    if (!file) {
      setImageError("Please upload a child image.");
      setSubmitting(false);
      return;
    }

    if (!modelsLoaded.current) {
      setImageError("Face detection models are still loading. Please wait.");
      setSubmitting(false);
      return;
    }
    // Face validation
    const img = await faceapi.bufferToImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(img, 0, 0);

    const detections = await faceapi.detectAllFaces(canvas);
    if (detections.length !== 1) {
      setImageError(
        "Please upload a clear SOLO, FRONT-FACING photo of the child."
      );
      setSubmitting(false);
      return;
    }

    setImageError(null);

    const payload = {
      key: file.name,
      contentType: file.type,
      file,
      onSuccess: (s3Url: string) => {
        const updateUploadedImageUrl = s3Url.split("?")[0] || "";
        const finalValues = {
          ...values,
          originalImage: updateUploadedImageUrl,
          currencyCode: currencyData?.currencyCode,
          customTemplateCategoryIds,
          ...(location?.state?.bookTemplateId && {
            bookTemplateId: location?.state?.bookTemplateId,
          }),
          ...(location?.state?.summary &&
            location?.state?.summary !== "undefined" &&
            location?.state?.summary !== null && {
              storySummary: location?.state?.summary,
            }),
        };

        dispatch(
          imageUploadHandle({
            imageUrl: s3Url,
            file,

            onSuccess: () => {
              if (currencyData?.currencyCode) {
                dispatch(
                  personalizationCreate({
                    ...finalValues,
                    onSuccess: (response) => {
                      setStep(3);
                      navigate(
                        `/setup/${
                          response?.data?.data?._id || response?.data?.data?.id
                        }`
                      );
                      localStorage.removeItem("summary");
                    },
                  })
                );
              }
            },
          })
        );
      },
      onError: (error: any) => {
        console.error("Image upload failed:", error);
        setImageError("Image upload failed. Please try again.");
      },
    };
    if (token) {
      dispatch(uploadImage(payload));
    } else {
      dispatch(
        guestLogin({       
            shipTo: countryGet?.countryCode,
          currency: currencyData?.currencyCode,

          onSuccess: () => {
            const token = cookie.get("token");
            if (token) {
              dispatch(uploadImage(payload));
            }
          },
        })
      );
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <Formik
        initialValues={{
          childName: "",
          childAge: "",
          childGender:
            location?.state?.idealFor === "boy"
              ? "boy"
              : location?.state?.idealFor === "girl"
              ? "girl"
              : "",
          originalImage: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          isValid,
          dirty,
        }) => (
          <Form
            className="space-y-6 !m-0  overflow-scroll scrollbar-hidden"
            style={{
              paddingBottom: window.innerHeight <= 600 ? "66px" : "0px",
            }}
          >
            <div className="text-center bg-[#FBF5FF] border border-dashed border-purple-400 rounded-md pt-6 ">
              {imageError && (
                <p className="text-red-600 font-semibold text-sm mb-2">
                  {imageError}
                </p>
              )}

              {preview ? (
                <div className="relative animate-fadeIn">
                  {/* <ImCross
                className="absolute cursor-pointer text-xl text-gray-600 [@media(min-width:375px)_and_(max-width:424px)]:right-20 right-28 md:right-[236px] lg:right-[125px] xl:right-[248px] hover:text-red-600 transition-colors"
                onClick={() => {
                  setPreview(null);
                  setFieldValue("originalImage", null);
                }}
              /> */}
                  <button
                    type="button"
                    className="absolute cursor-pointer [@media(min-width:375px)_and_(max-width:424px)]:right-20 right-28 md:right-[236px] lg:right-[125px] xl:right-[248px]  bg-white hover:bg-gray-50 w-6 h-6 md:w-10 md:h-10 p-1 rounded-full top-1 md:top-2"
                    onClick={() => {
                      setPreview(null);
                      setFieldValue("originalImage", null);
                    }}
                  >
                    <svg
                      className="w-full"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      ></path>{" "}
                    </svg>
                  </button>
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full shadow-lg"
                  />
                  <div className="flex flex-col md:flew-row items-center space-x-2 justify-center my-4">
                    <svg
                      className="w-8 md:w-6 h-8 md:h-6 text-purple-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="hidden md:block">
                      This image looks absolutely perfect
                    </span>
                    <div className="flex flex-col items-start gap-1 md:hidden">
                      <p className="font-figTree font-semibold text-[18px] leading-[21px] tracking-[0px] text-black text-center">
                        This image looks
                      </p>
                      <p className="font-figTree font-semibold text-[18px] leading-[21px] tracking-[0px] text-black text-center">
                        absolutely perfect
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* <div className="flex gap-3 bg-purple-50 p-2 items-center w-full justify-center h-25 object-cover">
                <div className="relative inline-block">
                  <img
                    src={faceDemo}
                    alt="child"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-green-500 object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414L8.414 15.414a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative inline-block">
                  <img
                    src={group}
                    alt="child"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-red-500 object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 8.586L13.536 5.05a1 1 0 111.414 1.414L11.414 10l3.536 3.536a1 1 0 01-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464a1 1 0 011.414-1.414L10 8.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}
                  <div className="font-figTree text-xs text-black font-semibold uppercase tracking-widest">
                    TIPS
                  </div>
                  <div className="flex flex-col  gap-x-2 gap-y-3 w-[80%] md:w-full mt-4 max-w-xs sm:max-w-sm mx-auto items-center">
                    <div className="flex space-x-3">
                      <img
                        src={face1}
                        alt="child"
                        className="lg:w-[65px] lg:h-[66px] w-[44px] h-[45px] object-cover"
                      />{" "}
                      <img
                        src={face2}
                        alt="child"
                        className="lg:w-[65px] lg:h-[66px] w-[44px] h-[45px] object-cover"
                      />{" "}
                      <img
                        src={face3}
                        alt="child"
                        className="lg:w-[65px] lg:h-[66px] w-[44px] h-[45px] object-cover"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <img
                        src={face4}
                        alt="child"
                        className="lg:w-[65px] lg:h-[66px] w-[44px] h-[45px] object-cover"
                      />{" "}
                      <img
                        src={face5}
                        alt="child"
                        className="lg:w-[65px] lg:h-[66px] w-[44px] h-[45px] object-cover"
                      />{" "}
                      <img
                        src={face6}
                        alt="child"
                        className="lg:w-[65px] lg:h-[66px] w-[44px] h-[45px] object-cover"
                      />
                    </div>
                  </div>
                </>
              )}
              {!preview && (
                <div className="border-t border-purple-400 rounded-xl md:rounded-t-xl md:rounded-b border-dashed border-primary mt-6 py-4 bg-white px-4">
                  {isImageLoading ? (
                    <div className="flex justify-center">
                      {" "}
                      <svg
                        className="animate-spin h-28 w-14 text-purple-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>{" "}
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>{" "}
                      </svg>{" "}
                    </div>
                  ) : (
                    <>
                      <div className="text-black font-figTree  font-medium pt-0">
                        Upload a photo of your child
                      </div>

                      <input
                        type="file"
                        id="image-upload"
                        accept="image/png, image/jpeg"
                        hidden
                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                        // disabled={!modelsLoaded.current || isImageLoading}
                      />
                      {/* ${
                    modelsLoaded.current
                      ? "from-purple-500 to-pink-500 cursor-pointer hover:bg-purple-700"
                      : "bg-gray-500 cursor-not-allowed"
                  } */}
                      {/* {
                    (!modelsLoaded.current || isImageLoading)  ?
                    <BasicLoader color={"fill-purple-500"} /> : */}

                      <>
                        {!preview && !isImageLoading && (
                          <label
                            htmlFor="image-upload"
                            className="flex justify-center"
                          >
                            <div
                              className={`mt-2 flex items-center justify-center gap-2 bg-gradient-to-r w-[168px] h-[40px] from-purple-500 to-pink-500 cursor-pointer hover:bg-purple-700
                        font-figTree text-white text-sm py-0 px-[24px] rounded transition font-normal`}
                            >
                              Choose Image
                              <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                ></path>
                              </svg>
                              {/* <MdOutlineFileUpload className="text-xl" /> */}
                            </div>
                          </label>
                        )}
                      </>
                    </>
                  )}

                  {/* } */}
                  <ErrorMessage
                    name="originalImage"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                  <div className="relative inline-block">
                    {isMobile ? (
                      <div onClick={() => setIsOpenTips(true)}>
                        <div className="flex items-center gap-2 h-10 rounded-xl border border-purple-300 px-4 mt-[8px]">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.83018 2.19203L9.54883 1.43168L9.26747 2.19203L8.7561 3.574C7.8822 5.93568 6.02016 7.79773 3.65847 8.67163L2.2765 9.183L1.51615 9.46436L2.2765 9.74571L3.65847 10.2571C6.02016 11.131 7.8822 12.993 8.7561 15.3547L9.26747 16.7367L9.54883 17.497L9.83018 16.7367L10.3416 15.3547C11.2155 12.993 13.0775 11.131 15.4392 10.2571L16.8212 9.74571L17.5815 9.46436L16.8212 9.183L15.4392 8.67163C13.0775 7.79773 11.2155 5.93568 10.3416 3.574L9.83018 2.19203ZM9.54883 14.8359C8.57788 12.3801 6.63306 10.4353 4.17725 9.46436C6.63306 8.49341 8.57788 6.54859 9.54883 4.09277C10.5198 6.54859 12.4646 8.49341 14.9204 9.46435C12.4646 10.4353 10.5198 12.3801 9.54883 14.8359Z"
                              fill="black"
                              stroke="black"
                              stroke-width="0.6"
                            ></path>
                          </svg>
                          <div className="font-figTree text-sm text-black text-center">
                            Photo Formats &amp; Dimensions Info
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer mt-3 rounded-md p-1 sm:p-0 border border-purple-300 sm:border-none"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <Info className="w-4 h-4 text-purple-600 font-figTree" />
                        <span className="font-normal text-sm">
                          Photo Formats and Dimensions Information
                        </span>
                      </div>
                    )}
                    {showTooltip && (
                      <div className="absolute top-8 left-0 z-10 w-[360px] bg-white border border-gray-200 shadow-xl rounded-md p-4">
                        <p className="mb-3 text-[12px] text-left text-gray-500 leading-snug">
                          Your child's photos are uploaded temporarily for use
                          and are not stored on our servers.
                        </p>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-[13px]">
                          {[
                            { label: "Format", value: "JPG, PNG" },
                            {
                              label: "Min. resolution",
                              value: "400 x 400 pixels",
                            },
                            { label: "Max. size", value: "10MB" },
                            {
                              label: "Max. resolution",
                              value: "6000 x 6000 pixels",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-left"
                            >
                              <span className="w-4 h-4 flex items-center justify-center bg-black rounded-full text-left">
                                <img
                                  src={right}
                                  alt="check"
                                  className="w-4 h-4"
                                />
                              </span>
                              <div>
                                <div className="text-gray-500 font-figTree font-medium">
                                  {item.label}
                                </div>
                                <div className="font-normal text-[#374151]">
                                  {item.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 z-0" />
                      </div>
                    )}
                  </div>
                  {/* {!preview && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-700">
              {guidelines.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img src={item.icon} alt={item.alt} className="h-6 mb-2" />
                  <span className="text-xs font-figTree">{item.label}</span>
                </div>
              ))}
            </div>
          )} */}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium font-figTree text-black">
                Gender
              </label>
              <Field
                as="select"
                name="childGender"
                className="w-full mt-1 border border-gray-300 rounded-[6px] px-3 py-2 text-black"
              >
                <option value="">Select gender</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </Field>
              <ErrorMessage
                name="childGender"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex flex-row gap-4">
              {/* <div className="flex-1">
                <label className="block text-sm font-medium font-figTree text-black">
                  Child's first name
                </label>
                <Field
                  type="text"
                  name="childName"
                  placeholder="e.g., Alex"
                  className="w-full mt-1 border border-gray-300  px-3 py-2 rounded-[6px]"
                />
                <ErrorMessage
                  name="childName"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div> */}
              <div className="flex-1">
                <label className="block text-sm font-medium font-figTree text-black">
                  Child's first name
                </label>
                <div className="relative">
                  <Field name="childName">
                    {({ field, form }) => {
                      const maxLength = 25;
                      const currentLength = field.value?.length || 0;
                      const isOverLimit = currentLength > maxLength;

                      return (
                        <>
                          <input
                            {...field}
                            type="text"
                            placeholder="e.g., Alex"
                            // className={`w-full mt-1 border px-3 py-2 rounded-[6px] pr-16 ${
                            //   isOverLimit || (form.touched.childName && form.errors.childName)
                            //     ? 'border-red-500'
                            //     : 'border-gray-300'
                            // }`}
                            className="w-full mt-1 border border-gray-300  px-3 py-2 rounded-[6px] pr-[55px]"
                          />
                          <span
                            className={`absolute right-3 top-[55%] -translate-y-1/2 text-sm font-medium ${
                              isOverLimit ? "text-red-500" : "text-gray-400"
                            }`}
                          >
                            {currentLength}/{maxLength}
                          </span>
                        </>
                      );
                    }}
                  </Field>
                </div>
                {errors.childName && (
                  <p
                    className={`text-sm mt-1 ${
                      errors?.childName?.includes("Your child's")
                        ? "text-[#CA8A04] text-xs font-extralight"
                        : "text-red-500 text-xs"
                    }`}
                  >
                    {errors.childName}
                  </p>
                )}
                {/* <ErrorMessage
    name="childName"
    component="p"
    className="text-orange-500 text-xs mt-1 font-figTree"
  /> */}
              </div>
              <div className="flex-1 mb-10 sm:mb-0">
                <label className="block text-sm font-medium font-figTree text-black">
                  Child's age
                </label>
                <Field
                  type="number"
                  name="childAge"
                  placeholder="Child's age"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const rawValue = e.target.value;
                    const value =
                      rawValue === "" ? "" : Math.max(0, Number(rawValue));
                    setFieldValue("childAge", value);
                    // setFieldTouched("childAge", true);
                  }}
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-[6px]"
                />
                {errors.childAge && (
                  <p
                    className={`text-sm mt-1 ${
                      errors?.childAge?.includes("Heads up!")
                        ? "text-[#CA8A04] text-xs font-normal"
                        : "text-red-500 text-xs"
                    }`}
                  >
                    {errors.childAge}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center py-2 fixed md:relative bottom-0 left-0 bg-white md:bg-transparent  lg:bg-transparent xl:bg-transparent 2xl:bg-transparent z-50 w-full md:px-0 !pb-0 px-[16px] lg:px-0">
              <button
                type="submit"
                disabled={!isValid || !dirty}
                className={`w-full sm:w-full text-sm h- ${
                  isValid && dirty
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white  hover:bg-purple-600"
                    : "lg:bg-gray-200 bg-[#C5C5C5] lg:text-[#9CA3AF] text-white"
                }
             py-2 rounded-md font-figTree mb-[16px] h-[40px]`}
              >
                {isAuthLoader || isLoading || loader ? (
                  <BasicLoader color={"fill-purple-500"} />
                ) : (
                  "Create Personalized Book"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {isOpenTips && (
        // <div className="fixed left-0 bottom-0 h-[626px] rounded-tl-[8px] rounded-tr-[8px] w-full bg-white z-50 shadow-lg transform transition-transform duration-[5000] ease-in-out border border-red-500">
        <div className="fixed bottom-0 inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="w-full max-w-md bg-white shadow-lg  rounded-2xl relative">
            <div className="w-full bg-white rounded-t-lg shadow-lg  relative py-6 space-y-4 max-h-[90vh] scrollbar-hidden overflow-scroll">
              <button
                className="absolute top-10 right-4 z-50"
                onClick={() => {
                  setIsOpenTips(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 8.586L4.707 3.293a1 1 0 00-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 001.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <div className="text-center px-8 space-y-4">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium  text-black text-center">
                    Please follow these tips and
                  </h1>
                  <h1 className="text-lg font-medium  text-black text-center">
                    information's before upload your photo.
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <img
                        src={noFar}
                        alt="Angled profile"
                        className="rounded-xl h-28 w-28 object-cover"
                      />
                      <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.872009 0.997161C1.43496 0.434215 2.34693 0.434215 2.90979 0.997161L8.55618 6.64356L14.2026 0.997161C14.7655 0.434215 15.6775 0.434215 16.2404 0.997161C16.8032 1.56011 16.8033 2.47208 16.2404 3.03494L10.594 8.68134L16.2404 14.3277C16.8033 14.8907 16.8033 15.8027 16.2404 16.3655C15.6774 16.9284 14.7654 16.9285 14.2026 16.3655L8.55618 10.7191L2.90979 16.3655C2.34684 16.9285 1.43487 16.9285 0.872009 16.3655C0.309152 15.8026 0.309062 14.8906 0.872009 14.3277L6.51841 8.68134L0.872009 3.03494C0.309062 2.47199 0.309062 1.56002 0.872009 0.997161Z"
                            fill="#DA1515"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        No far-away shots.No
                      </p>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        angled profiles
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <img
                        src={frontFacing}
                        alt="Front Facing"
                        className="rounded-xl h-28 w-28 object-cover"
                      />
                      <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md">
                        <svg
                          width="19"
                          height="16"
                          viewBox="0 0 19 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.8589 2.09766C18.8369 1.63576 18.617 1.21785 18.287 0.90992C17.9571 0.601988 17.5172 0.448022 17.0553 0.492012C16.5934 0.514008 16.1755 0.733959 15.8896 1.06389L7.09149 10.9617L3.06637 7.31051C2.73644 7.00258 2.29654 6.84861 1.83464 6.87061C1.37274 6.8926 0.954836 7.09056 0.668899 7.42049C0.360967 7.75041 0.207001 8.19032 0.228996 8.65222C0.250991 9.11411 0.448948 9.53202 0.778875 9.81796L6.07971 14.6349C6.38764 14.9208 6.80555 15.0748 7.22346 15.0748H7.31144H7.33343C7.77334 15.0528 8.19124 14.8549 8.52117 14.5029L18.463 3.30739C18.7269 2.97747 18.8809 2.53756 18.8589 2.09766Z"
                            fill="#49D636"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        Try Front Facing and
                      </p>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        Close up Photos
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <img
                        src={coveringFace}
                        alt="Angled profile"
                        className="rounded-xl h-28 w-28 object-cover"
                      />
                      <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.872009 0.997161C1.43496 0.434215 2.34693 0.434215 2.90979 0.997161L8.55618 6.64356L14.2026 0.997161C14.7655 0.434215 15.6775 0.434215 16.2404 0.997161C16.8032 1.56011 16.8033 2.47208 16.2404 3.03494L10.594 8.68134L16.2404 14.3277C16.8033 14.8907 16.8033 15.8027 16.2404 16.3655C15.6774 16.9284 14.7654 16.9285 14.2026 16.3655L8.55618 10.7191L2.90979 16.3655C2.34684 16.9285 1.43487 16.9285 0.872009 16.3655C0.309152 15.8026 0.309062 14.8906 0.872009 14.3277L6.51841 8.68134L0.872009 3.03494C0.309062 2.47199 0.309062 1.56002 0.872009 0.997161Z"
                            fill="#DA1515"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        Avoid Covering Faces
                      </p>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        or Obstructing Visibility
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <img
                        src={faceClear}
                        alt="Angled profile"
                        className="rounded-xl h-28 w-28 object-cover"
                      />
                      <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md">
                        <svg
                          width="19"
                          height="16"
                          viewBox="0 0 19 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.8589 2.09766C18.8369 1.63576 18.617 1.21785 18.287 0.90992C17.9571 0.601988 17.5172 0.448022 17.0553 0.492012C16.5934 0.514008 16.1755 0.733959 15.8896 1.06389L7.09149 10.9617L3.06637 7.31051C2.73644 7.00258 2.29654 6.84861 1.83464 6.87061C1.37274 6.8926 0.954836 7.09056 0.668899 7.42049C0.360967 7.75041 0.207001 8.19032 0.228996 8.65222C0.250991 9.11411 0.448948 9.53202 0.778875 9.81796L6.07971 14.6349C6.38764 14.9208 6.80555 15.0748 7.22346 15.0748H7.31144H7.33343C7.77334 15.0528 8.19124 14.8549 8.52117 14.5029L18.463 3.30739C18.7269 2.97747 18.8809 2.53756 18.8589 2.09766Z"
                            fill="#49D636"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        Keep Faces Clear and{" "}
                      </p>
                      <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                        Unobstructed!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-8 border-y py-2 gap-1 justify-center">
                <svg
                  className="w-5 h-5 text-sm text-zinc-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div className="flex flex-col items-start">
                  <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                    Your child's photos are uploaded temporarily for use and
                  </p>
                  <p className="font-figTree font-normal text-xs tracking-normal text-center text-gray-500">
                    are not stored on our servers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 px-12 ">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-zinc-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <p className="font-figTree text-xs font-medium leading-[18px] tracking-tight text-gray-500">
                      Formats
                    </p>
                    <p className="font-figTree text-xs font-normal leading-[18px] tracking-tight text-[#374151]">
                      JPG, PNG
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-zinc-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <p className="font-figTree text-xs font-medium leading-[18px] tracking-tight text-gray-500">
                      Max. size
                    </p>
                    <p className="font-figTree text-xs font-normal leading-[18px] tracking-tight text-black">
                      10MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-zinc-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <p className="font-figTree text-xs font-medium leading-[18px] tracking-tight text-gray-500">
                      Min. resolution
                    </p>
                    <p className="font-figTree text-xs font-normal leading-[18px] tracking-tight text-black">
                      400 x 400 pixels
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-zinc-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <p className="font-figTree text-xs font-medium leading-[18px] tracking-tight text-gray-500">
                      Max. resolution
                    </p>
                    <p className="font-figTree text-xs font-normal leading-[18px] tracking-tight text-black">
                      6000 x 6000 pixels
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalizationForm;
