
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, ArrowLeft } from "lucide-react";

const ChooseFlowPage = () => {
  const navigate = useNavigate();

  const handleTemplateFlow = () => {
    navigate("/template-selection");
  };

  const handleFromScratchFlow = () => {
    navigate("/from-scratch");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/setup")}
            className="mr-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Choose Your Adventure!</h1>
            <p className="text-gray-600">How would you like to create your story?</p>
          </div>
        </div>

        {/* Flow Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Template Flow */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 hover:border-blue-400"
            onClick={handleTemplateFlow}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Quick & Easy Templates
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Choose from pre-made story adventures
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">🦸‍♂️ Superhero Adventures</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">🚀 Space Exploration</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">🏴‍☠️ Pirate Adventures</p>
                </div>
                <div className="text-xs text-gray-500">+ 4 more templates</div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium h-12">
                Choose Template Story
              </Button>
              <p className="text-xs text-gray-500 mt-2">Perfect for quick story creation!</p>
            </CardContent>
          </Card>

          {/* From Scratch Flow */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-pink-50 to-orange-50 border-2 border-pink-200 hover:border-pink-400"
            onClick={handleFromScratchFlow}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Custom Story Builder
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Create a completely unique adventure
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">✨ Choose Your Hero Type</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">🌍 Pick Adventure Setting</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">💫 Select Life Lesson</p>
                </div>
                <div className="text-xs text-gray-500">Fully customizable story</div>
              </div>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium h-12">
                Build Custom Story
              </Button>
              <p className="text-xs text-gray-500 mt-2">For a truly personalized tale!</p>
            </CardContent>
          </Card>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Both options will create an amazing personalized story featuring your child as the main character! 
            Templates are faster, while custom stories offer more personalization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseFlowPage;
