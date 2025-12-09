import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Lock, Star, Crown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { previewGet  ,payment , } from "../../store/slices/bookTemplateSlice.js";

const PreviewPaywallPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    dispatch(previewGet({ id: id }));
  }, []);

  const previewData = useSelector((state) => state?.bookTemplate?.previewList);
  const paymentData = useSelector((state) => state?.bookTemplate?.payment);

  useEffect(() => {
    if(paymentData?.url){
      window.location.href = paymentData?.url ;
    }
  
  }, [paymentData?.url])
  const payData = previewData?.data?.paymentStatus
  const previewImage = previewData?.data?.images;
  const pageImageOptions = previewImage?.slice(1);
  const coverImage = previewImage?.[0] || null;
  const { selections, selectedBook, currentStep } = location.state || {};
  const lastCurrentStep = currentStep;
  const [showPaywall, setShowPaywall] = useState(false);
  const imageOption = [
    {
      id: "option1",
      url: "https://storage.wonderwraps.com/dba4123e-03e0-408c-ad1f-7e5ff8f9fd2a/iUw0VHezB6zQ2HLElGCD2MUHZFslw3-metaamFzcGVyIG93bC5wbmc=-.png",
    },
    {
      id: "option2",
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
    },
    {
      id: "option3",
      url: "https://storage.wonderwraps.com/bbda3658-3e23-414d-838e-47348a8858ea/responsive-images/Zp1Egf20Hs9VQD7B9TIbtLyqAZtjyC-metaY292ZXIucG5n-___media_library_original_550_550.png",
    },
    {
      id: "option4",
      url: "https://storage.wonderwraps.com/fefdaebd-82f4-4772-9126-9645cef73670/responsive-images/KIOE2yxwTbor3fuEquofUewmGlPAPw-metaY292ZXIucG5n-___media_library_original_550_550.png",
    },
  ];

  const getSelectedImage = (imageId: string) => {
    return imageOption?.find((opt) => opt.id === imageId)?.url;
  };

  

 

  const handlePreviewMore = () => {
  dispatch(payment({id:id}))
    // setShowPaywall(true);
    // navigate(`/setup/${id}`,{ state: 3 })
    // dispatch(setStep(3));

  };

  const handlePurchase = () => {
    navigate("/checkout", { state: { selectedBook, selections } });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-10 bg-[url('https://resources.wonderwraps.com/e6d69f38-8562-424b-b966-edc0ebe3436e/img/fillers.png')] filter blur-sm opacity-30"></div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => {
              navigate(`/preview-setup/${id}`, { state: { lastCurrentStep } });
            }}
            className="mr-4 hover:bg-white/50 font-figTree z-20"
          >
            <ArrowLeft className="h-4 w-4 mr-2 " />
            Back
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-marcellus">
              Your Story Preview
            </h1>
            <p className="text-gray-600 font-figTree">
              Here's a glimpse of your magical adventure!
            </p>
          </div>
        </div>

        {/* Story Preview */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Dedication Page */}
          {/* {selections?.dedication && (
            <Card className="bg-pink-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-figTree">
                  Dedication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-amber-50 to-cream-100 rounded-lg flex items-center justify-center mb-4 p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-amber-900 mb-4">
                      Dedication
                    </h3>
                    <p className="text-lg font-serif italic text-amber-800 leading-relaxed">
                      "{selections.dedication}"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Cover Page */}
          {/* {coverImage && (
            <Card className="border shadow-lg bg-gradient-to-br from-amber-50 to-cream-100">
              <CardHeader>
                <CardTitle className="text-lg font-figTree">Cover</CardTitle>
              </CardHeader>
              <div
                // style={{ backgroundImage: `url(${cover})`, height: "600px" }}
                className={`rounded-lg bg-no-repeat bg-cover flex items-center justify-center relative overflow-hidden`}
              >
                <img
                  src={coverImage?.scaledTextOverlayImage}
                  alt="Cover"
                  className="h-96 w-96 object-cover rounded-lg border-2 border-dashed border-white-500 "
                />
              </div>
            </Card>
          )} */}
          {coverImage && (
            <Card className="w-sm aspect-square border shadow-lg bg-gradient-to-br from-amber-50 to-cream-100">
              <CardHeader>
                <CardTitle className="text-lg font-figTree">Cover</CardTitle>
              </CardHeader>
              <div className="flex items-center justify-center relative overflow-hidden rounded-lg bg-no-repeat bg-cover">
                <img
                  src={coverImage?.scaledTextOverlayImage}
                  alt="Cover"
                  className=" object-cover rounded-lg border-2 border-dashed border-white"
                />
              </div>
            </Card>
          )}

          {/* Story Pages 1-4 */}
          {/* {pageImageOptions?.map((page) => (
            <Card
              key={page.chapterNumber}
              className="bg-white shadow-lg bg-gradient-to-br from-amber-50 to-cream-100"
            >
              <CardHeader>
                <CardTitle className="text-lg font-figTree">
                  Page {page.chapterNumber}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src={page?.scaledTextOverlayImage}
                    alt={`Page ${page.chapterNumber}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))} */}

          {pageImageOptions?.map((page) => (
            <Card
              key={page.chapterNumber}
              className="bg-white shadow-xl border border-gray-200 rounded-2xl my-6"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Page {page.chapterNumber}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="relative w-full flex justify-center items-center">
                  <div className="relative w-full max-w-5xl perspective-[1500px]">
                    {/* Light shadow effect center */}
                    <div className="absolute top-0 left-1/2 w-20 h-full -translate-x-1/2 z-10 pointer-events-none">
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_80%)] opacity-30"></div>
                    </div>

                    {/* Background shadow blur */}
                    <div className="absolute inset-0 blur-xl rounded-2xl bg-black/10 translate-x-3 translate-y-3 z-0"></div>

                    {/* BOOK STYLE WRAPPER */}
                    <div className="relative w-full bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden z-10">
                      {/* Middle shadow line */}
                      <div className="absolute top-0 left-1/2 w-24 h-full z-20 -translate-x-1/2 pointer-events-none">
                        <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                      </div>
                      <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>

                      {/* ✅ Single Page Content */}
                      <div className="relative h-[500px] flex flex-col items-center justify-center">
                        <img
                          src={
                            page?.scaledTextOverlayImage ||
                            "https://img.freepik.com/premium-photo/image-file-icon-3d-render-illustration_567294-3212.jpg?w=1380"
                          }
                          alt={`Page ${page.chapterNumber}`}
                          className="w-full h-full object-fill"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Page 5 - Blurred with Paywall */}
          {payData === "pending" && (
            <Card className="bg-white shadow-lg relative">
              <CardHeader>
                <CardTitle className="text-lg font-figTree">
                  {" "}
                  Page {previewImage?.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4 relative">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
                    alt="Page 5"
                    className="w-full h-full object-cover rounded-lg filter blur-lg"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-medium">More pages available!</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 filter blur-sm">
                  The adventure continues with even more exciting chapters and
                  beautiful illustrations waiting for you...
                </p>

                <div className="mt-4 text-center">
                  <Button
                    onClick={handlePreviewMore}
                   
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium h-12 px-8"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Unlock Full Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Paywall Dialog */}
        <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Unlock Your Full Story! ✨
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Get the complete personalized adventure for your child
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <Crown className="h-8 w-8 text-purple-500" />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Complete 20+ page personalized story
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    High-quality illustrations featuring your child
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Digital + printable versions
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Educational life lessons
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  $19.99
                </div>
                <div className="text-sm text-gray-500">One-time purchase</div>
              </div>

              <Button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium h-12"
              >
                Purchase Full Story
              </Button>

              <Button
                variant="ghost"
                onClick={() => setShowPaywall(false)}
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PreviewPaywallPage;
