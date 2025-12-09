import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookPriceAdmin,
  updateBookPrice,
} from "../../../store/slices/bookTemplateSlice.js";
import loadingImage from "../../assets/images/purple.gif";
import { Helmet } from "react-helmet-async";

const BookPrice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    value: "",
    isActive: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookPriceAdmin({}));
  }, []);

  const listPrice = useSelector(
    (state) => state?.bookTemplate?.getBookPriceAdminData
  );

  const priceData = Array.isArray(listPrice?.data)
    ? listPrice?.data
    : Array.isArray(listPrice?.data?.results)
    ? listPrice?.data?.results
    : [];

  const handleEditClick = (user) => {
    setSelectedItem(user);
    setFormData({
      value: user.value || "",
      isActive: user.isActive || false,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData({
      value: "",
      isActive: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateBookPrice({
        id: selectedItem._id,
        ...formData,
        onSuccess: () => {
          handleCloseModal();

          dispatch(getBookPriceAdmin({}));
        },
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const isLoading = useSelector(
    (state: any) => state?.bookTemplate?.isLoading
  );

  return (
    <div className="p-6 mt-[66px]">
      <Helmet>
        <title>Book Price  – StarMe Storybook Platform</title>

        <meta
          name="description"
          content="Manage and view all book prices across multiple currencies on the StarMe platform. Update pricing, check active currencies, and maintain global price settings for personalized storybooks."
        />

        <meta
          name="keywords"
          content="book price management, currency list, storybook pricing, StarMe admin, update book price, global currency price, personalized book pricing"
        />

        <link
          rel="canonical"
          href={`${window.location.origin}${location.pathname}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Book Price Management – StarMe" />
        <meta
          property="og:description"
          content="View and manage all book prices and active currencies for the StarMe personalized storybook platform."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${window.location.origin}${location.pathname}`}
        />
      </Helmet>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-figTree">
          Book Price Management
        </h2>
        <p className="text-gray-600 font-figTree">Manage and view all book price accounts</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 font-figTree">Book Price List</h3>
        </div>
        {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          {" "}
          <img src={loadingImage} alt="image" className="w-28" />{" "}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 font-figTree">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-figTree">
              {priceData.length > 0 ? (
                priceData.map((user) => {
                  return (
                    <tr key={user._id || user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.currencyCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.currencyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.currencySymbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.isActive === true ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            True
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            False
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500 font-figTree" 
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 font-figTree">
                Edit Book Price
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-figTree">
                  Book Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm font-figTree">
                      {selectedItem?.currencySymbol || "$"}
                    </span>
                  </div>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-figTree"
                    placeholder="Enter value"
                    step="0.01"
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 font-figTree">
                  {selectedItem?.currencyName || "N/A"} ({selectedItem?.currencyCode || "N/A"})
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 font-figTree"
                  />
                  <span className="text-sm font-medium text-gray-700 font-figTree">
                    Active
                  </span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300  text-sm rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-sm text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPrice;
