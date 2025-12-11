import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MdClose } from "react-icons/md";
import { staticTemplateDetails } from "../../utils/staticData";

// Define TypeScript interfaces for our data
interface AgeRange {
  _id: string;
  minAge: number;
  maxAge: number;
}

interface CustomStoryDetails {
  _id: string;
  character: string;
  adventure: string;
  morality: string;
}

interface Genre {
  name: string;
  id: string;
}

interface FluxAPIResponse {
  pollingObject: {
    id: string;
    polling_url: string;
  };
}

interface PageContent {
  pageOneText: string;
  pageTwoText: string;
}

interface TemplateChapter {
  _id: string;
  chapterType: string;
  chapterTitle: string;
  chapterNumber: number;
  characterAction?: string;
  imageGenerationPrompt: string;
  pages?: PageContent;
  fluxAPIResponse: FluxAPIResponse;
  generatedImage: string;
  generatedImagesId: string;
  scaledImage: string;
  generatedImageStatus: string;
  scaledImageStatus: string;
}

interface BookTemplate {
  tags: string[];
  shippingModes: string[];
  categoryIds: string[];
  isActive: boolean;
  isDeleted: boolean;
  language: string;
  status: string;
  title: string;
  description: string;
  coverImage: string;
  ageRange: AgeRange;
  idealFor: string;
  customStoryDetails: CustomStoryDetails;
  pages: number;
  basePrice: number;
  discountPct: number;
  genreId: Genre;
  reviewAvg: number;
  reviewCount: number;
  orderCount: number;
  templateChapters: TemplateChapter[];
  id: string;
}

