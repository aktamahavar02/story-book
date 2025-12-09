import { data } from "./dummy";
import { useEffect, useRef, useState } from "react";
import blur from "../assets/images/blur.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import book from "../assets/images/cropped-book.png";
import blurLoading from "../assets/images/demoBlur.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import loadingPage from "../assets/images/purple.gif";
import { Check } from "lucide-react";
import { IoChevronBack } from "react-icons/io5";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDispatch, useSelector } from "react-redux";
import eye from "../assets/images/eye.svg";
import {
  personalizedBook,
  personalizedBookGet,
  userChapterSelect,
  addCart,
  userOrder,
} from "../../store/slices/bookTemplateSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import RequestSupportModal from "@/components/modals/RequestSupportModal.js";
import { confirm, previewBook } from "../../store/slices/bookTemplateSlice.js";
import { toPng } from "html-to-image";
import {
  uploadImage,
  imageUploadHandle,
} from "../../store/slices/loginSlice.js";
import { cookie } from "../utils/cookies.js";
import PaymentPopup from "@/components/modals/paymentPop.js";
import BasicLoader from "@/components/ui/basicLoader.js";
import fullBlur from "./../assets/images/fullpage-blur.png";
import ThreeDotMenu from "@/components/modals/ThreeDotMenu.js";
import { Helmet } from "react-helmet-async";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const PersonalizeBookChapter = ({ step, setStep }) => {
  const { id } = useParams();

  const [state, setState] = useState([]);
  const [paymentPop, setPaymentPop] = useState(false);

  const [imgSelect, setImgSelect] = useState({});

  useEffect(() => {
    cookie.remove("bookId");
  }, []);

  useEffect(() => {
    dispatch(personalizedBookGet({ id }));
  }, []);
  useEffect(() => {
    if (step === 3) {
      dispatch(previewBook({ id }));
    }
  }, []);

  const personalizedBookData = useSelector(
    (state) => state?.bookTemplate?.personalizedBookList?.data
  );
  const noShowingImage = personalizedBookData?.isCustomTemplate === false;

  const isPreviewLoading = useSelector(
    (state) => state?.bookTemplate?.isPreviewLoading
  );
  const confirmData = useSelector(
    (state) => state?.bookTemplate?.confirmData?.data?.isDedicationPageCreated
  );
  const previewBookList = useSelector(
    (state) => state?.bookTemplate?.previewBookData?.data
  );

  const normalDetails = step === 3 ? previewBookList : personalizedBookData;
  const listChapter =
    step === 3 ? previewBookList?.chapters : personalizedBookData?.chapters;
  const status = listChapter?.map((v) => {
    return v?.imageGenerationStatus;
  });
  const loadingStatus = status?.[0];
  const isLoading = useSelector((state: any) => state?.auth?.isImageUpload);
  const isAuthLoader = useSelector((state: any) => state?.auth?.isLoading);
  const isLoadingBook = useSelector(
    (state) => state?.bookTemplate?.isConfirmLoading
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let interval;

    if (
      personalizedBookData?.paymentStatus === "pending" &&
      personalizedBookData?.pollingStatus
    ) {
      interval = setInterval(() => {
        dispatch(personalizedBookGet({ id }));
      }, 2000);
    }

    // Stop polling if status becomes 'failed'
    if (personalizedBookData?.status === "failed") {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    personalizedBookData?.paymentStatus,
    personalizedBookData?.pollingStatus,
    personalizedBookData?.status,
    id,
  ]);

  useEffect(() => {
    if (
      personalizedBookData?.paymentStatus === "paid" &&
      !personalizedBookData?.fullyBookCompleted
    ) {
      const interval = setInterval(() => {
        dispatch(personalizedBookGet({ id }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [
    personalizedBookData?.paymentStatus,
    personalizedBookData?.fullyBookCompleted,
    id,
  ]);

  const [hasShownPopup, setHasShownPopup] = useState(false);

  // useEffect(() => {
  //   const completedCount = state?.filter(
  //     (data) => data?.imageGenerationStatus === "complete"
  //   ).length;

  //   if (completedCount && personalizedBookData?.paymentStatus === "pending") {
  //     setPaymentPop(true);
  //     setHasShownPopup(true);
  //   }
  // }, [state, personalizedBookData?.paymentStatus, hasShownPopup]);
  const messagesImage = [
    "Just a moment while we bring your story to life...",
    "Your story is coming together...",
    "Hang on, your book is almost here...",
    "Your book is just one moment away...",
  ];
  // const [countImage, setCountImage] = useState(0);
  const [countImage, setCountImage] = useState(40);
  const percentage = Math.round(1 + ((40 - countImage) * 99) / 39); // Calculate percentage from 1% to 100% (when countImage=40, percentage=1; when countImage=1, percentage=100)
  const messageIn = Math.floor((40 - countImage) / 10) % messagesImage.length;
  const imageGen = messagesImage[messageIn];
  const dummyChapters = data?.data?.chapters;
  const [hasCountdownRun, setHasCountdownRun] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    // Stop countdown if book failed
    if (personalizedBookData?.status === "failed") {
      return;
    }

    // Only run countdown once and only if polling is active
    if (
      personalizedBookData?.pollingStatus &&
      !hasCountdownRun &&
      countImage > 0
    ) {
      const timer = setTimeout(() => {
        setCountImage((prev) => {
          if (prev === 1) {
            setHasCountdownRun(true); // Mark countdown as complete
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    countImage,
    personalizedBookData?.status,
    personalizedBookData?.pollingStatus,
    hasCountdownRun,
  ]);

  // Add new useEffect for rotating messages (independent of countdown):
  useEffect(() => {
    // Only rotate messages while polling is active
    if (
      personalizedBookData?.pollingStatus &&
      personalizedBookData?.status !== "failed"
    ) {
      const messageTimer = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messagesImage.length);
      }, 10000);

      return () => clearInterval(messageTimer);
    }
  }, [personalizedBookData?.pollingStatus, personalizedBookData?.status]);

  // Reset countdown when polling starts fresh (optional - if you want to reset on new book generation)
  useEffect(() => {
    if (personalizedBookData?.pollingStatus && hasCountdownRun) {
      // Reset for new generation
      setCountImage(40);
      setHasCountdownRun(false);
      setMessageIndex(0);
    }
  }, [personalizedBookData?.pollingStatus]);

  useEffect(() => {
    setLoading(true);
    if (personalizedBookData?.pollingStatus) {
      setState(dummyChapters?.slice(1));
      setImgSelect(dummyChapters?.[0]);
    } else {
      setImgSelect(listChapter?.[0]);
      setState(listChapter?.slice(1));
      setLoading(false);
    }
  }, [
    personalizedBookData?.pollingStatus,
    loadingStatus,
    previewBookList?.paymentStatus,
  ]);

  const selectImage = imgSelect?.selectedPageImage;
  const selectPicShow = imgSelect?.pageImageOptions?.find(
    (val) => val?.id === selectImage
  );

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (normalDetails?.childName) {
      setMessage(
        `${normalDetails.childName}.\n\nMay you continue to discover, learn, ask, and dream big. Every page in this book is a doorway to a new and wondrous world—just as you are a doorway to a world filled with love and joy.`
      );
    }
  }, [normalDetails?.childName]);
  const [parentMargins, setParentMargins] = useState({ left: "", right: "" });
  useEffect(() => {
    const updateMargins = () => {
      const parent = document.getElementById("parent-wrapper1");
      if (parent) {
        const styles = window.getComputedStyle(parent);
        setParentMargins({
          left: styles.marginLeft,
          right: styles.marginRight,
        });
      }
    };

    updateMargins();

    window.addEventListener("resize", updateMargins);

    return () => window.removeEventListener("resize", updateMargins);
  }, []);

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

  function dataURLtoFile(dataUrl: string, filename: string) {
    const blob = dataURLtoBlob(dataUrl);
    return new File([blob], filename, { type: blob.type });
  }
  const divRef = useRef<HTMLDivElement>(null);
  const [from, setFrom] = useState("Harry");

  const [errors, setErrors] = useState({ from: "", message: "" });

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { from: "", message: "" };

    if (!from.trim()) {
      newErrors.from = "Please enter your name.";
    }

    if (!message.trim()) {
      newErrors.message = "Please write a dedication message.";
    }

    setErrors(newErrors);
    const newValue = {
      id,
      dedicationMessageFrom: from,
      dedicationMessage: message,
    };
    dispatch(
      personalizedBook({
        ...newValue,
      })
    );
  };
  const navigator = useNavigate();

  const handlePreviewMore = async () => {
    if (normalDetails?.paymentStatus === "paid") {
      // dispatch(
      //   confirm({
      //     dedicationPageImage: "",
      //     // ...newValue,
      //     onSuccess: () => {
      //       setStep(3);
      //     },
      //   })
      // );

      // setStep(3);
      // localStorage.setItem("preview", "3");

      if (!divRef.current) {
        console.error("divRef is null");
        return;
      }

      try {
        const node = divRef.current.cloneNode(true) as HTMLElement;
        document.body.appendChild(node);
        const dataUrl = await toPng(divRef.current, {
          cacheBust: true,
          backgroundColor: null,
          skipFonts: true,
          pixelRatio: 2,
        });
        document.body.removeChild(node);

        if (!dataUrl.startsWith("data:image/png")) {
          console.error("Invalid dataUrl generated:", dataUrl.slice(0, 100));
          return;
        }

        const blob = await fetch(dataUrl).then((res) => res.blob());
        const bitmap = await createImageBitmap(blob);

        const cropWidth = bitmap.width;
        const cropHeight = bitmap.height;
        const targetWidth = 1024;
        const targetHeight = 1024;

        const croppedCanvas = document.createElement("canvas");
        croppedCanvas.width = targetWidth;
        croppedCanvas.height = targetHeight;

        const ctx = croppedCanvas.getContext("2d");
        if (ctx) {
          // ctx.drawImage(bitmap, 0, 0, cropWidth, cropHeight);
          const scale = Math.min(
            targetWidth / bitmap.width,
            targetHeight / bitmap.height
          );
          const x = (targetWidth - bitmap.width * scale) / 2;
          const y = (targetHeight - bitmap.height * scale) / 2;
          ctx.drawImage(
            bitmap,
            x,
            y,
            bitmap.width * scale,
            bitmap.height * scale
          );
          // ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
        }

        const finalDataUrl = croppedCanvas.toDataURL("image/png");

        const file = dataURLtoFile(finalDataUrl, "screenshot.png");

        // Dispatch upload
        const payload = {
          key: file.name,
          contentType: file.type,
          file,
          onSuccess: (s3Url: string) => {
            const uploadedUrl = s3Url.split("?")[0] || "";
            dispatch(
              imageUploadHandle({
                imageUrl: s3Url,
                file,
                onSuccess: () => {
                  const newValue = {
                    dedicationPageImage: uploadedUrl,
                    // personalizedBookId: personalizedBookData?.id,
                    id,
                  };

                  // dispatch(
                  //   userOrder({
                  //     ...newValue,
                  //     id: orderId,
                  //     onSuccess: () => {
                  //       localStorage.removeItem("preview");
                  //       navigate("/");
                  //     },
                  //   })
                  // );
                  dispatch(
                    confirm({
                      ...newValue,
                      onSuccess: () => {
                        dispatch(previewBook({ id }));
                        setStep(3);
                      },
                    })
                  );
                },
              })
            );
          },
        };

        dispatch(uploadImage(payload));
      } catch (error) {
        console.error("Error generating image:", error);
      }
    } else {
      setPaymentPop(true);
    }
  };
  const [image, setImage] = useState(personalizedBookData?.originalImage);

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
    if (
      typeof personalizedBookData?.originalImage === "string" &&
      personalizedBookData?.originalImage.startsWith("http")
    ) {
      convertUrlToBase64(personalizedBookData?.originalImage).then(setImage);
    }
  }, [normalDetails?.originalImage]);

  const orderId = localStorage.getItem("orderId");

  const handleConfirm = async () => {


    dispatch(
      userOrder({
     
        id: orderId,
        onSuccess: () => {
          localStorage.removeItem("preview");
          navigate("/");
        },
      })
    );
  
  };

  const handlePayment = () => {
    dispatch(
      addCart({
        id: normalDetails?.id,
        isBookInCart: true,
        onSuccess: () => {
          navigate("/cart");
          localStorage.setItem("paymentPop", false);
        },
      })
    );
  };
  const [imageLoaded, setImageLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState({});
  const [chapterImageLoaded, setChapterImageLoaded] = useState({});
  const popUpClose = localStorage.getItem("paymentPop");

  useEffect(() => {
    // Wait until chapters are loaded
    if (!state || state.length === 0) return;

    const targetId = "chapter-3";
    const target = document.getElementById(targetId);

    if (!target) {
      console.log("Chapter 3 element not found in DOM");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Chapter 3 intersecting:", entry.isIntersecting);
          if (
            entry.isIntersecting &&
            personalizedBookData?.pollingStatus === false &&
            popUpClose !== "true"
          ) {
            setPaymentPop(true);
          } else {
            // setPaymentPop(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [state, popUpClose]); // state dependency add kiya

  // USAGE NOTES:
// 1. This creates a schema for the personalized book as a "CreativeWork"
// 2. ImageGallery schema helps Google understand the book preview images
// 3. BreadcrumbList matches your mobile breadcrumb navigation
// 4. Character information is included (child's name and age)
// 5. The schema will only be created if normalDetails exists

// Replace your createBookSchema function with this corrected version:

const createBookSchema = () => {
  if (!normalDetails) return null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Book/Product Schema - The personalized book itself
      {
        "@type": "Book",
        "@id": `https://www.starmebooks.com/setup/${id}#book`,
        name: normalDetails?.bookTitle,
        description: `Personalized storybook featuring ${normalDetails?.childName} as the main character`,
        author: {
          "@type": "Organization",
          "@id": "https://www.starmebooks.com/#organization",
          name: "StarMe",
        },
        character: {
          "@type": "Person",
          name: normalDetails?.childName,
          age: normalDetails?.childAge,
        },
        genre: "Children's Literature",
        bookFormat: "Hardcover",
        inLanguage: "en",
        numberOfPages: normalDetails?.chapters?.length || 0,
        audience: {
          "@type": "PeopleAudience",
          suggestedMinAge: normalDetails?.childAge - 1,
          suggestedMaxAge: normalDetails?.childAge + 1,
        },
        image: listChapter
          ?.filter(chapter => {
            const selectedImage = chapter?.pageImageOptions?.find(
              (val) => val?.id === chapter?.selectedPageImage
            );
            return selectedImage?.generatedImage;
          })
          .map((chapter) => {
            const selectedImage = chapter?.pageImageOptions?.find(
              (val) => val?.id === chapter?.selectedPageImage
            );
            return selectedImage?.generatedImage;
          }),
        offers: {
          "@type": "Offer",
          url: `https://www.starmebooks.com/setup/${id}`,
          priceCurrency: "INR",
          price: "999",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "124",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Parent Review",
            },
            reviewBody: "Amazing personalized book! My child loves seeing themselves as the main character.",
            datePublished: "2024-10-15",
          },
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Happy Customer",
            },
            reviewBody: "Beautiful illustrations and great quality. Highly recommend!",
            datePublished: "2024-11-01",
          },
        ],
      },

      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `https://www.starmebooks.com/setup/${id}#webpage`,
        url: `https://www.starmebooks.com/setup/${id}`,
        name: `Personalize ${normalDetails?.bookTitle}`,
        description: `Preview and customize your personalized storybook for ${normalDetails?.childName}`,
        isPartOf: {
          "@id": "https://www.starmebooks.com/#website",
        },
        about: {
          "@id": `https://www.starmebooks.com/setup/${id}#book`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url:
            normalDetails?.originalImage ||
            "https://www.starmebooks.com/og-image.jpg",
          width: 1200,
          height: 630,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.starmebooks.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Book",
              item: "https://www.starmebooks.com/template-selection",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Child Info",
              item: "https://www.starmebooks.com/setup",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Personalize Your Book",
              item: `https://www.starmebooks.com/setup/${id}`,
            },
          ],
        },
      },

      // Organization Schema
      {
        "@type": "Organization",
        "@id": "https://www.starmebooks.com/#organization",
        name: "StarMe",
        url: "https://www.starmebooks.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.starmebooks.com/logo.svg",
          width: 250,
          height: 60,
        },
      },

      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://www.starmebooks.com/#website",
        url: "https://www.starmebooks.com",
        name: "StarMe Personalized Books",
        description:
          "Create custom kids' storybooks where your child becomes the hero",
        publisher: {
          "@id": "https://www.starmebooks.com/#organization",
        },
      },
    ],
  };
};
  return (
    <>

    <GeoHelmet
      title={`${normalDetails?.bookTitle} - Preview & Personalize | StarMe`}
      description={`Preview and customize ${normalDetails?.childName}'s personalized storybook. Choose cover images, add a dedication, and see your child become the hero of their own adventure.`}
      keywords={`personalized book preview, ${normalDetails?.childName} storybook, custom book chapters, book personalization, ${normalDetails?.bookTitle}`}
      image={normalDetails?.originalImage || selectPicShow?.generatedImage || "https://www.starmebooks.com/og-image.jpg"}
      type="website"
      schema={createBookSchema()}
    />

      {isPreviewLoading ? (
        <div className="flex items-center justify-center">
          <img src={loadingPage} alt="image" className="w-28" />
        </div>
      ) : (
        <div className="max-w-max mx-auto gap-4 rounded-lg sm:px-0">
          <div className="flex justify-between">
            <div className="w-full mt-[24px] sm:mt-0">
              <div className="relative flex items-center justify-center sm:justify-start  w-full">
                {/* Back Button */}
                <div
                  className="absolute left-4 block sm:hidden"
                  onClick={() => {
                    navigate(`/setup`, { state: 1 });
                  }}
                >
                  <IoChevronBack size={25} />
                </div>

                {/* Title */}
                <div className="text-2xl sm:text-xl font-figTree  text-center sm:text-start lg:max-w-full max-w-[180px] truncate">
                  {normalDetails?.bookTitle}
                </div>
                <div className="absolute right-0 top-1 block sm:hidden ">
                  <ThreeDotMenu onClick={() => setOpen(!open)} />
                </div>
                {/* <div
                  className="absolute right-4 block sm:hidden"
                  onClick={() => setOpen(!open)}
                >
                  <HiOutlineDotsVertical size={20} />
                </div> */}
              </div>

              <div className="text-sm font-figTree hidden sm:block">
                First Name : <strong>{normalDetails?.childName}</strong>{" "}
                <span className="pl-2">Age: {normalDetails?.childAge}</span>
              </div>
            </div>

            <div className="hidden sm:block">
              <button
                onClick={() => setOpen(!open)}
                className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 w-36 hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition"
              >
                Request Changes
              </button>
            </div>
          </div>
          <div className="flex mt-8  gap-0  sm:gap-8  ">
            <div className="hidden  sm:block  w-full sm:max-w-64 ">
              <div>
                <div className="flex justify-center max-w-60 mx-auto border-2 border-purple-500 rounded-[4px]">
                  <div className=" w-16 md:w-28 ">
                    <div
                    // style={{
                    //   filter: "drop-shadow(-12px 12px 8px rgba(0, 0, 0, 0.5))",
                    //   transform: "perspective(1000px) rotateY(3deg)",
                    // }}
                    >
                      <div className="relative w-full h-full">
                        {loading ? (
                          <img
                            src={blurLoading}
                            alt="cover"
                            className="blur-sm"
                          />
                        ) : (
                          <img
                          src={selectPicShow?.generatedImage}

                            alt="cover"
                            className="bg-gray-200 aspect-square w-full h-full object-cover block transition-opacity duration-500"
                            onClick={() => {
                              scrollToSection(selectPicShow?.id);
                            }}
                          />
                        )}
                        <div className="absolute top-0 h-full bg-white/50 blur-sm left-0 w-2 "></div>
                        <div className="absolute top-0 h-full bg-black/10 left-[3%] w-[2.5px]"></div>
                        <div className="absolute top-0 h-full bg-black/20 blur-sm left-[3%] w-2"></div>
                      </div>
                    </div>
                    <p className="text-[12px] text-center text-black  font-figTree py-1">
                      Cover
                    </p>
                  </div>
                </div>

                <div>
                  {state?.map((item, idx) => {
                    const findSelect = item?.pageImageOptions?.find(
                      (val) => val?.id === item?.selectedPageImage
                    );

                    const firstNum = idx * 2 + 1;
                    const secondNum = firstNum + 1;

                    return (
                      <div
                        key={idx}
                        className="my-6 border border-white rounded-[4px]"
                      >
                        <div className="h-[80px] md:h-auto  flex md:block items-center">
                          {findSelect?.scaledTextOverlayImage ? (
                            <div className="relative w-full flex justify-center items-center">
                              <div className="relative w-full">
                                <div className="absolute top-0 left-1/2 w-20 h-full -translate-x-1/2 z-10 pointer-events-none">
                                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_80%)] opacity-30"></div>
                                </div>
                                <div className="absolute inset-0 blur-xl bg-black/10 translate-x-2 translate-y-2 z-0"></div>

                                <div className="relative w-full bg-white shadow-2xl border  h-full overflow-hidden z-10 ">
                                  <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 pointer-events-none">
                                    <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                                  </div>

                                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>

                                  <img
                                    src={findSelect?.scaledTextOverlayImage}
                                    alt="Open Book Spread"
                                    className="w-full h-full object-contain object-center"
                                    onClick={() => {
                                      scrollToSection(item?.chapterNumber);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="relative w-full  flex justify-center items-center"
                              onClick={() => {
                                scrollToSection(item?.chapterNumber);
                              }}
                            >
                              <div className="relative w-full">
                                <div className="relative w-full  shadow-2xl border h-full  overflow-hidden z-10">
                                  <img
                                    src={blur}
                                    alt="Open Book Spread"
                                    className="w-full h-full object-contain object-center  blur-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-center px-4 md:px-16 md:gap-4 font-figTree [@media(min-width:700px)_and_(max-width:767px)]:pt-10 py-1">
                          <div className="text-center text-xs">{firstNum}</div>
                          <div className="text-center text-xs">{secondNum}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className=" w-full sm:max-w-6xl  ">
              <div className="flex justify-center items-center flex-col gap-5 sm:gap-6 ">
                <div>
                  <div className="mx-auto w-fit text-center text-2xl font-medium mb-2 font-figTree  bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                    Let's personalize your book
                  </div>
                  <div className="mx-auto w-fit text-center text-base font-medium text-gray-500 font-figTree">
                    Choose the perfect cover image
                  </div>
                </div>

                <div className="w-[300px] md:w-[288px] lg:w-[402px] xl:w-[538px] aspect-square ">
                  {/* <div
                className="
            relative mx-auto
            rounded-lg shadow-xl shadow-gray-400 overflow-hidden
            bg-white
          "
              >
                <div
                  className="
              absolute left-0 top-0 h-full w-4
              bg-gradient-to-r from-white/70 via-transparent to-transparent
              opacity-90
            "
                >
                  <div
                    className="
                absolute left-[7px] top-0 h-full w-[2px]
                bg-gradient-to-b from-white/80 via-white/40 to-transparent
                rounded-full opacity-90
              "
                  ></div>

                  <div
                    className="
                absolute inset-0
                bg-gradient-to-r from-white/40 to-transparent
              "
                  ></div>

                  <div
                    className="
                absolute left-0 top-0 h-full w-[1px]
                bg-black/70
              "
                  ></div>
                </div>

                <img
                  src={selectPicShow?.textOverlayImage}
                  alt="cover"
                  id={selectPicShow?.id}
                  className={`w-full h-full object-cover block transition-opacity duration-500`}
                />

                <div
                  className="
              absolute left-[7px] top-0 h-full w-[3px]
              bg-gradient-to-b from-white/70 via-white/20 to-transparent
              rounded-full opacity-60
            "
                ></div>
              </div> */}
                  {loading ? (
                    <div className="flex items-center w-full justify-center">
                      <div className="relative  w-full  max-w-xl h-[350px] sm:h-[600px] rounded-lg overflow-hidden shadow-xl">
                        {/* Background image */}
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            // src={PersonalizeId}
                            src={blurLoading}
                            alt="Background"
                            className="w-full h-full object-cover blur-lg"
                          />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                        {/* Content */}
                        <div className="relative flex flex-col items-center justify-center h-full px-4 text-center text-gray-200">
                          <h2 className="text-lg  mb-4 font-medium">
                            <AnimatePresence mode="wait">
                              <motion.h2
                                key={imageGen}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.6 }}
                                className="text-lg md:text-xl font-medium"
                              >
                                {messagesImage[messageIndex]}
                              </motion.h2>
                            </AnimatePresence>
                          </h2>

                          {/* Progress bar */}

                          <div className="w-3/4 bg-gray-200 rounded-full h-3 mb-6">
                            <div
                              className="bg-gradient-to-r from-pink-300 to-purple-300 h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>

                          {/* Counter */}
                          <div className="flex gap-2 items-center">
                            <p className="text-sm font-semibold font-figTree">
                              {personalizedBookData?.status === "failed"
                                ? "failed"
                                : "Please wait..."}
                            </p>
                            {countImage > 0 && (
                              <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full text-sm font-semibold">
                                {percentage}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        // boxShadow: "6px 8px 10px rgba(0, 0, 0, 0.4)"
                        filter: "drop-shadow(-12px 12px 8px rgba(0, 0, 0, .5))",
                        transform: "perspective(1000px) rotateY(3deg)",
                      }}
                    >
                      <div className="relative w-full h-full">
                        {/* <img
                      src={selectPicShow?.scaledTextOverlayImage}
                      alt="cover"
                      id={selectPicShow?.id}
                      className="bg-gray-200 aspect-square w-full h-full rounded-sm"
                    /> */}
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-sm flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                          </div>
                        )}

                        <img
                          src={selectPicShow?.generatedImage}
                          alt="cover"
                          id={selectPicShow?.id}
                          className={`bg-gray-200 aspect-square w-full h-full rounded-sm transition-opacity duration-500 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => setImageLoaded(true)}
                          onError={() => setImageLoaded(true)}
                        />

                        <div className="absolute top-0 h-full bg-white/50 blur-sm left-0 w-2 "></div>
                        <div className="absolute top-0 h-full bg-black/10 left-[3%] w-[2.5px]"></div>
                        <div className="absolute top-0 h-full bg-black/20 blur-sm left-[3%] w-2"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* {steps === 3 && ( */}
                {noShowingImage ? (
                  ""
                ) : (
                  <>
                    {!loading && (
                      <div
                        className={`flex gap-3 ${step === 3 ? "hidden" : ""} `}
                      >
                        {imgSelect?.pageImageOptions?.map((item, index) => (
                          <div
                            key={index}
                            className=" w-16 h-16 lg:w-24 lg:h-24 rounded-lg overflow-hidden"
                          >
                            <div className="relative w-full h-full">
                              {!thumbLoaded[item?.id] && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                                  <div className="w-4 h-4 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                                </div>
                              )}

                              <img
                                src={item?.generatedImage}
                                alt="Cover"
                                className={`w-full h-full object-cover transition-opacity duration-500 ${
                                  thumbLoaded[item?.id]
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                                onLoad={() =>
                                  setThumbLoaded((prev) => ({
                                    ...prev,
                                    [item.id]: true,
                                  }))
                                }
                                onError={() =>
                                  setThumbLoaded((prev) => ({
                                    ...prev,
                                    [item.id]: true,
                                  }))
                                }
                                onClick={() => {
                                  dispatch(
                                    userChapterSelect({
                                      id: imgSelect?.id,
                                      selectedPageImage: item?.id,
                                      onSuccess: () => {
                                        dispatch(
                                          personalizedBookGet({ id: id })
                                        );
                                      },
                                    })
                                  );
                                  setImgSelect((prev) => {
                                    return {
                                      ...prev,
                                      selectedPageImage: item?.id,
                                    };
                                  });
                                }}
                              />

                              {imgSelect?.selectedPageImage === item?.id && (
                                <div className="absolute inset-0 bg-purple-600/40 flex items-center justify-center">
                                  <div className="bg-white text-purple-600 p-2 rounded-full shadow-md">
                                    <Check className="h-6 w-6" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* )} */}

                <div className="font-medium text-2xl font-figTree  bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm mt-4">
                  Dedication Page
                </div>
                <div
                  className="flex flex-col sm:flex-row px-3 sm:px-0 w-full max-w-full   lg:max-w-full  
                xl:max-w-6xl h-full  rounded-2xl overflow-hidden mx-auto 
                [@media(min-width:639px)_and_(max-width:1120px)]:flex-col 
                [@media(min-width:426px)_and_(max-width:1120px)]:items-center 
                [@media(min-width:1px)_and_(max-width:425px)]:items-center"
                >
                  {/* Book preview */}
                  <div
                    className="flex-1 flex items-center justify-center  sm:pb-0 w-[430px]  h-[430px]
                  [@media(min-width:375px)_and_(max-width:425px)]:w-[351px] 
                  [@media(min-width:375px)_and_(max-width:425px)]:h-[351px]
                   [@media(min-width:1px)_and_(max-width:374px)]:w-[280px] 
                   [@media(min-width:1px)_and_(max-width:374px)]:h-[280px]
                  "
                  >
                    <div
                      ref={divRef}
                      className="relative  bg-no-repeat bg-cover bg-center p-4 lg:p-6 w-full h-full pb-10"
                      style={{
                        backgroundImage: `url(${book})`,
                        backgroundSize: "100% 100%",
                        height: "447px",
                      }}
                    >
                      {/* Top Section */}
                      <div className="relative z-10 text-center flex flex-col justify-center items-center w-full text-30px mb-10">
                        <div className="mt-4">
                          <div className=" w-24 h-24 md:w-16 md:h-16  lg:w-24 lg:h-24 rounded-full border-4 border-white mx-auto shadow-md overflow-hidden">
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
                            {message.split("\n\n").map((paragraph, idx) => (
                              <div
                                key={idx}
                                className="relative z-10 p-[4px] rounded-[32px] hover:scale-[1.03] transition-transform duration-300  "
                              >
                                <div className="bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#fff5b3] rounded-[26px] p-2 shadow-inner text-center relative">
                                  <p className="whitespace-pre-line font-unkempt text-sx text-gray-700 leading-relaxed tracking-wide line-clamp-4 lg:line-clamp-none">
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
                        <div className="absolute bottom-5 xl:bottom-10 w-40  left-1/2 text-center transform -translate-x-1/2 bg-[#d4fcfc] inline-block px-2 py-2 md:py-1 md:px-1 rounded-full font-bold font-[Georgia] shadow-sm z-10 text-base">
                          {from}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Section */}
                  <div
                    className="flex-1 border border-gray-100 p-4 flex flex-col 
                  rounded-tr-[15px] rounded-br-[15px] 
                  [@media(min-width:641px)_and_(max-width:1120px)]:rounded-[15px] w-[430px] h-[430px]
                  [@media(min-width:375px)_and_(max-width:425px)]:w-[351px] 
                  [@media(min-width:375px)_and_(max-width:425px)]:h-[351px]
                   [@media(min-width:1px)_and_(max-width:374px)]:w-[280px] 
                   [@media(min-width:1px)_and_(max-width:374px)]:h-[280px]
                   [@media(min-width:1px)_and_(max-width:425px)]:rounded-[15px]
                  "
                  >
                    <form
                      onSubmit={handleSubmit}
                      className=" flex flex-col flex-1 "
                    >
                      <div className="flex-1 space-y-4 overflow-y-auto">
                        {/* From */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            From
                          </label>
                          <input
                            type="text"
                            name="from"
                            value={from}
                            minLength={1}
                            maxLength={15}
                            className={`mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                              errors.from
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                            }
                        ${
                          step === 3
                            ? "pointer-events-none opacity-50 cursor-not-allowed"
                            : ""
                        }
                        `}
                            onChange={(e) => {
                              setFrom(e.target.value);
                              if (errors.from && e.target.value.trim()) {
                                setErrors((prev) => ({ ...prev, from: "" }));
                              }
                            }}
                          />
                          {errors.from && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.from}
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Write the dedication here
                          </label>
                          <textarea
                            name="message"
                            // rows={6}
                            value={message}
                            className={`mt-1 w-full border rounded-md p-2 focus:outline-none  ${
                              step === 3
                                ? "pointer-events-none opacity-50 cursor-not-allowed"
                                : ""
                            }
                          ${
                            errors.message
                              ? "border-red-500 focus:ring-red-400"
                              : "border-gray-300 focus:ring-blue-400"
                          }
                          min-h-[120px] sm:min-h-[150px] lg:min-h-[200px]  xl:min-h-[200px]
                        `}
                            onChange={(e) => {
                              const value = e.target.value;
                              const words = value.trim().split(/\s+/);
                              if (words.length <= 50) {
                                setMessage(value);
                                if (errors.message && value.trim()) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    message: "",
                                  }));
                                }
                              }
                            }}
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {message.trim().split(/\s+/).filter(Boolean).length}{" "}
                            / 50 words
                          </p>
                          {errors.message && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* {steps === 3 && ( */}
                      <div
                        className={`xl:mt-4 lg:mt-4 md:mt-1 ${
                          step === 3 ? "hidden" : ""
                        }`}
                      >
                        <button
                          type="submit"
                          className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-md hover:opacity-90 w-full `}
                        >
                          Save
                        </button>
                      </div>
                      {/* )} */}
                    </form>
                  </div>
                </div>

                <div className="font-medium  text-xl sm:text-2xl text-center lg:p-0 font-figTree  bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm mt-4">
                  Look inside the book and choose the perfect pictures for you
                </div>
                <div className="">
                  <div className="mb-32 sm:mb-0 sm:pb-14 pb-0">
                    {state?.map((item, idx) => {
                      const findSelect = item?.pageImageOptions?.find(
                        (val) => val?.id === item?.selectedPageImage
                      );
                      return (
                        <div
                          key={idx}
                          className="mb-8  px-2 sm:px-0 "
                          id={
                            personalizedBookData?.paymentStatus === "pending"
                              ? `chapter-${item?.chapterNumber}`
                              : null
                          }
                        >
                          <h2 className=" text-lg sm:text-xl font-bold font-figTree mb-1 pl-1 tracking-wide text-gray-900">
                            <span className="capitalize">
                              {item?.chapterType}
                            </span>{" "}
                            <span className="text-black">
                              {item?.chapterNumber}
                            </span>
                          </h2>

                          <div
                            className="relative w-full  flex justify-center items-center"
                            id={item?.chapterNumber}
                          >
                            {/* //! here one ***-*-*-***-*-*---------------- ***-*-*-***-*-*---------***-*-*-***-*-*---------***-*-*-***-*-*---------*/}
                            {(item?.chapterNumber === 1 ||
                              item?.chapterNumber === 2) &&
                            loading ? (
                              <>
                                <div className="relative w-full sm:w-full">
                                  <div className="relative w-full sm:w-full">
                                    <div className="absolute top-0 left-1/2 w-20 h-full -translate-x-1/2 z-10 pointer-events-none">
                                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_80%)] opacity-30"></div>
                                    </div>
                                    <div className="absolute inset-0 blur-xl rounded-2xl bg-black/10 translate-x-2 translate-y-2 z-0"></div>

                                    <div className="relative w-full rounded-[2px] shadow-2xl border overflow-hidden z-10">
                                      <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 pointer-events-none">
                                        <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                                      </div>
                                      {/* {findSelect?.scaledTextOverlayImage && (
                                    <div className="absolute top-0 left-1/2 w-[2px] sm:w-1 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>
                                  )} */}

                                      <div className="relative w-full bg-white rounded-[2px] shadow-2xl border overflow-hidden z-10">
                                        {/* FIXED: Loading overlay now fills entire container */}
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
                                          <div className="text-center p-0 w-full h-full flex items-center justify-center">
                                            <div className="relative w-full h-full rounded-[2px] overflow-hidden">
                                              {/* Background image - now fills entire space */}
                                              <div className="absolute inset-0">
                                                <img
                                                  src={fullBlur}
                                                  alt="Background"
                                                  className="w-full h-full object-cover blur-lg"
                                                />
                                              </div>

                                              {/* Overlay */}
                                              <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                                              {/* Content - centered vertically and horizontally */}
                                              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-gray-200">
                                                <h2 className="text-lg mb-4 font-medium">
                                                  <AnimatePresence mode="wait">
                                                    <motion.h2
                                                      key={imageGen}
                                                      initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                      }}
                                                      animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                      }}
                                                      exit={{
                                                        opacity: 0,
                                                        y: -10,
                                                      }}
                                                      transition={{
                                                        duration: 0.6,
                                                      }}
                                                      className="text-lg md:text-xl font-medium"
                                                    >
                                                      {
                                                        messagesImage[
                                                          messageIndex
                                                        ]
                                                      }
                                                    </motion.h2>
                                                  </AnimatePresence>
                                                </h2>

                                                {/* Progress bar */}
                                                <div className="w-3/4 max-w-md bg-gray-200 rounded-full h-3 mb-6">
                                                  <div
                                                    className="bg-gradient-to-r from-pink-300 to-purple-300 h-3 rounded-full transition-all duration-500"
                                                    style={{
                                                      width: `${percentage}%`,
                                                    }}
                                                  ></div>
                                                </div>

                                                {/* Counter */}
                                                <div className="flex gap-2 items-center">
                                                  <p className="text-sm font-semibold font-font-figTree">
                                                    {personalizedBookData?.status ===
                                                    "failed"
                                                      ? "failed"
                                                      : "Please wait..."}
                                                  </p>
                                                  {countImage > 0 && (
                                                    <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-sm font-semibold">
                                                      {percentage}%
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Main book image */}
                                        <img
                                          src={
                                            findSelect?.scaledTextOverlayImage ||
                                            blur
                                          }
                                          alt="Open Book Spread"
                                          className={`w-full h-auto object-cover transition-opacity duration-700 ${
                                            chapterImageLoaded[
                                              item?.chapterNumber
                                            ]
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }`}
                                          id={item?.chapterNumber}
                                          onLoad={() =>
                                            setChapterImageLoaded((prev) => ({
                                              ...prev,
                                              [item?.chapterNumber]: true,
                                            }))
                                          }
                                          onError={() =>
                                            setChapterImageLoaded((prev) => ({
                                              ...prev,
                                              [item?.chapterNumber]: true,
                                            }))
                                          }
                                        />

                                        {!findSelect?.scaledTextOverlayImage && (
                                          <>
                                            {/* Left blur */}
                                            <div className="absolute top-0 left-0 w-[51%] h-full bg-white/0 backdrop-blur-md"></div>

                                            {/* Right blur */}
                                            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/0 backdrop-blur-md"></div>

                                            {/* Overlay content left */}
                                            <div className="absolute top-5 sm:top-12 md:top-5 lg:top-20 xl:top-36 left-0 w-1/2 flex flex-col items-center [@media(min-width:375px)_and_(max-width:424px)]:top-[10px] [@media(min-width:320px)_and_(max-width:374px)]:top-[10px] text-center">
                                              <div className="lg:p-4 p-3 border border-black rounded-full flex items-center justify-center">
                                                <img
                                                  src={eye}
                                                  alt="eye"
                                                  className="lg:w-[38px] w-[30px] lg:h-[38px] h-[30px]"
                                                />
                                              </div>
                                              <p className="mt-1 sm:mt-4 px-2 lg:px-20 xl:px-20 py-2 text-black rounded-lg font-figTree text-sm md:text-sm xl:text-lg drop-shadow-lg sm:text-base [@media(min-width:1px)_and_(max-width:374px)]:text-[10px] [@media(min-width:1px)_and_(max-width:320px)]:leading-[13px]">
                                                The full book will be generated
                                                completely after your purchase.
                                                Go ahead and unlock it.
                                              </p>
                                            </div>

                                            {/* Overlay content right */}
                                            <div className="absolute top-5 sm:top-12 md:top-5 lg:top-20 xl:top-36 right-0 w-1/2 flex flex-col items-center text-center [@media(min-width:320px)_and_(max-width:374px)]:top-[10px] [@media(min-width:375px)_and_(max-width:424px)]:top-[10px]">
                                              <div className="lg:p-4 p-3 border border-black rounded-full flex items-center justify-center">
                                                <img
                                                  src={eye}
                                                  alt="eye"
                                                  className="lg:w-[38px] w-[30px] lg:h-[38px] h-[30px]"
                                                />
                                              </div>
                                              <p className="mt-1 sm:mt-4 px-2 lg:px-20 xl:px-20 py-2 text-black rounded-lg font-figTree text-sm md:text-sm xl:text-lg drop-shadow-lg sm:text-base [@media(min-width:1px)_and_(max-width:320px)]:leading-[13px] [@media(min-width:1px)_and_(max-width:374px)]:text-[10px]">
                                                The full book will be generated
                                                completely after your purchase.
                                                Go ahead and unlock it.
                                              </p>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="relative w-full sm:w-full">
                                <div className="relative  w-full sm:w-full">
                                  <div className="absolute top-0 left-1/2 w-20 h-full -translate-x-1/2 z-10 pointer-events-none">
                                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_80%)] opacity-30"></div>
                                  </div>
                                  <div className="absolute inset-0 blur-xl rounded-2xl bg-black/10 translate-x-2 translate-y-2 z-0 "></div>

                                  <div className="relative w-full  rounded-[2px] shadow-2xl border  overflow-hidden z-10">
                                    <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 pointer-events-none">
                                      <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                                    </div>
                                    {findSelect?.scaledTextOverlayImage && (
                                      <div className="absolute top-0 left-1/2 w-[2px]  sm:w-1 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>
                                    )}

                                    <div className="relative w-full bg-white rounded-[2px] shadow-2xl border overflow-hidden z-10">
                                      {!chapterImageLoaded[
                                        item?.chapterNumber
                                      ] &&
                                        findSelect?.scaledTextOverlayImage && (
                                          <>
                                            {/* Left page loading */}
                                            <div className="absolute top-0 left-0 w-1/2 h-full bg-gray-100 animate-pulse flex items-center justify-center z-20">
                                              <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                                            </div>

                                            {/* Right page loading */}
                                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-100 animate-pulse flex items-center justify-center z-20">
                                              <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                                            </div>
                                          </>
                                        )}
                                      <img
                                        src={
                                          findSelect?.scaledTextOverlayImage ||
                                          blur
                                        }
                                        alt="Open Book Spread"
                                        className={`w-full h-auto object-cover transition-opacity duration-700 ${
                                          chapterImageLoaded[
                                            item?.chapterNumber
                                          ]
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                        id={item?.chapterNumber}
                                        onLoad={() =>
                                          setChapterImageLoaded((prev) => ({
                                            ...prev,
                                            [item?.chapterNumber]: true,
                                          }))
                                        }
                                        onError={() =>
                                          setChapterImageLoaded((prev) => ({
                                            ...prev,
                                            [item?.chapterNumber]: true,
                                          }))
                                        }
                                      />

                                      {!findSelect?.scaledTextOverlayImage && (
                                        <div
                                          onClick={() => {
                                            setPaymentPop(true);
                                          }}
                                        >
                                          {/* Left blur */}
                                          <div className="absolute top-0 left-0 w-[51%] h-full bg-white/0 backdrop-blur-md"></div>

                                          {/* Right blur */}
                                          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/0 backdrop-blur-md"></div>
                                          {/* Overlay content left */}
                                          <div
                                            className="absolute top-5 sm:top-12 md:top-5  lg:top-20 xl:top-36 left-0 w-1/2 flex flex-col items-center [@media(min-width:375px)_and_(max-width:424px)]:top-[10px]
                                        [@media(min-width:320px)_and_(max-width:374px)]:top-[10px]
                                         text-center"
                                          >
                                            {/* <FaRegEyeSlash className="text-white text-xl sm:text-4xl    md:text-5xl   lg:text-6xl" /> */}
                                            <div className="lg:p-4 p-3 border border-black rounded-full flex items-center justify-center">
                                              <img
                                                src={eye}
                                                alt="eye"
                                                className="lg:w-[38px] w-[30px] lg:h-[38px] h-[30px]"
                                              />
                                            </div>
                                            <p
                                              className="mt-1 sm:mt-4 px-2 lg:px-20 xl:px-20 py-2 text-black rounded-lg font-figTree text-sm  md:text-sm xl:text-lg drop-shadow-lg sm:text-base  [@media(min-width:1px)_and_(max-width:374px)]:text-[10px]
                                          [@media(min-width:1px)_and_(max-width:320px)]:leading-[13px]"
                                            >
                                              The full book will be generated
                                              completely after your purchase. Go
                                              ahead and unlock it.
                                            </p>
                                          </div>

                                          {/* Overlay content right*/}
                                          <div
                                            className="absolute  top-5 sm:top-12 md:top-5  lg:top-20 xl:top-36 right-0 w-1/2 flex flex-col items-center text-center [@media(min-width:320px)_and_(max-width:374px)]:top-[10px]
                                          [@media(min-width:375px)_and_(max-width:424px)]:top-[10px]"
                                          >
                                            {/* <FaRegEyeSlash className="text-white  text-2xl sm:text-4xl md:text-5xl  lg:text-6xl" /> */}
                                            <div className="lg:p-4 p-3 border border-black rounded-full flex items-center justify-center">
                                              <img
                                                src={eye}
                                                alt="eye"
                                                className="lg:w-[38px] w-[30px] lg:h-[38px] h-[30px]"
                                              />
                                            </div>
                                            <p
                                              className="mt-1 sm:mt-4 px-2 lg:px-20 xl:px-20 py-2 text-black rounded-lg font-figTree text-sm  md:text-sm xl:text-lg drop-shadow-lg sm:text-base
                                           [@media(min-width:1px)_and_(max-width:320px)]:leading-[13px] [@media(min-width:1px)_and_(max-width:374px)]:text-[10px]
                                           "
                                            >
                                              The full book will be generated
                                              completely after your purchase. Go
                                              ahead and unlock it.
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* //! here one  ***-*-*-***-*-*---------***-*-*-***-*-*---------***-*-*-***-*-*--------- */}
                          </div>
                          {noShowingImage ? (
                            ""
                          ) : (
                            <>
                              {!loading && (
                                <div
                                  className={`flex gap-3 mt-4  justify-center  ${
                                    step === 3 ? "hidden" : ""
                                  }`}
                                >
                                  {item?.pageImageOptions?.map(
                                    (thumb, index) => {
                                      return (
                                        <button
                                          key={index}
                                          onClick={() => {
                                            dispatch(
                                              userChapterSelect({
                                                id: item?.id,
                                                selectedPageImage: thumb?.id,
                                                onSuccess: () => {
                                                  dispatch(
                                                    personalizedBookGet({
                                                      id: id,
                                                    })
                                                  );
                                                },
                                              })
                                            );
                                            setState((prev) => {
                                              const updated = prev?.map(
                                                (val, innerIdx) =>
                                                  idx === innerIdx
                                                    ? {
                                                        ...val,
                                                        selectedPageImage:
                                                          thumb?.id,
                                                      }
                                                    : val
                                              );
                                              return updated;
                                            });
                                          }}
                                          className={`w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300`}
                                        >
                                          <div className="relative w-full h-full">
                                            <img
                                              src={thumb?.generatedImage}
                                              alt="Thumbnail"
                                              className={`w-full h-full object-cover ${
                                                !item?.selectedPageImage &&
                                                "blur-sm"
                                              }`}
                                            />
                                            {item?.selectedPageImage ===
                                              thumb?.id && (
                                              <div className="absolute inset-0 bg-purple-600/40 flex items-center justify-center">
                                                <div className="bg-white text-purple-600 p-2 rounded-full shadow-md">
                                                  <Check className="h-2 w-2 sm:h-5 sm:w-5" />
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </button>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full sm:w-[100%] lg:w-[100%] 2xl:w-[80%] 
                flex flex-col sm:flex-col sm:items-center justify-center
                gap-2 px-0 py-4 bg-white sm:bg-white lg:bg-white/50 md:bg-white/50 xl:bg-white/50 2xl:bg-white/50
                "
                >
                  <div
                    className="px-4 xl:w-auto
                  "
                  >
                    <button
                      className={`bg-gradient-to-r border w-full sm:w-36 from-purple-500 to-pink-500  
               hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition h-[40px] 
                   ${
                     personalizedBookData?.pollingStatus
                       ? "cursor-not-allowed"
                       : "cursor-pointer"
                   }`}
                      // onClick={() => {
                      //   navigate("/cart");
                      // }}
                      disabled={personalizedBookData?.pollingStatus}
                      onClick={step === 3 ? handleConfirm : handlePreviewMore}
                    >
                      {step === 3 ? (
                        isLoading || isAuthLoader || isLoadingBook ? (
                          <BasicLoader />
                        ) : (
                          "Confirm"
                        )
                      ) : (
                        <>
                          {isLoading || isLoadingBook ? (
                            <BasicLoader />
                          ) : (
                            "Continue"
                          )}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Breadcrumbs */}
                  {isMobile && (
                    <div
                      className="flex justify-center sm:justify-end items-center lg:text-base 
                    [@media(min-width:320px)_and_(max-width:375px)]:text-xs [@media(min-width:376px)_and_(max-width:408px)]:text-xs [@media(min-width:1px)_and_(max-width:319px)]:text-[9px] font-figTree px-1 mt-4"
                    >
                      <nav className="flex flex-wrap text-gray-500 gap-2">
                        <span className="hover:text-gray-700 cursor-pointer underline whitespace-nowrap">
                          Book
                        </span>
                        <span>{">"}</span>
                        <span className="hover:text-gray-700 cursor-pointer underline whitespace-nowrap">
                          Child Info
                        </span>
                        <span>{">"}</span>
                        <span
                          className={`hover:text-gray-700 cursor-pointer ${
                            step === 3 ? "" : "font-semibold text-black"
                          } underline whitespace-nowrap`}
                        >
                          Personalize Your Book
                        </span>
                        <span>{">"}</span>
                        <span
                          className={`hover:text-gray-700 cursor-pointer underline whitespace-nowrap ${
                            step === 3 ? "font-semibold text-black" : ""
                          }`}
                        >
                          Preview
                        </span>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {open && <RequestSupportModal openPop={open} setOpenPop={setOpen} />}
          {paymentPop && (
            <PaymentPopup
              onCancel={() => {
                setPaymentPop(false);
                localStorage.setItem("paymentPop", true);
              }}
              onConfirm={handlePayment}
              isLoad={personalizedBookData?.pollingStatus}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PersonalizeBookChapter;
