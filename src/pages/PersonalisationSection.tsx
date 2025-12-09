import React, { useState } from "react";
import PersonalizationForm from "@/components/ui/PersonalizationForm";
import PersonalizedImageSlider from "@/components/ui/PersonalizedImageSlider";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import GeoHelmet from "@/components/ui/GeoHelmet";

interface PersonalizationProps {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const PersonalizationSection: React.FC<PersonalizationProps> = ({
  setStep,
}) => {
  const location = useLocation();
  const { CustomTemplateCategoryIds } = location.state || {};
  const navigate = useNavigate();
  const loginId = location?.state?.id;

  const id = localStorage.getItem("id");
  const [preview, setPreview] = useState<string | null>(null);
  // USAGE NOTES:
  // 1. This schema tells Google this is a page for creating personalized books
  // 2. HowTo schema helps with "How to" searches and Google Assistant
  // 3. Service schema defines what you offer on this page
  // 4. BreadcrumbList helps with navigation in search results

  return (
    <section className="max-w-max mx-auto flex flex-col lg:flex-row gap-0 border bg-white rounded-lg ">
  
      <GeoHelmet
        title="Create Your Child's Personalized Storybook | StarMe"
        description="Create a magical personalized storybook for your child. Upload their photo and watch them become the star of their own adventure. Enter their name, age, and gender to start creating a unique story just for them."
        keywords="personalize children's book, custom storybook, upload child photo, personalized book creation, child name book, personalized kids books, custom children's stories"
        image="https://www.starmebooks.com/og-image.jpg"
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            // WebPage Schema
            {
              "@type": "WebPage",
              "@id": "https://www.starmebooks.com/setup#webpage",
              url: "https://www.starmebooks.com/setup",
              name: "Create Your Child's Personalized Storybook",
              description:
                "Create a magical personalized storybook for your child by uploading their photo and entering their details.",
              isPartOf: {
                "@id": "https://www.starmebooks.com/#website",
              },
              about: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              primaryImageOfPage: {
                "@type": "ImageObject",
                "@id": "https://www.starmebooks.com/setup#primaryimage",
                url: "https://www.starmebooks.com/og-image.jpg",
                width: 1200,
                height: 630,
                caption: "StarMe Personalized Children's Books",
              },
              breadcrumb: {
                "@id": "https://www.starmebooks.com/setup#breadcrumb",
              },
              potentialAction: {
                "@type": "CreateAction",
                name: "Create Personalized Book",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.starmebooks.com/setup",
                  actionPlatform: [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform",
                  ],
                },
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
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.starmebooks.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
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
                "@id": "https://www.starmebooks.com/#logo",
                url: "https://www.starmebooks.com/logo.svg",
                contentUrl: "https://www.starmebooks.com/logo.svg",
                width: 250,
                height: 60,
                caption: "StarMe Logo",
              },
              sameAs: [
                // Add your social media profiles here
                // "https://www.facebook.com/starmebooks",
                // "https://www.instagram.com/starmebooks",
                // "https://twitter.com/starmebooks"
              ],
            },

            // BreadcrumbList Schema
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.starmebooks.com/setup#breadcrumb",
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
                  name: "Personalize Book",
                  item: "https://www.starmebooks.com/setup",
                },
              ],
            },

            // HowTo Schema - Shows steps for creating personalized book
            {
              "@type": "HowTo",
              "@id": "https://www.starmebooks.com/setup#howto",
              name: "How to Create a Personalized Children's Storybook",
              description:
                "Step-by-step guide to creating a custom storybook where your child becomes the star of their own adventure",
              image: {
                "@type": "ImageObject",
                url: "https://www.starmebooks.com/og-image.jpg",
                width: 1200,
                height: 630,
              },
              totalTime: "PT5M", // 5 minutes
              supply: [
                {
                  "@type": "HowToSupply",
                  name: "Child's photo",
                },
                {
                  "@type": "HowToSupply",
                  name: "Child's name",
                },
                {
                  "@type": "HowToSupply",
                  name: "Child's age",
                },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Upload Child's Photo",
                  text: "Upload a clear, front-facing photo of your child. The photo should be solo, well-lit, and show the full face without obstructions.",
                  image: "https://www.starmebooks.com/og-image.jpg",
                  url: "https://www.starmebooks.com/setup#step1",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Select Gender",
                  text: "Choose your child's gender to personalize the story accordingly.",
                  url: "https://www.starmebooks.com/setup#step2",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Enter Child's Name",
                  text: "Enter your child's first name (maximum 25 characters) to appear throughout the story.",
                  url: "https://www.starmebooks.com/setup#step3",
                },
                {
                  "@type": "HowToStep",
                  position: 4,
                  name: "Enter Child's Age",
                  text: "Enter your child's age to ensure age-appropriate content and illustrations.",
                  url: "https://www.starmebooks.com/setup#step4",
                },
                {
                  "@type": "HowToStep",
                  position: 5,
                  name: "Create Book",
                  text: "Review all the details and click 'Create Personalized Book' to start the magic!",
                  url: "https://www.starmebooks.com/setup#step5",
                },
              ],
            },

            // Service Schema - CORRECTED
            {
              "@type": "Service",
              "@id": "https://www.starmebooks.com/setup#service",
              serviceType: "Personalized Children's Book Creation",
              name: "Custom Storybook Creation Service",
              provider: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              description:
                "Custom storybook creation service where children become the heroes of their own adventures. Upload a photo, add details, and create a magical personalized book.",
              areaServed: {
                "@type": "Country",
                name: "Worldwide",
              },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: "https://www.starmebooks.com/setup",
                serviceType: "Online",
              },
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: 0,
                suggestedMaxAge: 12,
              },
              category: "Children's Books",
              termsOfService: "https://www.starmebooks.com/terms",
              // If you have pricing, add it here:
              // offers: {
              //   "@type": "Offer",
              //   price: "29.99",
              //   priceCurrency: "USD",
              //   availability: "https://schema.org/InStock",
              //   url: "https://www.starmebooks.com/setup"
              // }
            },

            // CreativeWork Schema (for the personalized book concept)
            {
              "@type": "CreativeWork",
              "@id": "https://www.starmebooks.com/setup#creativework",
              name: "Personalized Children's Storybook",
              description:
                "A custom-made storybook featuring your child as the main character",
              image: "https://www.starmebooks.com/og-image.jpg",
              author: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              creator: {
                "@id": "https://www.starmebooks.com/#organization",
              },
              genre: "Children's Literature",
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: 0,
                suggestedMaxAge: 12,
              },
            },
          ],
        }}
      />
      <div className="w-full lg:w-7/12 xl:w-7/5 space-y-6 px-6 border-r border-gray-100 lg:bg-transparent  bg-[#f3e1ff]  lg:h-auto h-screen scrollbar-hidden overflow-scroll">
        <div className="hidden md:block font-marcellus text-xl md:text-3xl text-center pt-2 pb-4 whitespace-nowrap mx-4">
          {/* Back Button */}
          <div
            className="absolute left-0 block sm:hidden  "
            onClick={() => {
              navigate(`/book/space-explorer/${loginId || id}`);
            }}
          >
            <IoChevronBack size={25} />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-marcellus text-center text-black">
            Start Personalisation
          </h1>
        </div>
        {/* <div className="bg-yellow-100 border border-dashed border-yellow-400 text-sm text-yellow-800 px-4 py-2 rounded-md">
          Due to high volume, processing may take longer than usual. Thank you
          for your patience.
        </div> */}
        <PersonalizationForm
          setStep={setStep}
          preview={preview}
          setPreview={setPreview}
        />
      </div>
      <div
        className="w-full lg:w-3/5 xl:w-5/12 hidden sm:block lg:block xl:block pl-2 md:hidden
"
        style={{
          background:
            "linear-gradient(317.92deg, rgba(197, 105, 255, 0.3) 2.92%, rgba(255, 255, 255, 0.3) 55.83%)",
        }}
      >
        <PersonalizedImageSlider preview={preview} />
      </div>
    </section>
  );
};

export default PersonalizationSection;
