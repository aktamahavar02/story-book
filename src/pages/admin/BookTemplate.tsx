import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination.js";
import { useNavigate } from "react-router-dom";
import BasicLoader from "@/components/ui/basicLoader.js";
import { Helmet } from "react-helmet-async";
import { MdDeleteForever } from "react-icons/md";
import { staticTemplateDetailsAdmin, staticBookTemplateStats } from "../../utils/staticData";
interface AgeRange {
  minAge: number;
  maxAge: number;
}

interface CustomStoryDetails {
  character: string;
  adventure: string;
  morality: string;
}

interface TemplateChapter {
  chapterTitle: string;
  chapterNumber: number;
  pages: {
    pageOneText: string;
    pageTwoText: string;
  };
}

interface BookTemplateItem {
  title: string;
  coverImage: string;
  ageRange: AgeRange;
  basePrice: number;
  shippingModes: string[];
  idealFor: string;
  character: string;
  adventure: string;
  morality: string;
}

interface BookTemplateResponse {
  status: string;
  data: {
    results: BookTemplateItem[];
    totalResults: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

interface BookTemplateFormValues {
  title: string;
  description: string;
  displayChildName: string;
  slug: string;
  tagline: string;
  idealFor: "boy" | "girl" | "";
  basePrice: number;
  discountPct: number;
  ageRange: AgeRange;
  shippingModes: string[];
  customStoryDetails: CustomStoryDetails;
  referenceChildImage: string | File;
  templateChapters: TemplateChapter[];
}

// Yup validation schema
const bookTemplateValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  displayChildName: Yup.string()
    .required("Display child name is required")
    .min(2, "Display child name must be at least 2 characters")
    .max(50, "Display child name must not exceed 50 characters"),
  slug: Yup.string()
    .required("Slug is required")
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug must not exceed 100 characters")
    .matches(
      /^[A-Z0-9_]*$/,
      "Slug can only contain uppercase letters, numbers, and underscores"
    ),
  tagline: Yup.string()
    .required("Tagline is required")
    .min(5, "Tagline must be at least 5 characters")
    .max(100, "Tagline must not exceed 100 characters"),
  idealFor: Yup.string().oneOf(
    ["", "boy", "girl"],
    "Please select a valid option"
  ),
  basePrice: Yup.number()
    .required("Base price is required")
    .min(0, "Base price cannot be negative")
    .max(999999, "Base price is too high"),
  discountPct: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage cannot be negative")
    .max(100, "Discount percentage cannot exceed 100%"),
  ageRange: Yup.object({
    minAge: Yup.number()
      .required("Minimum age is required")
      .max(100, "Minimum age seems unrealistic"),
    maxAge: Yup.number()
      .required("Maximum age is required")
      .min(
        Yup.ref("minAge"),
        "Maximum age must be greater than or equal to minimum age"
      )
      .max(100, "Maximum age seems unrealistic"),
  }),
  shippingModes: Yup.array()
    .required("At least one shipping mode must be selected")
    .min(1, "At least one shipping mode must be selected")
    .of(
      Yup.string().oneOf(
        ["standard", "express"],
        "Invalid shipping mode selected"
      )
    ),
  customStoryDetails: Yup.object({
    character: Yup.string()
      .required("Character is required")
      .min(3, "Character must be at least 3 characters")
      .max(50, "Character must not exceed 50 characters"),
    adventure: Yup.string()
      .required("Adventure theme is required")
      .min(3, "Adventure theme must be at least 3 characters")
      .max(50, "Adventure theme must not exceed 50 characters"),
    morality: Yup.string()
      .required("Morality theme is required")
      .min(3, "Morality theme must be at least 3 characters")
      .max(50, "Morality theme must not exceed 50 characters"),
  }),
  referenceChildImage: Yup.mixed()
    .required("Reference child image is required")
    .test("fileOrUrl", "Must be a valid image file or URL", (value) => {
      if (typeof value === "string") {
        // If it's a string, check if it's a valid URL
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value);
      } else if (value instanceof File) {
        // If it's a file, check if it's an image
        return value.type.startsWith("image/");
      }
      return false;
    }),
  templateChapters: Yup.array().of(
    Yup.object().shape({
      chapterTitle: Yup.string()
        .required("Chapter title is required")
        .min(3, "Chapter title must be at least 3 characters")
        .max(100, "Chapter title must not exceed 100 characters"),
      chapterNumber: Yup.number()
        .required("Chapter number is required")
        .min(0, "Chapter number must be at least 0"),
      pages: Yup.object()
        .when("chapterNumber", {
          is: (val: number) => val !== 0,
          then: (schema) =>
            schema.shape({
              pageOneText: Yup.string()
                .required("Page one text is required")
                .min(10, "Page one text must be at least 10 characters")
                .max(1000, "Page one text must not exceed 1000 characters"),
              pageTwoText: Yup.string()
                .required("Page two text is required")
                .min(10, "Page two text must be at least 10 characters")
                .max(1000, "Page two text must not exceed 1000 characters"),
            }),
          otherwise: (schema) => schema.notRequired(),
        })
        .nullable(),
    })
  ),
});

const BookTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPollingId, setCurrentPollingId] = useState<string | null>(null);
  const navigate = useNavigate();
  // Static data
  const templateList = staticTemplateDetailsAdmin;
  const bookTemplatePulingStatus = false;
  const isBookTemplateGeneration = false;
  const isLoading = false;
  const bookTemplate = { data: staticBookTemplateStats };
  const totalPages = templateList?.data?.totalPages || 1;
  const totalResults = templateList?.data?.totalResults || 1;
  const initialValues: BookTemplateFormValues = {
    title: "",
    description: "",
    displayChildName: "",
    slug: "",
    tagline: "",
    idealFor: "",
    basePrice: 0,
    discountPct: 0,
    ageRange: {
      minAge: 0,
      maxAge: 0,
    },
    shippingModes: [],
    customStoryDetails: {
      character: "",
      adventure: "",
      morality: "",
    },
    referenceChildImage: "",

    templateChapters: [
      {
        chapterTitle: "",
        chapterNumber: 0,
      },
      ...Array(14)
        .fill(null)
        .map((_, index) => ({
          chapterTitle: "",
          chapterNumber: index + 1,
          pages: {
            pageOneText: "",
            pageTwoText: "",
          },
        })),
    ],
  };

  const handleSubmit = async (values: BookTemplateFormValues) => {
    // Static implementation - just close modal
    setIsModalOpen(false);
  };

  // No useEffect needed for static data

  const handleDelete = (id) => {
    // Static implementation - no actual delete
    console.log('Delete template:', id);
  };

  return (
    <div className="p-6  mt-[66px]">
      <div className="mb-6">
        <Helmet>
          <title>Book Templates – StarMe</title>

          <meta
            name="description"
            content="Browse, manage, and edit all personalized storybook templates on the StarMe platform. View template details, pricing, status, and usage analytics."
          />

          <meta
            name="keywords"
            content="book templates, storybook templates, StarMe admin, personalized books, children's story templates, manage templates, edit book templates"
          />

          <link
            rel="canonical"
            href={`${window.location.origin}${location.pathname}`}
          />

          {/* Open Graph */}
          <meta property="og:title" content="Book Templates – StarMe" />
          <meta
            property="og:description"
            content="Manage all personalized storybook templates on the StarMe platform. View template previews, update status, and track usage."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`${window.location.origin}${location.pathname}`}
          />
        </Helmet>

        <h2 className="text-2xl font-bold text-gray-800 font-figTree ">
          Book Templates
        </h2>
        <p className="text-gray-600 font-figTree">
          Manage and view all book templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Total Templates Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4  border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Total Templates
              </h3>
              <p className="text-4xl font-bold text-gray-900 mt-1">
                {bookTemplate?.data?.totalBookTemplate || "-"}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl text-white">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Templates Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4  border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Active Templates
              </h3>
              <p className="text-4xl font-bold text-gray-900 mt-1">
                {bookTemplate?.data?.activeBookTemplate || "-"}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-xl text-white">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Most Used Template Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4  border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start flex-wrap">
            <div className="w-3/4">
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Most Used Template
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
                {bookTemplate?.data?.mostUsedTemplateName || "N/A"}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Used {bookTemplate?.data?.mostUsedTemplateCount || "-"} times
              </p>
            </div>
            <div className="p-3 bg-amber-500 rounded-xl text-white">
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
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100  font-figTree ">
        <div className="p-4 h-[calc(100vh-350px)] overflow-auto scrollbar-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 flex-wrap">
            <h3 className="text-lg font-medium text-gray-800">Template List</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full sm:w-auto">
                    Add Template
                  </Button>
                </DialogTrigger>
                <DialogOverlay className="bg-black/50 backdrop-blur-sm w-full !m-0" />
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-figTree border-b border-gray-300 pb-5">
                      Create New Book Template
                    </DialogTitle>
                  </DialogHeader>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={bookTemplateValidationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      setFieldValue,
                      errors,
                      touched,
                    }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 font-figTree">
                                Title
                              </label>
                              <Field
                                type="text"
                                name="title"
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Enter template title"
                              />
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            {/* Title Preview section */}
                            <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                              <h4 className="text-sm font-medium text-gray-700 mb-1 font-figTree ">
                                Title Preview
                              </h4>
                              <p className="text-gray-800 bg-gray-100 p-2 rounded">
                                {values.title || (
                                  <span className="text-gray-400">
                                    Title preview will appear here...
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Slug
                            </label>
                            <Field
                              type="text"
                              name="slug"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter template slug"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  "slug",
                                  e.target.value.toUpperCase()
                                );
                              }}
                            />
                            <ErrorMessage
                              name="slug"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            rows={3}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Enter template description"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Display Child Name
                            </label>
                            <Field
                              type="text"
                              name="displayChildName"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter display child name"
                            />
                            <ErrorMessage
                              name="displayChildName"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Tagline
                            </label>
                            <Field
                              type="text"
                              name="tagline"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter tagline"
                            />
                            <ErrorMessage
                              name="tagline"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Ideal For
                            </label>
                            <Field
                              as="select"
                              name="idealFor"
                              className={`${
                                values?.idealFor && "text-black"
                              } w-full border border-gray-300 rounded-md px-3 py-2`}
                            >
                              <option value="">Select gender</option>
                              <option value="boy">Boy</option>
                              <option value="girl">Girl</option>
                            </Field>
                            <ErrorMessage
                              name="idealFor"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Base Price
                            </label>
                            <Field
                              type="number"
                              name="basePrice"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter base price"
                            />
                            <ErrorMessage
                              name="basePrice"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Discount Percentage
                            </label>
                            <Field
                              type="number"
                              name="discountPct"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter discount percentage"
                            />
                            <ErrorMessage
                              name="discountPct"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 font-figTree ">
                              Shipping Modes
                            </label>
                            <div className="flex space-x-4">
                              <label className="flex items-center font-figTree ">
                                <Field
                                  type="checkbox"
                                  name="shippingModes"
                                  value="standard"
                                  className="mr-2"
                                />
                                Standard
                              </label>
                              <label className="flex items-center font-figTree ">
                                <Field
                                  type="checkbox"
                                  name="shippingModes"
                                  value="express"
                                  className="mr-2"
                                />
                                Express
                              </label>
                            </div>
                            <ErrorMessage
                              name="shippingModes"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Min Age
                            </label>
                            <Field
                              type="number"
                              name="ageRange.minAge"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Minimum age"
                            />
                            <ErrorMessage
                              name="ageRange.minAge"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                              Max Age
                            </label>
                            <Field
                              type="number"
                              name="ageRange.maxAge"
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Maximum age"
                            />
                            <ErrorMessage
                              name="ageRange.maxAge"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className=" text-black font-semibold font-figTree">
                            Custom Story Details
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                                Character
                              </label>
                              <Field
                                type="text"
                                name="customStoryDetails.character"
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Enter character type"
                              />
                              <ErrorMessage
                                name="customStoryDetails.character"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                                Adventure
                              </label>
                              <Field
                                type="text"
                                name="customStoryDetails.adventure"
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Enter adventure theme"
                              />
                              <ErrorMessage
                                name="customStoryDetails.adventure"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                                Morality
                              </label>
                              <Field
                                type="text"
                                name="customStoryDetails.morality"
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Enter morality theme"
                              />
                              <ErrorMessage
                                name="customStoryDetails.morality"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                            Reference Child Image
                          </label>
                          <div
                            className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors `}
                            onClick={() =>
                              document
                                .getElementById("referenceChildImageInput")
                                ?.click()
                            }
                          >
                            <input
                              id="referenceChildImageInput"
                              name="referenceChildImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                if (file) {
                                  setFieldValue("referenceChildImage", file);
                                }
                              }}
                            />
                            {values.referenceChildImage instanceof File ? (
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  Selected file:{" "}
                                  {values.referenceChildImage.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(
                                    values.referenceChildImage.size / 1024
                                  ).toFixed(2)}{" "}
                                  KB
                                </p>
                              </div>
                            ) : typeof values.referenceChildImage ===
                                "string" && values.referenceChildImage ? (
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  Image URL: {values.referenceChildImage}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="mx-auto w-12 h-12 text-gray-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Click to upload an image
                                </p>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 5MB
                                </p>
                              </div>
                            )}
                          </div>
                          <ErrorMessage
                            name="referenceChildImage"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          {(values.referenceChildImage instanceof File ||
                            (typeof values.referenceChildImage === "string" &&
                              values.referenceChildImage)) && (
                            <div className="mt-2">
                              <h4 className="text-sm font-medium text-gray-700 mb-1 font-figTree">
                                Preview
                              </h4>
                              {values.referenceChildImage instanceof File ? (
                                <img
                                  src={URL.createObjectURL(
                                    values.referenceChildImage
                                  )}
                                  alt="Reference Child Preview"
                                  className="max-h-40 object-contain border border-gray-200 rounded"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "https://placehold.co/200x200/e2e8f0/64748b?text=Image+Preview";
                                  }}
                                />
                              ) : (
                                <img
                                  src={values.referenceChildImage as string}
                                  alt="Reference Child Preview"
                                  className="max-h-40 object-contain border border-gray-200 rounded"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "https://placehold.co/200x200/e2e8f0/64748b?text=Image+Preview";
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-4 font-figTree">
                          <h3 className="font-semibold text-black font-figTree">
                            Template Chapters
                          </h3>
                          <FieldArray name="templateChapters">
                            {({ remove, push }) => (
                              <div className="space-y-8">
                                {values.templateChapters.map(
                                  (chapter, index) => (
                                    <div
                                      key={index}
                                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                    >
                                      <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1  font-figTree  ">
                                            Chapter {chapter.chapterNumber}{" "}
                                            Title
                                          </label>
                                          <Field
                                            type="text"
                                            name={`templateChapters.${index}.chapterTitle`}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            placeholder="Enter chapter title"
                                          />
                                          <ErrorMessage
                                            name={`templateChapters.${index}.chapterTitle`}
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                          />
                                        </div>
                                      </div>

                                      {chapter.chapterNumber !== 0 && (
                                        <>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                              <label className="block text-sm font-medium text-gray-700">
                                                Page One Text
                                              </label>
                                              <Field
                                                as="textarea"
                                                name={`templateChapters.${index}.pages.pageOneText`}
                                                rows={4}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                placeholder="Enter page one text"
                                              />
                                              <ErrorMessage
                                                name={`templateChapters.${index}.pages.pageOneText`}
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                              />
                                            </div>

                                            <div className="space-y-2">
                                              <label className="block text-sm font-medium text-gray-700">
                                                Page Two Text
                                              </label>
                                              <Field
                                                as="textarea"
                                                name={`templateChapters.${index}.pages.pageTwoText`}
                                                rows={4}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                placeholder="Enter page two text"
                                              />
                                              <ErrorMessage
                                                name={`templateChapters.${index}.pages.pageTwoText`}
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                              />
                                            </div>
                                          </div>

                                          {/* Preview section */}
                                          <div className="mt-4 p-4 bg-white rounded border">
                                            <h4 className="font-medium text-gray-700 mb-2">
                                              Preview
                                            </h4>
                                            <div className="space-y-4">
                                              <div>
                                                <h5 className="text-sm font-semibold">
                                                  Page One Preview:
                                                </h5>
                                                <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded">
                                                  {chapter.pages
                                                    ?.pageOneText || (
                                                    <span className="text-gray-400">
                                                      Preview will appear
                                                      here...
                                                    </span>
                                                  )}
                                                </p>
                                              </div>
                                              <div>
                                                <h5 className="text-sm font-semibold">
                                                  Page Two Preview:
                                                </h5>
                                                <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded">
                                                  {chapter.pages
                                                    ?.pageTwoText || (
                                                    <span className="text-gray-400">
                                                      Preview will appear
                                                      here...
                                                    </span>
                                                  )}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </FieldArray>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 font-figTree">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-indigo-600 w-32">
                            {isBookTemplateGeneration ? (
                              <div className="flex gap-2 items-center">
                                <BasicLoader color={"fill-white"} />
                                Generating...
                              </div>
                            ) : bookTemplatePulingStatus ? (
                              <div className="flex gap-2 items-center">
                                <BasicLoader color={"fill-white"} />
                                Polling...
                              </div>
                            ) : (
                              " Create Template"
                            )}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Template Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center my-10">
              <div className="w-28 h-28 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : templateList?.data?.results?.length <= 0 &&
            searchText?.length > 0 ? (
            <div className="flex flex-col items-center justify-center my-52 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="font-figTree text-2xl font-semibold text-gray-800 mb-2">
                No Data Found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateList?.data?.results.map((template, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/admin/book-templates/${template?.bookTemplateId}`
                      );
                    }}
                  >
                    <div className="relative h-48">
                      <img
                        src={template?.coverImage}
                        alt={template.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/400x300/e2e8f0/64748b?text=Cover+Image";
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                        ${template.basePrice}
                      </div>

                      <MdDeleteForever
                        size={40}
                        className="absolute top-3 left-3  bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium  text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(template?.bookTemplateId);
                        }}
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800 line-clamp-1 font-figTree">
                          {template.title}
                        </h4>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            template.idealFor === "boy"
                              ? "bg-blue-100 text-blue-800"
                              : template.idealFor === "girl"
                              ? "bg-pink-100 text-pink-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {template.idealFor}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                          </svg>
                          Ages {template.ageRange.minAge}-
                          {template.ageRange.maxAge}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                          </svg>
                          {template.shippingModes.join(", ")}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          {template.character}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">
                          Adventure
                        </div>
                        <div className="text-sm text-gray-700 line-clamp-1">
                          {template.adventure}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Morality
                        </div>
                        <div className="text-sm text-gray-700 line-clamp-2">
                          {template.morality}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalResults}
          perResults={6}
        />
      </div>
    </div>
  );
};

export default BookTemplate;
