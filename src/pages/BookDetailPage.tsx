import { AccordionItem } from "@/components/ui/AccordionItem";
import ExploreSection from "@/components/ui/ExploreSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import PersonalizedStories from "@/components/ui/PersonalizedStories";
import * as Accordion from "@radix-ui/react-accordion";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import amex from "../assets/svgs/amex.svg";
import klarna from "../assets/svgs/klarna.svg";
import paypal from "../assets/svgs/paypal.svg";
import atm from "../assets/svgs/atm.svg";
import loadingImage from "../assets/images/purple.gif";

import {
  singleBookTemplate,
  reviews,
  faqsData,
} from "../../store/slices/bookTemplateSlice.js";
import { currencyList } from "../../store/slices/loginSlice.js";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useIsMobile } from "@/hooks/use-mobile.js";
import PopUpModal from "@/components/modals/PopUpModal.js";
import BasicLoader from "@/components/ui/basicLoader.js";
import GeoHelmet from "@/components/ui/GeoHelmet.js";
interface Review {
  name: string;
  text: string;
  rating: number; // out of 5, e.g., 4.5
}
const bookData = {
  title: "Boy Explores the World of Jobs",
  description:
    "What do people do when they grow up? From doctors and farmers to zookeepers and firefighters, this little kid is determined to figure out the important roles that people play in the big wide world.",
  features: [
    "For kids ages: 4-8 years",
    "Preview available before ordering",
    "Encourages learning and curiosity",
    "Upload your favorite photo of your child",
  ],
  price: {
    original: "$50.00",
    current: "$39.99",
  },
  details: {
    idealFor: "Boy",
    ageRange: "4 - 8 years old",
    characters: "Boys",
    genre: "Learning & Growth",
    pages: "40 Pages",
    shipping: "Standard, Express",
  },
  images: [
    "https://storage.wonderwraps.com/7aea9b6e-2156-4284-b3c8-230e67f7becc/conversions/7NPzg8hdQsuou1nniKisBqDQi3gAKK-metaMS5qcGc=--preview.jpg",
    "https://storage.wonderwraps.com/e47da17d-ad33-4bf1-8c14-9014f65c7779/conversions/zY0tzBEJ8f3EEsT3tzljrpeXyxI09g-metaMi5qcGc=--preview.jpg",
  ],
};
const faqItems = [
  {
    question: "How does StoryMagic work?",
    answer:
      "Upload your child's photo, choose from our beautiful templates or create from scratch, and we'll create a personalized storybook with your child as the main character!",
  },
  {
    question: "What age group are these books for?",
    answer:
      "Our stories are designed for children aged 3-12, with content that grows with your child and sparks their imagination.",
  },
];

