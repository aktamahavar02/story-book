import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Eye } from "lucide-react";
import frontPicture from "../assets/images/front-home.jpg";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import BookCard from "@/components/ui/BookCard";
import { useEffect } from "react";
import {
  littleGet,
  blogGetUser,
  reviewGet,
  faqsData,
} from "../../store/slices/bookTemplateSlice.js";
import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../assets/animations/book.gif";
import { bookTemplate } from "../../store/slices/bookTemplateSlice.js";
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

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // const booksPaginatedData = useSelector(
  //   (state) => state?.bookTemplate?.bookTemplateData?.results
  // );
  //  console.log("=====",booksPaginatedData);


const booksPaginatedData = 
   [
    {
        "title": "ABC Journey With Girl",
        "description": "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras, each letter comes to life with exciting items and playful activities. Watch as your child discovers a new favorite for every letter, making learning fun and personalized with their own name. This interactive ABC journey encourages a love for learning through vibrant illustrations and familiar objects.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=e023cde034d6ea696476b22a3f9a431d5a2203e74fa716b12f3c7c4075f20156&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36a2",
            "minAge": 3,
            "maxAge": 4
        },
        "idealFor": "girl",
        "discountPct": 10,
        "orderCount": 7,
        "id": "68ad3607fc29be1873fc36a1"
    },
    {
        "title": "Girl and the Moon Goddess",
        "description": "Take your child on a whimsical journey filled with laughter, friendship, and discovery! Follow along as they explore the wonders of a sunny day with their trusty companion, Fluffy, from playing at home to enjoying a picnic by the sparkling lake. This adventure will fill their heart with joy and spark their imagination.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=43b88975a7ecbcd6ad74f8ec7e18828ef4e4a85923d92ff2ca0f266e1aa89986&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36ab",
            "minAge": 5,
            "maxAge": 10
        },
        "idealFor": "girl",
        "discountPct": 10,
        "id": "68ad3607fc29be1873fc36aa"
    },
    {
        "title": "Princess! We've been waiting for you ",
        "description": "The adventure continues in Volume 2 of Princess and the Glowing Flower! Summoned by the Enchanted Forest itself, the Princess must prove her kind and brave heart to become the true Guardian of the Forest. A beautifully personalized tale of courage, kindness, and believing in your own magic.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=43b88975a7ecbcd6ad74f8ec7e18828ef4e4a85923d92ff2ca0f266e1aa89986&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36b7",
            "minAge": 4,
            "maxAge": 10
        },
        "idealFor": "girl",
        "discountPct": 10,
        "id": "68ad3607fc29be1873fc36b6"
    },
    {
        "title": "Boy The Dinos Need You",
        "description": "Imagine waking up to find a glowing dinosaur footprint that whisks your child away to Dino Valley, a magical place where talking dinosaurs need help after a mighty storm! This personalized adventure brings excitement, bravery, and friendship to life like never before.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=43b88975a7ecbcd6ad74f8ec7e18828ef4e4a85923d92ff2ca0f266e1aa89986&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36ba",
            "minAge": 3,
            "maxAge": 6
        },
        "idealFor": "boy",
        "discountPct": 10,
        "orderCount": 1,
        "id": "68ad3607fc29be1873fc36b9"
    },
    {
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "description": "A heartwarming story about a boy who loves ice cream but learns that kindness is even sweeter. When a lost kitten needs help, he bravely rescues her and discovers that small acts of compassion bring the biggest rewards. This personalized tale turns every page into a special moment of friendship, courage, and joy.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=43b88975a7ecbcd6ad74f8ec7e18828ef4e4a85923d92ff2ca0f266e1aa89986&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "minAge": 3,
            "maxAge": 5
        },
        "idealFor": "boy",
        "discountPct": 10,
        "orderCount": 25,
        "id": "68ad3607fc29be1873fc36bf"
    },
    {
        "title": "Little Girl Explores Nature",
        "description": "A little explorer is off on a wild adventure to visit nature’s most beautiful wonders. From sparking lakes and buzzing bees to sleeping creatures in the forest and sea, each page has something new to discover. It’s a journey full of laughter, wonders, and a whole lot of heart. Nature’s wonders are all around us, waiting to be found, one little adventure at a time.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=43b88975a7ecbcd6ad74f8ec7e18828ef4e4a85923d92ff2ca0f266e1aa89986&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36c3",
            "minAge": 2,
            "maxAge": 6
        },
        "idealFor": "girl",
        "discountPct": 10,
        "orderCount": 2,
        "id": "68ad3607fc29be1873fc36c2"
    },
    {
        "title": "The Adventure of Boy and the Lost Star",
        "description": "In this magical adventure, your child helps a lost star find its way back to the sky, learning valuable lessons about courage, kindness, and friendship along the way. This personalized story places your child at the heart of the adventure, making them the star of their very own journey.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=5b15c587dfa6f0241f43e95832cfa83851b2900782072aec6d0f9ac4b94c17fa&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36c6",
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "discountPct": 10,
        "id": "68ad3607fc29be1873fc36c5"
    },
    {
        "title": "Peekaboo, Baby Found You",
        "description": "Where are my toes? My nose? My tummy? A joyful, rhyming journey discovering every wiggly, giggly part of their body! This sweet and simple personalized book is perfect for little ones learning about themselves through fun and playful words.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173654Z&X-Amz-Expires=3600&X-Amz-Signature=5b15c587dfa6f0241f43e95832cfa83851b2900782072aec6d0f9ac4b94c17fa&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36c9",
            "minAge": 1,
            "maxAge": 2
        },
        "idealFor": "boy/girl",
        "discountPct": 10,
        "id": "68ad3607fc29be1873fc36c8"
    }
]
  
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

  useEffect(() => {
    dispatch(littleGet({}));
    dispatch(bookTemplate(queryParams));

  }, []);

 
