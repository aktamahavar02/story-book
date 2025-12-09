import React, { useEffect } from "react";
import {
  Calendar,
  Package,
  Truck,
  User,
  CreditCard,
  MapPin,
  ShoppingBag,
  Clock,
  CheckCircle,
  PackageCheck,
  Star,
  Award,
  Heart,
  Eye,
  Download,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { orderDetailsSingle , reviewAdd } from "../../store/slices/bookTemplateSlice.js";
import loadingImage from "../assets/images/purple.gif";
import { Helmet } from "react-helmet-async";
import {currencyList} from '../../store/slices/loginSlice.js';

const OrderDetailsPage = () => {
  const { orderId, personalizedBookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTracking, setShowTracking] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState({});
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [currentBookForReview, setCurrentBookForReview] = React.useState(null);
  const [reviewData, setReviewData] = React.useState({
    title: "",
    rating: 0,
    comment: "",
    personalizedBookId: ""
  });

  const orderDetailData = useSelector(
    (state) => state?.bookTemplate?.orderDetails?.data
  );
  const loading = useSelector((state) => state?.bookTemplate?.isOrderDetails);

  useEffect(() => {
    if (orderId) {
      dispatch(orderDetailsSingle({ id: orderId }));
      
    }
  }, [orderId, dispatch]);

  // Using the real data from the store instead of mock data
  const order = orderDetailData;

  // Extract recipient information from the order data
  const recipient = order?.recipient;

  // Format the date using the order data
  const isoDate = order?.createdAt;
  const date = new Date(isoDate);
  const formattedDate = date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate delivery date range
  const minDeliveryDate = order?.shippingQuotes?.minDeliveryDate
    ? new Date(order.shippingQuotes.minDeliveryDate).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
    : "N/A";
  const maxDeliveryDate = order?.shippingQuotes?.maxDeliveryDate
    ? new Date(order.shippingQuotes.maxDeliveryDate).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
    : "N/A";



  const orderTrack = {
    orderReferenceId: "690b2b261c350860a7f93801",
    productionStatus: "passed",
    productionFacilityId: "940fec84-54bc-44fc-a8a3-7d6f02cf8f14",
    orderItems: [
      {
        itemReferenceId: "{{MyItemId1}}",
        status: "passed",
        trackingCode: [
          {
            parcelNumber: 1,
            trackingCode: "",
            trackingUrl: "",
          },
        ],
        productionLog: [
          {
            date: "2018-06-14T11:30:33+00:00",
            printJobId: 1000077008,
            message: "PdfToolbox - Uploaded original pdf to s3",
          },
          {
            date: "2018-06-14T11:30:32+00:00",
            printJobId: 1000077008,
            message: "PrintJob created",
          },
        ],
      },
      {
        itemReferenceId: "{{MyItemId2}}",
        status: "shipped",
        trackingCode: [
          {
            parcelNumber: 1,
            trackingCode: "1234567890",
            trackingUrl: "https://example.com/search?piececode=1234567890",
          },
        ],
        productionLog: [
          {
            date: "2018-06-14T11:30:33+00:00",
            printJobId: 1000078008,
            message: "PdfToolbox - Uploaded original pdf to s3",
          },
          {
            date: "2018-06-14T11:30:32+00:00",
            printJobId: 1000078008,
            message: "PrintJob created",
          },
          {
            date: "2018-06-15T11:30:32+00:00",
            printJobId: 1000078008,
            message: "The package is shipped",
          },
        ],
      },
    ],
  };


  // Function to get status color
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-500";

    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("paid") ||
      statusLower.includes("success") ||
      statusLower.includes("shipped") ||
      statusLower.includes("passed")
    ) {
      return "bg-green-100 text-green-700";
    } else if (
      statusLower.includes("pending") ||
      statusLower.includes("processing")
    ) {
      return "bg-yellow-100 text-yellow-700";
    } else if (
      statusLower.includes("failed") ||
      statusLower.includes("cancelled")
    ) {
      return "bg-red-100 text-red-500";
    }
    return "bg-blue-100 text-blue-700";
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    if (!status) return <Clock className="w-5 h-5" />;

    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("paid") ||
      statusLower.includes("success") ||
      statusLower.includes("shipped") ||
      statusLower.includes("passed")
    ) {
      return <CheckCircle className="w-5 h-5" />;
    } else if (
      statusLower.includes("pending") ||
      statusLower.includes("processing")
    ) {
      return <Clock className="w-5 h-5" />;
    } else if (
      statusLower.includes("failed") ||
      statusLower.includes("cancelled")
    ) {
      return <Package className="w-5 h-5" />;
    }
    return <Package className="w-5 h-5" />;
  };

  useEffect(() => {
    dispatch(currencyList());
  }, []);
  const currencyListData = useSelector((state) => state?.auth?.currencyList);
  const currency = currencyListData?.find(
    (item) => item?.currencyCode === order?.currency
  );
 const downloadFile = async (urlLink, title) => {

  try {
    const response = await fetch(urlLink, { mode: "cors" }); // fetch file
    if (!response.ok) throw new Error("Failed to fetch file");

    const blob = await response.blob(); // get blob
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Clean up memory
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Error downloading file:", err);
  }
};

