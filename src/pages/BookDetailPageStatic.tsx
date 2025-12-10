import { AccordionItem } from "@/components/ui/AccordionItem";
import ExploreSection from "@/components/ui/ExploreSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import PersonalizedStories from "@/components/ui/PersonalizedStories";
import * as Accordion from "@radix-ui/react-accordion";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import amex from "../assets/svgs/amex.svg";
import klarna from "../assets/svgs/klarna.svg";
import paypal from "../assets/svgs/paypal.svg";
import atm from "../assets/svgs/atm.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useIsMobile } from "@/hooks/use-mobile.js";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

// Static book data
const staticBookData = {
  title: "Space Explorer Adventures",
  description: "Join our brave little explorer on an amazing journey through space! Discover planets, meet friendly aliens, and learn about the wonders of the universe in this exciting personalized adventure.",
  basePrice: 49.99,
  discountPct: 20,
  ageRange: { minAge: 4, maxAge: 8 },
  idealFor: "boy",
  language: "English",
  pages: "32 Pages",
  shippingModes: ["Standard", "Express"],
  customStoryDetails: { character: "Boys" },
  reviewAvg: 4.8,
  reviewCount: 127,
  templateChapters: [
    { generatedImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop" },
    { generatedImage: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=500&h=500&fit=crop" },
    { generatedImage: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=500&h=500&fit=crop" },
    { generatedImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=500&fit=crop" },
    { generatedImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=500&h=500&fit=crop" }
  ]
};

const staticReviews = [
  { name: "Sarah M.", comment: "My son absolutely loves this book! The space theme is perfect and the personalization makes it so special.", rating: 5 },
  { name: "Mike D.", comment: "Great quality and fast shipping. The illustrations are beautiful and engaging.", rating: 5 },
  { name: "Emma L.", comment: "Perfect gift for my nephew. He reads it every night before bed!", rating: 4 }
];

const staticFAQs = [
  {
    categoryName: "General",
    faqs: [
      {
        question: "How does personalization work?",
        answer: "Simply upload your child's photo and we'll create a custom storybook with them as the main character!"
      },
      {
        question: "What age group is this book for?",
        answer: "This book is designed for children aged 4-8 years old."
      },
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days."
      }
    ]
  }
];

const BookDetailPageStatic: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState(staticBookData.templateChapters[0]);
  const [loaded, setLoaded] = useState(true);
 
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef([]);
  const thumbnailContainerRef = useRef(null);

  const calculateDiscountedPrice = (price: number, discountPercent: number): number => {
    const discount = (price * discountPercent) / 100;
    return (price - discount).toFixed(2);
  };

  const handlePersonalize = () => {
    navigate("/setup", {
      state: {
        selectedBook: staticBookData,
        flow: "template",
        id,
        ageRange: staticBookData.ageRange,
        idealFor: staticBookData.idealFor,
        bookTemplateId: id,
      },
    });
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar
              key={i}
              className={`text-4xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
      </div>
    );
  };

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
    const chapters = staticBookData.templateChapters;
    const currentIndex = chapters.indexOf(selectedImage);

    if (e.deltaY > 0) {
      if (currentIndex < chapters.length - 1) {
        setLoaded(false);
        setSelectedImage(chapters[currentIndex + 1]);
        scrollThumbnailIntoView(currentIndex + 1);
      }
    } else {
      if (currentIndex > 0) {
        setLoaded(false);
        setSelectedImage(chapters[currentIndex - 1]);
        scrollThumbnailIntoView(currentIndex - 1);
      }
    }
  };

  return (
    <div className="bg-purple-50 md:bg-white px-0 min-h-screen">
      <GeoHelmet
        title={staticBookData.title}
        description={staticBookData.description}
        keywords={`personalized ${staticBookData.idealFor} book, custom children's book, space adventure`}
        image={staticBookData.templateChapters[0].generatedImage}
        type="product"
      />
      
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>

      <div className="flex items-center lg:items-start justify-center lg:justify-start flex-col lg:flex-row sm:py-4 md:py-5 max-w-max mx-auto sm:gap-5 xl:gap-8 pl-0 sm:pl-8">
        
        {/* Desktop Image Gallery */}
        <div className="hidden sm:flex lg:gap-8 gap-4 relative md:justify-center w-full max-w-[650px]">
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hidden h-[530px]" ref={thumbnailContainerRef}>
            {staticBookData.templateChapters.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => (thumbnailRefs.current[idx] = el)}
                className={`!w-[80px] !h-[80px] ${
                  selectedImage.generatedImage === img.generatedImage
                    ? "border-4 border-purple-500 rounded-md"
                    : "border-transparent border-4"
                }`}
              >
                <img
                  src={img.generatedImage}
                  alt={`thumbnail-${idx}`}
                  onClick={() => {
                    setLoaded(false);
                    setSelectedImage(img);
                    scrollThumbnailIntoView(idx);
                  }}
                  className={`${
                    selectedImage.generatedImage === img.generatedImage ? "" : "rounded-md"
                  } h-full w-full cursor-pointer object-cover`}
                />
              </div>
            ))}
          </div>
          
          <div className="relative snap-start h-[526px] w-[526px] flex items-center justify-center bg-gray-100" onWheel={handleWheel}>
            {!loaded && (
              <div className="absolute inset-0 bg-purple-50 animate-pulse rounded-md flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={selectedImage.generatedImage}
              alt="selected book"
              onLoad={() => setLoaded(true)}
              className={`max-w-full max-h-full h-full object-cover transition-opacity duration-500 rounded-md ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Mobile Title */}
        <div>
          <h1 className="text-2xl font-marcellus my-4 block sm:hidden text-center">
            {staticBookData.title}
          </h1>
        </div>

        {/* Mobile Swiper */}
        <div className="max-w-[100%] block sm:hidden relative">
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
            pagination={{ clickable: true }}
          >
            {staticBookData.templateChapters.map((img, idx) => (
              <SwiperSlide key={idx} className="h-full">
                <img
                  src={img.generatedImage}
                  alt={`thumbnail-${idx}`}
                  onClick={() => setSelectedImage(img)}
                  className="w-full h-full rounded-md cursor-pointer border-2 transition-opacity duration-500"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Book Details */}
        <div className="w-full md:flex-1 mb-4 p-2">
          <h1 className="text-4xl font-marcellus mt-4 hidden sm:block text-black">
            {staticBookData.title}
          </h1>
          
          <div className="p-0 sm:px-[15px] py-[12px] ql-editor flex flex-col text-black text-lg">
            <p className="text-black text-lg max-w-2xl leading-relaxed font-normal hidden sm:block font-figTree">
              {staticBookData.description}
            </p>

            <div className="pt-4 sm:pt-[26px] pl-[27px]">
              <ul className="text-black mb-4 text-lg leading-normal list-none hidden sm:block !pl-0 rounded">
                {[
                  `For kids ages: ${staticBookData.ageRange.minAge}-${staticBookData.ageRange.maxAge} years`,
                  "Preview available before ordering",
                  "Encourages learning and curiosity",
                  "Upload your favorite photo of your child",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start custom_ui">
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 sm:mb-12 font-figTree sm:mt-4 sm:px-0 justify-center sm:justify-start flex-col sm:flex-row w-full">
              <div className="flex items-center gap-1 sm:gap-3">
                <span className="line-through text-stone-600 opacity-75 font-figTree text-sm sm:text-2xl font-semibold">
                  ${staticBookData.basePrice}
                </span>
                <span className="text-2xl font-semibold text-black font-figTree">
                  ${calculateDiscountedPrice(staticBookData.basePrice, staticBookData.discountPct)}
                </span>
              </div>
            </div>
          </div>

          {/* Book Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mx-4 sm:mx-0 mt-6 border-t border-b py-4 font-figTree text-center md:text-start">
            <div>
              <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">Ideal For</p>
              <p className="text-sm font-medium text-black capitalize">{staticBookData.idealFor}</p>
            </div>
            <div>
              <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">Age Range</p>
              <p className="text-sm font-medium text-black capitalize">
                {staticBookData.ageRange.minAge} - {staticBookData.ageRange.maxAge} years
              </p>
            </div>
            <div>
              <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">Characters</p>
              <p className="text-sm font-medium text-black capitalize">{staticBookData.customStoryDetails.character}</p>
            </div>
            <div>
              <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">Genre</p>
              <p className="text-sm font-medium text-black capitalize">Adventure</p>
            </div>
            <div>
              <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">Pages</p>
              <p className="text-sm font-medium text-black capitalize">{staticBookData.pages}</p>
            </div>
            <div>
              <p className="font-normal uppercase text-xs text-[#6B7280] tracking-widest">Shipping</p>
              <p className="text-sm font-medium text-black capitalize">{staticBookData.shippingModes.join(", ")}</p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="mt-4 font-figTree relative px-4 sm:px-0">
            <div className="relative w-full">
              <div className="px-4 py-2 bg-white text-gray-700 cursor-pointer hover:border-gray-400 w-full border border-gray-200 rounded-lg p-2 text-sm text-left flex items-center justify-between focus:border-purple-300">
                <span>{staticBookData.language}</span>
              </div>
            </div>
          </div>

          {/* Personalize Button */}
          <div className="sm:mt-[16px] hidden sm:block sm:relative sm:w-auto sticky bottom-0 left-0 right-0 shadow-lg sm:shadow-none px-4 sm:px-0 py-3 sm:py-0 z-10">
            <button
              className="w-full bg-[#61C8A4] hover:bg-[#61C8A4]/80 text-white font-bold py-3 sm:py-2 rounded-md text-sm font-figTree transition-colors h-[40px]"
              onClick={handlePersonalize}
            >
              Personalize
            </button>
          </div>
        </div>

        {/* Mobile Personalize Button */}
        <div className="block sm:hidden w-full left-0 right-0 bottom-0 p-5 backdrop-blur-sm sticky bg-white/30 z-10">
          <button
            className="bg-[#61C8A4] hover:bg-[#61C8A4]/80 font-bold py-3 sm:py-2 font-figTree h-10 inline-flex items-center justify-center hover:shadow-lg rounded text-sm text-white transition ease-in-out duration-300 w-full px-8"
            onClick={handlePersonalize}
          >
            Personalize
          </button>
        </div>

        {/* Payment Icons */}
        <div className="block sm:hidden flex justify-center mx-auto space-x-1 mt-2">
          <img src={amex} alt="amex" className="w-10" />
          <img src={klarna} alt="klarna" className="w-10" />
          <img src={paypal} alt="paypal" className="w-10" />
          <img src={atm} alt="atm" className="w-10" />
        </div>
      </div>

  
      {/* FAQ Section */}
      <div className="px-4 sm:px-0">
        <section className="">
          <div className="max-w-max mx-auto">
            <div className="text-center lg:mt-[40px]">
              <h2 className="lg:text-card-header text-[28px] text-gray-900 lg:mb-4 mb-[32px] font-marcellus">
                {isMobile ? "FAQ" : "Frequently Asked Questions"}
              </h2>
            </div>
            
            {staticFAQs?.map((item) => (
              <div key={item.categoryName} className="rounded-md">
                <div className="">
                  <Accordion.Root type="single" collapsible className="w-full mx-auto">
                    {item.faqs.map((faq, index) => (
                      <div key={index} className="py-0">
                        <AccordionItem
                          type={`item-${index}`}
                          title={faq.question}
                          content={faq.answer}
                        />
                      </div>
                    ))}
                  </Accordion.Root>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-4 md:px-4 mt-12">
        <PersonalizedStories />
      </div>
      
      <ExploreSection />
      
      <div className="mb-12 lg:pt-0 pt-48 md:pt-0">
        <Footer />
      </div>
    </div>
  );
};

export default BookDetailPageStatic;