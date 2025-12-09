import Navbar from "../components/ui/Navbar";
import ExploreSection from "../components/ui/ExploreSection";
import Footer from "../components/ui/Footer";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faqsData } from "../../store/slices/bookTemplateSlice.js";

import GeoHelmet from "@/components/ui/GeoHelmet.js";

const Faqs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(faqsData());
  }, []);
 const isNavbarOpen = useSelector((state) => state?.bookTemplate?.isNavbarOpen);
  const faqsDataList = useSelector((state) => state?.bookTemplate?.faqsRes);
  const faqsListing = faqsDataList?.data;
  const createFAQSchema = () => {
    const baseUrl = "https://www.starmebooks.com";

    // Flatten all FAQs from all categories into one array
    const allFAQs = faqsListing?.flatMap((category) =>
      category?.faqs?.map((faq) => ({
        "@type": "Question",
        name: faq?.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq?.answer + (faq?.nextLine ? ` ${faq.nextLine}` : ""),
        },
      }))
    );

    // Calculate total FAQ count
    const totalFAQs = allFAQs?.length;
    const categoryCount = faqsListing?.length;

    return {
      "@context": "https://schema.org",
      "@graph": [
        // FAQPage Schema - Primary schema for FAQ pages
        {
          "@type": "FAQPage",
          "@id": `${baseUrl}/faqs#faqpage`,
          url: `${baseUrl}/faqs`,
          name: "Frequently Asked Questions - StarMe Personalized Books",
          description: `Find quick answers to all your questions about StarMe's personalized storybooks — from creating your child's book and uploading photos to shipping, payment, and delivery details. ${totalFAQs} questions answered across ${categoryCount} categories.`,
       
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          breadcrumb: {
            "@id": `${baseUrl}/faqs#breadcrumb`,
          },
          mainEntity: allFAQs,
        },

        // WebPage Schema
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/faqs#webpage`,
          url: `${baseUrl}/faqs`,
          name: "FAQs - StarMe Personalized Storybooks",
          description: "Comprehensive FAQ covering personalized book creation, ordering, shipping, payments, and customization options for StarMe children's books.",
          
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          about: {
            "@id": `${baseUrl}/#organization`,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${baseUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
          },
        },

        // CollectionPage Schema - For organized FAQ categories
        {
          "@type": "CollectionPage",
          "@id": `${baseUrl}/faqs#collection`,
          name: "FAQ Categories",
          description: `${categoryCount} categories of frequently asked questions about personalized children's books`,
          numberOfItems: categoryCount,
          hasPart: faqsListing?.map((category, index) => ({
            "@type": "WebPageElement",
            "@id": `${baseUrl}/faqs#category-${index}`,
            name: category?.categoryName,
            description: `${category?.faqs?.length} questions about ${category?.categoryName}`,
            isPartOf: {
              "@id": `${baseUrl}/faqs#faqpage`,
            },
          })),
        },

        // HowTo Schema - For process-related questions
        {
          "@type": "HowTo",
          "@id": `${baseUrl}/faqs#howto`,
          name: "How to Create a Personalized Storybook with StarMe",
          description: "Step-by-step guide to creating custom children's books",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Choose a Book Template",
              text: "Browse our collection of personalized storybook templates and select one that matches your child's interests.",
              url: `${baseUrl}/template-selection`,
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Upload Child's Photo",
              text: "Upload a clear photo of your child to be featured as the main character in the story.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Customize Details",
              text: "Add your child's name, age, and other personalization details to make the story unique.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Preview and Order",
              text: "Review your personalized book preview and place your order for printing and delivery.",
            },
          ],
        },

        // BreadcrumbList Schema
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/faqs#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "FAQs",
              item: `${baseUrl}/faqs`,
            },
          ],
        },

        // Organization Schema
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "StarMe",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.svg`,
            width: 250,
            height: 60,
          },
          description: "Create personalized children's storybooks where kids become the heroes",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "support@starmebooks.com",
            availableLanguage: ["English"],
          },
        
        },

        // WebSite Schema
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
          name: "StarMe Personalized Books",
          description: "Create custom kids' storybooks where your child becomes the hero",
          publisher: {
            "@id": `${baseUrl}/#organization`,
          },
          
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },

        // Speakable Schema - For voice search optimization
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/faqs#speakable`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".text-3xl", ".text-2xl", ".font-marcellus"],
          },
        },
      ],
    };
  };

  return (
    <>
        <div className="sticky top-0  z-40">
        <GeoHelmet
        title="StarMe FAQs | Answers About Personalized Storybooks, Orders & More"
        description="Find quick answers to all your questions about StarMe's personalized storybooks — from creating your child's book and uploading photos to shipping, payment, and delivery details."
        keywords="FAQ, frequently asked questions, personalized books help, custom book questions, starme support, book creation help, shipping questions, payment help"
        type="website"
        schema={createFAQSchema()}
      />
      <Navbar />
      </div>    
       <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}>      
      <div className=" relative max-w-7xl mx-auto p-4 sm:p-8 z-10">
        <div className="absolute inset-0 -top-28 w-full z-0">
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>
        <div>
          <section className="">
            <div className="relative">
              <div className="text-3xl text-black mb-8 font-marcellus  text-center    ">
                Frequently Asked Questions
              </div>

              {faqsListing?.map((item) => {
                return (
                  <>
                    <div className=" border rounded-md bg-white p-6 mb-8 relative ">
                      <div className="text-2xl font-figTree font-semibold mb-4 text-black">
                        {item?.categoryName}
                      </div>
                      <div className="">
                        <Accordion.Root
                          type="single"
                          collapsible
                           defaultValue="item-0"
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
            </div>
          </section>
        </div>
       
      </div>
      <ExploreSection />
      <div className="lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
      <Footer />
      </div>
      </div>
    </>
  );
};

export default Faqs;