const handleReviewSubmit = async () => {

  dispatch(reviewAdd({...reviewData, 
    onSuccess :()=>{
      setShowReviewModal(false);
      setReviewData({
        title: "",
        rating: 0,
        comment: "",
        personalizedBookId: ""
      });
    }
  }))
 
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Helmet>
        <title>Order Details  - StarMe </title>
        <meta
          name="description"
          content="View details for your StarMe personalized storybook order"
        />
        <link
          rel="canonical"
          href={`${window.location.origin}/order-details/${orderId}`}
        />
      </Helmet>

      <div className="sticky top-0 z-40">
        <Navbar />
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-20">
          <img
            src={loadingImage}
            alt="Loading"
            className="w-32 h-32 object-contain"
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-purple-600 hover:text-purple-800 font-figTree transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Orders
            </button>
          </div>

          {/* Order Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 border border-purple-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <ShoppingBag className="w-8 h-8 text-purple-600 mr-3" />
                  <h1 className="text-3xl font-bold text-gray-900 font-marcellus">
                    Order Details
                  </h1>
                </div>
                <p className="text-gray-600 text-lg font-figTree">
                  Order #{order?.id}
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <div
                  className={`flex items-center px-4 py-2 rounded-full text-base font-semibold ${getStatusColor(
                    order?.status
                  )}`}
                >
                  {getStatusIcon(order?.status)}
                  <span className="ml-2">
                    {order?.status?.charAt(0).toUpperCase() +
                      order?.status?.slice(1) || "Processing"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 font-figTree flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Order Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center bg-purple-50 rounded-lg p-4">
                    <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 font-figTree">
                        Ordered on
                      </p>
                      <p className="text-base font-medium text-gray-900 font-figTree">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-purple-50 rounded-lg p-4">
                    <Package className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 font-figTree">
                        Status
                      </p>
                      <p className="text-base font-medium text-gray-900 font-figTree">
                        {order?.status?.charAt(0).toUpperCase() +
                          order?.status?.slice(1) || "Processing"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-purple-50 rounded-lg p-4">
                    <Award className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 font-figTree">
                        Gelato Status
                      </p>
                      <p className="text-base font-medium text-gray-900 font-figTree">
                        {order?.gelatoStatus || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 font-figTree flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Customer Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center bg-purple-50 rounded-lg p-4">
                    <User className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 font-figTree">
                        Customer Name
                      </p>
                      <p className="text-base font-medium text-gray-900 font-figTree">
                        {recipient?.firstName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-purple-50 rounded-lg p-4">
                    <MapPin className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 font-figTree">
                        Address
                      </p>
                      <p className="text-base font-medium text-gray-900 font-figTree">
                        {recipient?.street || "N/A"}, {recipient?.city || "N/A"}
                        , {recipient?.state || "N/A"}{" "}
                        {recipient?.postCode || "N/A"},{" "}
                        {recipient?.country || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-purple-50 rounded-lg p-4">
                    <CreditCard className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 font-figTree">
                        Currency
                      </p>
                      <p className="text-base font-medium text-gray-900 font-figTree">
                        {order?.currency || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 border border-purple-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-figTree flex items-center">
              <PackageCheck className="w-6 h-6 mr-2 text-purple-600" />
              Order Items
            </h2>

            <div className="space-y-6">
              {order?.personalizeBooks?.map((book, index) => {       

                return (
                  <div
                    key={book?.personalizedBookId}
                    className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <img
                          src={book?.coverPageImage}
                          alt={book?.title}
                          className="w-40 h-40 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 font-figTree mb-2">
                        {book?.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-500 mr-2" />
                          <span className="text-gray-700 font-figTree">
                            <span className="font-semibold">Child Name:</span>{" "}
                            {book?.childName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="text-gray-700 font-figTree">
                            <span className="font-semibold">Age:</span>{" "}
                            {book?.childAge} years
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-pink-600 mr-2" />
                          <span className="text-gray-700 font-figTree">
                            <span className="font-semibold">Book ID:</span>{" "}
                            {book?.personalizedBookId}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700 font-figTree">
                            <span className="font-semibold">Recipient:</span>{" "}
                            {recipient?.firstName || "N/A"}
                          </span>
                        </div>
                      </div>      
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <button
                          onClick={() => navigate(`/setup/${book?.personalizedBookId}`)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-figTree shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button
                          // onClick={() => {
                          //   // Download PDF functionality would go here
                          //   alert('Download PDF functionality would be implemented here');
                          // }}


                          onClick={() => {
                            downloadFile(book?.previewPdfUrl ,book?.title);
                          }}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:from-green-600 hover:to-green-700 transition-all duration-300 font-figTree shadow-md"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                        <button
                            onClick={() => setShowTracking(!showTracking)}    
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-figTree shadow-md"
                        >
                          <Truck className="w-4 h-4" />
                          {showTracking ? "Hide Tracking Information" : "Track Your Order"}
                        </button>

                        <button
                          onClick={() => {
                            setCurrentBookForReview(book);
                            setReviewData({
                              title: "",
                              rating: 0,
                              comment: "",
                              personalizedBookId: book?.personalizedBookId
                            });
                            setShowReviewModal(true);
                          }}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-figTree shadow-md"
                        >
                          <Star className="w-4 h-4" />
                          Add Review
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {showTracking && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 my-4 border border-purple-100 ">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-figTree flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-purple-500" />
                  Track Your Order
                </h2>

                <div className="space-y-6">
                  {/* Tracking Status Summary */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 font-figTree mb-1">
                          Order Status
                        </h3>
                        <p className="text-sm text-gray-600 font-figTree">
                          Reference ID: {order?.trackOrderDetails?.orderReferenceId|| "N/A"}
                        </p>
                      </div>
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-base font-semibold font-figTree mt-2 md:mt-0">
                        {order?.trackOrderDetails?.productionStatus || "Processing"}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-xl text-gray-900 font-figTree">
                      Order Progress
                    </h3>

                    {order?.trackOrderDetails?.orderItems?.map((item, itemIndex) => {
                      const isExpanded = expandedItems[itemIndex] || false;
                      
                      return (
                        <div
                          key={itemIndex}
                          className="border border-purple-200 rounded-xl p-5 bg-gradient-to-br from-purple-25 to-pink-25"
                        >
                          <div 
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 cursor-pointer"
                            onClick={() => setExpandedItems({
                              ...expandedItems,
                              [itemIndex]: !isExpanded
                            })}
                          >
                            <h4 className="font-semibold text-lg text-gray-900 font-figTree">
                              Item {itemIndex + 1}: {item?.itemReferenceId}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-base font-medium font-figTree flex items-center ${
                                item.status === "shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : item.status === "passed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {item.status?.charAt(0).toUpperCase() +
                                item.status?.slice(1)}
                              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </span>
                          </div>

                          {/* Accordion Content - Only show when expanded */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-purple-200">
                              {/* Tracking Code */}
                              {item?.trackingCode?.length > 0 &&
                                item.trackingCode[0]?.trackingCode && (
                                  <div className="mb-4 p-4 bg-white rounded-lg border border-purple-100">
                                    <p className="text-sm text-gray-600 font-figTree mb-2">
                                      Tracking Number:
                                    </p>
                                    <a
                                      href={item.trackingCode[0]?.trackingUrl || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block text-purple-600 hover:text-purple-800 font-figTree underline text-lg"
                                    >
                                      {item.trackingCode[0]?.trackingCode}
                                    </a>
                                  </div>
                                )}

                              {/* Production Log */}
                              <div>
                                <p className="text-sm text-gray-600 font-figTree mb-3 font-semibold">
                                  Production Timeline:
                                </p>
                                <div className="space-y-4">
                                  {item?.productionLog?.map((log, logIndex) => (
                                    <div key={logIndex} className="flex items-start">
                                      <div className="mr-3">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 mt-2"></div>
                                        {logIndex < item.productionLog.length - 1 && (
                                          <div className="h-12 w-0.5 bg-purple-200 ml-1.5 mt-1"></div>
                                        )}
                                      </div>
                                      <div className="flex-1 pb-4">
                                        <p className="text-base font-medium text-gray-900 font-figTree">
                                          {log.message}
                                        </p>
                                        <p className="text-sm text-gray-500 font-figTree">
                                          {new Date(log.date).toLocaleString()} - Job
                                          ID: {log.printJobId}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          {/* Shipping & Billing Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-figTree flex items-center">
                <Truck className="w-5 h-5 mr-2 text-purple-600" />
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-figTree mb-1">
                    Shipping Method
                  </p>
                  <p className="text-base font-medium text-gray-900 font-figTree">
                    {order?.shippingMethod
                      ? order.shippingMethod.charAt(0).toUpperCase() +
                        order.shippingMethod.slice(1)
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-figTree mb-1">
                    Shipping Provider
                  </p>
                  <p className="text-base font-medium text-gray-900 font-figTree">
                    {order?.shippingMethodUid
                      ? order.shippingMethodUid
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-figTree mb-1">
                    Estimated Delivery
                  </p>
                  <p className="text-base font-medium text-gray-900 font-figTree">
                    {minDeliveryDate} - {maxDeliveryDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 border border-purple-100 h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 font-figTree flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-purple-600" />
              Order Summary
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-figTree text-base ">
                  Subtotal
                </span>
                <span className="text-gray-900 font-figTree text-lg">
                  {currency?.currencySymbol}{order?.orderSummary?.totalBookPrice || 0}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-figTree text-base ">
                  Promotion Discount
                </span>
                <span className="font-figTree text-base text-red-500">
                {currency?.currencySymbol}{order?.orderSummary?.promotionDiscount || 0}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-figTree text-base ">
                  Shipping Cost
                </span>
                <span className="text-gray-900 font-figTree text-base">
                  {currency?.currencySymbol}{order?.shippingQuotes?.totalPrice || 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 font-figTree">
                  Total
                </span>
                <span className="text-xl font-bold text-purple-600 font-figTree">
                  {currency?.currencySymbol}{order?.orderSummary?.GrandTotal || 0}
                </span>
              </div>

            </div>
          </div>
          </div>

          {/* Review Modal */}
          {showReviewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-figTree text-center">
                  Rate Your Storybook
                </h2>

                <div className="mb-6">
                  <label className="block text-gray-700 font-figTree mb-2">
                    Rate this book
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({...reviewData, rating: star})}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= reviewData.rating ? (
                          <Star className="w-8 h-8 text-yellow-500 fill-current" />
                        ) : (
                          <Star className="w-8 h-8 text-gray-300 hover:text-yellow-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="reviewTitle" className="block text-gray-700 font-figTree mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    id="reviewTitle"
                    value={reviewData.title}
                    onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-figTree"
                    placeholder="Give your review a title"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="reviewComment" className="block text-gray-700 font-figTree mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="reviewComment"
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-figTree"
                    placeholder="Share your experience with this personalized storybook..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowReviewModal(false);
                      setReviewData({title: "", rating: 0, comment: "", personalizedBookId: ""});
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors font-figTree"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReviewSubmit}
                    className={`flex-1 ${ (!reviewData.rating || !reviewData.title.trim()) ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white "} font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-figTree`}
                    disabled={!reviewData.rating || !reviewData.title.trim()}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
