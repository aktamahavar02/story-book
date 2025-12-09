import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderDetails } from "../../../store/slices/bookTemplateSlice.js";
import { currencyList } from "../../../store/slices/loginSlice.js";

import GeoHelmet from "@/components/ui/GeoHelmet.js";
const PaymentSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("personalizedBookIds");
  const orderId = params.get("orderId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const oredrData = useSelector(
    (state) => state?.bookTemplate?.orderDetails?.data
  );
  useEffect(() => {
    dispatch(currencyList());
  }, [])
  
  useEffect(() => {
    if (orderId) {
      dispatch(orderDetails({ id: orderId }));
    }
  }, []);

  // Extract personalized books from order details
  const personalizedBooks = oredrData?.personalizeBooks || [];

  const bookIdArray = bookId
    ?.replace(/^\[|\]$/g, "")
    .split(",")
    .map((id) => id.trim());

  const [countdown, setCountdown] = useState(7);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = () => {
    setIsRedirecting(true);
    if (bookIdArray?.length === 1) {
      navigate(`/setup/${bookIdArray?.[0]}`, {
        state: { current: 2, bookId: bookIdArray?.[0] },
      });
    } else if (bookIdArray?.length > 1) {
      navigate("/my-books");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      handleClick();
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [bookIdArray?.length]);

  const currencyData = useSelector((state) => state?.bookTemplate?.currency);

  // Create schema for payment success page
  const createPaymentSuccessSchema = () => {
    const personalizedBooks = oredrData?.personalizeBooks || [];

    return {
      "@context": "https://schema.org",
      "@graph": [
        // WebPage Schema
        {
          "@type": "WebPage",
          "@id": "https://www.starmebooks.com/payment-success#webpage",
          url: "https://www.starmebooks.com/payment-success",
          name: "Payment Success - StarMe",
          description:
            "Confirmation of successful payment for personalized storybooks",
          isPartOf: {
            "@id": "https://www.starmebooks.com/#website",
          },
        },

        // Order Schema
        {
          "@type": "Order",
          "@id": "https://www.starmebooks.com/payment-success#order",
          orderStatus: "https://schema.org/OrderConfirmed",
          orderNumber: orderId || undefined,
          orderDate: new Date().toISOString(),
          orderedItem: personalizedBooks.map((book, index) => ({
            "@type": "Product",
            name: book.title || book.bookTitle || `Personalized Storybook`,
            description: `Personalized storybook for ${book.childName}`,
            image: book.coverPageImage || book.coverImage,
            offers: {
              "@type": "Offer",
              price: book.price || book.totalPrice || oredrData?.amount,
              priceCurrency: currencyData?.currencyCode || "USD",
              availability: "https://schema.org/InStock",
            },
          })),
          discount: oredrData?.discountAmount || 0,
          totalPaymentDue: {
            "@type": "PriceSpecification",
            price: oredrData?.amount || 0,
            priceCurrency: currencyData?.currencyCode || "USD",
          },
          acceptedPaymentMethod: [
            {
              "@type": "PaymentMethod",
              name: "Credit Card",
            },
            {
              "@type": "PaymentMethod",
              name: "PayPal",
            },
          ],
          // Customer information
          customer: oredrData?.recipient
            ? {
                "@type": "Person",
                name: `${oredrData?.recipient?.firstName} ${oredrData?.recipient?.lastName || ""}`,
                email: oredrData?.recipient?.email,
              }
            : undefined,
        },

        // BreadcrumbList Schema
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.starmebooks.com/payment-success#breadcrumb",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.starmebooks.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cart",
              item: "https://www.starmebooks.com/cart",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Checkout",
              item: "https://www.starmebooks.com/checkout",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Payment Success",
              item: "https://www.starmebooks.com/payment-success",
            },
          ],
        },

        // Organization Schema
        {
          "@type": "Organization",
          "@id": "https://www.starmebooks.com/#organization",
          name: "StarMe",
          url: "https://www.starmebooks.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.starmebooks.com/logo.svg",
          },
        },

        // WebSite Schema
        {
          "@type": "WebSite",
          "@id": "https://www.starmebooks.com/#website",
          url: "https://www.starmebooks.com",
          name: "StarMe Personalized Books",
          description:
            "Create custom kids' storybooks where your child becomes the hero",
          publisher: {
            "@id": "https://www.starmebooks.com/#organization",
          },
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <GeoHelmet
        title="Payment Successful - StarMe"
        description="Your payment has been processed successfully! Thank you for purchasing personalized storybooks from StarMe. Your order is confirmed and will be processed shortly."
        keywords="payment success, order confirmation, checkout success, payment confirmed, personalized books"
        type="website"
        schema={createPaymentSuccessSchema()}
      />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[4px] shadow-xl p-6 md:p-8 text-center">
          {/* Decorative elements */}
          {/* <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-100 rounded-full opacity-50"></div> */}
          {/* <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-100 rounded-full opacity-50"></div> */}

          <div className="relative z-10">
            {/* Success icon */}
            <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6">
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-figTree">
              Payment Successful! 🎉
            </h1>

            <p className="text-gray-600 mb-6 font-figTree">
              Thank you for your purchase
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
              <p className="text-purple-700 font-medium font-figTree">
                You can personalise the remaining pages of your book and place
                an order for printing.
              </p>
            </div>

            {/* Payment details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-700 mb-3">
                Transaction Details
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-sm">
                    {" "}
                    {currencyData?.currencySymbol}
                    {oredrData?.amount || "-"}{" "}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-figTree text-gray-800 text-sm font-medium">
                    {" "}
                    {oredrData?.recipient?.email || "-"}{" "}
                  </span>
                </div>{" "}
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Name:</span>
                  <span className="font-figTree text-gray-800 text-sm font-medium">
                    {" "}
                    {oredrData?.recipient?.firstName || "-"}{" "}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Personalized Books Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 text-left font-figTree">
                Your Personalised Books
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {personalizedBooks?.length > 0 ? (
                  personalizedBooks?.map((book, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-md p-3 cursor-pointer"
                    >
                      <img
                        src={book?.coverPageImage}
                        alt={book?.childName}
                        className="w-20 h-20 object-cover rounded-sm mb-2"
                      />
                      <div className="text-center">
                        <p className="font-semibold text-sm font-figTree text-gray-800 truncate max-w-[150px]">
                          {book?.title || "-"}
                        </p>
                        <p className="text-xs text-gray-600 font-figTree">
                          {book?.childAge || book?.age || "-"} years
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/setup/${book?.personalizedBookId}`, {
                              state: {
                                current: 2,
                                bookId: book?.personalizedBookId,
                              },
                            });
                          }}
                          className="mt-2 bg-gradient-to-r font-figTree from-purple-500 to-pink-500 hover:shadow-lg
                           hover:scale-105 transition-all font-semibold text-white text-sm py-1 px-4 rounded-[4px]"
                        >
                          Personalise
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm col-span-full">
                    Loading personalised books...
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-800 mb-2">
                You will be redirected automatically to
                <span className="text-base font-figTree bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold pl-1">
                  {isRedirecting
                    ? "Redirecting..."
                    : bookIdArray?.length > 1
                      ? "My Books page"
                      : "Personalised Your Book"}
                </span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(1 - countdown / 4000) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-600 mt-2 text-lg font-semibold font-figTree">
                Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}
              </p>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleClick}
                disabled={isRedirecting}
                className={`px-6 py-2 w-full font-figTree rounded-[4px] font-medium transition-all ${
                  isRedirecting 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isRedirecting ? 'Redirecting...' : 'Redirecting to a Personalised Page'}
              </button>
            </div> */}
            {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="text-base font-figTree bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                {isRedirecting
                  ? "Redirecting..."
                  : bookIdArray?.length > 1
                  ? "Redirecting to My Books page"
                  : "Redirecting to a Personalised Book"}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
