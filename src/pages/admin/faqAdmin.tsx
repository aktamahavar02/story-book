import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  faqAdmin,
  faqAdminGet,
  faqDelete,
  faqAdminUpdate,
} from "../../../store/slices/bookTemplateSlice.js";
import BasicLoader from "@/components/ui/basicLoader.js";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionItem } from "@/components/ui/AccordionItem.js";
import { FaEdit } from "react-icons/fa";
import loadingImage from "../../assets/images/purple.gif";
import { Helmet } from "react-helmet-async";
import { MdDeleteForever } from "react-icons/md";

export const FaqAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const EnumCategoryOfFAQ = {
    POPULAR_QUESTION: "Popular Questions",
    SOMETHING_IS_WRONG: "Something is Wrong",
    YOUR_ACCOUNT: "Your Account",
    NEED_HELP_WITH_YOUR_ORDER: "Need Help with Your Order",
    PLACING_AN_ORDER: "Placing an Order",
    ABOUT_US: "About Us",
    ABOUT_OUR_BOOKS: "About Our Books",
    SHIPPING_AND_DELIVERY: "Shipping AND Delivery",
  };

  const isFaqGet = useSelector((state) => state?.bookTemplate?.isFaqGet);

  useEffect(() => {
    dispatch(faqAdminGet({}));
  }, [dispatch]);

  const validationSchema = Yup.object({
    question: Yup.string()
      .required("Question is required")
      .min(10, "Question must be at least 10 characters"),
    answer: Yup.string()
      .required("Answer is required")
      .min(20, "Answer must be at least 20 characters"),
    name: Yup.string()
      .required("Category is required")
      .oneOf(Object.values(EnumCategoryOfFAQ), "Please select a valid name"),
  });

  const editFaq = (faq) => {
    // Prepare the FAQ data for editing, ensuring category field is properly mapped
    const faqForEdit = {
      ...faq,
      name: faq.name, // Map 'name' from API to 'category' for form
    };
    setCurrentFaq(faqForEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  const handleDelete = (id) => [dispatch(faqDelete({ id  , onSuccess : ()=>{
    dispatch(faqAdminGet({}));
  }}))];

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Map 'category' field back to 'name' if that's what your API expects
    const faqData = {
      ...values,

      name: values.name, // Assuming the API expects 'name' instead of 'category'
    };
    if (currentFaq?.id) {
      dispatch(
        faqAdminUpdate({
          ...faqData,
          id: currentFaq?.id,
          onSuccess: () => {
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentFaq(null);
            resetForm();
            setSubmitting(false);
            dispatch(faqAdminGet({}));
          },
        })
      );
    } else {
      dispatch(
        faqAdmin({
          ...faqData,
          onSuccess: () => {
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentFaq(null);
            resetForm();
            setSubmitting(false);
            dispatch(faqAdminGet({}));
          },
        })
      );
    }
  };
  const isFaq = useSelector((state) => state?.bookTemplate?.isFaq);
  const isFaqUpdate = useSelector((state) => state?.bookTemplate?.isFaqUpdate);
  const faqsListing = useSelector(
    (state) => state?.bookTemplate?.faqsAdminGetData
  );
  return (
    <div className="p-4 mt-[66px]">
      <Helmet>
        <title>FAQ – StarMe</title>

        <meta
          name="description"
          content="Manage and edit frequently asked questions for StarMe. Update answers, organize FAQs, and maintain helpful information for storybook customers."
        />

        <meta
          name="keywords"
          content="FAQ management, manage FAQs, StarMe admin, questions and answers, support content, help center management"
        />

        <link
          rel="canonical"
          href={`${window.location.origin}${location.pathname}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content="FAQ – StarMe" />
        <meta
          property="og:description"
          content="View and manage FAQ content for StarMe's personalized storybook platform."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${window.location.origin}${location.pathname}`}
        />
      </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-figTree">
          Frequently Asked Questions Management
        </h2>
        <p className="text-gray-600 font-figTree">
          Manage and view all Frequently Asked Questions
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-4 font-figTree">
          <h3 className="text-xl font-bold text-gray-800"> List FAQ</h3>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 text-base rounded-lg shadow-md transition duration-200"
            onClick={() => {
              setIsModalOpen(true);
              setIsEditing(false);
              setCurrentFaq(null);
            }}
          >
            Add FAQ
          </button>
        </div>
        <div>
          {isFaqGet ? (
            <div className="flex items-center justify-center my-10 w-full">
              <img src={loadingImage} alt="image" className="w-28" />
            </div>
          ) : (
            faqsListing?.data?.map((item, index) => {
              return (
                <>
                  <div className="rounded mb-4 border p-4">
                    <div className="text-lg font-figTree font-medium mt-0 pt-0 flex justify-between">
                      {item?.name}{" "}
                      <div className=" flex gap-2 items-center">
                      <FaEdit
                        onClick={() => editFaq(item)}
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                      />
                      <MdDeleteForever
                        onClick={() => {
                          handleDelete(item?.id);
                        }}
                        size={20}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                      />
                      </div>
                   
                    </div>
                    <div className="">
                      <Accordion.Root
                        type="single"
                        collapsible
                        className="w-full mx-auto"
                      >
                        <AccordionItem
                          key={index}
                          isAdmin={true}
                          type={`item-${index}`}
                          title={item.question}
                          content={item.answer}
                          extra={item?.nextLine}
                        />
                      </Accordion.Root>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto font-figTree">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? "Edit FAQ" : "Add New FAQ"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setCurrentFaq(null);
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
                question: isEditing && currentFaq ? currentFaq.question : "",
                answer: isEditing && currentFaq ? currentFaq.answer : "",
                name: isEditing && currentFaq ? currentFaq.name : "", // Using 'name' as it appears in the UI
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                     <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      id="name"
                      name="name"
                      className={`w-full px-3 py-2 border rounded text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        values?.name && "text-black"
                      } ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      {Object.entries(EnumCategoryOfFAQ).map(([key, value]) => (
                        <option key={key} value={value}>
                          {value}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Question
                    </label>
                    <Field
                      as="textarea"
                      id="question"
                      name="question"
                      rows={3}
                      className={`w-full px-3 py-2 border rounded text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.question && touched.question
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter the FAQ question"
                    />
                    <ErrorMessage
                      name="question"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="answer"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Answer
                    </label>
                    <Field
                      as="textarea"
                      id="answer"
                      name="answer"
                      rows={4}
                      className={`w-full px-3 py-2 border rounded text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.answer && touched.answer
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter the FAQ answer"
                    />
                    <ErrorMessage
                      name="answer"
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
                        setCurrentFaq(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {isFaq || isFaqUpdate ? (
                        <BasicLoader />
                      ) : isEditing ? (
                        "Update FAQ"
                      ) : (
                        "Create FAQ"
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
