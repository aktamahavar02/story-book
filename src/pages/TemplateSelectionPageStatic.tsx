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
import dummy from "../assets/images/dummy.png";
import age1 from "../assets/images/age1.png";
import age2 from "../assets/images/age2.png";
import age3 from "../assets/images/age3.png";
import EmptyState from "@/components/ui/emptyState.js";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

// Static data
const littleData = [
  {
    "title": "ABC Journey With Girl",
    "description": "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras, each letter comes to life with exciting items and playful activities. Watch as your child discovers a new favorite for every letter, making learning fun and personalized with their own name. This interactive ABC journey encourages a love for learning through vibrant illustrations and familiar objects.",
    "coverImage": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36a2",
      "minAge": 3,
      "maxAge": 4
    },
    "idealFor": "girl",
    "discountPct": 10,
    "genreId": {
      "name": "Curious Researcher",
      "id": "686f891f066850b7c44d1616"
    },
    "id": "68ad3607fc29be1873fc36a1"
  },
  {
    "title": "Girl and the Moon Goddess",
    "description": "Take your child on a whimsical journey filled with laughter, friendship, and discovery! Follow along as they explore the wonders of a sunny day with their trusty companion, Fluffy, from playing at home to enjoying a picnic by the sparkling lake. This adventure will fill their heart with joy and spark their imagination.",
    "coverImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36ab",
      "minAge": 5,
      "maxAge": 10
    },
    "idealFor": "girl",
    "discountPct": 10,
    "genreId": null,
    "id": "68ad3607fc29be1873fc36aa"
  },
  {
    "title": "Princess! We've been waiting for you",
    "description": "The adventure continues in Volume 2 of Princess and the Glowing Flower! Summoned by the Enchanted Forest itself, the Princess must prove her kind and brave heart to become the true Guardian of the Forest. A beautifully personalized tale of courage, kindness, and believing in your own magic.",
    "coverImage": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36b7",
      "minAge": 4,
      "maxAge": 10
    },
    "idealFor": "girl",
    "discountPct": 10,
    "genreId": {
      "name": "In the Enchanted Forest",
      "id": "686f891f066850b7c44d1621"
    },
    "id": "68ad3607fc29be1873fc36b6"
  },
  {
    "title": "Boy The Dinos Need You",
    "description": "Imagine waking up to find a glowing dinosaur footprint that whisks your child away to Dino Valley, a magical place where talking dinosaurs need help after a mighty storm! This personalized adventure brings excitement, bravery, and friendship to life like never before.",
    "coverImage": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36ba",
      "minAge": 3,
      "maxAge": 6
    },
    "idealFor": "boy",
    "discountPct": 10,
    "genreId": null,
    "id": "68ad3607fc29be1873fc36b9"
  },
  {
    "title": "The Amazing Adventures of {{{{childName}}}}",
    "description": "A heartwarming story about a boy who loves ice cream but learns that kindness is even sweeter. When a lost kitten needs help, he bravely rescues her and discovers that small acts of compassion bring the biggest rewards. This personalized tale turns every page into a special moment of friendship, courage, and joy.",
    "coverImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "ageRange": {
      "minAge": 3,
      "maxAge": 5
    },
    "idealFor": "boy",
    "discountPct": 10,
    "genreId": {
      "name": "Animal Care",
      "id": "686f891f066850b7c44d1624"
    },
    "id": "68ad3607fc29be1873fc36bf"
  },
  {
    "title": "Little Girl Explores Nature",
    "description": "A little explorer is off on a wild adventure to visit nature's most beautiful wonders. From sparking lakes and buzzing bees to sleeping creatures in the forest and sea, each page has something new to discover. It's a journey full of laughter, wonders, and a whole lot of heart. Nature's wonders are all around us, waiting to be found, one little adventure at a time.",
    "coverImage": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36c3",
      "minAge": 2,
      "maxAge": 6
    },
    "idealFor": "girl",
    "discountPct": 10,
    "genreId": {
      "name": "Educational",
      "id": "686f891f066850b7c44d1614"
    },
    "id": "68ad3607fc29be1873fc36c2"
  },
  {
    "title": "The Adventure of Boy and the Lost Star",
    "description": "In this magical adventure, your child helps a lost star find its way back to the sky, learning valuable lessons about courage, kindness, and friendship along the way. This personalized story places your child at the heart of the adventure, making them the star of their very own journey.",
    "coverImage": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36c6",
      "minAge": 2,
      "maxAge": 4
    },
    "idealFor": "boy",
    "discountPct": 10,
    "genreId": {
      "name": "In Outer Space",
      "id": "686f891f066850b7c44d161d"
    },
    "id": "68ad3607fc29be1873fc36c5"
  },
  {
    "title": "Peekaboo, Baby Found You",
    "description": "Where are my toes? My nose? My tummy? A joyful, rhyming journey discovering every wiggly, giggly part of their body! This sweet and simple personalized book is perfect for little ones learning about themselves through fun and playful words.",
    "coverImage": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36c9",
      "minAge": 1,
      "maxAge": 2
    },
    "idealFor": "boy/girl",
    "discountPct": 10,
    "genreId": {
      "name": "In the Old Castle",
      "id": "686f891f066850b7c44d161f"
    },
    "id": "68ad3607fc29be1873fc36c8"
  },
  {
    "title": "Girl's Visit to Dr Dino",
    "description": "Take your child on a fun, colorful adventure with Dr. Dino, the friendly dinosaur doctor! From exploring a jungle full of dinosaurs to learning about eating healthy, staying active, and getting good sleep, this story is full of excitement. Your child will love being the star of this happy, playful adventure!",
    "coverImage": "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36cc",
      "minAge": 2,
      "maxAge": 4
    },
    "idealFor": "girl",
    "discountPct": 10,
    "genreId": {
      "name": "Adventure",
      "id": "686f891f066850b7c44d1613"
    },
    "id": "68ad3607fc29be1873fc36cb"
  },
  {
    "title": "The ABC Journey with Boy",
    "description": "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras, each letter comes to life with exciting items and playful activities. Watch as your child discovers a new favorite for every letter, making learning fun and personalized with their own name. This interactive ABC journey encourages a love for learning through vibrant illustrations and familiar objects.",
    "coverImage": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36cf",
      "minAge": 4,
      "maxAge": 6
    },
    "idealFor": "boy",
    "discountPct": 10,
    "genreId": {
      "name": "Educational",
      "id": "686f891f066850b7c44d1614"
    },
    "id": "68ad3607fc29be1873fc36ce"
  },
  {
    "title": "Boy and the Moon Goddess",
    "description": "Join your child on a magical journey to the moon! After discovering an ancient story about the Moon Goddess Selene, your child bravely builds a rocket and faces exciting challenges to unlock the greatest magic of all. Along the way, they solve riddles, meet moon creatures, and discover that with courage and dreams, anything is possible.",
    "coverImage": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36d2",
      "minAge": 5,
      "maxAge": 10
    },
    "idealFor": "boy",
    "discountPct": 10,
    "genreId": {
      "name": "Fantasy",
      "id": "686f891f066850b7c44d1612"
    },
    "id": "68ad3607fc29be1873fc36d1"
  },
  {
    "title": "Girl's Fun in the Sun",
    "description": "A boring day turns into a fun afternoon when a little explorer decides to build the ultimate backyard obstacle course. With zigzag runs, superhero jumps, and splashy puddles, every challenge brightens the day a little bit more. This playful story celebrates creativity and the art of turning everyday things into something out of the ordinary.",
    "coverImage": "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop",
    "ageRange": {
      "_id": "68ad3607fc29be1873fc36d5",
      "minAge": 4,
      "maxAge": 6
    },
    "idealFor": "girl",
    "discountPct": 10,
    "genreId": {
      "name": "Educational",
      "id": "686f891f066850b7c44d1614"
    },
    "id": "68ad3607fc29be1873fc36d4"
  }
];

