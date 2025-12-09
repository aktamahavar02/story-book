import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, Lock } from "lucide-react";
import hand from "../assets/images/hand.png";
import rightHand from "../assets/images/rightHand.png";
import loading from "../assets/images/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  personalizedBookGet,
  userChapterGet,
  userChapterSelect,
} from "../../store/slices/bookTemplateSlice.js";
import StepperBatch from "@/components/ui/newStepper.js";
import { cookie } from "../utils/cookies.js";
import { motion, AnimatePresence } from "framer-motion";

const PreviewSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectId, setSelectId] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [firstCycleDone, setFirstCycleDone] = useState(false);
  const [isFullLoaderShow, setIsFullLoaderShow] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const personalizedList = useSelector(
    (state) => state?.bookTemplate?.personalizedBookList
  );
  const isLoading = useSelector((state) => state?.bookTemplate?.isChapterLoad);

  const userChapter = useSelector(
    (state) => state?.bookTemplate?.userChapterList
  );

  const imageInProgress = userChapter?.data?.pageImageOptions;
  const paymentPersonalized =
    personalizedList?.data?.paymentStatus === "pending";
  const chapterShow = personalizedList?.data?.status;

  const selectData = useSelector(
    (state) => state?.bookTemplate?.userChapterSelectList
  );

  const findSelectData = Array.isArray(imageInProgress)
    ? imageInProgress?.find((data) => {
        return data?.id === selectId;
      })
    : undefined;
  const selectedImage = findSelectData?.scaledImageStatus;

  const [findImageEmpty, setFindImageEmpty] = useState<string>("");
  useEffect(() => {
    if (findSelectData?.scaledImageStatus === "complete") {
      setIsLoad(false);
      setFindImageEmpty(findSelectData.scaledTextOverlayImage);
    } else if (findSelectData?.scaledImageStatus === "inProgress") {

      setIsLoad(true);
    }
  }, [findSelectData?.scaledImageStatus]);

  const numberChapter = personalizedList?.data?.chapters;

  const newData = numberChapter?.map((item) => {
    return item?.chapterNumber;
  });

  const lastCurrentStep = location.state?.lastCurrentStep;

  const [currentStep, setCurrentStep] = useState(0);

  const currIndex = location?.state?.currentStep ?? null;
  useEffect(() => {
    if (currIndex !== null) {
      setCurrentStep(currIndex);
      dispatch(personalizedBookGet({ id }));
    }
  }, [currIndex]);
  useEffect(() => {
    if (lastCurrentStep) {
      setCurrentStep(lastCurrentStep);
    }
  }, [lastCurrentStep]);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    if (numberChapter?.length) {
      const value = numberChapter?.reduce((acc, curr, index) => {
        acc[curr?.chapterType === "cover" ? "cover" : `page${index + 1}`] = "";
        return acc;
      }, {});
      setSelections(value);
    }
  }, [numberChapter?.length]);

  useEffect(() => {
    if (id) {
      setIsFullLoaderShow(true);
      dispatch(personalizedBookGet({ id }));
      // setCount(40);
    }

    if (chapterShow !== "inProgress") return;

    const interval = setInterval(() => {
      dispatch(personalizedBookGet({ id }));
    }, 2000);

    return () => clearInterval(interval);
  }, [chapterShow, id, dispatch]);

  const getStepInfo = () => {
    const chapter = numberChapter?.find(
      (ch) => ch.chapterNumber === currentStep
    );
    return {
      chapterId: chapter?.id,
      title: `Pick Photo for ${chapter?.chapterType}`,
      key: `page${currentStep}` as keyof typeof selections,
      bookPage: chapter?.chapterType,
    };
  };
  const { title, key, bookPage, chapterId } = getStepInfo();

  const handleImageSelect = (imageId: string) => {
    const { key } = getStepInfo();
    setSelections({ ...selections, [key]: imageId });
    dispatch(
      userChapterSelect({
        id: chapterId,
        selectedPageImage: imageId,
        onSuccess: () => {
          dispatch(userChapterGet({ id: chapterId }));
        },
      })
    );
  };

  const handleNext = () => {
    const maxStep = newData?.length - 1;
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setFindImageEmpty("");
    } else if (currentStep === 2) {
      if (paymentPersonalized) {
        navigate(`/setup/${id}`, {
          state: { currentStep: 3 },
        });
      } else {
        setCurrentStep(currentStep + 1);
        setFindImageEmpty("");
      }
    } else if (currentStep === maxStep) {
      navigate(`/setup/${id}`, {
        state: { currentStep: 3 },
      });
      return;
    } else if (currentStep >= 3) {
      setCurrentStep(currentStep + 1);
      setFindImageEmpty("");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFindImageEmpty("");
    } else {
      navigate(`/setup/${id}`);
    }
  };

  const selectedId = userChapter?.data?.selectedPageImage;
  const options = userChapter?.data?.pageImageOptions;

  const selectedImageOld = options?.find((opt) => opt.id === selectedId);


  useEffect(() => {
    if (selectedImageOld?.scaledImageStatus === "complete") {
      setFindImageEmpty(selectedImageOld?.scaledTextOverlayImage);
      setSelections({
        ...selections,
        [key]: selectedImageOld?.id,
      });
    }
  }, [selectedImageOld?.scaledTextOverlayImage]);

  const newDataListing = userChapter?.data?.imageGenerationStatus;

  const canProceed = () => {
    const { key } = getStepInfo();
    return selections[key] !== "" && !isLoad;
  };

  useEffect(() => {
    if (!chapterId) return;

    dispatch(userChapterGet({ id: chapterId }));

    if (newDataListing !== "inProgress") return;

    const interval = setInterval(() => {
      dispatch(userChapterGet({ id: chapterId }));
    }, 2000);

    return () => clearInterval(interval);
  }, [newDataListing, chapterId, dispatch]);

  useEffect(() => {
    if (selectedImage !== "inProgress") return;

    const interval = setInterval(() => {
      dispatch(userChapterGet({ id: chapterId }));
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedImage, chapterId]);

  const imageOption = userChapter?.data?.pageImageOptions;

  const [count, setCount] = useState(0);
  const [countImage, setCountImage] = useState(20);
  const messages = [
    "Just a moment while we bring your story to life...",
    "Your story is coming together...",
    "Hang on, your book is almost here...",
    "Your book is just one moment away...",
  ];

  const messagesImage = [
    "Crafting your image, just a moment...",
    "Almost done, your image is on the way...",
    "Hold tight, magic is happening behind the scenes...",
    "Your masterpiece is nearly ready...",
    "Adding the final touches to your image...",
    "Good things take time... your image will appear soon!",
    "Just polishing the details, hang on...",
  ];
  useEffect(() => {
    if (imageOption?.length > 0) {
      setIsFullLoaderShow(false);
    }
    if (count > 0) {
      const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
      if (imageOption?.length > 0) {
        clearTimeout(timer);
      }
      return () => clearTimeout(timer);
    } else {
      if (!firstCycleDone) {
        setFirstCycleDone(true);
      } else {
        if (chapterShow === "inProgress" || imageOption?.length === 0) {
          setCount(40);
        }
      }
    }
  }, [
    count,
    chapterShow,
    imageOption?.length,
    firstCycleDone,
    isFullLoaderShow,
  ]);

  useEffect(() => {
    if (!isLoad) return;

    if (countImage > 0) {
      const timer = setTimeout(() => {
        setCountImage((prev) => prev - 1);
      }, 1000);
      if (findSelectData?.scaledImageStatus === "complete" || !isLoad) {
        clearTimeout(timer);
      }

      return () => clearTimeout(timer);
    } else if (findSelectData?.scaledImageStatus !== "complete") {

      setIsLoad(true);
      setCountImage(20);
    } else {
      setIsLoad(false);
    }
  }, [countImage, isLoad, findSelectData?.scaledImageStatus]);

  const messageIndex = Math.floor((40 - count) / 10) % messages.length;
  const currentMessage = messages[messageIndex];
  const messageIn = Math.floor((20 - countImage) / 10) % messages.length;
  const imageGen = messagesImage[messageIn];

  const renderBookPreview = () => {
    if (bookPage === "page") {
      return (
        <div className="relative w-full flex justify-center items-center py-4">
          <div className="relative w-full max-w-5xl perspective-[1500px]">
            <div className="absolute top-0 left-1/2 w-20 h-full -translate-x-1/2 z-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_80%)] opacity-30"></div>
            </div>
            <div className="absolute inset-0 blur-xl rounded-2xl bg-black/10 translate-x-3 translate-y-3 z-0"></div>
            <div className="absolute top-0 left-1/2 w-20 h-full -translate-x-1/2 z-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_80%)] opacity-30"></div>
            </div>

            <div className="absolute inset-0 blur-xl rounded-2xl bg-black/10 translate-x-3 translate-y-3 z-0"></div>

            <div className="relative w-full bg-white rounded-2xl shadow-2xl border h-[500px]  overflow-hidden z-10 transform rotate-y-0  ">
              {isLoad ? (
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={PersonalizeId}
                      alt="Background"
                      className="w-full h-full object-cover blur-lg"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                  {/* Content */}
                  <div className="relative flex flex-col items-center justify-center h-full px-4 text-center text-gray-200">
                    <h2 className="text-lg  mb-4 font-medium">
                      <AnimatePresence mode="wait">
                        <motion.h2
                          key={imageGen}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.6 }}
                          className="text-lg md:text-xl font-medium"
                        >
                          {imageGen}
                        </motion.h2>
                      </AnimatePresence>
                    </h2>

                    {/* Progress bar */}
                    <div className="w-3/4 bg-gray-200 rounded-full h-3 mb-6">
                      <div
                        className="bg-gradient-to-r from-pink-300 to-purple-300 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${100 - (countImage / 20) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {/* Counter */}
                    <div className="flex gap-2 items-center">
                      <p className="text-sm mb-2">Please wait.</p>
                      <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-sm font-semibold">
                        {countImage}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {findImageEmpty ? (
                    <>
                      <div className="absolute top-0 left-1/2   z-20 -translate-x-1/2 pointer-events-none">
                        <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-70"></div>
                      </div>
                      <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-400 z-30 -translate-x-1/2 shadow-inner"></div>
                      <img
                        src={findImageEmpty}
                        alt="Open Book Spread"
                        className="w-full  h-full sm:h-[500px] object-fill object-center"
                      />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 overflow-hidden  border border-red-500">
                        <img
                          src={PersonalizeId}
                          // src="https://storage.wonderwraps.com/e360d13e-19be-4b0e-a9a4-753446a259b7/conversions/image-preview.jpeg"
                          alt="Background"
                          className="w-full h-full  object-cover blur-lg"
                        />
                      </div>

                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                      <div className="relative flex flex-col items-center justify-center h-full px-4 text-center text-gray-200">
                        <h2 className="text-lg  mb-4 font-medium">
                          <AnimatePresence mode="wait">
                            <motion.h2
                              key={currentMessage}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.6 }}
                              className="text-lg md:text-xl font-medium"
                            >
                              {currentMessage}
                            </motion.h2>
                          </AnimatePresence>
                        </h2>
                        <div className="flex gap-2 items-center">
                          <p className="text-sm mb-2">Please wait.</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="bg-purple-100 flex items-center justify-center p-6 rounded-2xl ">
          <div className="w-[200px] sm:w-[500px] aspect-square">
            <div className="flex w-full h-full transform rounded-lg bg-transparent shadow-2xl">
              <div className="w-4 flex-shrink-0 rounded-l-lg bg-gradient-to-r from-neutral-700 to-neutral-600 border border-blue-600"></div>
              <div className="relative flex items-center justify-center w-full h-full rounded-r-lg bg-gray-50 overflow-hidden">
                {isLoad ? (
                  // <div className="flex items-center justify-center w-full h-full sm:h-[500px] bg-gray-100 rounded-r-md">
                  //   <span className="animate-spin w-32 h-32 sm:w-44 sm:h-44 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                  // </div>

                  <div className="flex items-center w-full justify-center">
                    <div className="relative  w-full  max-w-xl h-[600px] rounded-lg overflow-hidden shadow-xl">
                      {/* Background image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={PersonalizeId}
                          // src="https://storage.wonderwraps.com/e360d13e-19be-4b0e-a9a4-753446a259b7/conversions/image-preview.jpeg"
                          alt="Background"
                          className="w-full h-full object-cover blur-lg"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                      {/* Content */}
                      <div className="relative flex flex-col items-center justify-center h-full px-4 text-center text-gray-200">
                        <h2 className="text-lg  mb-4 font-medium">
                          <AnimatePresence mode="wait">
                            <motion.h2
                              key={imageGen}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.6 }}
                              className="text-lg md:text-xl font-medium"
                            >
                              {imageGen}
                            </motion.h2>
                          </AnimatePresence>
                        </h2>

                        {/* Progress bar */}
                        <div className="w-3/4 bg-gray-200 rounded-full h-3 mb-6">
                          <div
                            className="bg-gradient-to-r from-pink-300 to-purple-300 h-3 rounded-full transition-all duration-500"
                            style={{
                              width: `${100 - (countImage / 20) * 100}%`,
                            }}
                          ></div>
                        </div>

                        {/* Counter */}
                        <div className="flex gap-2 items-center">
                          <p className="text-sm mb-2">Please wait.</p>
                          <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-sm font-semibold">
                            {countImage}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={findImageEmpty}
                    alt="book cover"
                    className="w-full h-full object-fill rounded-r-md"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    if (
      imageOption &&
      imageOption.length > 0 &&
      imageOption?.[0]?.scaledImageStatus === "pending"
    ) {
      const { key } = getStepInfo();
      // if (!selections[key]) {
      const firstId = imageOption[0].id;

      setIsLoad(true);
      if (selectId === firstId) {
        handleImageSelect(firstId);
      }
      setSelectId(firstId);
      setCountImage(20);
      // }
    }
  }, [imageOption?.[0]?.scaledImageStatus, currentStep, selectId]);
  const steps = [
    { label: "Cover" },
    { label: "Chapter 1" },
    { label: "Chapter 2" },
    { label: "Chapter 3" },
  ];
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 ">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mr-4 hover:bg-white/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {isFullLoaderShow ? (
            <>
              <div className="space-y-4  pb-6 ">
                <StepperBatch steps={steps} currentStep={currentStep} />
              </div>
              <div className="bg-white p-10">
                <div className="flex items-center w-full justify-center">
                  <div className="relative  w-full  max-w-xl h-[600px] rounded-lg overflow-hidden shadow-xl">
                    {/* Background image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={PersonalizeId}
                        // src="https://storage.wonderwraps.com/e360d13e-19be-4b0e-a9a4-753446a259b7/conversions/image-preview.jpeg"
                        alt="Background"
                        className="w-full h-full object-cover blur-lg"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                    {/* Content */}
                    <div className="relative flex flex-col items-center justify-center h-full px-4 text-center text-gray-200">
                      <h2 className="text-lg  mb-4 font-medium">
                        <AnimatePresence mode="wait">
                          <motion.h2
                            key={currentMessage} // important for animation to trigger on change
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.6 }}
                            className="text-lg md:text-xl font-medium"
                          >
                            {currentMessage}
                          </motion.h2>
                        </AnimatePresence>
                      </h2>

                      {/* Progress bar */}
                      <div className="w-3/4 bg-gray-200 rounded-full h-3 mb-6">
                        <div
                          className="bg-gradient-to-r from-pink-300 to-purple-300 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${100 - (count / 40) * 100}%` }}
                        ></div>
                      </div>

                      {/* Counter */}
                      <div className="flex gap-2 items-center">
                        <p className="text-sm mb-2">Please wait.</p>
                        <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-sm font-semibold">
                          {count}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="space-y-4  pb-6 ">
                <StepperBatch
                  steps={newData?.map((val, ind) => ({
                    label: ind === 0 ? "Cover Page" : `Chapter ${ind}`,
                  }))}
                  currentStep={currentStep}
                />
              </div>

              <div className="grid gap-6 border border-gray-100 bg-white pt-8 rounded-lg shadow-sm">
                <div className="flex justify-center">{renderBookPreview()}</div>

                <div>
                  <div className="flex gap-2 overflow-x-auto pb-2 justify-center flex-wrap  p-0 sm:p-5 ">
                    {imageOption?.length === 0 ? (
                      <img src={loading} alt="image" />
                    ) : (
                      imageOption?.map((option) => {
                        return (
                          <Card
                            key={option.id}
                            // className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-2 overflow-hidden aspect-square w-32 h-32 md:h-32 md:w-32 ${
                            //   selections[key] === option.id
                            //     ? "border-purple-500 shadow-lg"
                            //     : "border-gray-200 hover:border-purple-300"
                            // } bg-white`}
                            className={`cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 
                              aspect-square w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 shadow-sm
                              ${
                                selections[key] === option.id
                                  ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                                  : "border-gray-200 hover:border-purple-300"
                              } bg-gradient-to-br from-white to-purple-50`}
                            onClick={() => {
                              handleImageSelect(option.id);
                              setSelectId(option.id);

                              // setFindImageEmpty(option?.generatedImage);
                              // setIsLoad(true);

                              if (
                                selectedImageOld?.scaledImageStatus !==
                                "complete"
                              ) {
                                setCountImage(20);
                              } else {
                                setCountImage(20);
                              }
                            }}
                          >
                            <div className="relative w-full h-full">
                              <img
                                src={option?.generatedImage}
                                alt={`Option ${option.id}`}
                                className="object-cover w-full h-full rounded-2xl"
                              />
                              {selections[key] === option.id && (
                                <div className="absolute inset-0 bg-purple-600/40 flex items-center justify-center">
                                  <div className="bg-white text-purple-600 p-2 rounded-full shadow-md">
                                    <Check className="h-6 w-6" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="text-center mt-8">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium h-12 px-8"
                >
                  {currentStep === newData?.length
                    ? "Preview My Story"
                    : "Next Page"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewSetupPage;