const BookDetailPage: React.FC = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  useEffect(() => {
    dispatch(currencyList());
  }, []);

  const currencyData = useSelector((state) => state?.bookTemplate?.currency);

  useEffect(() => {
    if (currencyData?.currencyCode) {
      dispatch(
        singleBookTemplate({
          id: id,
          currencyCode: currencyData?.currencyCode,
        })
      );
    }
  }, [currencyData?.currencyCode]);

  useEffect(() => {
    dispatch(reviews({ bookTemplateId: id }));
  }, []);
  const singleBookTemplateData = useSelector(
    (state) => state?.bookTemplate?.singleBookTemplateData
  );
  const isLoading = useSelector(
    (state: any) => state?.bookTemplate?.isLoadingExplore
  );

  const reviewsList = useSelector((state) => state?.bookTemplate?.reviewsList);

  const guestData = useSelector(
    (state: any) => state?.auth?.guestData?.access?.token
  );
  const reviewsData = reviewsList?.results || [];

  // const [selectedImage, setSelectedImage] = useState(
  //   singleBookTemplateData?.coverImage
  // );
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (singleBookTemplateData?.templateChapters?.length) {
      setSelectedImage(singleBookTemplateData.templateChapters[0]);
    }
  }, [singleBookTemplateData]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {}, [guestData]);
  const handlePersonalize = (book) => {
    navigate("/setup", {
      state: {
        selectedBook: book,
        flow: "template",
        id,
        ageRange: singleBookTemplateData?.ageRange,
        idealFor: singleBookTemplateData?.idealFor,
        bookTemplateId: singleBookTemplateData?.id,
      },
    });
  };
  useEffect(() => {
    localStorage.removeItem("id");
  }, []);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar
              key={i}
              className={`text-4xl ${i < rating ? "" : "text-gray-300"}`}
            />
          ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(faqsData());
  }, []);

  const faqsDataList = useSelector((state) => state?.bookTemplate?.faqsRes);
  const faqsListing = faqsDataList?.data;
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [openPop, setOpenPop] = useState(false);
  function calculateDiscountedPrice(
    price: number,
    discountPercent: number
  ): number {
    const discount = (price * discountPercent) / 100;
    return price - discount;
  }
  const thumbnailRefs = useRef([]);
  const thumbnailContainerRef = useRef(null);

  const scrollThumbnailIntoView = (index) => {
    if (thumbnailRefs.current[index] && thumbnailContainerRef.current) {
      thumbnailRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };
  const handleWheel = (e) => {
    e.preventDefault();

    // Slice only the first 5 chapters
    const chapters = singleBookTemplateData?.templateChapters || [];
    const currentIndex = chapters.indexOf(selectedImage);

    if (e.deltaY > 0) {
      // Scroll down → next image
      if (currentIndex < chapters.length - 1) {
        setLoaded(false);
        setSelectedImage(chapters[currentIndex + 1]);
        scrollThumbnailIntoView(currentIndex + 1);
      }
    } else {
      // Scroll up → previous image
      if (currentIndex > 0) {
        setLoaded(false);
        setSelectedImage(chapters[currentIndex - 1]);
        scrollThumbnailIntoView(currentIndex - 1);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("English");
  const dropdownRef = useRef(null);

  const languages = [singleBookTemplateData?.language];
  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Select Language
  const handleSelect = (lang) => {
    setSelected(lang);
    setIsOpen(false);
  };
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );
  const location = useLocation();

  // Function 1: Create Product Schema with Reviews
  const createProductSchema = () => {
    if (!singleBookTemplateData) {
      return null;
    }

    const discountedPrice = calculateDiscountedPrice(
      singleBookTemplateData?.basePrice || 0,
      singleBookTemplateData?.discountPct || 0
    );

    const bookTitle = singleBookTemplateData?.title?.replaceAll(
      "{{{{childName}}}}",
      singleBookTemplateData?.idealFor
        ? singleBookTemplateData.idealFor.charAt(0).toUpperCase() +
            singleBookTemplateData.idealFor.slice(1).toLowerCase()
        : ""
    );

    return {
      "@type": "Product",
      "@id": `https://www.starmebooks.com/book/${id}#product`,
      name: bookTitle,
      description: singleBookTemplateData?.description,
      image:
        singleBookTemplateData?.coverImage ||
        singleBookTemplateData?.templateChapters?.[0]?.generatedImage,
      brand: {
        "@type": "Brand",
        name: "StarMe",
      },
      category: "Personalized Children's Books",
      offers: {
        "@type": "Offer",
        url: `https://www.starmebooks.com/book/${id}`,
        priceCurrency: currencyData?.currencyCode || "USD",
        price: discountedPrice,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      aggregateRating:
        singleBookTemplateData?.reviewCount > 0
          ? {
              "@type": "AggregateRating",
              ratingValue: singleBookTemplateData?.reviewAvg || 0,
              reviewCount: singleBookTemplateData?.reviewCount || 0,
            }
          : undefined,
      review:
        reviewsData?.length > 0
          ? reviewsData.map((review) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: review.name,
              },
              datePublished: review.createdAt || new Date().toISOString(),
              reviewBody: review.comment,
              reviewRating: {
                "@type": "Rating",
                ratingValue: review.rating,
                bestRating: 5,
                worstRating: 1,
              },
            }))
          : undefined,
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: singleBookTemplateData?.ageRange?.minAge || 0,
        suggestedMaxAge: singleBookTemplateData?.ageRange?.maxAge || 12,
      },
    };
  };

  // Function 2: Create FAQ Schema
  const createFAQSchema = () => {
    if (
      !faqsListing ||
      !Array.isArray(faqsListing) ||
      faqsListing?.length === 0
    ) {
      return null;
    }

    const allQuestions = [];

    faqsListing?.forEach((category) => {
      if (category.faqs && Array.isArray(category.faqs)) {
        category.faqs.forEach((faq) => {
          allQuestions.push({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          });
        });
      }
    });

    if (allQuestions.length === 0) {
      return null;
    }

    return {
      "@type": "FAQPage",
      "@id": `https://www.starmebooks.com/book/${id}#faq`,
      mainEntity: allQuestions,
    };
  };

  // Function 3: Create BreadcrumbList Schema
  const createBreadcrumbSchema = () => {
    const bookTitle = singleBookTemplateData?.title?.replaceAll(
      "{{{{childName}}}}",
      singleBookTemplateData?.idealFor
        ? singleBookTemplateData.idealFor.charAt(0).toUpperCase() +
            singleBookTemplateData.idealFor.slice(1).toLowerCase()
        : ""
    );

    return {
      "@type": "BreadcrumbList",
      "@id": `https://www.starmebooks.com/book/${id}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: bookTitle,
          item: `https://www.starmebooks.com/book/${id}`,
        },
      ],
    };
  };

  return (
    <div className=" bg-purple-50 md:bg-white px-0  min-h-screen  ">
      <GeoHelmet
        title={singleBookTemplateData?.title?.replaceAll(
          "{{{{childName}}}}",
          singleBookTemplateData?.idealFor
            ? singleBookTemplateData.idealFor.charAt(0).toUpperCase() +
                singleBookTemplateData.idealFor.slice(1).toLowerCase()
            : ""
        )}
        description={singleBookTemplateData?.description}
        keywords={`personalized ${singleBookTemplateData?.idealFor} book, custom children's book, ${singleBookTemplateData?.title}`}
        image={
          singleBookTemplateData?.coverImage ||
          singleBookTemplateData?.templateChapters?.[0]?.generatedImage
        }
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            createProductSchema(),
            createFAQSchema(),
            createBreadcrumbSchema(),
            {
              "@type": "Organization",
              "@id": "https://www.starmebooks.com/#organization",
              name: singleBookTemplateData?.title?.replaceAll(
                "{{{{childName}}}}",
                singleBookTemplateData?.idealFor
                  ? singleBookTemplateData.idealFor.charAt(0).toUpperCase() +
                      singleBookTemplateData.idealFor.slice(1).toLowerCase()
                  : ""
              ),
              url: "https://www.starmebooks.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.starmebooks.com/logo.svg",
              },
            },
          ].filter(Boolean),
        }}
      />
      <div className="sticky top-0  z-40">
        <Navbar />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          {" "}
          <img src={loadingImage} alt="image" className="w-28" />{" "}
        </div>
      ) : (
        <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
          <div className="flex items-center  lg:items-start justify-center   lg:justify-start flex-col lg:flex-row sm:py-4 md:py-5 max-w-max mx-auto sm:gap-5 xl:gap-8 pl-0 sm:pl-8 ">
            <div className="hidden sm:flex lg:gap-8 gap-4 relative md:justify-center w-full max-w-[650px]">
              <div
                className="flex flex-col gap-2 overflow-y-auto scrollbar-hidden h-[530px] "
                ref={thumbnailContainerRef}
              >
                {singleBookTemplateData?.templateChapters?.map((img, idx) => {
                  return (
                    <div
                      ref={(el) => (thumbnailRefs.current[idx] = el)}
                      className={`!w-[80px] !h-[80px]  ${
                        selectedImage?.generatedImage === img?.generatedImage
                          ? "border-4 border-purple-500 rounded-md"
                          : "border-transparent border-4"
                      }`}
                    >
                      <img
                        key={idx}
                        src={img?.generatedImage}
                        alt={`thumbnail-${idx}`}
                        onClick={() => {
                          setLoaded(false);
                          setSelectedImage(img);
                          scrollThumbnailIntoView(idx);
                        }}
                        className={` ${
                          selectedImage?.generatedImage === img?.generatedImage
                            ? ""
                            : "rounded-md"
                        } h-full w-full  cursor-pointer object-cover `}
                      />
                    </div>
                  );
                })}
              </div>
              <div
                className="relative snap-start h-[526px] w-[526px] flex items-center justify-center bg-gray-100    "
                onWheel={handleWheel}
              >
                {!loaded && (
                  <div className="absolute inset-0 bg-purple-50 animate-pulse rounded-md flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <img
                  src={selectedImage?.generatedImage}
                  alt="selected book"
                  onLoad={() => setLoaded(true)}
                  loading="eager"
                  decoding="async"
                  className={`max-w-full max-h-full h-full object-cover transition-opacity duration-500 rounded-md ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-marcellus my-4 block sm:hidden text-center">
                {singleBookTemplateData?.title?.replaceAll(
                  "{{{{childName}}}}",
                  singleBookTemplateData?.idealFor
                    ? singleBookTemplateData.idealFor.charAt(0).toUpperCase() +
                        singleBookTemplateData.idealFor.slice(1).toLowerCase()
                    : ""
                )}
              </h1>
            </div>
            <div className="max-w-[100%] block sm:hidden relative ">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                autoplay={{ delay: 2000 }}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  // attach refs before init
                  if (swiper.params.navigation) {
                    const nav = swiper.params.navigation as any;
                    nav.prevEl = prevRef.current;
                    nav.nextEl = nextRef.current;
                  }
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                onActiveIndexChange={(ind) => {
                  if (isNaN(ind?.activeIndex)) {
                    ind.init();
                  }
                }}
              >
                {singleBookTemplateData?.templateChapters?.map((img, idx) => (
                  <SwiperSlide key={idx} className="h-full">
                    <img
                      src={img?.generatedImage}
                      alt={`thumbnail-${idx}`}
                      // onLoad={() => setLoaded(true)}
                      onClick={() => setSelectedImage(img)}
                      // loading="lazy"
                      // decoding="async"
                      className={`w-full h-full rounded-md cursor-pointer border-2  transition-opacity duration-500 `}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* ✅ Custom Buttons */}
              {/* Prev button */}

              <div
                ref={prevRef}
                className="custom-prev absolute top-1/2 left-[4px] -translate-y-1/2 z-50 
flex xl:hidden w-10 h-10 rounded-full
items-center justify-center bg-white/70 cursor-pointer shadow"
              >
                {/* <span className="text-gray-600 text-xl"> */}
                <svg
                  opacity="1"
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="1"
                    d="M0.488254 6.07526C0.582611 5.89382 0.73574 5.75283 0.933082 5.70026C3.51308 3.71929 6.0095 1.93675 8.90843 0.409784C9.649 0.0196845 10.275 1.13148 9.54305 1.548C7.56586 2.67355 5.7976 3.91178 4.05685 5.25866C7.0539 5.1786 10.0671 5.33119 13.0523 5.53527C14.9381 5.66413 14.9004 5.61034 16.7797 5.812C18.1456 6.00463 18.1487 6.01077 18.8156 6.28015C19.2143 6.41387 19.1407 6.98217 18.7177 7.00508C18.7436 7.00734 18.5596 7.06277 18.342 7.00508C16.5139 6.88269 14.6839 6.79992 12.8528 6.73306C9.91697 6.62577 6.96278 6.54677 4.02504 6.69909C6.23839 7.54885 8.36277 8.48137 10.4952 9.67809C11.2304 10.0906 10.5732 11.1846 9.83286 10.8004C6.92746 9.2923 4.05738 8.2754 0.944133 7.29031C0.624936 7.18921 0.454284 6.9579 0.399827 6.70098C0.322725 6.49663 0.335126 6.27125 0.488254 6.07526Z"
                    fill="#7C7C7C"
                  />
                </svg>
                {/* </span> */}
              </div>

              <div
                ref={nextRef}
                className="custom-next absolute top-1/2 right-[4px] -translate-y-1/2  z-50
flex xl:hidden w-10 h-10 rounded-full
items-center justify-center bg-white/70 cursor-pointer shadow"
              >
                <svg
                  opacity="1"
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="1"
                    d="M19.2559 6.07709C19.1611 5.89495 19.0074 5.7534 18.8093 5.70063C16.2193 3.71197 13.7132 1.9225 10.803 0.389594C10.0595 -0.00202131 9.4311 1.1141 10.1659 1.53224C12.1508 2.66216 13.9259 3.90521 15.6734 5.25732C12.6647 5.17694 9.63976 5.33012 6.64297 5.535C4.74984 5.66436 4.78772 5.61037 2.90109 5.8128C1.52987 6.00618 1.52678 6.01235 0.85732 6.28277C0.457044 6.41701 0.530928 6.98752 0.955562 7.01053C0.929535 7.01279 1.11431 7.06843 1.33275 7.01053C3.16796 6.88766 5.00506 6.80457 6.84324 6.73745C9.79051 6.62974 12.7562 6.55044 15.7053 6.70335C13.4834 7.55641 11.3507 8.49255 9.20999 9.69392C8.47195 10.108 9.13177 11.2063 9.87495 10.8206C12.7916 9.30663 15.6729 8.28578 18.7982 7.29686C19.1187 7.19537 19.29 6.96316 19.3446 6.70524C19.422 6.5001 19.4096 6.27384 19.2559 6.07709Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </div>
            </div>

            <div className="  w-full md:flex-1  mb-4 p-2 ">
              <h1 className="text-4xl font-marcellus mt-4  hidden sm:block text-black">
                {singleBookTemplateData?.title?.replaceAll(
                  "{{{{childName}}}}",
                  singleBookTemplateData?.idealFor
                    ? singleBookTemplateData.idealFor.charAt(0).toUpperCase() +
                        singleBookTemplateData.idealFor.slice(1).toLowerCase()
                    : ""
                )}
              </h1>
              <div className="p-0 sm:px-[15px] py-[12px] ql-editor flex flex-col text-black text-lg ">
                <p className="text-black text-lg max-w-2xl  leading-relaxed font-normal hidden sm:block font-figTree  ">
                  {singleBookTemplateData?.description}
                </p>

                <div className="pt-4 sm:pt-[26px pl-[27px]">
                  <ul className=" text-black mb-4 text-lg leading-normal list-none hidden sm:block !pl-0 rounded   ">
                    {[
                      `For kids ages: ${
                        singleBookTemplateData?.ageRange?.minAge || "-"
                      }-${
                        singleBookTemplateData?.ageRange?.maxAge || "-"
                      } years`,
                      "Preview available before ordering",
                      "Encourages learning and curiosity",
                      "Upload your favorite photo of your child",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start custom_ui ">
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap:2 sm:gap-4 sm:mb-12 font-figTree sm:mt-4 sm:px-0  justify-center sm:justify-start  flex-col sm:flex-row w-full ">
                  {isLoading ? (
                    <BasicLoader color={"fill-purple-500"} />
                  ) : (
                    <div className="flex items-center gap-1 sm:gap-3 ">
                      <span className="line-through text-stone-600 opacity-75 font-figTree  text-sm sm:text-2xl font-semibold">
                        {currencyData?.currencySymbol}{singleBookTemplateData?.basePrice}
                      </span>
                      <span className="text-2xl font-semibold text-black font-figTree">
                        {currencyData?.currencySymbol}
                        {calculateDiscountedPrice(
                          singleBookTemplateData?.basePrice || 0,
                          singleBookTemplateData?.discountPct || 0
                        )}
                      </span>
                    </div>
                  )}

                  <div className="sm:hidden block">
                    <span className="inline-block px-1 py-0 text-[10px] uppercase bg-gradient-to-r from-[#FE5558] to-[#EE0004] opacity-90 text-white font-figtree font-extrabold rounded-xl tracking-[2px]">
                      ENDING SOON
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600  mx-4 sm:mx-0 mt-6 border-t border-b   py-4 font-figTree text-center md:text-start ">
                <div>
                  <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">
                    Ideal For
                  </p>
                  <p className="text-sm font-medium text-black capitalize">
                    {singleBookTemplateData?.idealFor}
                  </p>
                </div>
                <div>
                  <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">
                    Age Range
                  </p>
                  <p className="text-sm font-medium text-black capitalize">
                    {singleBookTemplateData?.ageRange
                      ? `${singleBookTemplateData?.ageRange.minAge} - ${singleBookTemplateData?.ageRange.maxAge} years`
                      : "Age range not available"}
                  </p>
                </div>
                <div>
                  <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest ">
                    Characters
                  </p>
                  <p className="text-sm font-medium text-black capitalize">
                    {singleBookTemplateData?.customStoryDetails?.character}
                  </p>
                </div>
                <div>
                  <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">
                    Genre
                  </p>
                  <p className="text-sm font-medium text-black capitalize">
                    {bookData.details.genre}
                  </p>
                </div>
                <div>
                  <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">
                    Pages
                  </p>
                  <p className="text-sm font-medium text-black capitalize">
                    {singleBookTemplateData?.pages}
                  </p>
                </div>
                <div>
                  <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">
                    Shipping
                  </p>
                  <p className="text-sm font-medium text-black capitalize">
                    {singleBookTemplateData?.shippingModes?.join(", ")}
                  </p>
                </div>
              </div>

              <div className="mt-4 font-figTree relative px-4 sm:px-0">
                {/* <select className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none">
          <option>{singleBookTemplateData?.language}</option>
        </select> */}

                {/* //! new one added */}

                <div className="relative w-full" ref={dropdownRef}>
                  {/* Button */}
                  <div
                    className=" px-4 py-2 bg-white text-gray-700 cursor-pointer hover:border-gray-400 w-full border border-gray-200 rounded-lg p-2 text-sm text-left flex items-center justify-between focus:border-purple-300"
                    onClick={toggleDropdown}
                  >
                    <span>{selected}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-[100]">
                      {languages.map((lang) => (
                        <li
                          key={lang}
                          onClick={() => handleSelect(lang)}
                          className={`px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
                            selected === lang ? "bg-gray-50" : ""
                          }`}
                        >
                          <span>{lang}</span>
                          {selected === lang && (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Custom Dropdown Icon */}
                {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div> */}
              </div>
              <div
                className={`sm:mt-[16px] hidden sm:block  sm:relative sm:w-auto sticky  bottom-0 left-0 right-0 shadow-lg sm:shadow-none  px-4 sm:px-0 py-3 sm:py-0 z-10`}
              >
                <button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white
           font-bold py-3 sm:py-2 rounded-md text-sm font-figTree transition-colors h-[40px]"
                  onClick={() => {
                    handlePersonalize(singleBookTemplateData);
                  }}
                >
                  Personalize
                </button>
              </div>
            </div>
            <div
              className={`  block sm:hidden  w-full left-0 right-0 bottom-0 p-5 backdrop-blur-sm  sticky bg-white/30 z-10`}
            >
              <button
                className=" bg-gradient-to-r from-purple-500 to-pink-500
           font-bold py-3 sm:py-2 r font-figTree  h-10 inline-flex items-center justify-center  hover:shadow-lg    font-figtree rounded text-sm text-white transition ease-in-out duration-300 w-full px-8"
                onClick={() => {
                  handlePersonalize(singleBookTemplateData);
                }}
              >
                Personalize
              </button>
            </div>
            <div className=" block sm:hidden flex justify-center mx-auto space-x-1 mt-2">
              <img src={amex} alt="new-amex " className="w-10" />
              <img src={klarna} alt="new-klarna " className="w-10" />
              <img src={paypal} alt="new-paypal " className="w-10" />
              <img src={atm} alt="new-atm " className="w-10" />
            </div>
          </div>

          <div className="   px-4 md:px-4 mt-12">
            <PersonalizedStories />
          </div>
          <section className="  px-4 sm:px-0 py-10 max-w-max mx-auto">
            <h2 className="text-[28px] md:text-4xl font-marcellus text-center mb-6 text-black">
              Reviews
            </h2>

            {/* Average Rating Block */}
            <div className="bg-purple-100 rounded-lg py-4 px-6 text-center mb-10">
              <div className="flex justify-center text-yellow-400 text-2xl mb-2">
                <StarRating rating={singleBookTemplateData?.reviewAvg || 0} />
              </div>
              <p className="text-gray-800 font-figTree">
                Rated {singleBookTemplateData?.reviewAvg} out of{" "}
                {singleBookTemplateData?.reviewCount}
              </p>
            </div>

            {/* Reviews */}
            <div className="space-y-8">
              {reviewsData.map((review, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 pb-4 flex flex-col md:flex-row justify-between items-start gap-4"
                >
                  <div>
                    <h3 className="text-lg font-figTree text-black">
                      {review?.name}
                    </h3>
                    <p className="font-figTree mt-1 text-black">
                      {review.comment}
                    </p>
                  </div>
                  <div className="flex text-yellow-400 text-xl min-w-xl">
                    {Array.from({ length: 5 }, (_, idx) => {
                      if (idx < Math.floor(review.rating))
                        return <FaStar key={idx} />;
                      if (idx < review.rating)
                        return <FaStarHalfAlt key={idx} />;
                      return <FaRegStar key={idx} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className=" px-4 sm:px-0">
            <section className="">
              <div className="max-w-max  mx-auto">
                <div className="text-center lg:mt-[40px]">
                  <h2 className="lg:text-card-header text-[28px]  text-gray-900 lg:mb-4 mb-[32px] font-marcellus">
                    {isMobile ? "FAQ" : "Frequently Asked Questions"}
                  </h2>
                </div>
                {/* <div className="text-center  sm:mb-0 sm:mt-5">
            <div className="text-card-header  hidden  sm:block  text-gray-900 mb-0 font-marcellus">
              Frequently Asked Questions
            </div>
            <div className="text-card-header  block  sm:hidden text-black sm:mb-0 font-marcellus">
              FAQ
            </div>
          </div> */}
                {faqsListing?.slice(0, 1)?.map((item) => {
                  return (
                    <>
                      <div className="rounded-md ">
                        {/* <div className="text-2xl font-figTree font-semibold">
                    {item?.categoryName}
                  </div> */}
                        <div className="">
                          <Accordion.Root
                            type="single"
                            collapsible
                            className="w-full mx-auto"
                          >
                            {item?.faqs?.map((item, index) => {
                              return (
                                <div className="py-0">
                                  <AccordionItem
                                    key={index}
                                    type={`item-${index}`}
                                    title={item.question}
                                    content={item.answer}
                                    extra={item?.nextLine}
                                  />
                                </div>
                              );
                            })}
                          </Accordion.Root>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="lg:pb-[60px]">
                  <div
                    className="text-center text-sm font-figTree underline my-5"
                    onClick={() => navigate("/faqs")}
                  >
                    See All
                  </div>
                </div>
              </div>
            </section>
          </div>

          <ExploreSection />
          <div className=" mb-12 lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
            <Footer />
          </div>
        </div>
      )}

      {openPop && <PopUpModal openPop={openPop} setOpenPop={setOpenPop} />}
    </div>
  );
};

export default BookDetailPage;
