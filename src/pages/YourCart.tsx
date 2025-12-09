import CartItem from "@/components/ui/CartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  personalizedBookCart,
  couponCode,
  addCart,
  checkoutOrderSuccess,
} from "../../store/slices/bookTemplateSlice.js";
import { useIsMobile } from "@/hooks/use-mobile.js";
import { IoChevronBack } from "react-icons/io5";
import toast from "react-hot-toast";

import GeoHelmet from "@/components/ui/GeoHelmet.js";

const YourCart = ({ setStep, setBookId, setCoupon, coupon }) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state?.bookTemplate?.cartData);
  const couponData = useSelector((state) => state?.bookTemplate?.couponData);
  const items = cartList?.data?.personalizedBooks;
  const idArray = items ? items?.map((book) => book?.id) : [];
  const couponList = couponData?.data;
  const bookId = items?.map((v) => {
    return v?.id;
  });
  const navigate = useNavigate();
  const currencyData = useSelector((state) => state?.bookTemplate?.currency);
  const countryGet = useSelector((state) => state?.bookTemplate?.country);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (currencyData?.currencyCode) {
      dispatch(
        personalizedBookCart({ currencyCode: currencyData?.currencyCode })
      );
    }
  }, [currencyData?.currencyCode]);

  // USAGE NOTES:
  // 1. Order schema shows cart status and items
  // 2. ItemList shows all products in the cart
  // 3. Discount/coupon information is included
  // 4. Total price with currency is specified
  // 5. Payment methods accepted are listed
  // 6. Empty cart is handled gracefully

  const createCartSchema = () => {
    const baseUrl = "https://www.starmebooks.com";
    const currencyCode = currencyData?.currencyCode || "USD";

    
    // Calculate totals with fallbacks
    const bookPrice = couponList?.bookPrice || cartList?.data?.BookPrice || 0;
    const totalPrice = couponList?.totalPrice || cartList?.data?.totalPrice || 0;
    const discountAmount = couponList?.discountAmount || 0;
    const itemCount = items?.length || 0;
  
    // Base schemas that always exist
    const baseSchemas = [
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/cart#webpage`,
        url: `${baseUrl}/cart`,
        name: "Shopping Cart - StarMe Personalized Books",
        description: itemCount > 0 
          ? `Review your ${itemCount} personalized storybook${itemCount > 1 ? "s" : ""} before checkout`
          : "Review your personalized storybooks before checkout",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        breadcrumb: {
          "@id": `${baseUrl}/cart#breadcrumb`,
        },
   
      },
  
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/cart#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cart",
            item: `${baseUrl}/cart`,
          },
        ],
      },
  
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "StarMe",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.svg`,
          width: 250,
          height: 60,
        },
   
      },
  
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "StarMe Personalized Books",
        description: "Create custom kids' storybooks where your child becomes the hero",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ];
  
    // If cart is empty, return base schemas only
    if (!items || itemCount === 0) {
      return {
        "@context": "https://schema.org",
        "@graph": baseSchemas,
      };
    }
  
    // Cart has items - add Order and ItemList schemas
    const cartSchemas = [
      // Order Schema
      {
        "@type": "Order",
        "@id": `${baseUrl}/cart#order`,
        orderStatus: "https://schema.org/OrderProcessing",
        orderDate: new Date().toISOString(),
        orderedItem: items.map((item) => ({
          "@type": "OrderItem",
          orderItemNumber: item.id,
          orderQuantity: 1,
          orderedItem: {
            "@type": "Product",
            name: item.bookTitle || "Personalized Storybook",
            description: `Personalized storybook featuring ${item.childName || "your child"}`,
            image: item.coverImage || item.originalImage || `${baseUrl}/og-image.jpg`,
            offers: {
              "@type": "Offer",
              price: (item.basePrice || item.totalPrice || 0).toFixed(2),
              priceCurrency: currencyCode,
              availability: "https://schema.org/InStock",
              url: `${baseUrl}/book/${item.id}`,
            },
          },
        })),
        discount: discountAmount.toFixed(2),
        discountCurrency: currencyCode,
        totalPaymentDue: {
          "@type": "PriceSpecification",
          price: totalPrice.toFixed(2),
          priceCurrency: currencyCode,
        },
        acceptedPaymentMethod: [
          "https://schema.org/CreditCard",
          "https://schema.org/PaymentCard",
        ],
        customer: {
          "@type": "Person",
        },
      },
  
      // ItemList Schema
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/cart#itemlist`,
        name: "Shopping Cart Items",
        description: `${itemCount} item${itemCount > 1 ? "s" : ""} in shopping cart`,
        numberOfItems: itemCount,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            "@id": `${baseUrl}/book/${item.id}`,
            name: item.bookTitle || "Personalized Storybook",
            description: `Personalized storybook featuring ${item.childName || "your child"}`,
            image: item.coverImage || item.originalImage || `${baseUrl}/og-image.jpg`,
            category: "Children's Books",
            offers: {
              "@type": "Offer",
              price: (item.basePrice || item.totalPrice || 0).toFixed(2),
              priceCurrency: currencyCode,
              availability: "https://schema.org/InStock",
              priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            },
          },
        })),
      },
    ];
  
    return {
      "@context": "https://schema.org",
      "@graph": [...baseSchemas, ...cartSchemas],
    };
  };


  return (
    <div className="p-4 w-full rounded-xl shadow bg-[#F3E1FF] sm:bg-white  ">
      <GeoHelmet
        title={`Cart - StarMe `}
        description={
          items?.length > 0
            ? `Review your ${items.length} personalized storybook${
                items.length > 1 ? "s" : ""
              } before checkout. Total: ${currencyData?.currencySymbol}${
                couponList?.totalPrice || cartList?.data?.totalPrice || 0
              }`
            : "Browse our personalized storybooks and create magical tales for your child. Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        }
        keywords="shopping cart, personalized books cart, checkout, order summary, book cart"
        image={
          items?.[0]?.coverImage ||
          items?.[0]?.originalImage ||
          "https://www.starmebooks.com/og-image.jpg"
        }
        type="website"
        schema={createCartSchema()}
      />

      <div className=" block sm:hidden  fixed top-0 left-0 w-full z-50 px-4 py-2 bg-[#F3E1FF]">
        <div className="relative flex items-center justify-between mt-4">
          {/* Back Button + Title */}
          <div className="flex items-center gap-1">
            {/* Back button (only mobile) */}
            <div
              className="block sm:hidden"
              onClick={() => {
                navigate(`/template-selection`);
              }}
            >
              <IoChevronBack size={25} />
            </div>

            {/* Title */}
            <div className="text-2xl font-marcellus sm:mb-4 text-center sm:text-start font-normal">
              Your Cart
            </div>
          </div>

          {/* Currency Selector */}
          {/* <div className="flex items-center gap-1 border border-gray-300 px-[8px] py-[2px] rounded-md bg-white w-[72px] h-[28px]"> */}
          <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer bg-white rounded-[6px] [@media(min-width:1px)_and_(max-width:250px)]:hidden">
            <img
              src={`https://flagsapi.com/${
                countryGet?.countryCode ? countryGet?.countryCode : "AU"
              }/flat/24.png`}
              className="w-[20px] h-[20px]"
              alt="ind"
            />
            <span className="text-base font-medium font-figTree flex items-center">
              {currencyData?.currencyCode}
            </span>
          </div>
          {/* </div> */}
        </div>
      </div>

      <h1 className="text-2xl font-marcellus sm:mb-4 sm:text-start hidden sm:block text-black">
        Your Cart
      </h1>
      {/* <div className="text-2xl font-marcellus mb-4">Your Cart</div> */}
      <div className=" flex gap-4 flex-col sm:flex-row  pt-14 sm:pt-0">
        <div className="flex-1 ">
          {items?.map((item, i) => {
            return (
              <div className=" bg-[#FBF5FF]  sm:bg-white border border-[#c569ff4d] p-4 mb-4  rounded-xl relative">
                <div
                  className=" absolute  top-[2px] right-1 cursor-pointer"
                  onClick={() => {
                    dispatch(
                      addCart({
                        isBookInCart: false,
                        id: item?.id,
                        onSuccess: () => {
                          dispatch(
                            personalizedBookCart({
                              currencyCode: currencyData?.currencyCode,
                            })
                          );
                        },
                      })
                    );
                  }}
                >
                  <svg
                    className="size-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <CartItem
                  key={i}
                  {...item}
                  isCart={true}
                  currencySymbol={currencyData?.currencySymbol}
                />
              </div>
            );
          })}
          {(items?.length <= 0 || items?.length > 0) && (
            <div className="p-4 flex justify-center items-center  flex-col bg-[#FBF5FF]  rounded-xl gap-2 ">
              <p className="text-sm font-figTree pt-4 text-black">
                Add Another Personalized Book?
              </p>

              <button
                className="  border border-purple-500 bg-white py-[10px] px-[24px] rounded-md font-figTree font-medium text-sm mb-4 text-[#111827]"
                onClick={() => {
                  navigate("/template-selection");
                }}
              >
                Add Books
              </button>
            </div>
          )}
        </div>
        {items?.length > 0 && (
          <div className="flex-1 w-full  mb-28 sm:mb-0  ">
            <div className="  w-full max-w-max bg-[#FBF5FF] rounded-xl p-4 space-y-4 ">
              {/* Title */}
              <h1 className="text-lg font-marcellus font-normal text-black">
                Order Summary
              </h1>

              {/* Book Item */}
              <div className="flex justify-between text-sm text-black font-figTree">
                <span>Books ({items?.length})</span>
                <div className="space-x-2">
                  <span className="line-through text-[#71717A]">
                    {couponList && currencyData?.currencySymbol} {couponList?.bookPrice}
                  </span>
                  <span className=" text-[#09090B] font-normal  ">
                    {currencyData?.currencySymbol}
                    {couponList?.discountAmount
                      ? couponList?.discountAmount
                      : cartList?.data?.BookPrice}
                  </span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border border-dashed border-purple-400 rounded-md p-4 space-y-2">
                <p className="text-sm font-figTree text-black">
                  Got a Coupon Code?
                </p>
                <div className="flex border  outline-gray-300 rounded-md overflow-hidden  hover:border-purple-400">
                  <input
                    type="text"
                    placeholder="CODE"
                    className="flex-1 px-3 py-2 text-sm outline-none placeholder-gray-400 h-[40px] [@media(min-width:1px)_and_(max-width:340px)]:w-[162px]"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value.toUpperCase());
                    }}
                  />
                  <button
                    className={`lg:px-4 px-2 py-2 text-sm font-figTree font-semibold 
                      ${coupon ? "text-[#C567FF]" : "text-[#9CA3AF] bg-white"} 
                      transition-colors`}
                    onClick={() => {
                      if (coupon) {
                        dispatch(
                          couponCode({
                            couponCode: coupon,
                            personalizedBookIds: bookId,
                            currencyCode: currencyData?.currencyCode,
                            onSuccess: () => {
                              toast.success("Coupon Code Apply ");
                              localStorage.setItem("coupon", coupon);
                            },
                          })
                        );
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-base font-figTree">
                <span className="text-black text-base font-normal font-figTree">
                  Total
                </span>

                <span className="text-[#C569FF] font-bold">
                  {currencyData?.currencySymbol}
                  {couponList?.totalPrice
                    ? couponList?.totalPrice
                    : cartList?.data?.totalPrice}
                </span>
              </div>
            </div>

            <div className="block sm:hidden">
              <div
                className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full sm:w-[90%] lg:w-[80%] 
                flex flex-col sm:flex-row sm:items-center    justify-center
                gap-1 px-0 py-4 bg-white sm:bg-white/40 border border-gray-100"
              >
                {/* Continue button */}
                <div className="px-4">
                  <button
                    className="bg-gradient-to-r border w-full sm:w-36 from-purple-500 to-pink-500  
               hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition h-[40px]"
                    onClick={() => {
                      navigate(`/cart/delivery`);
                      localStorage.removeItem("orderId");
                      setBookId(items);
                    }}
                  >
                    Continue
                  </button>
                </div>

                {/* Breadcrumbs */}
                {isMobile && (
                  <div className="flex justify-center sm:justify-end items-center text-sm font-figTree px-1 mt-2">
                    <nav className="flex flex-wrap text-gray-500 gap-2 items-center">
                      <span className="hover:text-gray-700 cursor-pointer font-medium text-black underline whitespace-nowrap">
                        Cart
                      </span>
                      <svg
                        className="size-4 text-zinc-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        ></path>
                      </svg>
                      <span className="hover:text-gray-700 cursor-pointer  underline whitespace-nowrap text-[#A1A1AA]">
                        Delivery
                      </span>
                      <svg
                        className="size-4 text-zinc-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        ></path>
                      </svg>
                      <span className="hover:text-gray-700 cursor-pointer underline whitespace-nowrap text-[#A1A1AA]">
                        Checkout
                      </span>
                    </nav>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.setItem("ids", idArray);
                navigate(`/cart/delivery`);
                // setStep(2);
                setBookId(items);
                localStorage.removeItem("orderId");
                dispatch(checkoutOrderSuccess({}));
              }}
              className=" bg-gradient-to-r from-purple-500 to-pink-500 w-full mt-4  hidden sm:block hover:bg-purple-700 font-figTree text-white text-sm py-2 px-4 rounded transition h-[40px]"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourCart;
