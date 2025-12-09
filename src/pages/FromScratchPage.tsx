import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Search, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryTemplate,
  generateSummaryCategory,
} from "../../store/slices/bookTemplateSlice.js";
import Navbar from "@/components/ui/Navbar.js";
import StepperBatch from "@/components/ui/newStepper.js";
import { useIsMobile } from "@/hooks/use-mobile.js";
import loading from "../assets/images/purple.gif";
import { Helmet } from "react-helmet-async";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const FromScratchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    hero: "",
    adventure: "",
    morality: "",
    customMorality: "",
  });
  const [customAdventure, setCustomAdventure] = useState("");
  const [customMorality, setCustomMorality] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(categoryTemplate({ categoryType: "character" }));
  }, []);

  // Scroll to top when currentStep changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);
  const handleNext = () => {
    let categoryType = "";

    if (currentStep === 1) categoryType = "adventure";
    else if (currentStep === 2) categoryType = "morality";
    else if (currentStep === 3) categoryType = "genre";

    // Dispatch API only for step 1 & 2
    if (categoryType) {
      dispatch(categoryTemplate({ categoryType }));
    }

    if (currentStep <= 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const bookTemplates = useSelector(
    (state) => state?.bookTemplate?.categoryTemplateData
  );
  const generateSummaryData = useSelector(
    (state) => state?.bookTemplate?.generateSummaryData
  );
  const isGenerateSummaryLoading = useSelector(
    (state) => state?.bookTemplate?.isGenerateSummary
  );

  const rawData = bookTemplates || []; // ← safely get array
  const heroOptions = rawData?.map((item) => ({
    id: item.id,
    title: item.name,
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    description: item.description,
    image: item.thumbnail,
  }));

  const adventureOptions = rawData?.map((item) => ({
    id: item.id,
    title: item.name,
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    description: item.description,
    image: item.thumbnail,
  }));

  const moralityOptions = rawData?.map((item) => ({
    id: item.id,
    title: item.name,
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    description: item.description,
    image: item.thumbnail,
  }));

  const handleSelection = (
    type: "hero" | "adventure" | "morality",
    value: string
  ) => {
    setSelections({ ...selections, [type]: value });
  };

  const handleFinish = () => {
    const heroId = selections.hero;
    const adventureId = selections.adventure;
    const moralityId = selections.morality;

    const customStory = {
      hero: heroOptions.find((h) => h.id === heroId)?.title || "",
      adventure:
        adventureOptions.find((a) => a.id === adventureId)?.title || "",
      morality:
        moralityOptions.find((m) => m.id === moralityId)?.title ||
        selections.customMorality,
    };
    localStorage.removeItem("Hero");
    localStorage.removeItem("Adventure");
    localStorage.removeItem("Morality");
    // Combine IDs — exclude empty ones
    const CustomTemplateCategoryIds = [heroId, adventureId, moralityId].filter(
      Boolean
    ); // removes undefined or empty string

    navigate("/setup", {
      state: {
        customStory,
        flow: "custom",
        CustomTemplateCategoryIds,
        summary: generateSummaryData?.data?.summary,
      },
    });
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Choose Your Hero Character";
      case 2:
        return "Choose the Adventure";
      case 3:
        return "Choose the Wise Morality";
      case 4:
        return "Story Summary";
      default:
        return "";
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selections.hero !== "";
      case 2:
        return selections.adventure !== "";
      case 3:
        return selections.morality !== "" || selections.customMorality !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  const generateSummary = () => {
    const hero = heroOptions.find((h) => h.id === selections.hero);
    const adventure = adventureOptions.find(
      (a) => a.id === selections.adventure
    );
    const morality = moralityOptions.find((m) => m.id === selections.morality);

    return `Your child will be a ${
      hero?.title || "hero"
    } who goes on an adventure ${
      adventure?.title || "somewhere amazing"
    }. The story will teach ${
      morality?.title || selections.customMorality || "important values"
    }.`;
  };

  const renderOptionCards = (
    options: any[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => {
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2  ">
          {options.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md border-2 h-full overflow-hidden ${
                selectedValue === option.id
                  ? "border-purple-500 shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-purple-300"
              } bg-white rounded-xl animate-fade-in-up`}
              onClick={() => {
                onSelect(option.id);
                if (currentStep === 1) {
                  localStorage.setItem("Hero", option?.title);
                } else if (currentStep === 2) {
                  localStorage.setItem("Adventure", option?.title);
                } else if (currentStep === 3) {
                  localStorage.setItem("Morality", option?.title);
                }
              }}
              style={{ animationDelay: `${options.indexOf(option) * 50}ms` }}
            >
              <div className="relative">
                <div className="w-full lg:h-52 h-40">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                {selectedValue === option.id && (
                  <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center animate-pulse">
                    <div className="bg-purple-500 text-white p-3 rounded-full">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="pb-3 pt-3">
                <CardTitle className="text-sm font-bold text-gray-900 font-figTree line-clamp-1">
                  {option.title}
                </CardTitle>
                <CardDescription className="text-xs text-gray-600 font-figTree line-clamp-2">
                  {option.description}
                </CardDescription>
              </CardHeader>
            </div>
          ))}
        </div>
      </>
    );
  };
  const steps = [
    { label: "Choose Your Hero Character" },
    { label: "Choose the Adventure" },
    { label: "Choose the Wise Morality" },
    { label: "Story Summary" },
  ];

  const heroId = heroOptions.find((h) => h.id === selections.hero)?.title || "";
  const adventureId = selections.adventure;
  const moralityId = selections.morality;
  const customStory = {
    hero: heroOptions.find((h) => h.id === heroId)?.title || "",
    adventure: adventureOptions.find((a) => a.id === adventureId)?.title || "",
    morality:
      moralityOptions.find((m) => m.id === moralityId)?.title ||
      selections.customMorality,
  };

  useEffect(() => {
    if (moralityOptions) {
      dispatch(
        generateSummaryCategory({
          character: localStorage.getItem("Hero"),
          adventure: localStorage.getItem("Adventure"),
          morality: localStorage.getItem("Morality"),
        })
      );
    }
  }, [moralityOptions?.length]);

  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );

  const createFromScratchSchema = () => {
    const baseUrl = "https://www.starmebooks.com";

    return {
      "@context": "https://schema.org",
      "@graph": [
        /* PAGE INFO */
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/custom-story#create-page`,
          url: `${baseUrl}/custom-story`,
          name: "Create a Personalized Story From Scratch | StarMe",
          description:
            "Start building a fully customized story for your child. Choose a hero, adventure, and life lesson to create a magical personalized book.",
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${baseUrl}/images/story-creation.jpg`,
            width: 1200,
            height: 630,
          },
        },

        /* BREADCRUMB */
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/custom-story#breadcrumb`,
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
              name: "Custom Story",
              item: `${baseUrl}/custom-story`,
            },
          ],
        },

        /* ORGANIZATION */
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
          description:
            "StarMe creates personalized children's storybooks where kids become the hero of their own magical adventures.",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "support@starmebooks.com",
            availableLanguage: ["English"],
          },
          
        },

        /* WEBSITE */
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
          name: "StarMe Personalized Books",
          description:
            "Create custom storybooks where your child becomes the hero of their own adventure.",
          publisher: {
            "@id": `${baseUrl}/#organization`,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },

        /* SPEAKABLE */
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/custom-story#speakable`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".text-lg", ".page-title"],
          },
        },

       
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <GeoHelmet
        title="Create a Personalized Story From Scratch | StarMe"
        description="Start building a fully custom story for your child by choosing a hero, adventure theme, and life lesson. Create a magical personalized book."
        keywords="custom story creator, personalized children's book, choose hero, create adventure, morality story, StarMe books"
        type="webpage"
        schema={createFromScratchSchema()}
      />

      <div className="sticky top-0  z-40">
        <Navbar />
      </div>
      <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
        <div className=" 2xl:max-w-[1000px] xl:max-w-[1000px] lg:max-w-[1000px] lg:mx-auto px-4 py-2">
          <div className="my-5">
            <StepperBatch
              steps={steps}
              currentStep={currentStep - 1}
              isMobile={true}
              isFromScratch={window.innerWidth <= 768 ? true : false}
            />
          </div>

          <div className=" max-w-auto  mx-auto  lg:pb-0 pb-24 ">
            {/* Step 1: Hero Selection */}
            {currentStep === 1 &&
              renderOptionCards(heroOptions, selections.hero, (value) =>
                handleSelection("hero", value)
              )}

            {/* Step 2: Adventure Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 mb-2 sm:mb-0">
                {renderOptionCards(
                  adventureOptions,
                  selections.adventure,
                  (value) => handleSelection("adventure", value)
                )}

                <Card className="bg-white/80 max-w-2xl mx-auto  ">
                  <CardHeader>
                    <CardTitle className="text-center py-1">
                      Or Write Your Adventure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write a short description of the adventure..."
                      value={customAdventure}
                      onChange={(e) => setCustomAdventure(e.target.value)}
                      className="min-h-[50px]"
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Morality Selection */}
            {currentStep === 3 && (
              <div className="space-y-6 mb-2 sm:mb-0">
                {renderOptionCards(
                  moralityOptions,
                  selections.morality,
                  (value) => handleSelection("morality", value)
                )}

                <Card className="bg-white/80 max-w-2xl mx-auto  ">
                  <CardHeader>
                    <CardTitle className="text-center py-1">
                      Or Write Your Own Moral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="What lesson would you like your child to learn?"
                      value={customMorality}
                      onChange={(e) => setCustomMorality(e.target.value)}
                      className="min-h-[50px]"
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Summary */}
            {currentStep === 4 && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="bg-white/80  p-4 ">
                    <CardHeader>
                      <CardTitle className="p-0">Your Story Summary</CardTitle>
                    </CardHeader>
                    <div className="py-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                        <p className="text-lg leading-relaxed font-figTree">
                          {isGenerateSummaryLoading ? (
                            <>
                              <div className="flex justify-center">
                                <img
                                  src={loading}
                                  alt="image"
                                  className="w-28"
                                />
                              </div>
                            </>
                          ) : (
                            generateSummaryData?.data?.summary
                          )}
                          {}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="mt-4 font-figTree"
                        >
                          Back to creating story guidelines
                        </Button>
                        <Button
                          onClick={handleFinish}
                          className="bg-gradient-to-r  from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium hidden lg:block mt-4  px-8 font-figTree shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-auto lg:w-auto"
                        >
                          Create My Story
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="mb-2 sm:mb-0">
                  <Card className="bg-white/80">
                    <CardHeader>
                      <CardTitle className="text-lg p-2">
                        Your Selections
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-7">
                      <div>
                        <p className="text-sm font-figTree  font-bold text-purple-500 ">
                          Hero:
                        </p>
                        <p className="text-sm font-figTree">
                          {localStorage.getItem("Hero")}
                        </p>
                      </div>
                      <div>
                        <p className=" font-bold text-purple-500  text-sm  font-figTree">
                          Adventure:
                        </p>
                        <p className="text-sm font-figTree">
                          {localStorage.getItem("Adventure")}
                        </p>
                      </div>
                      <div>
                        <p className=" font-bold text-purple-500  text-sm font-figTree">
                          Morality:
                        </p>
                        <p className="text-sm font-figTree">
                          {localStorage.getItem("Morality")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <div className="text-center py-3 fixed lg:relative bottom-0 left-0 bg-white lg:bg-transparent z-50 w-full px-[16px]">
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 w-full lg:w-auto
                 hover:to-pink-600 text-white font-medium h-[40px] px-8 shadow-lg font-figTree hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {currentStep === 3 ? "Create Summary" : "Next Step"}
                </Button>
              ) : (
                <div className="flex justify-center items-center px-4">
                  <Button
                    onClick={handleFinish}
                    className="bg-gradient-to-r  from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white 
                  font-medium block lg:hidden h-[40px] px-8 font-figTree shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full lg:w-auto"
                  >
                    Create My Story
                  </Button>
                </div>
              )}
              <div className="flex justify-center items-center text-sm mt-3 font-figTree lg:hidden md:text-center">
                <nav className="flex space-x-2 text-gray-500">
                  <span
                    className="hover:text-gray-700 cursor-pointer underline"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </span>
                  <span>{">"}</span>
                  <span className="hover:text-gray-700 cursor-pointer font-semibold text-black underline">
                    Scratch Flow
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromScratchPage;