const TemplateSelectionPageStatic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string[]>([]);
  const [filteredBooks, setFilteredBooks] = useState(littleData);
  const [isLoading, setIsLoading] = useState(false);

  const AgeFilter = location?.state?.age;

  useEffect(() => {
    if (AgeFilter) {
      setSelectedAgeRange([AgeFilter]);
    }
  }, [AgeFilter]);

  // Filter books based on selected criteria
  useEffect(() => {
    let filtered = littleData;

    // Filter by gender
    if (selectedGender && selectedGender.length > 0) {
      filtered = filtered.filter(book =>
        selectedGender.includes(book.idealFor) || book.idealFor === "boy/girl"
      );
    }

    // Filter by age range
    if (selectedAgeRange && selectedAgeRange.length > 0) {
      filtered = filtered.filter(book => {
        return selectedAgeRange.some(range => {
          const [min, max] = range.split("-").map(val => {
            if (val === "8+") return [8, 100];
            return parseInt(val, 10);
          });

          const bookMin = book.ageRange?.minAge || 0;
          const bookMax = book.ageRange?.maxAge || 100;

          if (range === "8+") {
            return bookMin >= 8;
          }

          return (bookMin <= max && bookMax >= min);
        });
      });
    }

    setFilteredBooks(filtered);
  }, [selectedGender, selectedAgeRange]);

  const resetFilters = () => {
    setSelectedGender([]);
    setSelectedAgeRange([]);
    setCurrentPage(1);
  };

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

  const handleGenderChange = (gender: string) => {
    setSelectedGender((prev) => {
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

  const activeButtonStyle = "bg-activeFilterBg text-activeFilter bg-purple-100 text-purple-600 w-14 h-9 text-sm text-activeFilter flex justify-center items-center";
  const defaultButtonStyle = "border border-gray-200 text-gray-500 w-14 h-9 text-sm flex justify-center items-center";

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

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
  return (
    <>
      <div className="sticky top-0 z-40">
        <GeoHelmet
          title="Book Templates - StarMe"
          description="Browse 200+ personalized storybook templates for children aged 0-12. Filter by age and gender to find the perfect adventure."
          keywords="personalized books, kids books templates, custom children's books, storybook templates"
        />
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-max mx-auto px-0 sm:px-6">
          <div className="flex flex-col space-y-0 gap-4 pt-4 md:mt-0 px-4 md:px-0">

            <div className="" id="filtersSection">
              <PersonalisedBookCard
                title="Hyper-personalised Books"
                description="A Story for Everyone, Tailored Just Right"
              />

              <div className="flex items-start sm:items-center gap-2 sm:gap-8 lg:gap-8 py-3 px-1 sm:px-4 text-gray-600 [@media(min-width:1px)_and_(max-width:424px)]:flex-wrap">

                {/* Gender Filter */}
                <div className="gender-filter flex items-center gap-2 flex-wrap">
                  <img src={genderIcon} alt="gender" className="w-5" loading="lazy" />
                  <div className="font-figTree text-sm text-gray-600">Gender</div>
                  <div className="flex gap-1">
                    <button
                      className={`p-2 font-figTree cursor-pointer border rounded-md px-3 lg:px-4 py-2 text-sm ${selectedGender?.includes("boy") ? activeButtonStyle : defaultButtonStyle
                        }`}
                      onClick={() => handleGenderChange("boy")}
                    >
                      Boy
                    </button>
                    <button
                      className={`p-2 font-figTree cursor-pointer border rounded-md px-3 lg:px-4 py-2 text-sm ${selectedGender?.includes("girl") ? activeButtonStyle : defaultButtonStyle
                        }`}
                      onClick={() => handleGenderChange("girl")}
                    >
                      Girl
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block h-8 border-l border-gray-300"></div>

                {/* Age Filter */}
                <div className="age-filter flex items-center flex-wrap gap-2">
                  <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"></path>
                  </svg>
                  <div className="text-sm font-figTree pr-1 lg:pr-0 text-gray-600">Child Age</div>
                  <div className="flex flex-wrap gap-1">
                    {["0-2", "2-4", "4-6", "6-8", "8+"].map((range) => (
                      <button
                        key={range}
                        className={`text-center cursor-pointer border border-gray-300 text-sm px-3 rounded-md hover:bg-purple-50 transition-colors font-figTree text-gray-600 ${selectedAgeRange?.includes(range) ? activeButtonStyle : defaultButtonStyle
                          }`}
                        onClick={() => handleAgeChange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(currentPage > 1 || (selectedGender && selectedGender.length > 0) || (selectedAgeRange && selectedAgeRange.length > 0)) && (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="hidden lg:block h-8 border-l border-gray-300"></div>
                      <div
                        className="text-sm font-medium text-gray-500 underline p-2 sm:mt-0 hover:text-purple-600 whitespace-nowrap cursor-pointer font-figTree"
                        onClick={resetFilters}
                      >
                        Clear
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Books Grid */}
            {currentBooks?.length === 0 && (selectedGender?.length > 0 || selectedAgeRange?.length > 0) ? (
              <EmptyState />
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-5 md:gap-y-7 lg:gap-y-10 xl:gap-y-14 [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1 md:grid-cols-3 md:gap-x-12 lg:grid-cols-3 xl:gap-x-24 w-full">
                  {currentBooks?.map((card) => {
                    const ageRange = card?.ageRange && card.ageRange.minAge && card.ageRange.maxAge
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
                        discount={card?.discountPct ? `-${card?.discountPct}%` : undefined}
                        extraClass="[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                        onPersonalise={() => {
                          navigate(`/book-detail/${card.id}`);
                        }}
                      />
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {filteredBooks?.length > itemsPerPage && (
                  <div className="flex justify-center items-center pt-5 space-x-2 flex-wrap">
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={!hasPrevPage}
                      className={`px-3 py-1 rounded border text-sm ${!hasPrevPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`px-3 py-1 rounded border text-sm ${currentPage === page
                          ? "bg-purple-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={!hasNextPage}
                      className={`px-3 py-1 rounded border text-sm ${!hasNextPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="max-w-7xl mx-auto px-4 pt-0 sm:pt-12 pb-4">
              <h2 className=" text-[24px] sm:text-3xl font-marcellus text-black  text-center ">
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
        </div>

        <ExploreSection />
        <Footer />
      </div>
    </>
  );
};

export default TemplateSelectionPageStatic;