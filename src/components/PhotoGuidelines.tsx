
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const PhotoGuidelines = () => {
  const goodExamples = [
    {
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=200&h=200&fit=crop&crop=face",
      title: "Perfect!",
      description: "Single child, face clearly visible and centered"
    },
    {
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=200&h=200&fit=crop&crop=face", 
      title: "Great lighting!",
      description: "Well-lit face with natural lighting"
    }
  ];

  const badExamples = [
    {
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=200&h=200&fit=crop",
      title: "Too many people",
      description: "Multiple children make it hard to focus on one"
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      title: "Face not visible",
      description: "Child's face is turned away or obscured"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Photo Guidelines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Good Examples */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800">Good Examples</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goodExamples.map((example, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-32 object-cover rounded-lg border-2 border-green-200"
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="font-medium text-green-800 mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600">{example.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bad Examples */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <X className="h-4 w-4 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-red-800">Avoid These</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badExamples.map((example, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-32 object-cover rounded-lg border-2 border-red-200 opacity-75"
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="font-medium text-red-800 mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600">{example.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Pro Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use natural lighting when possible</li>
            <li>• Make sure the child is looking at the camera</li>
            <li>• Avoid busy backgrounds - simple is better</li>
            <li>• High resolution photos work best (at least 1000px wide)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoGuidelines;
