import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Eye } from "lucide-react";
import frontPicture from "../assets/images/front-home.jpg";
import ExploreSection from "@/components/ui/ExploreSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

import dummy from "../assets/images/dummy.png";
import age1 from "../assets/images/age1.png";
import age2 from "../assets/images/age2.png";
import age3 from "../assets/images/age3.png";

import adoredHome from "../assets/images/adored-home.png";
import firefighter from "../assets/images/firefighter.png";
import pilot from "../assets/images/pilot.png";
import police from "../assets/images/police.png";
import doctor from "../assets/images/doctor.png";
import child from "../assets/images/child.png";
import arrowGreen1 from "../assets/images/arrowGreen1.svg";
import arrowGreen2 from "../assets/images/arrowGreen2.svg";
import arrowGreen3 from "../assets/images/arrowGreen3.svg";
import arrowGreen4 from "../assets/images/arrowGreen4.svg";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import * as Accordion from "@radix-ui/react-accordion";
import { AccordionItem } from "@/components/ui/AccordionItem";
import BookCard from "@/components/ui/BookCard";
import { useEffect, useRef } from "react";

import {
  littleGet,
  blogGetUser,
  reviewGet,
  faqsData,
} from "../../store/slices/bookTemplateSlice.js";
import { useDispatch, useSelector } from "react-redux";
import AgeCard from "@/components/ui/AgeCard.js";
import BlogCards from "@/components/ui/BlogCards.js";
import ReviewCard from "@/components/ui/ReviewCard.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import loadingGif from "../assets/animations/book.gif";
import { useIsMobile } from "@/hooks/use-mobile.js";
import { bookTemplate } from "../../store/slices/bookTemplateSlice.js";
import CharacterView from "@/components/ui/CharacterView.js";
import loadingImage from "../assets/images/purple.gif";
// import { Helmet } from "react-helmet-async";
// import Helmet  from "react-helmet";

