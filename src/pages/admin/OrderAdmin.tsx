import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { staticRecentOrders } from "../../utils/staticData";

const OrderAdmin = () => {
  const [expandedOrders, setExpandedOrders] = useState({});

  // Static data
  const recentOrderList = { results: staticRecentOrders };

  return (
    <div className="p-6  mt-[66px]">
      <Helmet>
        <title>My Orders – Personalized Storybook Orders | StarMe</title>
        <meta
          name="description"
          content="View and manage all your personalized StarMe storybook orders in one place. Track order status, view details, and stay updated on your book creation progress."
        />
        <meta
          name="keywords"
          content="storybook orders, personalized books, custom kids book orders, StarMe orders, track book order, view order details"
        />
        <link
          rel="canonical"
          href={`${window.location.origin}${location.pathname}`}
        />
        <meta
          property="og:title"
          content="My Orders – StarMe Personalized Storybooks"
        />
        <meta
          property="og:description"
          content="Check your personalized storybook orders, track status, and view detailed updates."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${window.location.origin}${location.pathname}`}
        />
      </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <p className="text-gray-600">Manage and view all Order accounts</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipping Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrderList?.results?.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.shippingMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order?.personalizedBooks?.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                     
                      {order?.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setExpandedOrders((prev) => ({
                            ...prev,
                            [order.id]: !prev[order.id],
                          }));
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {expandedOrders[order.id]
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrders[order.id] && (
                    <tr className="bg-gray-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                          <div>
                            <h4 className="text-md text-[#465fff] mb-2 font-bold font-figTree">
                              Recipient Information
                            </h4>
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    City
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="bg-white">
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {order.recipient.firstName}{" "}
                                    {order.recipient.lastName || ""}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {order.recipient.email || "-"}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {order.recipient.phone || "-"}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {order.recipient.city}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <h4 className="text-md  font-figTree font-bold text-[#465fff]">
                              Personalized Books
                            </h4>
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cover Image
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Child Name
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Child Age
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {order.personalizedBooks.map((book, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-gray-50"
                                      }
                                    >
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {book.coverPageImage ? (
                                          <img
                                            src={book.coverPageImage}
                                            alt={`${book.title} cover`}
                                            className="w-10 h-10 object-cover border rounded"
                                          />
                                        ) : (
                                          <span className="text-gray-400">
                                            No image
                                          </span>
                                        )}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {book.title}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {book.childName}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {book.childAge}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderAdmin;
