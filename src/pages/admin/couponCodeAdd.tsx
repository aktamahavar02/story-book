import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getBookPriceAdmin,
  couponAdmin,
  couponAdminGet,
  couponAdminUpdate,
  couponDelete
} from "../../../store/slices/bookTemplateSlice.js";
import { FaRegEdit } from "react-icons/fa";
import BasicLoader from "@/components/ui/basicLoader.js";
import { Helmet } from "react-helmet-async";
import { MdDeleteForever } from "react-icons/md";
import Pagination from "./Pagination.js";



const CouponCodeAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  const listCoupon = useSelector(
    (state) => state?.bookTemplate?.couponAdminGetData
  );
   console.log("listCoupon===", listCoupon)
  const isLoading = useSelector((state) => state?.bookTemplate?.isLoading
  );

 
  const currencyCodes = [
    "GBP",
    "EUR",
    "CHF",
    "NOK",
    "SEK",
    "DKK",
    "PLN",
    "USD",
    "CAD",
    "AUD",
    "NZD",
    "JPY",
    "SGD",
    "HKD",
    "AED",
    "ZAR",
    "INR",
  ];

  useEffect(() => {
    dispatch(getBookPriceAdmin({}));
    dispatch(couponAdminGet({ page : currentPage , limit:10}));
  }, [currentPage]);

  const listPrice = useSelector(
    (state) => state?.bookTemplate?.getBookPriceAdminData
  );

  const priceData = Array.isArray(listPrice?.data)
    ? listPrice?.data
    : Array.isArray(listPrice?.data?.results)
    ? listPrice?.data?.results
    : [];

  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      validFrom: "",
      validUntil: "",
      // minimumOrderAmount: Object.fromEntries(currencyCodes.map((c) => [c, ""])),
      // maximumDiscountAmount: Object.fromEntries(currencyCodes.map((c) => [c, ""])),
      isActive: true,
      usageLimit: "",
      couponType: "Individual",
    },

    validationSchema: Yup.object({
      code: Yup.string().trim().required("Coupon code is required"),
      description: Yup.string().trim().required("Description is required"),
      discountValue: Yup.number()
        .typeError("Discount value must be a number")
        .positive("Discount value must be greater than 0")
        .max(100, "Percentage cannot exceed 100%")
        .required("Discount value is required"),
      validFrom: Yup.date().required("Valid from date is required"),
      validUntil: Yup.date()
        .required("Valid until date is required")
        .min(
          Yup.ref("validFrom"),
          "Valid until date must be after valid from date"
        ),
      usageLimit: Yup.string()
        .min(0, "Usage limit cannot be negative")
        .typeError("Usage limit must be a number")
        .required("Usage limit is required"),
    }),

    onSubmit: (values) => {
     
      if (selectedCoupon?._id) {
        dispatch(
          couponAdminUpdate({
            ...values,
            id: selectedCoupon?._id,
            onSuccess: () => {
              document.body.style.overflow = 'unset';
              setIsModalOpen(false);
              dispatch(couponAdminGet({ page : currentPage , limit:10}));
            },
          })
        );
      } else {
        dispatch(
          couponAdmin({
            ...values,
            onSuccess: () => {
              document.body.style.overflow = 'unset';
              setIsModalOpen(false);
              dispatch(couponAdminGet({ page : currentPage , limit:10}));
            },
          })
        );
      }

      formik.resetForm();
    },
  });

  const openModal = (coupon = null) => {
    if (coupon) {
      setSelectedCoupon(coupon);
      formik.setValues({
        code: coupon?.code || "",
        description: coupon?.description || "",
        discountType: coupon?.discountType || "percentage",
        discountValue: coupon?.discountValue || "",
        validFrom: coupon?.validFrom ? coupon.validFrom.split("T")[0] : "",
        validUntil: coupon?.validUntil ? coupon.validUntil.split("T")[0] : "",
        isActive: coupon?.isActive ?? true,
        usageLimit: coupon?.usageLimit ?? "",
        couponType: coupon?.couponType || "Individual",
      });
    } else {
      setSelectedCoupon(null);
      formik.resetForm();
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
    formik.resetForm();
  };

  // Effect to handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);
  // const handleCurrencyChange = (currency, value, type) => {
  //   const field =
  //     type === "minimum" ? "minimumOrderAmount" : "maximumDiscountAmount";
  //   formik.setFieldValue(`${field}.${currency}`, value);
  // };
   const handleDelete =(id)=>{
    dispatch(couponDelete({id,
      onSuccess:()=>{
        dispatch(couponAdminGet({ page : currentPage , limit:10}));
      }
    }))
   }

  return (
    <div className="p-4 mt-[66px]">
    <Helmet>
      <title>Coupon Code  – StarMe</title>

      <meta
        name="description"
        content="Manage and view all coupon codes on the StarMe platform. Create, update, activate, and track discount codes used for personalized storybook purchases."
      />

      <meta
        name="keywords"
        content="coupon code management, discount codes, promo codes, StarMe admin, manage coupons, offer codes"
      />

      <link
        rel="canonical"
        href={`${window.location.origin}${location.pathname}`}
      />

      {/* Open Graph */}
      <meta property="og:title" content="Coupon Code – StarMe" />
      <meta
        property="og:description"
        content="View and manage all discount and promotional codes for personalized storybook purchases."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${window.location.origin}${location.pathname}`}
      />   
    </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-figTree ">
          Coupon Code Management
        </h2>
        <p className="text-gray-600 font-figTree">
          Manage and view all coupon codes
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-4 font-figTree">
          <h3 className="text-lg font-medium text-gray-800">
            Coupon Code List
          </h3>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4  text-sm rounded-lg shadow-md transition duration-200"
            onClick={openModal}
          >
            Add Coupon
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 font-figTree">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coupon Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User  Limit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {listCoupon?.data?.results?.map((user) => {
                return (
                  <tr key={user?._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user?.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user?.couponType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user?.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user?.discountType
                        ? user.discountType.charAt(0).toUpperCase() +
                          user.discountType.slice(1)
                        : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user?.discountValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user?.usageCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user?.usageLimit}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap  text-green-700 cursor-pointer flex  gap-2"
                  
                    >
                      
                      <FaRegEdit     onClick={() => openModal(user)} size={18} /> <MdDeleteForever className="text-red-500" size={20}  onClick={() => handleDelete(user?._id)}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        {/* Pagination */}
        <Pagination
              currentPage={currentPage}
              totalPages={listCoupon?.data?.totalPages || 1}
              onPageChange={setCurrentPage}
              totalResults={listCoupon?.data?.totalResults}
            />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            document.body.style.overflow = 'unset';
            closeModal();
          }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto font-figTree"
            onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing modal
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 font-figTree ">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCoupon?._id ? "Update Coupon" : "Create New Coupon"}
                </h2>
                <button
                  onClick={() => {
                    document.body.style.overflow = 'unset';
                    closeModal();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-2">
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formik.values.code}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "code",
                          e.target.value.toUpperCase()
                        )
                      }
                      className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
                        formik.errors.code && formik.touched.code
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Enter coupon code"
                    />
                    {formik.touched.code && formik.errors.code && (
                      <p className="text-red-600 text-sm mt-1">
                        {formik.errors.code}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
                        formik.errors.description && formik.touched.description
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Enter description"
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-red-600 text-sm mt-1">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>
                </div>

                {/* Discount Type + Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      name="discountType"
                      value={formik.values.discountType}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500  ${
                        formik.values.discountType && "text-black"
                      }`}
                    >
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      name="discountValue"
                      value={formik.values.discountValue}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
                        formik.errors.discountValue &&
                        formik.touched.discountValue
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Enter percentage (0-100)"
                    />
                    {formik.touched.discountValue &&
                      formik.errors.discountValue && (
                        <p className="text-red-600 text-sm mt-1">
                          {formik.errors.discountValue}
                        </p>
                      )}
                  </div>
                </div>

                {/* Validity Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valid From
                    </label>
                    <input
                      type="date"
                      name="validFrom"
                      value={formik.values.validFrom}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
                        formik.errors.validFrom && formik.touched.validFrom
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {formik.touched.validFrom && formik.errors.validFrom && (
                      <p className="text-red-600 text-sm mt-1">
                        {formik.errors.validFrom}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valid Until
                    </label>
                    <input
                      type="date"
                      name="validUntil"
                      value={formik.values.validUntil}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
                        formik.errors.validUntil && formik.touched.validUntil
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {formik.touched.validUntil && formik.errors.validUntil && (
                      <p className="text-red-600 text-sm mt-1">
                        {formik.errors.validUntil}
                      </p>
                    )}
                  </div>
                </div>

                {/* Usage Limit + Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usage Limit
                    </label>
                    <input
                      type="number"
                      name="usageLimit"
                      value={formik.values.usageLimit}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
                        formik.errors.usageLimit && formik.touched.usageLimit
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Leave blank for unlimited"
                    />
                    {formik.touched.usageLimit && formik.errors.usageLimit && (
                      <p className="text-red-600 text-sm mt-1">
                        {formik.errors.usageLimit}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Type
                    </label>
                    <select
                      name="couponType"
                      value={formik.values.couponType}
                      onChange={formik.handleChange}
                      className={`w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${
                        formik.values.couponType && "text-black"
                      }`}
                    >
                     <option value="">Select the coupon type</option>
                      <option value="Individual">Individual</option>
                      <option value="Group">Group</option>
                    </select>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formik.values.isActive}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Active</label>
                </div>

                {/* Discounted Price Table */}
                {priceData.length > 0 && (
                  <div className="overflow-x-auto border rounded-lg mt-3">
                    <table className="min-w-full divide-y divide-gray-200 font-figTree">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Currency Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Original Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Discounted Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {priceData.map((item) => {
                          const original = parseFloat(item.value) || 0;
                          const percent =
                            parseFloat(formik.values.discountValue) || 0;
                          const discounted =
                            original - (original * percent) / 100;
                          return (
                            <tr key={item._id || item.id}>
                              <td className="px-6 py-4 text-sm font-figTree">
                                {item.currencyName}
                              </td>
                              <td className="px-6 py-4 text-sm font-figTree">
                                {item.currencySymbol}
                                {original.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-green-600 font-medium text-sm font-figTree">
                                {item.currencySymbol}
                                {discounted.toFixed(2)}
                                {percent > 0 && (
                                  <span className="ml-2 text-xs text-red-500">
                                    ({percent}% OFF)
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-2 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500  font-figTree"
                  >
                    {
                      isLoading ? 
                      <BasicLoader color={"fill-purple-500"} /> : selectedCoupon?._id ?  "Update Coupon" :"Create Coupon"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponCodeAdd;
