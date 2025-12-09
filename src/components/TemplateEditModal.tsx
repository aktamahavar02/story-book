import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TemplateChapter,
  BookTemplate,
  PageContent,
} from "../pages/admin/TemplateDetails";

interface TemplateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: BookTemplate;
  onSave: (updatedTemplate: BookTemplate) => void;
}

const TemplateEditModal: React.FC<TemplateEditModalProps> = ({
  isOpen,
  onClose,
  template,
  onSave,
}) => {

  if (!isOpen || !template) return null;

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    templateChapters: Yup.array().of(
      Yup.object().shape({
        chapterTitle: Yup.string().required("Chapter title is required"),
        imageGenerationPrompt: Yup.string().required(
          "Image generation prompt is required"
        ),
        characterAction: Yup.string().when("chapterType", {
          is: "page",
          then: (schema) =>
            schema.required("Character action is required for page chapters"),
          otherwise: (schema) => schema.nullable(),
        }),
        pages: Yup.object().when("chapterType", {
          is: "page",
          then: (schema) =>
            Yup.object().shape({
              pageOneText: Yup.string().required("Page one text is required"),
              pageTwoText: Yup.string().required("Page two text is required"),
            }),
          otherwise: (schema) => schema.nullable(),
        }),
      })
    ),
  });
  // Initial values for the form
  const initialValues = {
    title: template?.title || "",
    description: template?.description || "",
    displayChildName: template?.displayChildName || "",
    slug: template?.slug ||  "",
    tagline:template?.tagline || "",
    idealFor: template?.idealFor || "",
    basePrice: template?.basePrice || 0,
    discountPct: template?.discountPct || 0,
    isActive: template?.isActive || false,
    ageRange: {
      minAge: template?.ageRange?.minAge || 0,
      maxAge: template?.ageRange?.maxAge || 0,
    },
    shippingModes: template?.shippingModes || [],
    customStoryDetails: {
      character: template?.customStoryDetails?.character || "",
      adventure: template?.customStoryDetails?.adventure || "",
      morality: template?.customStoryDetails?.morality || "",
    },
    templateChapters: template.templateChapters.map((chapter) => ({
      ...chapter,
      pages: chapter.pages || { pageOneText: "", pageTwoText: "" },
      characterAction: chapter.characterAction || "",
      imageGenerationPrompt: chapter.imageGenerationPrompt || "",
    })),
  };
  const handleSubmit = (values: { templateChapters: TemplateChapter[] }) => {
    const { slug,tagline, displayChildName,  ...restValues } = values as any;
    
    const updatedTemplate = {
      ...restValues, // Only spread restValues (without slug)
      ...(slug && { slug }),
      ...(tagline && { tagline }), // Only add tagline if it's not empty
      ...(displayChildName && { displayChildName }), // Only add displayChildName if it's not empty
      isActive: values.isActive, // Add the isActive field
      templateChapters: values.templateChapters?.map((item, ind) => {

        const filteredPages = Array.isArray(item?.pages) 
        ? item.pages.map((page: any) => {
            const pageData: any = {};
            if (page?.pageOneText) pageData.pageOneText = page.pageOneText;
            if (page?.pageTwoText) pageData.pageTwoText = page.pageTwoText;
            return Object.keys(pageData).length > 0 ? pageData : undefined;
          }).filter(Boolean)
        : undefined;

        return {
          _id: item?._id,
          chapterNumber: item?.chapterNumber,
          chapterTitle: item?.chapterTitle,
          chapterType: item?.chapterType,
          imageGenerationPrompt: item?.imageGenerationPrompt,
          ...(item?.characterAction && { characterAction: item.characterAction }),
          ...(filteredPages && filteredPages.length > 0 && { pages: filteredPages }),
        };
      }),
    };

    onSave(updatedTemplate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-figTree">
              Edit Template Chapters
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>

                <FieldArray name="templateChapters">
                  {({ form }) => (
                    <div className="space-y-6">
                      {/* //! */}
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
                          {/* <div className="mt-2 p-3 bg-white rounded border border-gray-200">
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
                            </div> */}
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
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-figTree">
                            Active
                          </label>
                          <div className="flex items-center">
                            <Field
                              type="checkbox"
                              name="isActive"
                              id="isActive"
                              className="mr-2 h-4 w-4 text-blue-600 rounded"
                            />
                            <label htmlFor="isActive" className="text-sm text-gray-700">
                              {values.isActive ? 'Active' : 'Inactive'}
                            </label>
                          </div>
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
                      {/* //! */}

                      {values.templateChapters.map((chapter, index) => (
                        <div
                          key={chapter._id}
                          className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-blue-800 font-figTree">
                              {chapter.chapterNumber === 0
                                ? "Cover"
                                : `Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {chapter.chapterType}
                            </span>
                          </div>

                          {/* Chapter Title */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Chapter Title
                            </label>
                            <Field
                              name={`templateChapters.${index}.chapterTitle`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter chapter title"
                            />
                            <ErrorMessage
                              name={`templateChapters.${index}.chapterTitle`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>

                          {/* Image Generation Prompt */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Image Generation Prompt
                            </label>
                            <Field
                              as="textarea"
                              name={`templateChapters.${index}.imageGenerationPrompt`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                              placeholder="Enter image generation prompt"
                            />
                            <ErrorMessage
                              name={`templateChapters.${index}.imageGenerationPrompt`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>

                          {/* Character Action (only for page chapters) */}
                          {chapter.chapterType === "page" && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Character Action
                              </label>
                              <Field
                                name={`templateChapters.${index}.characterAction`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter character action"
                              />
                              <ErrorMessage
                                name={`templateChapters.${index}.characterAction`}
                                component="div"
                                className="text-red-500 text-xs mt-1"
                              />
                            </div>
                          )}

                          {/* Page Texts (only for page chapters) */}
                          {chapter.chapterType === "page" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Page One Text
                                </label>
                                <Field
                                  as="textarea"
                                  name={`templateChapters.${index}.pages.pageOneText`}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                  placeholder="Enter page one text"
                                />
                                <ErrorMessage
                                  name={`templateChapters.${index}.pages.pageOneText`}
                                  component="div"
                                  className="text-red-500 text-xs mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Page Two Text
                                </label>
                                <Field
                                  as="textarea"
                                  name={`templateChapters.${index}.pages.pageTwoText`}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                  placeholder="Enter page two text"
                                />
                                <ErrorMessage
                                  name={`templateChapters.${index}.pages.pageTwoText`}
                                  component="div"
                                  className="text-red-500 text-xs mt-1"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditModal;
