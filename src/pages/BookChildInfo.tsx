"use client";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
// import book from "../assets/images/book.png";
import book from "../assets/images/cropped-book.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  personalizedBook,
  personalizedBookGet,
} from "../../store/slices/bookTemplateSlice.js";
import { useNavigate, useParams } from "react-router-dom";

interface BookChildInfoProps {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}
const BookChildInfo: React.FC<BookChildInfoProps> = ({ setStep }) => {
  const personalId = useSelector(
    (state) => state?.bookTemplate?.personalizedBookList
  );
  const loading = useSelector((state) => state?.bookTemplate?.isPersonalizedBook);

  const originalImage = personalId?.data?.originalImage;

  const { id } = useParams();
  useEffect(() => {
    dispatch(personalizedBookGet({ id }));
  }, [id]);

  const [previewImage, setPreviewImage] = useState(originalImage);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    from: Yup.string().required("Required"),
    message: Yup.string()
      .required("Required")
      .test("max-words", "Message cannot exceed 50 words", (value) =>
        value ? value.trim().split(/\s+/).length <= 50 : true
      ),
  });
  const dispatch = useDispatch();

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
    if (originalImage) {
      setPreviewImage(originalImage);
    }
  }, [originalImage]);

  // only convert once when originalImage is an http url
  useEffect(() => {
    if (originalImage && originalImage.startsWith("http")) {
      convertUrlToBase64(originalImage).then(setPreviewImage);
    }
  }, [originalImage]);
  const divRef = useRef<HTMLDivElement>(null);

  function dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  // Convert Blob -> File (if your API expects File)
  function dataURLtoFile(dataUrl: string, filename: string) {
    const blob = dataURLtoBlob(dataUrl);
    return new File([blob], filename, { type: blob.type });
  }
  const handleSubmit = async (values: typeof formik.values) => {
         
    const newValue = {
      id,
      // originalImage: originalImage?.split("?")[0],
      dedicationMessageFrom: values.from,
      dedicationMessage: values.message,
      // dedicationPageImage: uploadedUrl,
    };
    dispatch(
      personalizedBook({
        ...newValue,
        onSuccess: () =>
          navigate(`/setup/${id}`, {
            state: { currentStep: 3 },
          })
          
          // navigate(`/preview-setup/${id}`),
      })
    );

    // if (!divRef.current) return;

    // try {
    //   const dataUrl = await toPng(divRef.current, {
    //     cacheBust: true,
    //     backgroundColor: null,
    //   });
    //   const img = new Image();
    //   img.src = dataUrl;

    //   img.onload = () => {

    //     const cropWidth = img.width;
    //     const cropHeight = img.height;

    //     const croppedCanvas = document.createElement("canvas");
    //     croppedCanvas.width = cropWidth;
    //     croppedCanvas.height = cropHeight;

    //     const ctx = croppedCanvas.getContext("2d");
    //     if (ctx) {
    //       ctx.drawImage(
    //         img,
    //         0, // cropLeft
    //         0, // cropTop
    //         cropWidth,
    //         cropHeight, // source
    //         0,
    //         0,
    //         cropWidth,
    //         cropHeight // destination
    //       );
    //     }

    //     const finalDataUrl = croppedCanvas.toDataURL("image/png");
    //     const file = dataURLtoFile(finalDataUrl, "screenshot.png");

            
    //     const newValue = {
    //       id,
    //       // originalImage: originalImage?.split("?")[0],
    //       dedicationMessageFrom: values.from,
    //       dedicationMessage: values.message,
    //       // dedicationPageImage: uploadedUrl,
    //     };
    //     dispatch(
    //       personalizedBook({
    //         ...newValue,
    //         onSuccess: () => navigate(`/preview-setup/${id}`),
    //       })
    //     );
    //     // Dispatch upload
    //     // const payload = {
    //     //   key: file.name,
    //     //   contentType: file.type,
    //     //   file,
    //     //   onSuccess: (s3Url: string) => {
    //     //     const uploadedUrl = s3Url.split("?")[0] || "";
    //     //     dispatch(imageUploadHandle({ imageUrl: s3Url, file }));

        
    //     //   },
    //     // };
    //     // dispatch(uploadImage(payload));
    //   };
    // } catch (error) {
    //   console.error("Error generating image:", error);
    // }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        from: "Ran Shushan",
        image: null,
        message: `${personalId?.data?.childName || ""},

        May you continue to discover, learn, ask, and dream big. Every page in this book is a doorway to a new and wondrous world—just as you are a doorway to a world filled with love and joy.`,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 bg-white gap-8 lg:gap-14 p-4 md:p-6 lg:p-8 border border-gray-200">
          {/* Left Side */}
          <div
            ref={divRef}
            className="relative bg-no-repeat bg-cover bg-center rounded-xl p-4 sm:p-6 aspect-square  max-w-2xl "
            style={{
              backgroundImage: `url(${book})`,
              backgroundSize: "100% 100%",
              // minHeight: "680px",
            }}
          >
            <div className="relative z-10 text-center flex flex-col justify-center items-center w-full text-30px mb-10">
              <div className="mt-4">
                <div className=" w-36 h-36 sm:w-[110px] sm:h-[110px] rounded-full border-4 border-white mx-auto shadow-md overflow-hidden">
                  <img
                    src={previewImage}
                    crossOrigin="anonymous"
                    alt="Child"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {values.message?.trim() && (
                <div className="flex flex-col gap-3 w-[80%] mx-auto relative mt-2 text-center ">
                  {values.message.split("\n\n").map((paragraph, idx) => (
                    <div
                      key={idx}
                      className="relative z-10 p-[4px] rounded-[32px]  hover:scale-[1.03] transition-transform duration-300 "
                    >
                      <div className="bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#fff5b3] rounded-[26px] p-2 lg:p-4  shadow-inner text-center relative">
                        <p className="whitespace-pre-line font-unkempt text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 leading-relaxed tracking-wide">
                          {paragraph.trim()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {values.from?.trim() && (
              <div className="absolute bottom-2 sm:bottom-8 mt-2 left-1/2 text-center transform -translate-x-1/2 bg-[#d4fcfc] inline-block px-2 sm:px-6 py-2 rounded-full font-bold text-base sm:text-lg font-[Georgia] shadow-sm z-10">
                {values.from}
              </div>
            )}
          </div>
          {/* Right Side */}
          <Form className="space-y-6 border p-4 sm:p-6 rounded-lg ">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Uploader"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
            </div>
            {/* From */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From
              </label>
              <Field
                type="text"
                name="from"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="from"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Write the dedication here
              </label>
              <Field
                as="textarea"
                name="message"
                rows={8}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e: any) => {
                  const words = e.target.value.trim().split(/\s+/);
                  if (words.length <= 50) {
                    setFieldValue("message", e.target.value);
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-1">
                {values.message.trim().split(/\s+/).filter(Boolean).length} /
                max-words 50 words
              </p>
              <ErrorMessage
                name="message"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6 gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100 w-full"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-md hover:opacity-90 w-full"
              >
                {loading === true ? "Loading...." : "Next"}
                {/* Next */}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default BookChildInfo;
