import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import PersonalisedBookCard from "@/components/ui/PersonalisedBookCard";
import ExploreSection from "@/components/ui/ExploreSection";
import Footer from "@/components/ui/Footer";
import AgeCard from "@/components/ui/AgeCard";
import Navbar from "@/components/ui/Navbar";
import BookCard from "@/components/ui/BookCard";
import genderIcon from "../assets/svgs/gender.svg";
import ageIcon from "../assets/svgs/age.svg";
import { useDispatch, useSelector } from "react-redux";
import dummy from "../assets/images/dummy.png";
import { bookTemplate } from "../../store/slices/bookTemplateSlice.js";
import { Loader } from "@/components/ui/Loader.js";
import age1 from "../assets/images/age1.png";
import age2 from "../assets/images/age2.png";
import age3 from "../assets/images/age3.png";

import EmptyState from "@/components/ui/emptyState.js";
import BasicLoader from "@/components/ui/basicLoader.js";
import BasicLoaderBook from "@/components/ui/basicLoaderBook.js";
import { Helmet } from "react-helmet-async";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string[]>([]);
  const AgeFilter = location?.state?.age;
  useEffect(() => {
    if (AgeFilter) {
      setSelectedAgeRange([AgeFilter]);
    }
  }, [AgeFilter]);
  const currencyData = useSelector((state) => state?.bookTemplate?.currency);

  // useEffect(() => {
  //   const queryParams = {
  //     page: currentPage,
  //     limit: 12,
  //   };

  //   if (selectedAgeRange) {
  //     const [min, max] = selectedAgeRange?.split("-").map(Number);
  //     queryParams.minAge = min;
  //     if (!isNaN(max)) {
  //       queryParams.maxAge = max;
  //     }
  //   }

  //   if (selectedGender) {
  //     queryParams.idealFor = selectedGender;
  //   }

  //   dispatch(bookTemplate(queryParams)); // ✅ FLAT PARAM OBJECT
  // }, [currentPage, selectedAgeRange, selectedGender]);

  // useEffect(() => {
  //   const queryParams: any = {
  //     page: 0,
  //     limit: 12,
  //     onSuccess : (data)=>{
  // setIsFirstTimeCalled(true);
  //     }
  //   };

  //   dispatch(bookTemplate(queryParams ));
  // }, []);
  useEffect(() => {
    const queryParams: any = {
      page: currentPage,
      limit: 12,
    };

    // Handle multiple age ranges by finding min and max across all selections
    if (selectedAgeRange && selectedAgeRange.length > 0) {
      let overallMin = Infinity;
      let overallMax = -Infinity;

      selectedAgeRange?.forEach((range) => {
        const [min, max] = range.split("-").map((val) => {
          // Handle "8+" case
          if (val === "8+") return 8;
          return parseInt(val, 10);
        });

        overallMin = Math.min(overallMin, min);

        // For "8+", treat max as a large number or omit it
        if (range === "8+") {
          overallMax = Infinity;
        } else if (!isNaN(max)) {
          overallMax = Math.max(overallMax, max);
        }
      });

      queryParams.minAge = overallMin;

      // Only set maxAge if it's not Infinity (i.e., "8+" was not selected)
      if (overallMax !== Infinity && overallMax !== -Infinity) {
        queryParams.maxAge = overallMax;
      }
    }

    if (selectedGender && selectedGender.length > 0) {
      queryParams.idealFor = selectedGender;
    }
    dispatch(bookTemplate(queryParams));
  }, [currentPage, selectedAgeRange, selectedGender]);

  const bookTemplates = useSelector(
    (state) => state?.bookTemplate?.bookTemplateData
  );

  const bookTemplatesDate = bookTemplates?.results || [];
  const isLoading = useSelector((state) => state?.bookTemplate?.isLoading);

  const totalPages = bookTemplates?.totalPages || 1;
  const hasNextPage = bookTemplates?.hasNextPage;
  const hasPrevPage = bookTemplates?.hasPrevPage;

  const resetFilters = () => {
    setSelectedGender([]); // Empty array
    setSelectedAgeRange([]); // Empty array
    setCurrentPage(1);
  };

  // const handleAgeChange = (age) => {
  //   setSelectedAgeRange((prevGender) => (prevGender === age ? null : age));
  //   setCurrentPage(1);
  // };
  const handleAgeChange = (age: string) => {
    setSelectedAgeRange((prev = []) => {
      if (prev.includes(age)) {
        return prev.filter((a) => a !== age);
      } else {
        return [...prev, age];
      }
    });
    setCurrentPage(1);
  };

  // const handleGenderChange = (gender) => {
  //   setSelectedGender((prevGender) => (prevGender === gender ? null : gender));
  //   setCurrentPage(1);
  // };

  const handleGenderChange = (gender: string) => {
    setSelectedGender((prev) => {
      // Toggle logic
      if (prev?.includes(gender)) {
        return prev.filter((g) => g !== gender);
      } else {
        return [...prev, gender];
      }
    });
    setCurrentPage(1);
  };
  const handleCreateFromScratch = () => {
    navigate("/from-scratch");
  };

  const activeButtonStyle =
    "bg-activeFilterBg text-activeFilter bg-purple-100 text-purple-600 w-14 h-9 text-sm text-activeFilter flex justify-center items-center";
  const defaultButtonStyle =
    "border border-gray-200  text-gray-500 w-14 h-9  text-sm flex justify-center items-center";

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // scroll 200px *above* the element
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );
  const fallbackBooks = [
    {
      id: "space-explorer",
      title: "Space Explorer Adventure",
      description: "Your child explores outer space and discovers new planets",
      coverImage: "https://www.starmebooks.com/books/space-explorer.jpg",
      genre: "Adventure",
      ageRange: { minAge: 4, maxAge: 8 },
      slug: "space-explorer"
    },
    {
      id: "magical-kingdom",
      title: "Magical Kingdom Quest",
      description: "Your child becomes a brave hero in a magical kingdom",
      coverImage: "https://www.starmebooks.com/books/magical-kingdom.jpg",
      genre: "Fantasy",
      ageRange: { minAge: 4, maxAge: 8 },
      slug: "magical-kingdom"
    },
    {
      id: "underwater-discovery",
      title: "Underwater Discovery",
      description: "Dive deep into ocean adventures and meet sea creatures",
      coverImage: "https://www.starmebooks.com/books/underwater.jpg",
      genre: "Adventure",
      ageRange: { minAge: 2, maxAge: 6 },
      slug: "underwater-discovery"
    },
    {
      id: "superhero-training",
      title: "Superhero Training Academy",
      description: "Your child learns to become a superhero with special powers",
      coverImage: "https://www.starmebooks.com/books/superhero.jpg",
      genre: "Action",
      ageRange: { minAge: 6, maxAge: 10 },
      slug: "superhero-training"
    },
    {
      id: "dinosaur-discovery",
      title: "Dinosaur Discovery",
      description: "Travel back in time to meet dinosaurs and prehistoric creatures",
      coverImage: "https://www.starmebooks.com/books/dinosaur.jpg",
      genre: "Educational",
      ageRange: { minAge: 3, maxAge: 7 },
      slug: "dinosaur-discovery"
    }
  ];
  const schemaBooks = bookTemplatesDate.length > 0 ? bookTemplatesDate : fallbackBooks;
  return (
    <>
      <div className="sticky top-0  z-40">
        {/* <GeoHelmet
          title="Book - StarMe"
          description="Browse 200+ personalized storybook templates for children aged 0-12. Filter by age and gender to find the perfect adventure, fairy tale, or bedtime story where your child becomes the hero. Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
          keywords="personalized books, kids books templates, custom children's books, storybook templates, personalized storybooks by age, books for boys, books for girls, age-appropriate children's books, custom baby books, toddler books, preschool books"
          author="StarMe"
          publishedTime="2024-01-15T00:00:00Z"
          modifiedTime={new Date().toISOString()}
          image="https://www.starmebooks.com/templates-collection.jpg"
          schema={{
            "@context": "https://schema.org",
            "@graph": [
              // CollectionPage Schema - Main page type
              {
                "@type": "CollectionPage",
                "@id":
                  "https://www.starmebooks.com/template-selection#collectionpage",
                url: "https://www.starmebooks.com/template-selection",
                name: "Personalized Children's Book Templates Collection",
                description:
                  "Browse over 200 personalized storybook templates for children aged 0-12 years. Filter by age range and gender to find the perfect story for your child.",
                isPartOf: {
                  "@id": "https://www.starmebooks.com/#website",
                },
                breadcrumb: {
                  "@id":
                    "https://www.starmebooks.com/template-selection#breadcrumb",
                },
                mainEntity: {
                  "@id":
                    "https://www.starmebooks.com/template-selection#itemlist",
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  "@id":
                    "https://www.starmebooks.com/template-selection#primaryimage",
                  url: "https://www.starmebooks.com/templates-collection.jpg",
                  width: 1200,
                  height: 630,
                  caption: "StarMe Book Templates Collection",
                },
              },

              // BreadcrumbList Schema
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.starmebooks.com/template-selection#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.starmebooks.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Book Templates",
                    item: "https://www.starmebooks.com/template-selection",
                  },
                ],
              },

              // ItemList Schema - The book templates collection
              {
                "@type": "ItemList",
                "@id":
                  "https://www.starmebooks.com/template-selection#itemlist",
                name: "Personalized Book Templates",
                description:
                  "Complete collection of personalized storybook templates",
                numberOfItems: bookTemplatesDate?.length || 200,
                itemListElement:
                  bookTemplatesDate
                    ?.slice(0, 20) // Increase to show more books
                    .map((book, index) => ({
                      "@type": "ListItem",
                      position: index + 1,
                      item: {
                        "@type": "Book",
                        "@id": `https://www.starmebooks.com/book/${book?.id}`,
                        name: book?.title,
                        description: book?.description,
                        image: book?.coverImage,
                        bookFormat: "Hardcover",
                        inLanguage: "en",
                        author: {
                          "@id": "https://www.starmebooks.com/#organization",
                        },
                        publisher: {
                          "@id": "https://www.starmebooks.com/#organization",
                        },
                        genre: book?.genre || "Children's Literature",
                        audience: {
                          "@type": "PeopleAudience",
                          suggestedMinAge: book?.ageRange?.minAge || 0,
                          suggestedMaxAge: book?.ageRange?.maxAge || 12,
                        },
                        url: `https://www.starmebooks.com/book/${
                          book?.slug || book?.id
                        }`,
                      },
                    })) || [],
              },

              // WebPage Schema
              {
                "@type": "WebPage",
                "@id": "https://www.starmebooks.com/template-selection#webpage",
                url: "https://www.starmebooks.com/template-selection",
                name: "Personalized Book Templates - StarMe",
                description:
                  "Browse our collection of personalized storybook templates where your child becomes the star of their own adventure.",
                isPartOf: {
                  "@id": "https://www.starmebooks.com/#website",
                },
                about: {
                  "@type": "Thing",
                  name: "Personalized Children's Books",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.starmebooks.com/template-selection#primaryimage",
                },
                breadcrumb: {
                  "@id":
                    "https://www.starmebooks.com/template-selection#breadcrumb",
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
                        "https://www.starmebooks.com/template-selection?gender={gender}&age={age_range}",
                      actionPlatform: [
                        "http://schema.org/DesktopWebPlatform",
                        "http://schema.org/MobileWebPlatform",
                      ],
                    },
                    "query-input":
                      "required name=gender, required name=age_range",
                  },
                  {
                    "@type": "CreateAction",
                    name: "Create Personalized Book",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://www.starmebooks.com/template-selection",
                    },
                    description:
                      "Select a template and create a personalized book for your child",
                  },
                ],
              },

              // Organization Schema
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
                // Only include contactPoint if you have real contact info
                // contactPoint: {
                //   "@type": "ContactPoint",
                //   contactType: "Customer Service",
                //   email: "support@starmebooks.com",
                //   areaServed: "IN",
                //   availableLanguage: ["English", "Hindi"]
                // }
              },

              // Service Schema - INSTEAD of Product (since you don't have price/reviews)
              {
                "@type": "Service",
                "@id": "https://www.starmebooks.com/template-selection#service",
                serviceType: "Personalized Children's Book Creation",
                name: "Custom Storybook Templates",
                description:
                  "Choose from over 200 professionally illustrated storybook templates where your child becomes the main character. Covering adventure, education, fairy tales, and bedtime stories.",
                provider: {
                  "@id": "https://www.starmebooks.com/#organization",
                },
                image: "https://www.starmebooks.com/templates-collection.jpg",
                areaServed: {
                  "@type": "Country",
                  name: "Worldwide",
                },
                availableChannel: {
                  "@type": "ServiceChannel",
                  serviceUrl: "https://www.starmebooks.com/template-selection",
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
                additionalProperty: [
                  {
                    "@type": "PropertyValue",
                    name: "Total Templates",
                    value: "200+",
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Age Ranges",
                    value: "0-2, 2-4, 4-6, 6-8, 8+",
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Genres",
                    value:
                      "Adventure, Fairy Tales, Educational, Bedtime Stories",
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Customization",
                    value: "Photo, Name, Character Details",
                  },
                ],
              },

              // OfferCatalog Schema - Shows categorization
              {
                "@type": "OfferCatalog",
                "@id":
                  "https://www.starmebooks.com/template-selection#offercatalog",
                name: "Book Templates by Age Range",
                description:
                  "Personalized book templates organized by age appropriateness",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 0-2",
                    description:
                      "Board books and simple stories for babies and toddlers",
                    numberOfItems: 40,
                    url: "https://www.starmebooks.com/template-selection?age=0-2",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 2-4",
                    description: "Picture books with simple text for toddlers",
                    numberOfItems: 50,
                    url: "https://www.starmebooks.com/template-selection?age=2-4",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 4-6",
                    description: "Early reader books for preschool children",
                    numberOfItems: 50,
                    url: "https://www.starmebooks.com/template-selection?age=4-6",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 6-8",
                    description: "Chapter books for early elementary students",
                    numberOfItems: 40,
                    url: "https://www.starmebooks.com/template-selection?age=6-8",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 8+",
                    description: "Advanced stories for older children",
                    numberOfItems: 20,
                    url: "https://www.starmebooks.com/template-selection?age=8+",
                  },
                ],
              },
            ],
          }}
        /> */}

<GeoHelmet
          title="Book - StarMe"
          description="Browse 200+ personalized storybook templates..."
          keywords="personalized books, kids books templates..."
          schema={{
            "@context": "https://schema.org",
            "@graph": [
              // CollectionPage Schema
              {
                "@type": "CollectionPage",
                "@id": "https://www.starmebooks.com/template-selection#collectionpage",
                url: "https://www.starmebooks.com/template-selection",
                name: "Personalized Children's Book Templates Collection",
                description: "Browse over 200 personalized storybook templates for children aged 0-12 years.",
                isPartOf: {
                  "@id": "https://www.starmebooks.com/#website",
                },
                breadcrumb: {
                  "@id": "https://www.starmebooks.com/template-selection#breadcrumb",
                },
                mainEntity: {
                  "@id": "https://www.starmebooks.com/template-selection#itemlist",
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  "@id": "https://www.starmebooks.com/template-selection#primaryimage",
                  url: "https://www.starmebooks.com/templates-collection.jpg",
                  width: 1200,
                  height: 630,
                  caption: "StarMe Book Templates Collection",
                },
              },

              // BreadcrumbList Schema
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.starmebooks.com/template-selection#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.starmebooks.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Book Templates",
                    item: "https://www.starmebooks.com/template-selection",
                  },
                ],
              },

              // ✅ FIXED: ItemList with guaranteed data
              {
                "@type": "ItemList",
                "@id": "https://www.starmebooks.com/template-selection#itemlist",
                name: "Personalized Book Templates",
                description: "Complete collection of personalized storybook templates",
                numberOfItems: schemaBooks.length, // ✅ Use schemaBooks
                itemListElement: schemaBooks
                  .slice(0, 20)
                  .map((book, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "Book",
                      "@id": `https://www.starmebooks.com/book/${book?.id}`,
                      name: book?.title,
                      description: book?.description,
                      image: book?.coverImage,
                      bookFormat: "Hardcover",
                      inLanguage: "en",
                      author: {
                        "@id": "https://www.starmebooks.com/#organization",
                      },
                      publisher: {
                        "@id": "https://www.starmebooks.com/#organization",
                      },
                      genre: book?.genre || book?.genreId?.name || "Children's Literature",
                      audience: {
                        "@type": "PeopleAudience",
                        suggestedMinAge: book?.ageRange?.minAge || 0,
                        suggestedMaxAge: book?.ageRange?.maxAge || 12,
                      },
                      url: `https://www.starmebooks.com/book/space-explorer/${book?.id}`,
                    },
                  })),
              },
              {
                "@type": "Product",
                "@id": "https://www.starmebooks.com/template-selection#product",
                name: "Personalized Children's Storybook",
                description: "Custom personalized storybooks where your child becomes the hero. Choose from 200+ templates.",
                image: [
                  "https://www.starmebooks.com/templates-collection.jpg"
                ],
                brand: {
                  "@type": "Brand",
                  name: "StarMe"
                },
                category: "Books > Children's Books > Personalized Books",
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: currencyData?.currencyCode || "USD",
                 
                  offerCount: 200,
                  availability: "https://schema.org/InStock",
                  url: "https://www.starmebooks.com/template-selection"
                }
              },
              // WebPage Schema
              {
                "@type": "WebPage",
                "@id": "https://www.starmebooks.com/template-selection#webpage",
                url: "https://www.starmebooks.com/template-selection",
                name: "Personalized Book Templates - StarMe",
                description: "Browse our collection of personalized storybook templates.",
                isPartOf: {
                  "@id": "https://www.starmebooks.com/#website",
                },
                about: {
                  "@type": "Thing",
                  name: "Personalized Children's Books",
                },
                primaryImageOfPage: {
                  "@id": "https://www.starmebooks.com/template-selection#primaryimage",
                },
                breadcrumb: {
                  "@id": "https://www.starmebooks.com/template-selection#breadcrumb",
                },
              },

              // WebSite Schema
              {
                "@type": "WebSite",
                "@id": "https://www.starmebooks.com/#website",
                url: "https://www.starmebooks.com",
                name: "StarMe Personalized Books",
                description: "Create custom kids' storybooks where your child becomes the hero",
                publisher: {
                  "@id": "https://www.starmebooks.com/#organization",
                },
              },

              // Organization Schema
              {
                "@type": "Organization",
                "@id": "https://www.starmebooks.com/#organization",
                name: "StarMe",
                alternateName: "StarMe Books",
                url: "https://www.starmebooks.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.starmebooks.com/logo.svg",
                  width: 250,
                  height: 60,
                },
                description: "StarMe creates personalized children's storybooks",
              },

              // Service Schema
              {
                "@type": "Service",
                "@id": "https://www.starmebooks.com/template-selection#service",
                serviceType: "Personalized Children's Book Creation",
                name: "Custom Storybook Templates",
                description: "Choose from over 200 illustrated storybook templates",
                provider: {
                  "@id": "https://www.starmebooks.com/#organization",
                },
                image: "https://www.starmebooks.com/templates-collection.jpg",
                areaServed: {
                  "@type": "Country",
                  name: "Worldwide",
                },
                audience: {
                  "@type": "PeopleAudience",
                  suggestedMinAge: 0,
                  suggestedMaxAge: 12,
                },
                category: "Children's Books",
              },

              // OfferCatalog Schema
              {
                "@type": "OfferCatalog",
                "@id": "https://www.starmebooks.com/template-selection#offercatalog",
                name: "Book Templates by Age Range",
                description: "Personalized book templates organized by age",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 0-2",
                    description: "Board books and simple stories for babies",
                    numberOfItems: 40,
                    url: "https://www.starmebooks.com/template-selection?age=0-2",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 2-4",
                    description: "Picture books with simple text",
                    numberOfItems: 50,
                    url: "https://www.starmebooks.com/template-selection?age=2-4",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 4-6",
                    description: "Early reader books for preschool",
                    numberOfItems: 50,
                    url: "https://www.starmebooks.com/template-selection?age=4-6",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 6-8",
                    description: "Chapter books for elementary students",
                    numberOfItems: 40,
                    url: "https://www.starmebooks.com/template-selection?age=6-8",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Books for Ages 8+",
                    description: "Advanced stories for older children",
                    numberOfItems: 20,
                    url: "https://www.starmebooks.com/template-selection?age=8+",
                  },
                ],
              },
            ],
          }}
        />
        <Navbar />
      </div>
      <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50  ">
          <div className=" max-w-max mx-auto  px-0 sm:px-6">
            <div className="flex flex-col space-y-0 gap-4 pt-4 md:mt-0 px-4 md:px-0 ">
              {/* <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 p-2">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button> */}

              <div className="" id="filtersSection">
                <PersonalisedBookCard
                  title="Hyper-personalised Books"
                  description="A Story for Everyone, Tailored Just Right"
                />
                <div
                  className="flex items-start sm:items-center  gap-2 sm:gap-8 lg:gap-8  py-3 px-1 sm:px-4 text-gray-600     [@media(min-width:1px)_and_(max-width:424px)]:flex-wrap
              "
                >
                  <div className="gender-filter flex items-center gap-2 flex-wrap ">
                    <img src={genderIcon} alt="gender" className="w-5"  loading="lazy" />
                    <div className="font-figTree text-sm text-gray-600">
                      Gender
                    </div>
                    <div className="flex gap-1">
                      <button
                        className={`p-2 font-figTree cursor-pointer border rounded-md px-3 lg:px-4 py-2 text-sm ${
                          selectedGender?.includes("boy")
                            ? activeButtonStyle
                            : defaultButtonStyle
                        }`}
                        onClick={() => handleGenderChange("boy")}
                      >
                        Boy
                      </button>

                      <button
                        className={`p-2 font-figTree cursor-pointer border rounded-md px-3 lg:px-4 py-2 text-sm ${
                          selectedGender?.includes("girl")
                            ? activeButtonStyle
                            : defaultButtonStyle
                        }`}
                        onClick={() => handleGenderChange("girl")}
                      >
                        Girl
                      </button>
                    </div>
                  </div>
                  <div className="hidden lg:block h-8 border-l border-gray-300"></div>
                  <div className="age-filter flex items-center flex-wrap gap-2">
                    <svg
                      class="w-5 h-5 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                      ></path>
                    </svg>
                    <div className=" text-sm font-figTree pr-1 lg:pr-0 text-gray-600 ">
                      Child Age
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {["0-2", "2-4", "4-6", "6-8", "8+"].map((range, idx) => {
                        return (
                          <button
                            key={range}
                            className={`text-center cursor-pointer border border-gray-300 text-sm  px-3 rounded-md hover:bg-purple-50 transition-colors font-figTree text-gray-600 ${
                              selectedAgeRange?.includes(range)
                                ? activeButtonStyle
                                : defaultButtonStyle
                            }`}
                            onClick={() => handleAgeChange(range)}
                          >
                            {range}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {(currentPage > 1 ||
                    (selectedGender && selectedGender.length > 0) ||
                    (selectedAgeRange && selectedAgeRange.length > 0)) && (
                    <>
                      <div className="flex items-center gap-1">
                        <div className="hidden lg:block h-8 border-l border-gray-300"></div>
                        <div
                          className="text-sm font-medium text-gray-500 underline  p-2  sm:mt-0 hover:text-purple-600 whitespace-nowrap cursor-pointer font-figTree"
                          onClick={resetFilters}
                        >
                          Clear
                        </div>
                        {isLoading && (
                          <BasicLoaderBook color={"fill-purple-500"} />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* {isLoading ? (
            <div className="flex items-center justify-center mt-10"> <img src={loadingImage} alt="image" className="w-28" /> </div>
            ) : ( */}
              {bookTemplatesDate?.length === 0 &&
              (selectedGender?.length > 0 || selectedAgeRange?.length > 0) ? (
                <EmptyState />
              ) : (
                <div>
                  <div className="grid grid-cols-2 gap-x-4  gap-y-4 sm:gap-y-5 md:gap-y-7 lg:gap-y-10 xl:gap-y-14 [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1  md:grid-cols-3 md:gap-x-12 lg:grid-cols-3 xl:gap-x-24 w-full ">
                    {bookTemplatesDate?.map((card) => {
                      const ageRange =
                        card?.ageRange &&
                        card.ageRange.minAge &&
                        card.ageRange.maxAge
                          ? `${card.ageRange.minAge} - ${card.ageRange.maxAge} years`
                          : "";
                      return (
                        <BookCard
                          key={card.id}
                          title={card?.title}
                          description={card?.description}
                          idealFor={card?.idealFor}
                          ageRange={ageRange}
                          imageUrl={card?.coverImage}
                          gender={card?.idealFor}
                          isBook={true}
                          discount={
                            card?.discountPct
                              ? `-${card?.discountPct}%`
                              : undefined
                          }
                          extraClass={
                            "[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                          }
                          onPersonalise={() => {
                            navigate(`/book/space-explorer/${card.id}`);
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Pagination Controls */}

                  {bookTemplatesDate?.length > 0 && (
                    <div className="flex justify-center items-center  pt-5 space-x-2 flex-wrap">
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={!hasPrevPage}
                        className={`px-3 py-1 rounded border text-sm ${
                          !hasPrevPage
                            ? "text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r  from-purple-500 to-pink-500 hover:bg-blue-100  text-white"
                        }`}
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`px-3 py-1 text-sm rounded border ${
                              currentPage === page
                                ? "bg-gradient-to-r  from-purple-500 to-pink-500 text-white border-purple-600"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100 "
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={!hasNextPage}
                        className={`px-3 py-1 rounded border text-sm ${
                          !hasNextPage
                            ? "text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r  from-purple-500 to-pink-500 hover:bg-blue-100  text-white"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative left-1/2 right-1/2 -ml-[51vw] -mr-[50vw] w-screen mt-12 sm:mt-16">
              <img
                className="hidden sm:block w-full mt-20 h-4 md:h-auto"
                src={
                  "https://resources.wonderwraps.com/08058d48-f573-468b-9ee8-570e7fff362d/img/stars.png"
                }
                alt="image"
                 loading="lazy"
              />
              <div
                className="block sm:hidden mt-8 mb-10 h-8 bg-repeat-x"
                style={{
                  backgroundImage:
                    "url('https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/double_stars.png')",
                  backgroundSize: "auto 100%",
                }}
              ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-0 sm:pt-12 pb-4">
              <h2 className=" text-[24px] sm:text-3xl font-marcellus text-black  text-center sm:text-start">
                Browse Stories by Age
              </h2>
              <div className="my-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-4 sm:px-2">
                  {ageCardData?.map((card) => (
                    <AgeCard
                      key={card.id}
                      imageUrl={card.imageUrl}
                      ageLabel={card.ageLabel}
                      onClick={() => {
                        setSelectedAgeRange([card.ageLabel]); // Wrap in array
                        scrollToSection("filtersSection");
                        setCurrentPage(1);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ExploreSection />
        </div>
        <div className="lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TemplateSelectionPage;