const TemplateDetails = () => {
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Static data
  const isLoadBook = false;
  const bookResponse = staticTemplateDetails;

  // Loading state

  if (isLoadBook) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Loading skeleton for book header */}
          <div className="flex items-center justify-center my-10">
            <img src={loadingImage} alt="image" className="w-28" />
          </div>

          {/* Loading skeleton for chapters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 mt-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Book Details
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main content
  if (!bookResponse) return null;

  // Calculate discounted price
  const discountedPrice =
    bookResponse.basePrice -
    (bookResponse.basePrice * bookResponse.discountPct) / 100;

  // Handle saving updated template
  const handleSave = (updatedTemplate: BookTemplate) => {
    // Static implementation - just close modal
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mt-16 relative">
      <Helmet>
        <title>
          {bookResponse?.title
            ? `${bookResponse.title} – Personalized Storybook Template | StarMe`
            : "Storybook Template – StarMe"}
        </title>

        <meta
          name="description"
          content={
            bookResponse?.bookResponse ||
            `Explore the "${bookResponse?.title}" personalized storybook template on StarMe. View chapters, preview illustrations, and customize this story for children.`
          }
        />

        <meta
          name="keywords"
          content={`storybook template, personalized book, children's stories, ${
            bookResponse?.genreId?.name || ""
          }, ${
            bookResponse.customStoryDetails.character || ""
          }, StarMe templates`}
        />

        <link
          rel="canonical"
          href={`${window.location.origin}${location.pathname}`}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={
            bookResponse?.title
              ? `${bookResponse.title} – Personalized Storybook Template`
              : "Storybook Template – StarMe"
          }
        />

        <meta
          property="og:description"
          content={
            bookResponse?.bookResponse ||
            `Discover the "${bookResponse?.title}" storybook template. Customize pages, explore chapters, and create a unique reading experience for children.`
          }
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content={`${window.location.origin}${location.pathname}`}
        />

        <meta property="og:image" content={bookResponse?.coverImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={bookResponse?.title} />
        <meta
          name="twitter:description"
          content={
            bookResponse?.bookResponse ||
            `Preview the story "${bookResponse?.title}" and explore its customizations.`
          }
        />
        <meta name="twitter:image" content={bookResponse?.coverImage} />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Book Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Cover Image with gradient overlay */}
          <div className="relative h-80 md:h-80 lg:h-96">
            <img
              src={bookResponse.coverImage}
              alt={bookResponse.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-2 z-10">
              <button
                onClick={() => navigate(-1)} // Navigate back to previous page
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer"
                title="Close"
              >
                <MdClose size={22} className="text-white" />
              </button>
            </div>
            <div className="absolute top-4 right-14 z-10">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-white/20  hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer"
                title="Edit Template"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="sm:p-8 px-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full sm:text-sm text-xs font-medium">
                    {bookResponse.language}
                  </span>

                  <span className="bg-green-500 text-white px-3 py-1 rounded-full sm:text-sm text-xs font-medium">
                    {bookResponse.ageRange.minAge}-
                    {bookResponse.ageRange.maxAge} years
                  </span>

                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full sm:text-sm text-xs font-medium">
                    {bookResponse.idealFor}
                  </span>

                 
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bookResponse.isActive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {bookResponse.isActive === true ? "Active" : "Inactive"}
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {bookResponse.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-white">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {bookResponse.discountPct > 0 && (
                      <span className="text-lg text-gray-300 line-through">
                        ${bookResponse.basePrice.toFixed(2)}
                      </span>
                    )}
                    {bookResponse.discountPct > 0 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        {bookResponse.discountPct}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bookResponse?.shippingModes.map((mode) => (
                      <span
                        key={mode}
                        className="bg-white/20 text-white px-2 py-1 rounded text-sm"
                      >
                        {mode} shipping
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-6">
            <p className="text-gray-700 mb-6 text-lg">
              {bookResponse.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-600 font-medium">Pages</p>
                <p className="text-xl font-bold text-gray-900">
                  {bookResponse.pages}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-purple-600 font-medium">Genre</p>
                <p className="sm:text-xl text-base font-bold text-gray-900">
                  {bookResponse?.genreId?.name}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-sm text-yellow-600 font-medium">Reviews</p>
                <p className="text-xl font-bold text-gray-900">
                  {bookResponse.reviewAvg} ★
                </p>
                <p className="text-xs text-gray-600">
                  ({bookResponse.reviewCount})
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-green-600 font-medium">Orders</p>
                <p className="text-xl font-bold text-gray-900">
                  {bookResponse?.orderCount || "-"}
                </p>
              </div>
            </div>

            {/* Custom Story Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Character
                </h3>
                <p className="text-gray-700">
                  {bookResponse.customStoryDetails.character}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Adventure
                </h3>
                <p className="text-gray-700">
                  {bookResponse.customStoryDetails.adventure}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Moral Lesson
                </h3>
                <p className="text-gray-700">
                  {bookResponse.customStoryDetails.morality}
                </p>
              </div>
            </div>
            {bookResponse?.masterCharacterPrompt && (
              <div className="py-4 text-sm">
                <span className="text-blue-600 font-bold text-base">
                  Master Prompt :
                </span>{" "}
                {bookResponse?.masterCharacterPrompt}
              </div>
            )}
          </div>
        </div>

        {/* Chapters Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-figTree">
              Chapters
            </h2>
            <p className="text-gray-600">
              {bookResponse.templateChapters.length} chapters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {bookResponse.templateChapters.map((chapter) => (
              <div
                key={chapter._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={chapter.scaledImage || chapter.generatedImage}
                    alt={chapter.chapterTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {chapter.chapterNumber === 0
                      ? "Cover"
                      : `Ch. ${chapter.chapterNumber}`}
                  </div>
                </div>

                <div className="p-4">
                  <h3
                    className="font-bold text-lg text-gray-900 mb-1 truncate font-figTree"
                    title={chapter.chapterTitle}
                  >
                    {chapter.chapterTitle}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {chapter.chapterType}
                    </span>
                    <span
                      className={`px-2 py-1 rounded ${
                        chapter.generatedImageStatus === "complete"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {chapter.generatedImageStatus}
                    </span>
                  </div>

                  {chapter.pages && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {chapter.pages.pageOneText.replace(
                          /\{\{\{\{childName\}\}\}\}/g,
                          "Child Name"
                        )}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {chapter.pages.pageTwoText.replace(
                          /\{\{\{\{childName\}\}\}\}/g,
                          "Child Name"
                        )}
                      </p>
                    </div>
                  )}
                  {chapter.imageGenerationPrompt && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="text-blue-700 font-bold font-figTree">
                        Prompt:{" "}
                      </span>
                      {chapter.imageGenerationPrompt}
                    </p>
                  )}
                  {chapter.characterAction && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      <span className="text-blue-700 font-bold font-figTree">
                        Action:{" "}
                      </span>
                      {chapter.characterAction}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Template edit modal removed for static version */}
    </div>
  );
};

export default TemplateDetails;