import GeoHelmet from "@/components/ui/GeoHelmet.js";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const booksPaginatedData = useSelector(
    (state) => state?.bookTemplate?.bookTemplateData?.results
  );
  const handleGetStarted = () => {
    navigate("/template-selection");
  };

  const handleCreateFromScratch = () => {
    navigate("/from-scratch");
  };
  const queryParams = {
    order: "desc",
    sort: "createdAt",
    limit: 8,
  };
  // dispatch(profile());
  useEffect(() => {
    dispatch(littleGet({}));
    dispatch(bookTemplate(queryParams));
  }, []);

  useEffect(() => {
    dispatch(faqsData());
  }, []);

  // useEffect(() => {
  //   const token = cookie.get("token");
  //   if (!token) {
  //            navigate("/login");
  //   }
  // }, [navigate]);

  const faqsDataList = useSelector((state) => state?.bookTemplate?.faqsRes);
  const faqsListing = faqsDataList?.data;
  const currencyData = useSelector((state) => state?.bookTemplate?.currency);

  // useEffect(() => {
  //   const token = cookie.get("token");
  //  if(token)
  //  {
  //      dispatch(profile());
  //  }
  // }, []);

  useEffect(() => {
    dispatch(reviewGet({ limit: 8 }));
  }, []);
  const littleData = useSelector((state) => state?.bookTemplate?.littleData);
  const loading = useSelector((state) => state?.bookTemplate?.isLoading);
  const reviewDataList = useSelector(
    (state) => state?.bookTemplate?.reviewData
  );

  const reviewData = 
  {
    "results": [
        {
            "createdAt": "2025-11-20T05:02:03.000Z",
            "title": "Best",
            "rating": 5,
            "comment": "Best",
            "personalizedBookId": "691c3af9d8ce6d001318d1e8",
            "updatedBy": "68d10d752e4b2c31b6275766",
            "bookTemplateId": "68ad3607fc29be1873fc36b0",
            "id": "691ea0cb2a6d7f00139a7096",
            "name": "Akash Limbani"
        },
        {
            "createdAt": "2025-09-05T11:40:53.188Z",
            "title": "Courage Shines Bright",
            "rating": 5,
            "comment": "A perfect mix of kindness, courage, and magic—my child couldn’t stop smiling!",
            "personalizedBookId": "68bacbf66d36fdb01dd4b4ea",
            "updatedBy": "68ba7ac7c51c005809932051",
            "bookTemplateId": "68ad3607fc29be1873fc36b6",
            "id": "68bacc456d36fdb01dd4b561",
            "name": "Digen"
        },
        {
            "createdAt": "2025-09-05T11:39:55.481Z",
            "title": "A Worthy Sequel",
            "rating": 5,
            "comment": "Even more magical than the first! My daughter adored seeing the Princess grow braver.",
            "personalizedBookId": "68bacbf66d36fdb01dd4b4ea",
            "updatedBy": "68ba7af1c51c00580993205d",
            "bookTemplateId": "68ad3607fc29be1873fc36b6",
            "id": "68bacc0b6d36fdb01dd4b535",
            "name": "Sarthik"
        },
        {
            "createdAt": "2025-09-05T11:38:08.195Z",
            "title": "Lessons for Life",
            "rating": 5,
            "comment": "Perfect bedtime read—teaches virtues in a gentle, magical way children truly enjoy.",
            "personalizedBookId": "68bacb106d36fdb01dd4b403",
            "updatedBy": "68ba7af1c51c00580993205d",
            "bookTemplateId": "68ad3607fc29be1873fc36da",
            "id": "68bacba06d36fdb01dd4b491",
            "name": "Sarthik"
        },
        {
            "createdAt": "2025-09-05T11:37:15.598Z",
            "title": "A Magical Guide",
            "rating": 5,
            "comment": "The Wise Owl is now my daughter’s favorite—such a fun way to teach important values!",
            "personalizedBookId": "68bacb106d36fdb01dd4b403",
            "updatedBy": "68ba7ac7c51c005809932051",
            "bookTemplateId": "68ad3607fc29be1873fc36da",
            "id": "68bacb6b6d36fdb01dd4b47a",
            "name": "Digen"
        },
        {
            "createdAt": "2025-09-05T11:36:14.184Z",
            "title": "Wisdom With Heart",
            "rating": 5,
            "comment": "A beautiful story—my child loved learning about honesty, patience, and kindness.",
            "personalizedBookId": "68bacb106d36fdb01dd4b403",
            "updatedBy": "68ba79740bd49d39c907c074",
            "bookTemplateId": "68ad3607fc29be1873fc36da",
            "id": "68bacb2e6d36fdb01dd4b451",
            "name": "Hardik"
        },
        {
            "createdAt": "2025-09-05T11:35:21.608Z",
            "title": "Learning With Smiles",
            "rating": 5,
            "comment": "A delightful way for kids to discover themselves—personalization makes it extra special.",
            "personalizedBookId": "68baca6d6d36fdb01dd4b372",
            "updatedBy": "68ba79740bd49d39c907c074",
            "bookTemplateId": "68ad3607fc29be1873fc36c8",
            "id": "68bacaf96d36fdb01dd4b400",
            "name": "Hardik"
        },
        {
            "createdAt": "2025-09-05T11:34:32.025Z",
            "title": "Perfect for Toddlers",
            "rating": 5,
            "comment": "Interactive and joyful—my child now proudly points to toes, nose, and tummy!",
            "personalizedBookId": "68baca6d6d36fdb01dd4b372",
            "updatedBy": "68ba793a0bd49d39c907c068",
            "bookTemplateId": "68ad3607fc29be1873fc36c8",
            "id": "68bacac86d36fdb01dd4b3e9",
            "name": "Vivek"
        }
    ],
    "totalResults": 67,
    "limit": 8,
    "totalPages": 9,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
  const reviewList = reviewData?.data?.results;
  const boyBooks = (littleData || [])
    .filter((card) => card?.idealFor === "boy")
    .slice(0, 4);
  const booksBestseller = (littleData || [])
    .filter((card) => card?.idealFor === "boy")
    .slice(0, 8);
  const booksNew = (booksPaginatedData || [])?.slice(0, 4);
  const girlsBooks = (littleData || [])
    .filter((card) => card?.idealFor === "girl")
    .slice(0, 4);
  const educationalBooks = (littleData || [])
    .filter((card) => card?.genreId?.name === "Educational")
    .slice(0, 4);

  const ageCardData = [
    {
      id: "1",
      imageUrl: dummy,

      ageLabel: "0-2",
    },
    {
      id: "2",
      imageUrl: age1,
      ageLabel: "2-4",
    },
    {
      id: "3",
      imageUrl: age3,
      ageLabel: "4-6",
    },
    {
      id: "4",
      imageUrl: age2,
      ageLabel: "6-8",
    },
  ];

  const profileData = useSelector((state: any) => state?.auth?.profile);
  const admin = profileData?.role === "admin";

  // useEffect(() => {
  //   if (admin) {
  //     dispatch(blogGet({ limit: 8 }));
  //   } else {
  //     dispatch(blogGetUser({ limit: 8 }));
  //   }
  // }, [admin, user, dispatch]);

  useEffect(() => {
    dispatch(blogGetUser({ limit: 8 }));
  }, []);
  const blogList = useSelector((state) => state?.bookTemplate?.blogGet);
  const blogListUser = useSelector((state) => state?.bookTemplate?.blogGetUser);
  const blogData = blogList?.data?.results;
  const blogDataUser = blogListUser?.data?.results;
  const blogGetData = admin ? blogData : blogDataUser;
  const isMobile = useIsMobile();
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );

  const createFAQSchema = () => {
    if (
      !faqsListing ||
      !Array.isArray(faqsListing) ||
      faqsListing?.length === 0
    ) {
      console.log("No FAQ data");
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
      "@id": "https://www.starmebooks.com/#faq",
      mainEntity: allQuestions,
    };
  };

  // Function 2: Create Blog Schema
  const createBlogSchema = () => {
    if (
      !blogGetData ||
      !Array.isArray(blogGetData) ||
      blogGetData.length === 0
    ) {
      console.log("No blog data");
      return [];
    }

    const blogSchemas = blogGetData.slice(0, 3).map((blog) => ({
      "@type": "BlogPosting",
      "@id": `https://www.starmebooks.com/blog/${blog.id}#article`,
      headline: blog.title,
      description: blog.description,
      image: {
        "@type": "ImageObject",
        url: blog.image,
      },
      datePublished: blog.createdAt || new Date().toISOString(),
      dateModified:
        blog.updatedAt || blog.createdAt || new Date().toISOString(),
      author: {
        "@type": "Organization",
        "@id": "https://www.starmebooks.com/#organization",
        name: "StarMe",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.starmebooks.com/#organization",
        name: "StarMe",
        logo: {
          "@type": "ImageObject",
          url: "https://www.starmebooks.com/logo.svg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.starmebooks.com/blog/${blog.id}`,
      },
    }));

    return blogSchemas;
  };

  const createItemListSchema = () => {
    const fallbackBooks = [
      {
        id: "1",
        title: "Space Explorer Adventure",
        description: "Your child explores outer space and discovers new planets",
        coverImage: "https://www.starmebooks.com/books/space-explorer.jpg",
        genreId: { name: "Adventure" }
      },
      {
        id: "2",
        title: "Magical Kingdom Quest",
        description: "Your child becomes a brave hero in a magical kingdom",
        coverImage: "https://www.starmebooks.com/books/magical-kingdom.jpg",
        genreId: { name: "Fantasy" }
      },
      {
        id: "3",
        title: "Underwater Discovery",
        description: "Dive deep into ocean adventures and meet sea creatures",
        coverImage: "https://www.starmebooks.com/books/underwater.jpg",
        genreId: { name: "Adventure" }
      },
      {
        id: "4",
        title: "Superhero Training Academy",
        description: "Your child learns to become a superhero with special powers",
        coverImage: "https://www.starmebooks.com/books/superhero.jpg",
        genreId: { name: "Action" }
      },
      {
        id: "5",
        title: "Dinosaur Discovery",
        description: "Travel back in time to meet dinosaurs and prehistoric creatures",
        coverImage: "https://www.starmebooks.com/books/dinosaur.jpg",
        genreId: { name: "Educational" }
      }
    ];
  
    // Use real data if available, otherwise use fallback
    const booksData = littleData && littleData.length > 0 ? littleData : fallbackBooks;
  
    return {
      "@type": "ItemList",
      "@id": "https://www.starmebooks.com/#itemlist",
      name: "Personalized Book Templates",
      description: "Available personalized storybook themes and templates",
      numberOfItems: booksData.length,
      itemListElement: booksData.slice(0, 10).map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": `https://www.starmebooks.com/book/${book.id}#product`,
          name: book.title,
          url: `https://www.starmebooks.com/book/space-explorer/${book.id}`,
          description: book.description,
          image: book.coverImage,
          brand: {
            "@type": "Brand",
            name: "StarMe"
          },
          category: book.genreId?.name || "Children's Books",
          // ✅ REQUIRED: Add offers with price
          offers: {
            "@type": "Offer",
            url: `https://www.starmebooks.com/book/space-explorer/${book.id}`,
            priceCurrency: currencyData?.currencyCode || "USD",
            price: book.price || "29.99",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "StarMe"
            }
          },
          // ✅ OPTIONAL: Add aggregate rating if you have review data
          ...(book.averageRating && book.reviewCount ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: book.averageRating.toString(),
              ratingCount: book.reviewCount.toString(),
              bestRating: "5",
              worstRating: "1"
            }
          } : {})
        }
      }))
    };
  };
  return (
    <div className="min-h-screen bg-white">
      <GeoHelmet
        title="Personalized Books for Kids | Custom Storybooks - StarMe"
        description="Create magical personalized storybooks where your child becomes the hero! Upload photos and customize stories that bring imagination to life. Perfect for boys and girls of all ages."
        keywords="personalized books, kids books, custom storybooks, children's books, personalized storybook, custom kids book"
        image="https://www.starmebooks.com/og-image.jpg"
        type="website"
     
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            // WebPage Schema - REQUIRED for homepage
            {
              "@type": "WebPage",
              "@id": "https://www.starmebooks.com/#webpage",
              url: "https://www.starmebooks.com",
              name: "StarMe - Personalized Kids' Storybooks",
              description:
                "Create magical personalized storybooks where your child becomes the hero! Upload photos and customize stories that bring imagination to life.",
              isPartOf: {
                "@id": "https://www.starmebooks.com/#website",
              },
              about: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              primaryImageOfPage: {
                "@type": "ImageObject",
                "@id": "https://www.starmebooks.com/#primaryimage",
                url: "https://www.starmebooks.com/og-image.jpg",
                width: 1200,
                height: 630,
                caption: "StarMe Personalized Children's Books",
              },
              mainEntity: {
                "@id": "https://www.starmebooks.com/#service",
              },
            },

            // WebSite Schema
            {
              "@type": "WebSite",
              "@id": "https://www.starmebooks.com/#website",
              url: "https://www.starmebooks.com",
              name: "StarMe Personalized Books",
              alternateName: "StarMe",
              description:
                "Create custom kids' storybooks where your child becomes the hero",
              publisher: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://www.starmebooks.com/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                {
                  "@type": "CreateAction",
                  name: "Create Personalized Book",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://www.starmebooks.com/template-selection",
                    actionPlatform: [
                      "http://schema.org/DesktopWebPlatform",
                      "http://schema.org/MobileWebPlatform",
                    ],
                  },
                  description: "Create a personalized book for your child",
                },
              ],
            },

            // Organization Schema - Enhanced
            {
              "@type": "Organization",
              "@id": "https://www.starmebooks.com/#organization",
              name: "StarMe",
              alternateName: "StarMe Books",
              url: "https://www.starmebooks.com",
              logo: {
                "@type": "ImageObject",
                "@id": "https://www.starmebooks.com/#logo",
                url: "https://www.starmebooks.com/logo.svg",
                contentUrl: "https://www.starmebooks.com/logo.svg",
                width: 250,
                height: 60,
                caption: "StarMe Logo",
              },
              description:
                "StarMe creates personalized children's storybooks where kids become the heroes of their own adventures",
              sameAs: [
                // Add your social media profiles here when available
                // "https://www.facebook.com/starmebooks",
                // "https://www.instagram.com/starmebooks",
                // "https://twitter.com/starmebooks"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                // Add email or phone when available
                // email: "support@starmebooks.com"
              },
            },

            // Service Schema - Better for service-based business
            {
              "@type": "Service",
              "@id": "https://www.starmebooks.com/#service",
              serviceType: "Personalized Children's Book Creation",
              name: "Custom Storybook Creation Service",
              description:
                "Custom storybook creation service where children become the heroes of their own adventures. Upload a photo, add details, and create a magical personalized book.",
              provider: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              areaServed: {
                "@type": "Country",
                name: "Worldwide",
              },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: "https://www.starmebooks.com",
                serviceType: "Online",
              },
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: 0,
                suggestedMaxAge: 12,
              },
              category: "Children's Books",
              brand: {
                "@type": "Brand",
                name: "StarMe",
              },
              image: "https://www.starmebooks.com/og-image.jpg",
            },

            // ItemList Schema - Shows your book collection/templates
            createItemListSchema(),

            // BreadcrumbList Schema
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.starmebooks.com/#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.starmebooks.com",
                },
              ],
            },

            // FAQ Schema (if exists)
            ...(createFAQSchema() ? [createFAQSchema()] : []),

            // Blog Schemas (all blogs)
            ...createBlogSchema(),
          ],
        }}
      />

      <div className="sticky top-0  z-40">
        <Navbar />
      </div>
      <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-marcellus">
                  Create Magical
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Storybooks
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 font-figTree">
                  Where your child becomes the hero of their own adventure
                </p>
                <Button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  Start Creating
                </Button>
              </div>
              <div className="relative">
                <img
                  src={frontPicture}
                  alt="Magical Storybook"
                  loading="lazy"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="lg:py-[80px] py-[40px] max-w-max mx-auto px-4 lg:px-0 ">
          <div className="px-0 sm:px-6 ">
            <h3 className="uppercase text-xs leading-10 tracking-[3px] font-semibold font-figTree">
              NEW RELEASES
            </h3>
            <div className="flex justify-between items-end">
              <h1
                className="lg:text-card-header text-black text-[28px] md:text-[34px] 2xl:text-[34px] xl:text-[34px] leading-10 font-marcellus font-normal
             [@media(min-width:1px)_and_(max-width:375px)]:max-w-[185px]"
              >
                Discover What’s New
              </h1>

              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 p-2 rounded transition h-[40px] w-[92px]"
                onClick={() => navigate("/template-selection")}
              >
                <div className="flex items-center lg:justify-between rounded-[4px]">
                  View All
                  <MdOutlineKeyboardArrowRight size={20} className="" />
                </div>
              </button>
            </div>
            {/* min-[769px]:h-[350px] max-lg:min-[769px]:h-[350px] */}
            {loading ? (
              <div className="flex items-center justify-center mt-10">
                {" "}
                <img src={loadingImage} alt="image" className="w-28"    loading="lazy" />{" "}
              </div>
            ) : (
              <div className="grid md:grid-cols-4  grid-cols-2 gap-5 pt-8 lg:px-0 [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1">
                {booksNew?.map((card) => (
                  <BookCard
                    key={card.id}
                    title={card?.title}
                    description={card?.description}
                    imageUrl={card?.coverImage}
                    discount={
                      card?.discountPct ? `-${card?.discountPct}%` : undefined
                    }
                    //  extraClass="lg:max-w-[334px]  [@media(min-width:375px)_and_(max-width:424px)]:h-[315px] h-[335px] sm:h-[300px] lg:h-[100%] md:h-[300px] xl:h-[420px] mb-3
                    // border 2xl:border-red-500 xl:border-blue-500 lg:border-green-500 md:border-yellow-500 border-red-400
                    // min-[769px]:h-[350px] min-[900px]:h-[355px]
                    // "
                    isHome={true}
                    extraClass="[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                    onPersonalise={() =>
                      navigate(`/book/space-explorer/${card.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </div>
          {/* //!  second section here ***********************************************/}
          <div className="px-0 sm:px-6 lg:pt-[80px] pt-[40px]">
            {/* <div className="text-xs text-black font-figTree font-[800] tracking-widest  leading-10"> */}
            <h3 className="uppercase text-xs leading-10 tracking-[3px] font-semibold font-figTree">
              BESTSELLERS
            </h3>
            <div className="flex justify-between items-end">
              <h1
                className=" lg:text-card-header text-black text-[28px] md:text-[34px] 2xl:text-[34px] xl:text-[34px] leading-10 font-marcellus
            [@media(min-width:1px)_and_(max-width:375px)]:max-w-[185px] font-normal"
              >
                Personalise a bestseller
              </h1>

              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 p-2 rounded transition h-[40px] w-[92px]"
                onClick={() => navigate("/template-selection")}
              >
                <div className="flex items-center lg:justify-between rounded-[4px]">
                  View All
                  <MdOutlineKeyboardArrowRight size={20} className="" />
                </div>
              </button>
            </div>
            {loading ? (
              <div className="flex items-center justify-center mt-10">
                {" "}
                <img src={loadingImage} alt="image" className="w-28"    loading="lazy" />{" "}
              </div>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-2 gap-5 pt-8 lg:px-0 lg:gap-[21px] lg:!gap-y-[30px] [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1">
                {booksBestseller?.map((card) => (
                  <BookCard
                    key={card.id}
                    title={card?.title}
                    description={card?.description}
                    imageUrl={card?.coverImage}
                    discount={
                      card?.discountPct ? `-${card?.discountPct}%` : undefined
                    }
                    isHome={true}
                    extraClass="[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                    onPersonalise={() =>
                      navigate(`/book/space-explorer/${card.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </div>
          {/* //! */}
        </div>
        {/* <section className="bg-gradient-to-r from-blue-400 to-blue-500 pt-[64px] pb-[48px] px-0 text-white relative overflow-hidden"
      style={{
    background: "linear-gradient(129.35deg, #4CC7F4 27.47%, #0038BA 182.17%)"
  }}
      >
        <div
          className="absolute top-0 left-0 w-full h-8 bg-white"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
          }}
        ></div>
        <div className="max-w-full mx-auto text-center px-4 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-[38px] md:text-adored-text text-left lg:text-adored-text font-marcellus 
              md:border-black">
                Adored by millions worldwide
              </h2>
              <p className="text-adored-description-text text-left font-figTree font-semibold text-white leading-relaxed">
                From magical adventures for little dreamers to <br />{" "}
                heartwarming reads for Mum, Dad, and even Grandma -- there's a
                little something <br /> for everyone.
              </p>
              <Button
                onClick={handleGetStarted}
                variant="outline"
                className="bg-white float-start text-[#62C4EC] border-white font-figTree w-[146px] h-[48px] font-bold py-[14px] px-[26px]"
              >
                View All Books
              </Button>
            </div>
            <div className="relative">
              <img
                src={adored}
                alt="Storybook"
                className="lg:w-[910px] lg:h-[590px] w-auto h-auto mx-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section> */}

        {/* //! new one  */}

        <section className="h-auto md:!h-[590px] w-full">
          <div className="h-0 w-full flex items-center mt-8">
            {/* <div className="h-[56px] relative top-[0.05rem] flex w-full" style="background-image: url('https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/home/blue-diamond.svg'); background-repeat: repeat-x;">
             */}
            <div
              className="h-[56px] relative top-[0.05rem] flex w-full"
              style={{
                backgroundImage:
                  "url('https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/home/blue-diamond.svg')",
                backgroundRepeat: "repeat-x",
              }}
            ></div>
          </div>

          {/* <div className="w-full h-full flex flex-col" style="background: linear-gradient(129.35deg, #4CC7F4 27.47%, #0038BA 182.17%);"> */}
          <div
            className="w-full h-full flex flex-col"
            style={{
              background:
                "linear-gradient(129.35deg, #4CC7F4 27.47%, #0038BA 182.17%)",
            }}
          >
            <div className="h-0 w-full hidden justify-end pr-4 md:flex">
              <img
                src="https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/home/adored-img.png"
                alt="image"
                className="h-[590px] object-cover"
                  loading="lazy"
              />
            </div>
            <div className="w-full h-full flex bg-cover md:bg-contain bg-no-repeat bg-res">
              <div className="w-full flex flex-col justify-center pb-0 md:pb-12 px-8 py-16 md:pl-24 lg:pl-32 gap-[30px]">
                <div className="flex flex-col text-white gap-3 md:gap-6">
                  <h1 className="text-[38px] leading-10 md:text-[50px] md:leading-[50px] font-marcellus">
                    Adored by millions worldwide
                  </h1>
                  <h3 className="text-[22px] leading-8 font-medium font-sans">
                    From magical adventures for little dreamers to
                    <br /> heartwarming reads for Mum, Dad, and even Grandma,
                    there’s a little something for everyone.
                  </h3>
                </div>

                <div
                  onClick={() => {
                    navigate("/template-selection");
                  }}
                  className="bg-white hover:bg-white/90 w-fit text-[#62C4EC] opacity-100 font-bold py-[14px] px-[26px] text-sm rounded-[4px] cursor-pointer "
                >
                  View All Books
                </div>
              </div>
              <div className="w-full hidden md:flex"></div>
            </div>
            <div className="flex md:hidden">
              <img src={adoredHome} alt="image" className="object-contain"  loading="lazy" />
            </div>
          </div>
        </section>

        {/* //! new one  */}

        <div className="max-w-max mx-auto px-4 lg:px-0">
          <div className="lg:px-[20px] px-0 mt-16 ">
            <h3 className="uppercase text-xs leading-10 tracking-[3px] font-semibold font-figTree">
              OUR BOOKS
            </h3>
            <div className="flex justify-between items-end">
              <h1
                className=" lg:text-card-header text-black text-[28px] md:text-[34px] 2xl:text-[34px] xl:text-[34px] leading-10 font-marcellus
            [@media(min-width:1px)_and_(max-width:375px)]:max-w-[185px] font-normal"
              >
                Books for Your Little Girl!
              </h1>
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 rounded p-2 transition h-[40px] w-[92px]"
                onClick={() => navigate("/template-selection")}
              >
                <div className="flex items-center lg:justify-between rounded-[4px]">
                  View All
                  <MdOutlineKeyboardArrowRight size={20} />
                </div>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center mt-10">
              {" "}
              <img src={loadingImage} alt="image" className="w-28"  loading="lazy"  />{" "}
            </div>
          ) : (
            <div className="grid md:grid-cols-4  grid-cols-2 gap-5 pt-8 lg:px-6 [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1">
              {girlsBooks.map((card) => (
                <BookCard
                  key={card.id}
                  title={card?.title}
                  description={card?.description}
                  imageUrl={card?.coverImage}
                  discount={
                    card?.discountPct ? `-${card?.discountPct}%` : undefined
                  }
                  isHome={true}
                  // extraClass="lg:max-w-[334px]  [@media(min-width:375px)_and_(max-width:424px)]:h-[315px]  h-[335px] sm:h-[345px] lg:h-[390px]  mb-3"
                  // extraClass="[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                  extraClass="[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                  onPersonalise={() =>
                    navigate(`/book/space-explorer/${card.id}`)
                  }
                />
              ))}
            </div>
          )}

          {/* //!  category and growth section */}
          {/* <div className="text-xs text-black font-figTree font-semibold tracking-widest text-center leading-10 pt-16">
          Based on Category
        </div>
        <div className="font-marcellus tracking-widest text-center leading-10 text-2xl md:text-2xl lg:text-card-header">
          Learning and Growth
        </div>
        <div className="grid  md:grid-cols-4 grid-cols-2 gap-5 pt-6 lg:px-5">
          {educationalBooks?.map((card) => {
            return (
              <BookCard
                key={card.id}
                title={card?.title}
                description={card?.description}
                imageUrl={card?.coverImage}
                discount={card?.discount}
                extraClass="lg:max-w-[334px] lg:h-auto [@media(min-width:375px)_and_(max-width:424px)]:h-[319px]   h-[335px] md:h-[303px] lg:h-[324px]  mb-3 "
                onPersonalise={() => {
                  navigate("/book/space-explorer");
                }}
              />
            );
          })}
        </div> */}
        </div>

        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white lg:mt-[80px] mt-[40px]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center items-center">
                {/* <Wand2 className="w-16 h-16 mb-4 text-purple-200" /> */}
                <img src={loadingGif} alt="Loading..." className="w-32 h-32 "  loading="lazy"  />
              </div>
              <h2 className="text-3xl lg:text-card-header font-bold mb-4 font-marcellus">
                Create Your Own Unique Story
              </h2>
              <h3 className="text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto font-figTree">
                Want something completely unique? Use our AI-powered story
                builder to create a one-of-a-kind adventure tailored
                specifically for your child.
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2 text-lg font-marcellus">
                  AI-Powered
                </h3>
                <p className="text-xs text-purple-100 font-figTree">
                  Advanced AI creates unique stories based on your preferences
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <Star className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2 text-lg font-marcellus">
                  Fully Customizable
                </h3>
                <p className="text-xs text-purple-100 font-figTree">
                  Choose characters, settings, themes, and moral lessons
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <Eye className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2  text-lg font-marcellus">
                  Instant Preview
                </h3>
                <p className="text-xs text-purple-100 font-figTree">
                  See your custom story come to life immediately
                </p>
              </div>
            </div>
            <Button
              onClick={handleCreateFromScratch}
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-sm  font-figTree h-[48px] rounded-[4px] [@media(min-width:1px)_and_(max-width:319px)]:px-2
            "
            >
              Create Custom Story
            </Button>
          </div>
        </section>

        {/* //! new one --------------------------------------------------------------------------------------------- */}
        <div className="lg:mt-[80px] mt-[40px]">
          <CharacterView />
        </div>

        <div className="lg:py-[80px] py-[40px] max-w-max mx-auto px-4 lg:px-0">
          <div className="px-0 sm:px-6 ">
            <h3 className="uppercase text-xs leading-10 tracking-[3px] font-semibold font-figTree">
              OUR BOOKS
            </h3>
            <div className="flex justify-between items-end">
              <h1
                className=" lg:text-card-header text-black text-[28px] md:text-[34px] 2xl:text-[34px] xl:text-[34px] leading-10 font-marcellus
            [@media(min-width:1px)_and_(max-width:375px)]:max-w-[185px] font-normal"
              >
                Books for Your Little Boy!
              </h1>

              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 rounded p-2 transition h-[40px] w-[92px]"
                onClick={() => navigate("/template-selection")}
              >
                <div className="flex items-center lg:justify-between rounded-[4px]">
                  View All
                  <MdOutlineKeyboardArrowRight size={20} className="" />
                </div>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center mt-10">
              {" "}
              <img src={loadingImage} alt="image" className="w-28"  loading="lazy"  />{" "}
            </div>
          ) : (
            <div className="grid md:grid-cols-4  grid-cols-2 gap-5 pt-8 lg:px-6 [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1">
              {boyBooks.map((card) => (
                <BookCard
                  key={card.id}
                  title={card?.title}
                  description={card?.description}
                  imageUrl={card?.coverImage}
                  discount={
                    card?.discountPct ? `-${card?.discountPct}%` : undefined
                  }
                  //  extraClass="lg:max-w-[334px]  [@media(min-width:375px)_and_(max-width:424px)]:h-[315px]   h-[335px] sm:h-[300px] lg:h-[365px] xl:h-[420px]  mb-3 "
                  //                 extraClass="h-[430px] mb-3 sm:h-[480px] md:h-[285px] lg:max-w-[334px] lg:h-[100%] xl:h-[420px]
                  // [@media(min-width:320px)_and_(max-width:350px)]:h-[280px]
                  // [@media(min-width:350px)_and_(max-width:374px)]:h-[320px]
                  // [@media(min-width:385px)_and_(max-width:424px)]:h-[340px]
                  // [@media(min-width:425px)_and_(max-width:449px)]:h-[330px]
                  // [@media(min-width:450px)_and_(max-width:499px)]:h-[350px]
                  // [@media(min-width:500px)_and_(max-width:580px)]:h-[400px]
                  // [@media(min-width:640px)_and_(max-width:725px)]:h-[450px]
                  // [@media(min-width:769px)_and_(max-width:899px)]:h-[320px]
                  // [@media(min-width:900px)_and_(max-width:1023px)]:h-[335px]
                  //   [@media(min-width:375px)_and_(max-width:424px)]:h-[305px]"
                  isHome={true}
                  extraClass="[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                  onPersonalise={() =>
                    navigate(`/book/space-explorer/${card.id}`)
                  }
                />
              ))}
            </div>
          )}
          {/* <div className="px-4 mt-16 ">
          <div className="text-xs text-black font-figTree font-semibold leading-10">
            OUR BOOKS
          </div>
          <div className="flex justify-between ">
            <div className=" text-28 sm:text-2xl md:text-2xl lg:text-card-header text-black font-marcellus  leading-10">
              Books for Your Little Girl!
            </div>
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 cursor-pointer  font-figTree text-white text-sm sm:py-2 px-2 sm:px-4 rounded transition h-[40px]"
              onClick={() => navigate("/template-selection")}
            >
              <div className="flex items-center justify-between ">
                View All
                <MdOutlineKeyboardArrowRight size={20} />
              </div>
            </button>
          </div>
        </div>

        {loading ? (
            <div className="flex items-center justify-center mt-10"> <img src={loadingImage} alt="image" className="w-28" /> </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4  gap-5 pt-6 lg:px-5">
            {girlsBooks.map((card) => (
              <BookCard
                key={card.id}
                title={card?.title}
                description={card?.description}
                imageUrl={card?.coverImage}
                discount={
                  card?.discountPct ? `-${card?.discountPct}%` : undefined
                }
                // extraClass="lg:max-w-[334px]  [@media(min-width:375px)_and_(max-width:424px)]:h-[315px]  h-[335px] sm:h-[345px] lg:h-[390px]  mb-3"
                extraClass="h-[430px] mb-3 sm:h-[480px] md:h-[300px] lg:max-w-[334px] lg:h-[100%] xl:h-[420px]
[@media(min-width:320px)_and_(max-width:350px)]:h-[300px]
[@media(min-width:350px)_and_(max-width:374px)]:h-[320px]
[@media(min-width:385px)_and_(max-width:424px)]:h-[340px]
[@media(min-width:425px)_and_(max-width:449px)]:h-[335px]
[@media(min-width:450px)_and_(max-width:499px)]:h-[350px]
[@media(min-width:500px)_and_(max-width:580px)]:h-[400px]
[@media(min-width:640px)_and_(max-width:725px)]:h-[450px]
[@media(min-width:769px)_and_(max-width:899px)]:h-[320px]
[@media(min-width:900px)_and_(max-width:1023px)]:h-[355px]
  [@media(min-width:375px)_and_(max-width:424px)]:h-[315px]"
                onPersonalise={() =>
                  navigate(`/book/space-explorer/${card.id}`)
                }
              />
            ))}
          </div>
        )} */}
        </div>
        <div
          className="w-full h-full flex flex-col md:flex-row bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/home/inspire-bg.svg")',
          }}
        >
          <div className="w-full md:w-2/5 lg:w-full flex flex-col justify-center pt-16 px-16 xl:pl-32 gap-8 text-center items-center md:text-left md:items-start">
            <div className="flex flex-col gap-6">
              <h3 className="text-xs md:text-sm font-semibold font-figTree tracking-[3px] md:leading-5 uppercase text-black">
                PERSONALISED STORIES THAT CELEBRATE THEIR BIG DREAMS
              </h3>
              <h1 className="text-[28px] leading-10 md:text-[34px] font-marcellus md:leading-[44px] text-black">
                Inspire Their Dreams with Hyper-personalised Career Adventures!
              </h1>
            </div>

            <div
              onClick={() => {
                navigate("/template-selection");
              }}
              className="bg-[#E6F9F2] hover:bg-[#E6F9F2]/80 w-fit text-[#61C8A4] opacity-100 font-bold py-[14px] px-[26px] text-sm font-figTree rounded cursor-pointer"
            >
              Explore
            </div>
          </div>
          <div className="w-full md:w-3/5 lg:w-full p-7 md:py-14 xl:p-14">
            <div className="flex w-full justify-between xl:px-10">
              <div>
                <img
                  src={firefighter}
                  alt="image"
                  loading="lazy" 
                  className="rounded-full shrink-0 aspect-square h-fit w-[97.56px] md:w-[122px]"
                />
                <div className="h-0 w-full flex justify-center">
                  <h4 className="font-myNerve text-lg md:text-[28px] relative top-2 text-black">
                    Firefighter
                  </h4>
                </div>
                <div className="h-0 flex">
                  <img
                    src={arrowGreen1}
                    alt="image"
                    loading="lazy" 
                    className="w-14 h-14 sm:w-24 sm:h-24 relative left-24 bottom-5 sm:bottom-14 sm:left-32"
                  />
                </div>
              </div>
              <div>
                <div className="h-0 flex">
                  <img
                    src={arrowGreen2}
                    alt="image"
                    loading="lazy" 
                    className="w-12 h-12 sm:w-16 sm:h-16 relative top-20 right-12 sm:right-20"
                  />
                </div>
                <img
                  src={police}
                  alt="image"
                  loading="lazy" 
                  className="rounded-full shrink-0 aspect-square h-fit w-[97.56px] md:w-[146px]"
                />
                <div className="h-0 w-full flex justify-center">
                  <h4 className="font-myNerve text-lg md:text-[28px] relative top-2 text-black">
                    Police Officer
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <img
                src={child}
                alt="image"
                loading="lazy" 
                className="rounded-full shrink-0 aspect-square h-fit w-[120px] relative top-4 md:top-0"
              />
            </div>
            <div className="flex w-full justify-between xl:px-16">
              <div>
                <div className="h-0 flex">
                  <img
                    src={arrowGreen4}
                    alt="image"
                    loading="lazy" 
                    className="w-12 h-12 sm:w-16 sm:h-16 relative left-20 bottom-6 sm:bottom-12 sm:left-28"
                  />
                </div>
                <img
                  src={pilot}
                  alt="image"
                  loading="lazy" 
                  className="rounded-full shrink-0 aspect-square h-fit w-[97.56px] md:w-[134px]"
                />
                <div className="h-0 w-full flex justify-center">
                  <h4 className="font-myNerve text-lg md:text-[28px] relative top-2 text-black">
                    Pilot
                  </h4>
                </div>
              </div>
              <div>
                <div className="h-0 flex">
                  <img
                    src={arrowGreen3}
                    alt="image"
                    loading="lazy" 
                    className="w-9 h-9 sm:w-12 sm:h-12 relative bottom-6 right-6 sm:bottom-8 sm:right-8"
                  />
                </div>
                <img
                  src={doctor}
                  alt="image"
                  loading="lazy" 
                  className="rounded-full shrink-0 aspect-square h-fit w-[97.56px] md:w-[142px]"
                />
                <div className="h-0 w-full flex justify-center">
                  <h4 className="font-myNerve text-lg md:text-[28px] text-black">
                    Doctor
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:py-[80px] py-10 max-w-max mx-auto px-0 lg:px-0">
          <h2 className="text-card-header font-marcellus text-center font-normal">
            Browse Stories by Age
          </h2>
          <div className="my-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-4 px-[24px] md:px-6">
              {ageCardData?.map((card) => {
                return (
                  <AgeCard
                    key={card.id}
                    imageUrl={card.imageUrl}
                    ageLabel={card.ageLabel}
                    onClick={() => {
                      navigate("/template-selection", {
                        state: { age: card?.ageLabel },
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* 
     
      <div className="space-y-8">
          {reviewsData.map((review, i) => (
            <div
              key={i}
              className="border-b border-gray-200 pb-4 flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div>
                <h3 className="text-lg font-figTree text-gray-900">
                  {review?.name}
                </h3>
                <p className="text-gray-700 font-figTree mt-1">{review.comment}</p>
              </div>
              <div className="flex text-yellow-400 text-xl min-w-xl">
                {Array.from({ length: 5 }, (_, idx) => {
                  if (idx < Math.floor(review.rating))
                    return <FaStar key={idx} />;
                  if (idx < review.rating) return <FaStarHalfAlt key={idx} />;
                  return <FaRegStar key={idx} />;
                })}
              </div>
            </div>
          ))}
        </div> */}
        <div
          className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 2xl:px-7 
      xl:px-[20px] lg:px-[4px] md:px-[24px] sm:px-0 py-[40px] relative px-[16px]"
        >
          <div className="max-w-max mx-auto mb-8">
            <div className="mx-auto lg:pl-5 xl:lg:pr-12 lg:pr-6">
              <div className="flex  justify-between items-center flex-row ">
                <h2 className="text-[38px] text-[#333333] font-marcellus font-extrabold mb-2 text-start">
                  Blog
                </h2>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 rounded p-2 transition h-[40px] w-[92px]
              
               "
                  onClick={() => navigate("/blog")}
                >
                  <div className="flex items-center lg:justify-between rounded-[4px]">
                    View All
                    <MdOutlineKeyboardArrowRight size={20} className="" />
                  </div>
                </button>
              </div>
              <div className="flex  justify-between items-center flex-col sm:flex-row ">
                <p className="text-xl font-figTree   text-start font-extralight pb-[16px]">
                  Read our latest articles full of inspiration, tips, and
                  stories about magical children's books.
                </p>
                {/* <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 rounded transition p-2 h-[40px] w-[92px]"
                onClick={() => navigate("/blog")}
              >
                View All
              </button> */}
              </div>
            </div>

            <div className="mx-auto">
              <div className="flex  justify-end">
                {admin && (
                  <button
                    type="submit"
                    onClick={() => {
                      navigate("/create");
                    }}
                    className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:scale-105 transition-all font-semibold text-white text-base py-3 px-8 rounded-xl"
                  >
                    Add Blog
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-[24px] w-full lg:px-5">
                {blogGetData?.slice(0, 3)?.map((item, index) => {
                  return (
                    <BlogCards
                      key={index}
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      item={item}
                      onClick={() => {
                        navigate(`/blog/${item?.id}`, { state: 1 });
                      }}
                    />
                  );
                })}
              </div>
            </div>
            {/* 
          <div
            className="flex justify-center items-center cursor-pointer pt-4 underline"
            onClick={() => {
              navigate("/blog");
            }}
          >
            See All
          </div> */}

            {/* <div className="flex justify-center items-center  w-full ">
            <button
              className="bg-gradient-to-r absolute bottom-2  from-purple-500 to-pink-500 w-28 hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded flex justify-center items-center cursor-pointer transition"
              onClick={() => navigate("/blog")}
            >
              View All
            </button>
          </div> */}
          </div>
        </div>
        {/* FAQ Section */}
        <section className="py-[40px] lg:pb-[80px] pt-[75px] bg-gray-50 ">
          <div className="max-w-max mx-auto lg:px-6 px-[28px]">
            <div className="text-center">
              <h2 className="lg:text-card-header text-[28px]  text-gray-900  mb-[32px] sm:mb-0 lg:mb-4  font-marcellus">
                {isMobile ? "FAQ" : "Frequently Asked Questions"}
              </h2>
            </div>
            {faqsListing?.slice(0, 1)?.map((item) => {
              return (
                <>
                  <div className="rounded-md mb-8">
                    <div className="text-2xl font-figTree font-medium mt-0 pt-0">
                      {item?.categoryName}
                    </div>
                    <div className="space-y-6">
                      <Accordion.Root
                        type="single"
                        collapsible
                        className="w-full mx-auto"
                      >
                        {item?.faqs?.map((item, index) => {
                          return (
                            <div className="">
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
            <div
              className="text-center text-sm font-figTree pt-4 sm:pt-5  underline cursor-pointer"
              onClick={() => navigate("/faqs")}
            >
              See All
            </div>
          </div>
        </section>
        <div className="px-4  py-12  bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 ">
          <div className="relative sm:max-w-xl  md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto  ">
            <h2 className="text-center text-[32px] font-medium mb-8  font-marcellus">
              Parents love us
            </h2>
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
              {reviewList?.map((review) => (
                <SwiperSlide key={review.id} className="pb-10  h-full">
                  <ReviewCard {...review} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ✅ Custom Buttons */}
            <div
              ref={prevRef}
              className="custom-prev absolute left-[-60px] md:left-[-50px] top-1/2 -translate-y-1/2 
          hidden xl:flex w-10 h-10 rounded-full border-2 border-black 
          items-center justify-center bg-white cursor-pointer shadow"
            >
              <span className="text-black text-2xl">
                <HiChevronLeft />
              </span>
            </div>

            <div
              ref={nextRef}
              className="custom-next absolute right-[-60px] md:right-[-50px] top-1/2 -translate-y-1/2 
          hidden xl:flex w-10 h-10 rounded-full border-2 border-black 
          items-center justify-center bg-white cursor-pointer shadow"
            >
              <span className="text-black text-2xl">
                <HiChevronRight />
              </span>
            </div>
          </div>
        </div>

        <ExploreSection />
        {/* Custom Story Section */}
        <div className="lg:pt-0 md:pt-0 pt-48  [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
