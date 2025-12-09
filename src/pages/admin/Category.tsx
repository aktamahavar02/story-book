import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryAdd,
  categoryGet,
  categoryUpdate,
  categoryDelete,
} from "../../../store/slices/bookTemplateSlice.js";
import {
  uploadImage,
  imageUploadHandle,
} from "../../../store/slices/loginSlice.js";
import BasicLoader from "@/components/ui/basicLoader.js";
import { useLocation } from "react-router-dom";
import loadingImage from "../../assets/images/purple.gif";
import { Helmet } from "react-helmet-async";
import { MdDeleteForever } from "react-icons/md";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  const categoryTypes = ["character", "adventure", "morality"];
  const dispatch = useDispatch();

  const listCategory = useSelector(
    (state) => state?.bookTemplate?.categoryGetData?.data
  );
  const isCategoryAdd = useSelector(
    (state) => state?.bookTemplate?.isCategoryAdd
  );

  const isCategoryUpdate = useSelector(
    (state) => state?.bookTemplate?.isCategoryUpdate
  );
  const isCategoryGet = useSelector(
    (state) => state?.bookTemplate?.isCategoryGet
  );
  const isUploadImage = useSelector((state) => state?.auth?.isUploadImage);
  const isImageUpload = useSelector((state) => state?.auth?.isImageUpload);

  const categoryList = listCategory
    ? type
      ? listCategory.filter((category) => category.categoryType === type)
      : listCategory
    : [];

  useEffect(() => {
    dispatch(categoryGet({}));
  }, []);

  const validationSchema = Yup.object({
    categoryType: Yup.string().when([], {
      is: () => !isEditing && type, // If not editing and there's a type in URL
      then: (schema) =>
        schema.required("Category type is required").oneOf(categoryTypes), // Pre-populated field should be valid
      otherwise: (schema) => schema.required("Category type is required"),
    }),
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    // thumbnail: Yup.mixed().nullable(),
    thumbnail: Yup.mixed().test(
      "fileRequired",
      "Thumbnail is required",
      function (value) {
        const { isEditing } = this.options.context;
        return isEditing || value != null;
      }
    ),
    sortOrder: Yup.number()
      .required("Sort order is required")
      .min(0, "Sort order must be at least 0"),
    isActive: Yup.boolean(),
  });

  const editCategory = (category: any) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };
    const handleDelete = (id) => {
    dispatch(categoryDelete({id , 
      onSuccess: ()=> {
        dispatch(categoryGet({}));
      }
    }))
    }
  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    const file = values?.thumbnail as File;

    // If editing, require thumbnail only if a new one is being uploaded
    if (!isEditing) {
      // Check if creating and no thumbnail provided
      if (!values.thumbnail) {
        // Show error for missing thumbnail in create mode
        alert("Please select a thumbnail image.");
        setSubmitting(false);
        return;
      }
    }

    // If in edit mode and no new thumbnail is provided, handle directly without upload

    if (file && file instanceof File) {
      const payload = {
        key: file.name,
        contentType: file.type,
        file,
        onSuccess: (s3Url: string) => {
          const updateUploadedImageUrl = s3Url.split("?")[0] || "";
          const finalValues = {
            ...values,
            thumbnail: updateUploadedImageUrl,
          };

          dispatch(
            imageUploadHandle({
              imageUrl: s3Url,
              file,

              onSuccess: () => {
                // If editing, we should dispatch an update action instead of add
                if (isEditing && currentCategory) {
                  // New thumbnail was provided, so update with the new one
                  dispatch(
                    categoryUpdate({
                      ...finalValues,
                      id: currentCategory.id, // Pass the ID for update
                      onSuccess: () => {
                        setIsModalOpen(false);
                        setIsEditing(false);
                        setCurrentCategory(null);
                        resetForm();
                        setSubmitting(false);
                        dispatch(categoryGet({}));
                      },
                    })
                  );
                } else {
                  // Creating new category
                  dispatch(
                    categoryAdd({
                      ...finalValues,
                      categoryType: type || finalValues.categoryType, // Ensure the type matches the URL parameter
                      onSuccess: () => {
                        setIsModalOpen(false);
                        resetForm();
                        setSubmitting(false);
                        dispatch(categoryGet({}));
                      },
                    })
                  );
                }
              },
            })
          );
        },
      };
      dispatch(uploadImage(payload));
    } else {
      // Since no new thumbnail was provided, we can directly update the category
      if (isEditing && currentCategory) {
        const updatedValues = {
          ...values,
          thumbnail: currentCategory.thumbnail, // Keep existing thumbnail
          id: currentCategory.id, // Pass the ID for update
          onSuccess: () => {
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentCategory(null);
            resetForm();
            setSubmitting(false);
            dispatch(categoryGet({}));
          },
        };

        dispatch(categoryUpdate(updatedValues));
        return;
      } else {
        // This shouldn't happen since we already checked for thumbnail in create mode
        alert("A thumbnail is required when creating a new category.");
        setSubmitting(false);
        return;
      }
    }
  };

  return (
    <div className="p-4 mt-[66px]">
      <Helmet>
        <title>
          {" "}
          {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""} Category –
          StarMe
        </title>

        <meta
          name="description"
          content="Manage book categories for the StarMe platform. Add, edit, and organize categories used in personalized storybook creation."
        />

        <meta
          name="keywords"
          content="category management, book categories, StarMe admin, manage categories, storybook categories, organize book categories"
        />

        <link
          rel="canonical"
          href={`${window.location.origin}${location.pathname}`}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={` ${
            type ? type.charAt(0).toUpperCase() + type.slice(1) : ""
          } "Category – StarMe"`}
        />
        <meta
          property="og:description"
          content="View and manage all book categories for StarMe personalized storybooks."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${window.location.origin}${location.pathname}`}
        />
      </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-figTree">
          Category Management
        </h2>
        <p className="text-gray-600 font-figTree">
          Manage and view all category
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-4 font-figTree">
          <h3 className="text-lg font-medium text-gray-800">
            {" "}
            {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""} Category
            List
          </h3>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-md transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            Add {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
          </button>
        </div>

        {/* Category List */}
        {!isCategoryGet ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryList.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative pb-[100%]">
                  {" "}
                  {/* 1:1 Aspect Ratio */}
                  <img
                    src={category.thumbnail}
                    alt={category.name}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                        {category.categoryType
                          ? category.categoryType.charAt(0).toUpperCase() +
                            category.categoryType.slice(1)
                          : ""}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          category.isActive
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {category.isActive === true ? "True" : "False"}
                      </span>
                    </div>
                    <div className=" flex  gap-2">
                      <button
                        onClick={() => editCategory(category)}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <MdDeleteForever size={20}  onClick={()=>{
                        handleDelete(category?.id)
                      }}/>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-800 truncate mt-2">
                    {category.name}
                  </h4>
                  <p
                    className="text-sm text-gray-600 mt-1 h-10 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {category.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Order: {category.sortOrder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center my-10 w-full">
            <img src={loadingImage} alt="image" className="w-28" />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setCurrentCategory(null);
                }}
                className="text-gray-500 hover:text-gray-700"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <Formik
              initialValues={{
                categoryType:
                  isEditing && currentCategory
                    ? currentCategory.categoryType
                    : type || "", // Pre-select the type from URL if not editing
                name: isEditing && currentCategory ? currentCategory.name : "",
                description:
                  isEditing && currentCategory
                    ? currentCategory.description
                    : "",
                thumbnail:
                  isEditing && currentCategory
                    ? currentCategory.thumbnail
                    : null, // Always start with null for thumbnail
                sortOrder:
                  isEditing && currentCategory
                    ? currentCategory.sortOrder.toString()
                    : "",
                isActive:
                  isEditing && currentCategory
                    ? currentCategory.isActive
                    : true, // Default to true if not editing
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="categoryType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category Type
                      </label>
                      <Field
                        as="select"
                        id="categoryType"
                        name="categoryType"
                        disabled={isEditing || type} // Disable if adding and type is already in URL
                        className={` ${
                          values?.categoryType && "text-black"
                        } w-full px-2 py-1 border rounded shadow-sm focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 ${
                          errors.categoryType && touched.categoryType
                            ? "border-red-500"
                            : "border-gray-300"
                        } ${
                          isEditing || type
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <option value="">Select category type</option>
                        {categoryTypes.map((catType, index) => (
                          <option key={index} value={catType}>
                            {catType
                              ? catType.charAt(0).toUpperCase() +
                                catType.slice(1)
                              : ""}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="categoryType"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full px-2 py-1 border rounded text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter category name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={3}
                      className={`w-full px-2 py-1 border rounded text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.description && touched.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter category description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label
                        htmlFor="thumbnail"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Thumbnail
                      </label>
                      <div className="mt-1">
                        <input
                          type="file"
                          id="thumbnail"
                          name="thumbnail"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              setFieldValue("thumbnail", file);
                            }
                          }}
                          className={`w-full px-2 py-1 border rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.thumbnail && touched.thumbnail
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="thumbnail"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                      {/* Display thumbnail preview if file is selected */}
                      {values.thumbnail ? (
                        <div className="mt-2">
                          <img
                            src={
                              typeof values?.thumbnail === "string"
                                ? values?.thumbnail
                                : URL.createObjectURL(values.thumbnail)
                            }
                            alt="Thumbnail preview"
                            className="w-20 h-20 object-cover rounded border border-gray-300"
                          />
                        </div>
                      ) : isEditing && currentCategory?.thumbnail ? (
                        <div className="mt-2">
                          <img
                            src={currentCategory.thumbnail}
                            alt="Current thumbnail"
                            className="w-20 h-20 object-cover rounded border border-gray-300"
                          />
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="sortOrder"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Sort Order
                      </label>
                      <Field
                        type="number"
                        id="sortOrder"
                        name="sortOrder"
                        className={`w-full px-2 py-1 border rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h- ${
                          errors.sortOrder && touched.sortOrder
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        min="0"
                        placeholder="Enter sort order"
                      />
                      <ErrorMessage
                        name="sortOrder"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Is Active Checkbox */}
                  <div className="mb-4">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("isActive", e.target.checked);
                        }}
                      />
                      <label
                        htmlFor="isActive"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Is Active
                      </label>
                    </div>
                    <ErrorMessage
                      name="isActive"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsEditing(false);
                        setCurrentCategory(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isUploadImage ||
                      isImageUpload ||
                      isCategoryAdd ||
                      isCategoryUpdate ? (
                        <BasicLoader />
                      ) : isEditing ? (
                        "Update Category"
                      ) : (
                        "Create Category"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