const littleData =
  [
    {
        "title": "ABC Journey With Girl",
        "description": "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras, each letter comes to life with exciting items and playful activities. Watch as your child discovers a new favorite for every letter, making learning fun and personalized with their own name. This interactive ABC journey encourages a love for learning through vibrant illustrations and familiar objects.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "title": "Princess! We've been waiting for you ",
        "description": "The adventure continues in Volume 2 of Princess and the Glowing Flower! Summoned by the Enchanted Forest itself, the Princess must prove her kind and brave heart to become the true Guardian of the Forest. A beautifully personalized tale of courage, kindness, and believing in your own magic.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "description": "A little explorer is off on a wild adventure to visit nature’s most beautiful wonders. From sparking lakes and buzzing bees to sleeping creatures in the forest and sea, each page has something new to discover. It’s a journey full of laughter, wonders, and a whole lot of heart. Nature’s wonders are all around us, waiting to be found, one little adventure at a time.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "title": "Girl’s Visit to Dr Dino",
        "description": "Take your child on a fun, colorful adventure with Dr. Dino, the friendly dinosaur doctor! From exploring a jungle full of dinosaurs to learning about eating healthy, staying active, and getting good sleep, this story is full of excitement. Your child will love being the star of this happy, playful adventure!",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "title": "The ABC Journey with Boy ",
        "description": "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras, each letter comes to life with exciting items and playful activities. Watch as your child discovers a new favorite for every letter, making learning fun and personalized with their own name. This interactive ABC journey encourages a love for learning through vibrant illustrations and familiar objects.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
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
        "title": "Girl's Fun in the Sun ",
        "description": "A boring day turns into a fun afternoon when a little explorer decides to build the ultimate backyard obstacle course. With zigzag runs, superhero jumps, and splashy puddles, every challenge brightens the day a little bit more. This playful story celebrates creativity and the art of turning everyday things into something out of the ordinary.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
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
    },
    {
        "title": "The Colors of Kid's Heart",
        "description": "A magical, personalised story that helps your child explore emotions through colors! With the friendly Feelings Cloud, they’ll learn to understand and express feelings like happiness, sadness, and love in a fun and engaging way.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68c97ea47ca657cb1180c076/chapter/68c97ecd7ca657cb1180c07b/pageImageOptions/68c97ee07ca657cb1180c0be/generatedImage/68c97eea7ca657cb1180c0f1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=1bec286d24834d89bbaa1718d988dd95265ae2186694c0fdb2ee9f68602dd029&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36d8",
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "discountPct": 10,
        "genreId": {
            "name": "Educational",
            "id": "686f891f066850b7c44d1614"
        },
        "id": "68ad3607fc29be1873fc36d7"
    },
    {
        "title": "Boy and the Wise Owl",
        "description": "Join your child as they embark on a heartwarming adventure with the Wise Owl! Through the lessons of honesty, patience, and kindness, your child learns the values that make the world a better place. This story is full of magical moments and teaches your child how these important virtues shape their character.",
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "ageRange": {
            "_id": "68ad3607fc29be1873fc36db",
            "minAge": 5,
            "maxAge": 10
        },
        "idealFor": "boy",
        "discountPct": 10,
        "genreId": {
            "name": "Educational",
            "id": "686f891f066850b7c44d1614"
        },
        "id": "68ad3607fc29be1873fc36da"
    },
    {
        "title": "stor book latest",
        "description": "stor book latest",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "_id": "690495c2b2df626741f99790",
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "690495c2b2df626741f9978f"
    },
    {
        "title": "stor book latest",
        "description": "stor book latest",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "_id": "69049600b2df626741f997a7",
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "69049600b2df626741f997a6"
    },
    {
        "title": "stor book latest",
        "description": "stor book latest",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "_id": "69049743b2df626741f99966",
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "69049743b2df626741f99965"
    },
    {
        "title": "stor book latest",
        "description": "stor book latest",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "_id": "6904991eb2df626741f999a4",
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "6904991eb2df626741f999a3"
    },
    {
        "title": "stor book latest",
        "description": "stor book latest",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "_id": "69049935b2df626741f999c4",
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "69049935b2df626741f999c3"
    },
    {
        "title": "jerry book ",
        "description": "jerry book  create the ",
        "idealFor": "boy",
        "discountPct": 40,
        "ageRange": {
            "_id": "69049d0fb2df626741f99ac4",
            "minAge": 5,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/688b107862676b34b1463736/personalizedBook/68cabf847525cdcf1b7a30fe/chapter/68cabfa97525cdcf1b7a3103/pageImageOptions/68cabfbd7525cdcf1b7a3147/generatedImage/68cabfc87525cdcf1b7a317b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=920911b0f4d051bc27a3457d7e6ebea5eda6291df9b853e90d811a5740807d4e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "69049d0fb2df626741f99ac3"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "69032a65d8105b382cb77736"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "Th Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "690897842f9ea2535af1b33b"
    },
    {
        "title": "Test Template",
        "description": "Test Template",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "id": "69099b89563a4cd2e10286c6"
    },
    {
        "title": "Test Template 1",
        "description": "Test Template 1 description",
        "idealFor": "boy",
        "discountPct": 15,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "6909c78ae670a4793381e8b9"
    },
    {
        "title": "template Test3",
        "description": "template Test3 description",
        "idealFor": "boy",
        "discountPct": 18,
        "ageRange": {
            "minAge": 5,
            "maxAge": 10
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "6909cfcd07661a086534b45a"
    },
    {
        "title": "Template Test 4",
        "description": "Template Test 4 description",
        "idealFor": "boy",
        "discountPct": 10,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "6909d314e58e3f35626d4405"
    },
    {
        "title": "Tester01",
        "description": "Tester01 book ",
        "idealFor": "boy",
        "discountPct": 5,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "id": "690b113f53a02c41966a15e1"
    },
    {
        "title": "tester01 book ",
        "description": "tester01 book ",
        "idealFor": "boy",
        "discountPct": 8,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "690b116d0fbf1d43011b8aca"
    },
    {
        "title": "new Book create the user",
        "description": "new Book create the user",
        "idealFor": "girl",
        "discountPct": 4,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "690b13090fbf1d43011b8d08"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "id": "690de7389b2e8c67afc32fd9"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/691190aa77ad1d2935610659/coverImage/6911bcb58f816cca0c596f0b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=04bf6a9264f222a818a47c9b69b9358bd8a4735afdeddeba49960420196a58a5&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "691190aa77ad1d2935610659"
    },
    {
        "title": "create the books ",
        "description": "create the books ",
        "idealFor": "boy",
        "discountPct": 2,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "6911c52aec3be50013cff2a8"
    },
    {
        "title": "create the books ",
        "description": "create the books ",
        "idealFor": "boy",
        "discountPct": 2,
        "ageRange": {
            "minAge": 1,
            "maxAge": 5
        },
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/69032a65d8105b382cb77736/coverImage/69032ba6d8105b382w3e1e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=a9afaf99116a195796acacd410afb0a4739c70e8660a8a40d33848e5c95d7860&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "6911c543ec3be50013cff2d7"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/691aff7c5bb2763504d65b88/coverImage/691b005e5bb2763504d65be4.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=4b5d74416b531a8f8bf8c4d2851dc2c543b8899d136bc93127633927f63743ca&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "691aff7c5bb2763504d65b88"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/691dc1de3ff7157af21544a5/coverImage/691dc27c3ff7157af21544df.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=f9363b62eab7640f6c2ee2d3b2c5d9b66a2c1f01b84295d7a10b3639ec2a27e8&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "691dc1de3ff7157af21544a5"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 2,
            "maxAge": 4
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/691eb9d0c298798ba405c2dc/coverImage/691eecfe4618c9c557d555e8.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=f734edd68138b08c3c144b6697e418fe23e37edbe0c53b82a9b37c106baaff94&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "691eb9d0c298798ba405c2dc"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 1,
            "maxAge": 2
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "coverImage": "https://storybook-storage-dev.s3.us-east-2.amazonaws.com/users/686e672c066850b7c44d14fb/bookTemplate/691efda40fe6d3576ff966ce/coverImage/691f104c559869e839c41ce9.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVXZLW2T6VOBHGRX4%2F20251210%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T173756Z&X-Amz-Expires=3600&X-Amz-Signature=e87702bd6e127c0e2ac70733c47d5d1711e2519206bcd4d9f034cd206d7c8dac&X-Amz-SignedHeaders=host&x-id=GetObject",
        "id": "691efda40fe6d3576ff966ce"
    },
    {
        "description": "This is a story about a young boy. He embarks on many adventures where he is kind and makes friends. Throughout his journey, he discovers the importance of helping others and the joy of making friends. The boy uses his ability to understand animals to help everyone.",
        "ageRange": {
            "minAge": 1,
            "maxAge": 2
        },
        "idealFor": "boy",
        "title": "The Amazing Adventures of {{{{childName}}}}",
        "discountPct": 10,
        "id": "69242929e6f778c324c48c68"
    }
]
  const loading = useSelector((state) => state?.bookTemplate?.isLoading);
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );

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