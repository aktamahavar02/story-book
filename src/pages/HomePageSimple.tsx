import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Eye } from "lucide-react";
import frontPicture from "../assets/images/front-home.jpg";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import BookCard from "@/components/ui/BookCard";
import adoredHome from "../assets/images/adored-home.png";
import { useState } from "react";
import loadingGif from "../assets/animations/book.gif";
import loadingImage from "../assets/images/purple.gif";
import GeoHelmet from "@/components/ui/GeoHelmet.js";
import firefighter from "../assets/images/firefighter.png";
import pilot from "../assets/images/pilot.png";
import police from "../assets/images/police.png";
import doctor from "../assets/images/doctor.png";
import child from "../assets/images/child.png";
import arrowGreen1 from "../assets/images/arrowGreen1.svg";
import arrowGreen2 from "../assets/images/arrowGreen2.svg";
import arrowGreen3 from "../assets/images/arrowGreen3.svg";
import arrowGreen4 from "../assets/images/arrowGreen4.svg";
import CharacterView from "@/components/ui/CharacterView.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  
  // const booksPaginatedData = useSelector(
  //   (state) => state?.bookTemplate?.bookTemplateData?.results
  // );
  //  console.log("=====",booksPaginatedData);

  const booksPaginatedData = [
    {
      "title": "ABC Journey With Girl",
      "description": "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras...",
      "coverImage": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36a2", "minAge": 3, "maxAge": 4 },
      "idealFor": "girl",
      "discountPct": 10,
      "orderCount": 7,
      "id": "68ad3607fc29be1873fc36a1"
    },
    {
      "title": "Girl and the Moon Goddess",
      "description": "Take your child on a whimsical journey filled with laughter...",
      "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36ab", "minAge": 5, "maxAge": 10 },
      "idealFor": "girl",
      "discountPct": 10,
      "id": "68ad3607fc29be1873fc36aa"
    },
    {
      "title": "Princess! We've been waiting for you ",
      "description": "The adventure continues in Volume 2 of Princess and the Glowing Flower...",
      "coverImage": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36b7", "minAge": 4, "maxAge": 10 },
      "idealFor": "girl",
      "discountPct": 10,
      "id": "68ad3607fc29be1873fc36b6"
    },
    {
      "title": "Boy The Dinos Need You",
      "description": "Imagine waking up to find a glowing dinosaur footprint...",
      "coverImage": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36ba", "minAge": 3, "maxAge": 6 },
      "idealFor": "boy",
      "discountPct": 10,
      "orderCount": 1,
      "id": "68ad3607fc29be1873fc36b9"
    },
    {
      "title": "The Amazing Adventures of {{{{childName}}}}",
      "description": "A heartwarming story about a boy who loves ice cream...",
      "coverImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "ageRange": { "minAge": 3, "maxAge": 5 },
      "idealFor": "boy",
      "discountPct": 10,
      "orderCount": 25,
      "id": "68ad3607fc29be1873fc36bf"
    },
    {
      "title": "Little Girl Explores Nature",
      "description": "A little explorer is off on a wild adventure...",
      "coverImage": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36c3", "minAge": 2, "maxAge": 6 },
      "idealFor": "girl",
      "discountPct": 10,
      "orderCount": 2,
      "id": "68ad3607fc29be1873fc36c2"
    },
    {
      "title": "The Adventure of Boy and the Lost Star",
      "description": "In this magical adventure, your child helps a lost star...",
      "coverImage": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36c6", "minAge": 2, "maxAge": 4 },
      "idealFor": "boy",
      "discountPct": 10,
      "id": "68ad3607fc29be1873fc36c5"
    },
    {
      "title": "Peekaboo, Baby Found You",
      "description": "Where are my toes? My nose? My tummy?",
      "coverImage": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop",
      "ageRange": { "_id": "68ad3607fc29be1873fc36c9", "minAge": 1, "maxAge": 2 },
      "idealFor": "boy/girl",
      "discountPct": 10,
      "id": "68ad3607fc29be1873fc36c8"
    }
  ];
  


  
  
  const handleGetStarted = () => {
    navigate("/template-selection");
  };

  const handleCreateFromScratch = () => {
    navigate("/from-scratch");
  };

  // Static data - no API calls needed

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
      "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
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
  const [isNavbarOpen] = useState(false);

  const booksNew = (booksPaginatedData || [])?.slice(0, 4);
  const booksBestseller = (littleData || [])
    .filter((card) => card?.idealFor === "boy")
    .slice(0, 8);
  const girlsBooks = (littleData || [])
    .filter((card) => card?.idealFor === "girl")
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <GeoHelmet
        title="Personalized Books for Kids | Custom Storybooks - StarMe"
        description="Create magical personalized storybooks where your child becomes the hero! Upload photos and customize stories that bring imagination to life."
        keywords="personalized books, kids books, custom storybooks, children's books"
        image="https://www.starmebooks.com/og-image.jpg"
        type="website"
      />

      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      
      <div className={`${isNavbarOpen ? "blur-sm" : ""}`}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-marcellus">
                  Create Magical
                  <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                    Storybooks
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 font-figTree">
                  Where your child becomes the hero of their own adventure
                </p>
                <Button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all"
                >
                  Start Creating
                </Button>
              </div>
              <div className="relative">
                <img
                  src={frontPicture}
                  alt="Magical Storybook"
                  loading="lazy"
                  className="w-full max-w-lg mx-auto rounded-3xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* New Releases Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-marcellus">
              New Releases
            </h2>
            <p className="text-gray-600 font-figTree">
              Discover our latest magical adventures
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <img src={loadingImage} alt="Loading" className="w-16 h-16" loading="lazy" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {booksNew?.map((card) => (
                <BookCard
                  key={card.id}
                  title={card?.title}
                  description={card?.description}
                  imageUrl={card?.coverImage}
                  discount={card?.discountPct ? `-${card?.discountPct}%` : undefined}
                  isHome={true}
                  extraClass="transform hover:scale-105 transition-transform duration-300 rounded-xl"
                  onPersonalise={() => navigate(`/book-detail/${card.id}`)}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/template-selection")}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full"
            >
              View All Books
            </Button>
          </div>

          {/* Bestsellers Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-marcellus">
                Bestsellers
              </h2>
              <p className="text-gray-600 font-figTree">
                Most loved stories by families worldwide
              </p>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <img src={loadingImage} alt="Loading" className="w-16 h-16" loading="lazy" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {booksBestseller?.map((card) => (
                  <BookCard
                    key={card.id}
                    title={card?.title}
                    description={card?.description}
                    imageUrl={card?.coverImage}
                    discount={card?.discountPct ? `-${card?.discountPct}%` : undefined}
                    isHome={true}
                    extraClass="transform hover:scale-105 transition-transform duration-300 rounded-xl"
                    onPersonalise={() => navigate(`/book-detail/${card.id}`)}
                  />
                ))}
              </div>
            )}
            
            <div className="text-center mt-12">
              <Button
                onClick={() => navigate("/template-selection")}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full"
              >
                View All Bestsellers
              </Button>
            </div>
          </div>
        </div>

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

        {/* Perfect for Girls Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-marcellus">
              Perfect for Girls
            </h2>
            <p className="text-gray-600 font-figTree">
              Empowering stories for little princesses and brave adventurers
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <img src={loadingImage} alt="Loading" className="w-16 h-16" loading="lazy" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {girlsBooks.map((card) => (
                <BookCard
                  key={card.id}
                  title={card?.title}
                  description={card?.description}
                  imageUrl={card?.coverImage}
                  discount={card?.discountPct ? `-${card?.discountPct}%` : undefined}
                  isHome={true}
                  extraClass="transform hover:scale-105 transition-transform duration-300 rounded-xl"
                  onPersonalise={() => navigate(`/book-detail/${card.id}`)}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/template-selection")}
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-full"
            >
              Explore More
            </Button>
          </div>
        </div>

        <div className="lg:mt-[80px] mt-[40px]">
          <CharacterView />
        </div>
        <div
          className="w-full h-full flex flex-col md:flex-row bg-cover bg-no-repeat mt-12"
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

        {/* Create Your Own Story Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-12">
              <img src={loadingGif} alt="Magic" className="w-24 h-24 mx-auto mb-6" loading="lazy" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-marcellus text-gray-800">
                Create Your Own Story
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-figTree">
                Use our AI-powered story builder to create a unique adventure tailored for your child
              </p>
            </div>
            
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 transform hover:scale-105 transition-transform shadow-lg">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-3 font-marcellus text-gray-800">
                  AI-Powered
                </h3>
                <p className="text-gray-600 font-figTree">
                  Advanced AI creates unique stories based on your preferences
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 transform hover:scale-105 transition-transform shadow-lg">
                <Star className="w-12 h-12 mx-auto mb-4 text-teal-500" />
                <h3 className="text-xl font-semibold mb-3 font-marcellus text-gray-800">
                  Fully Customizable
                </h3>
                <p className="text-gray-600 font-figTree">
                  Choose characters, settings, themes, and moral lessons
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 transform hover:scale-105 transition-transform shadow-lg">
                <Eye className="w-12 h-12 mx-auto mb-4 text-cyan-500" />
                <h3 className="text-xl font-semibold mb-3 font-marcellus text-gray-800">
                  Beautiful Illustrations
                </h3>
                <p className="text-gray-600 font-figTree">
                  Professional artwork brings your story to life
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleCreateFromScratch}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all font-figTree"
            >
              Create From Scratch
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;