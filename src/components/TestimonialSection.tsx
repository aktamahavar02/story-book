
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah M.",
      child: "Emma, age 6",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      text: "Emma loves her personalized story! She asks for it every night! 🌟",
      rating: 5,
      emoji: "💖"
    },
    {
      name: "Jessica L.",
      child: "Lucas, age 8",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
      text: "Amazing quality! Lucas feels like a real superhero now! 🦸‍♂️",
      rating: 5,
      emoji: "⭐"
    },
    {
      name: "Michael K.",
      child: "Sophia, age 5",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Sophia was so excited to see herself as a princess! 👑",
      rating: 5,
      emoji: "🏰"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Heart className="text-red-500 animate-pulse" size={18} />
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loved by families!
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          See what parents are saying ✨
        </p>
      </div>
      
      <div className="w-full max-w-sm mx-auto">
        <Card className="bg-gradient-to-br from-white to-purple-50 border border-purple-200 shadow-lg transition-all duration-500">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-purple-200">
                  <AvatarImage 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name} 
                  />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm">
                    {currentTestimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 text-sm">
                  {currentTestimonial.emoji}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={12} />
                  ))}
                </div>
                <p className="text-gray-700 mb-2 text-sm leading-relaxed">
                  "{currentTestimonial.text}"
                </p>
                <div>
                  <p className="text-xs font-bold text-purple-700">{currentTestimonial.name}</p>
                  <p className="text-xs text-gray-500">
                    Parent of {currentTestimonial.child}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center mt-2 space-x-1">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
