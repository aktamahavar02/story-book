import CartItem from "@/components/ui/CartItem";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { PiPackage } from "react-icons/pi";
import { HiOutlineBookmarkSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import loading from "../assets/images/purple.gif";
import {
  payment,
  checkoutOrder,
  couponCode,
} from "../../store/slices/bookTemplateSlice.js";
import { Loader } from "@/components/ui/Loader.js";
import toast from "react-hot-toast";
import BasicLoader from "@/components/ui/basicLoader.js";

import { countryList, currencyList } from "../../store/slices/loginSlice.js";
import axios from "axios";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const CartCheckout = ({ setStep, bookId, idCart }) => {
  const cartList = useSelector((state) => state?.bookTemplate?.cartData);
  const items = cartList?.data;
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const orderId = localStorage.getItem("orderId");
  const couponSave = localStorage.getItem("coupon");
  const checkoutOrderData = useSelector(
    (state) => state?.bookTemplate?.checkoutOrderData?.data,
  );
  const [coupon, setCoupon] = useState("");

  const address = checkoutOrderData?.shippingAddress;
  const shipping = checkoutOrderData?.shippingMethod;
  const bookIds = checkoutOrderData?.books?.map((v) => {
    return v?.personalizedBookId;
  });

  const handlePreviewMore = () => {
    localStorage.removeItem("coupon");
    // dispatch(payment({ id: checkoutOrderData?.orderId, couponCode: coupon }));
    const payload = { id: checkoutOrderData?.orderId };

    if (coupon && coupon.trim() !== "") {
      payload.couponCode = coupon.trim();
    }

    dispatch(payment(payload));
  };

  const paymentData = useSelector((state) => state?.bookTemplate?.payment);
  const isLoad = useSelector((state) => state?.bookTemplate?.isCheckout);
  useEffect(() => {
    if (paymentData?.url) {
      window.location.href = paymentData?.url;
    }
  }, [paymentData?.url]);

  useEffect(() => {
    dispatch(currencyList());
  }, []);
  useEffect(() => {
    dispatch(countryList());
  }, []);

  useEffect(() => {
    if (couponSave) {
      setCoupon(couponSave);
    }
  }, [couponSave]);
  const capitalizeFirst = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  const countryName = localStorage.getItem("countrySave");

  const countryListData = useSelector((state) => state?.auth?.countryList);
  const countryInitial = countryListData?.find(
    (item, ind) => item?.countryCode === countryName,
  );

  const isLoading = useSelector((state) => state?.bookTemplate?.isPay);

  const currencyData = useSelector((state) => state?.bookTemplate?.currency);

  const navigate = useNavigate();
  useEffect(() => {
    if (currencyData?.currencyCode) {
      dispatch(
        checkoutOrder({
          id: orderId,
          couponCode: couponSave || "",
          currencyCode: currencyData?.currencyCode,
        }),
      );
    }
  }, [currencyData?.currencyCode]);

  // Create schema for checkout page
  const createCheckoutSchema = () => {
    const baseUrl = "https://www.starmebooks.com";
    const currencyCode = currencyData?.currencyCode || "USD";
    const currencySymbol = currencyData?.currencySymbol || "$";
    
    // Order details with fallbacks
    const checkoutItems = checkoutOrderData?.books || [];
    const orderTotal = checkoutOrderData?.Total || 0;
    const bookPrice = checkoutOrderData?.bookPrice || 0;
    const discountAmount = checkoutOrderData?.discountAmount || 0;
    const shippingCharge = shipping?.shippingCharge || 0;
    
    // Calculate prices
    const priceBeforeDiscount = orderTotal + discountAmount;
    const discountPercentage = discountAmount > 0 
      ? ((discountAmount / priceBeforeDiscount) * 100).toFixed(0)
      : 0;
  
    // Shipping details
    const shippingMethod = shipping?.method || "standard";
    const minDeliveryDays = shipping?.minDeliveryDays || 8;
    const maxDeliveryDays = shipping?.maxDeliveryDays || 12;
  
    // Address details
    const shippingAddress = address || {};
  
    return {
      "@context": "https://schema.org",
      "@graph": [
        // WebPage Schema
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/cart/checkout#webpage`,
          url: `${baseUrl}/cart/checkout`,
          name: "Secure Checkout - StarMe Personalized Books",
          description: `Complete your order for ${checkoutItems.length} personalized ${checkoutItems.length === 1 ? 'storybook' : 'storybooks'}`,
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          breadcrumb: {
            "@id": `${baseUrl}/cart/checkout#breadcrumb`,
          },
          
        },
  
        // CheckoutPage Schema
        {
          "@type": "CheckoutPage",
          "@id": `${baseUrl}/cart/checkout#checkoutpage`,
          name: "Checkout",
          description: "Secure payment page for personalized children's books",
          url: `${baseUrl}/cart/checkout`,
          mainEntity: {
            "@id": `${baseUrl}/cart/checkout#order`,
          },
        },
  
        // Order Schema - Most Important for Checkout
        {
          "@type": "Order",
          "@id": `${baseUrl}/cart/checkout#order`,
          orderNumber: orderId || undefined,
          orderStatus: "https://schema.org/OrderProcessing",
          orderDate: new Date().toISOString(),
          
          // Customer information
          customer: {
            "@type": "Person",
            name: shippingAddress.name || "",
            telephone: shippingAddress.phone || "",
          },
  
          // Ordered items
          orderedItem: checkoutItems.map((item, index) => ({
            "@type": "OrderItem",
            orderItemNumber: item.personalizedBookId || `item-${index}`,
            orderItemStatus: "https://schema.org/OrderProcessing",
            orderQuantity: 1,
            orderedItem: {
              "@type": "Product",
              name: item.bookTitle || "Personalized Storybook",
              description: `Personalized storybook featuring ${item.childName || "your child"} as the main character`,
              image: item.coverImage || item.originalImage || `${baseUrl}/og-image.jpg`,
              category: "Children's Books",
              brand: {
                "@type": "Brand",
                name: "StarMe",
              },
              offers: {
                "@type": "Offer",
                price: (item.basePrice || item.totalPrice || 0).toFixed(2),
                priceCurrency: currencyCode,
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
              },
            },
          })),
  
          // Billing/Payment information
          partOfInvoice: {
            "@type": "Invoice",
            totalPaymentDue: {
              "@type": "PriceSpecification",
              price: orderTotal.toFixed(2),
              priceCurrency: currencyCode,
            },
            paymentStatus: "https://schema.org/PaymentDue",
            minimumPaymentDue: {
              "@type": "PriceSpecification", 
              price: orderTotal.toFixed(2),
              priceCurrency: currencyCode,
            },
          },
  
          // Price breakdown
          discount: discountAmount > 0 ? discountAmount.toFixed(2) : undefined,
          discountCurrency: discountAmount > 0 ? currencyCode : undefined,
          
          // Coupon code if applied
          ...(couponSave && {
            discountCode: couponSave,
          }),
  
          // Billing address (same as shipping for now)
          billingAddress: {
            "@type": "PostalAddress",
            name: shippingAddress.name,
            streetAddress: shippingAddress.street,
            addressLocality: shippingAddress.city,
            addressRegion: shippingAddress.state,
            postalCode: shippingAddress.postCode,
            addressCountry: shippingAddress.country,
            telephone: shippingAddress.phone,
          },
  
          // Shipping address
          orderDelivery: {
            "@type": "ParcelDelivery",
            deliveryAddress: {
              "@type": "PostalAddress",
              name: shippingAddress.name,
              streetAddress: shippingAddress.street,
              addressLocality: shippingAddress.city,
              addressRegion: shippingAddress.state,
              postalCode: shippingAddress.postCode,
              addressCountry: shippingAddress.country,
              telephone: shippingAddress.phone,
            },
            hasDeliveryMethod: {
              "@type": "DeliveryMethod",
              name: `${shippingMethod.charAt(0).toUpperCase() + shippingMethod.slice(1)} Shipping`,
            },
            expectedArrivalFrom: new Date(
              Date.now() + minDeliveryDays * 24 * 60 * 60 * 1000
            ).toISOString(),
            expectedArrivalUntil: new Date(
              Date.now() + maxDeliveryDays * 24 * 60 * 60 * 1000
            ).toISOString(),
            partOfOrder: {
              "@id": `${baseUrl}/cart/checkout#order`,
            },
          },
  
          // Payment methods accepted
          acceptedPaymentMethod: [
            {
              "@type": "PaymentMethod",
              name: "Credit Card",
              "@id": "https://schema.org/CreditCard",
            },
            {
              "@type": "PaymentMethod",
              name: "Debit Card", 
              "@id": "https://schema.org/PaymentCard",
            },
            {
              "@type": "PaymentMethod",
              name: "PayPal",
            },
          ],
  
          // Seller
          seller: {
            "@id": `${baseUrl}/#organization`,
          },
  
          // Order breakdown
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              name: "Books Subtotal",
              price: bookPrice.toFixed(2),
              priceCurrency: currencyCode,
            },
            {
              "@type": "DeliveryChargeSpecification",
              name: "Shipping Cost",
              price: shippingCharge.toFixed(2),
              priceCurrency: currencyCode,
              eligibleTransactionVolume: {
                "@type": "PriceSpecification",
                price: bookPrice.toFixed(2),
                priceCurrency: currencyCode,
              },
            },
            ...(discountAmount > 0 ? [{
              "@type": "UnitPriceSpecification",
              name: "Discount",
              price: `-${discountAmount.toFixed(2)}`,
              priceCurrency: currencyCode,
            }] : []),
          ],
        },
  
        // Offer Schema with Discount (if applicable)
        ...(discountAmount > 0 ? [{
          "@type": "Offer",
          "@id": `${baseUrl}/cart/checkout#discount-offer`,
          name: "Discount Applied",
          description: `Save ${currencySymbol}${discountAmount.toFixed(2)} with coupon code`,
          price: priceBeforeDiscount.toFixed(2),
          priceCurrency: currencyCode,
          priceValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          availability: "https://schema.org/InStock",
          discount: `${discountPercentage}%`,
          priceSpecification: {
            "@type": "PriceSpecification",
            price: orderTotal.toFixed(2),
            priceCurrency: currencyCode,
            valueAddedTaxIncluded: false,
          },
          ...(couponSave && {
            eligibleTransactionVolume: {
              "@type": "PriceSpecification",
              name: "Discount Code",
              description: couponSave,
            },
          }),
          seller: {
            "@id": `${baseUrl}/#organization`,
          },
        }] : []),
  
        // ItemList Schema - Products being purchased
        {
          "@type": "ItemList",
          "@id": `${baseUrl}/cart/checkout#itemlist`,
          name: "Order Items",
          description: `${checkoutItems.length} personalized ${checkoutItems.length === 1 ? 'book' : 'books'} ready for checkout`,
          numberOfItems: checkoutItems.length,
          itemListElement: checkoutItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              "@id": `${baseUrl}/book/${item.personalizedBookId}`,
              name: item.bookTitle || "Personalized Storybook",
              description: `Custom storybook featuring ${item.childName || "child"} as the hero`,
              image: item.coverImage || item.originalImage || `${baseUrl}/og-image.jpg`,
              offers: {
                "@type": "Offer",
                price: (item.basePrice || item.totalPrice || 0).toFixed(2),
                priceCurrency: currencyCode,
                availability: "https://schema.org/InStock",
              },
            },
          })),
        },
  
        // BreadcrumbList Schema
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/cart/checkout#breadcrumb`,
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
            {
              "@type": "ListItem",
              position: 3,
              name: "Delivery",
              item: `${baseUrl}/cart/delivery`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Checkout",
              item: `${baseUrl}/cart/checkout`,
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
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "support@starmebooks.com",
            availableLanguage: ["English"],
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
          
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  };

  return (
    <div className=" bg-purple-100 sm:bg-white rounded-lg p-4 h-full ">
      <GeoHelmet
        title="Checkout - StarMe"
        description="Complete your personalized storybook purchase securely. Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child's imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        keywords="checkout, secure checkout, buy books, personalized books checkout, order, payment"
        type="website"
        schema={createCheckoutSchema()}
      />

      <h1 className="text-2xl  font-normal  font-marcellus sm:mb-4 text-center sm:text-start hidden sm:block ">
        Checkout
      </h1>
      <div className=" block sm:hidden mb-4  fixed top-0 left-0 w-full z-50 bg-purple-100 px-4 py-2">
        <div className="relative flex items-center justify-between mt-2 ">
          <div className="flex items-center gap-2">
            <div
              className="block sm:hidden"
              onClick={() => {
                navigate("/cart/delivery");
              }}
            >
              <IoChevronBack size={25} />
            </div>

            {/* Title */}
            <div className="text-2xl font-marcellus sm:mb-4 text-center sm:text-start font-normal ">
              Checkout
            </div>
          </div>

          {/* //! new one here - -- - -- -- -- - */}
          <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer bg-white rounded-[6px] [@media(min-width:1px)_and_(max-width:250px)]:hidden">
            <img
              src={`https://flagsapi.com/${
                countryInitial?.countryCode ? countryInitial?.countryCode : "AU"
              }/flat/24.png`}
              className="w-[20px] h-[20px]"
              alt="ind"
            />
            {/* {countryInitial?.flag ? countryInitial?.flag : "🇦🇹"} */}
            <span className="text-base font-medium font-figTree flex items-center">
              {currencyData?.currencyCode || "EUR"}
            </span>
          </div>
          {/* <div className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded-md block sm:hidden bg-white ">
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="USD"
              className="w-4 h-3"
            />
            <span className="text-base font-medium font-figTree">USD</span>
          </div> */}
        </div>
      </div>
      {isLoad ? (
        <div className="flex items-center justify-center mt-10">
          <img src={loading} alt="image" className="w-28" />
        </div>
      ) : (
        <div className="flex gap-4 flex-col  sm:flex-row pt-12 sm:pt-0 ">
          <div className="flex-1">
            {checkoutOrderData?.books?.map((item, i) => {
              return (
                <div className=" bg-[#FBF5FF]  sm:bg-white border border-[#c569ff4d] p-4 last:mb-0 mb-4  rounded-xl   relative">
                  {/* <div className=" absolute  top-1 right-1">
          <RxCross1 />
        </div> */}
                  <CartItem
                    key={i}
                    {...item}
                    isCart={true}
                    isEdit={false}
                    currencySymbol={currencyData?.currencySymbol}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex-1">
            <div className="space-y-3 bg-[#FBF5FF] p-4 rounded-xl">
              <h1 className="text-lg font-marcellus mb-2 font-normal text-black">
                Shipping Information
              </h1>
              <div className="flex items-start gap-2 text-sm text-gray-800">
                {/* Icon */}
                <div className="mt-1 text-black">
                  <HiOutlineBookmarkSquare className="w-5 h-5" />
                </div>

                {/* Address details */}
                <div className="leading-snug font-figTree text-black">
                  <div className="">{address?.name}</div>
                  <div>{address?.phone}</div>
                  <div>
                    {`${address?.street || ""}, ${address?.postCode || ""}, ${
                      address?.city || ""
                    }`}
                  </div>
                  <div>
                    {`${address?.state || ""}, ${address?.country || ""}`}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-[#FBF5FF]">
                <div className="flex items-center flex-col">
                  <div className="flex items-center gap-2 ">
                    <div className="text-black">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        {" "}
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        ></path>{" "}
                      </svg>
                      {/* <PiPackage size={20} /> */}
                    </div>
                    <div>
                      <p className="text-sm font-figTree">
                        {capitalizeFirst(shipping?.method)} Shipping
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 font-figTree pl-[14px]">
                    {shipping &&
                      `${shipping?.minDeliveryDays}-${shipping?.maxDeliveryDays} Business Days`}
                  </p>
                </div>
                {/* Right side */}
                <div className="text-sm  font-figTree text-[#09090B]">
                  {currencyData?.currencySymbol}
                  {shipping?.shippingCharge}
                </div>
              </div>
            </div>

            <div className=" bg-[#FBF5FF] rounded-xl p-4 shadow-sm w-full  mt-4  mb-24 sm:mb-0">
              {/* Title */}
              <h1 className="text-lg mb-4 font-marcellus font-normal text-black">
                Order Summary
              </h1>

              {/* Items */}
              <div className="space-y-2 ">
                {/* Books */}
                <div className="flex justify-between text-sm  font-figTree font-normal">
                  <span className="text-black">
                    Books ({checkoutOrderData?.books?.length})
                  </span>
                  <span className="text-[#09090B]">
                    {currencyData?.currencySymbol}
                    {checkoutOrderData?.bookPrice}
                  </span>
                </div>
                <div className="border-b border-gray-200" />

                {/* Shipping */}
                <div className="flex justify-between text-sm font-figTree font-normal">
                  <span className="text-black">
                    {" "}
                    {capitalizeFirst(shipping?.method)} Shipping
                  </span>
                  <span className="text-[#09090B]">
                    {currencyData?.currencySymbol}
                    {shipping?.shippingCharge}
                  </span>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="border border-dashed border-purple-400 rounded-lg mt-4 p-4 font-normal ">
                <label className="block text-sm mb-2 font-figTree text-black">
                  Got a Coupon Code?
                </label>
                <div className="flex rounded-lg overflow-hidden border outline-gray-300">
                  <input
                    type="text"
                    placeholder="CODE"
                    value={couponSave || coupon}
                    className="flex-1 px-3 py-2 text-sm outline-none outline-gray-300 [@media(min-width:1px)_and_(max-width:340px)]:w-[162px]"
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  />
                  <button
                    className={`px-4 py-2 text-sm border 
                        ${
                          coupon
                            ? "text-[#C569FF] bg-white border-none"
                            : "bg-white text-gray-400 hover:bg-gray-200 border-none"
                        } 
                    `}
                    onClick={() => {
                      if (couponSave || coupon) {
                        dispatch(
                          couponCode({
                            couponCode: coupon || "",
                            personalizedBookIds: bookIds,
                            currencyCode: currencyData?.currencyCode,
                            onSuccess: () => {
                              toast.success("Coupon Code Apply ");
                              dispatch(
                                checkoutOrder({
                                  id: orderId,
                                  couponCode: couponSave || coupon,
                                })
                              );
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
              <div className="flex justify-between items-center mt-4 text-sm font-figTree">
                <span className="font-normal text-black text-base">Total</span>
                <span className="text-base font-bold  text-[#C969FF]">
                  {currencyData?.currencySymbol}
                  {checkoutOrderData?.Total}
                </span>
              </div>

              {/* Note */}
              <p className="text-xs text-[#71717A] font-figTree">
                Customs duties, or import fees may be applied upon delivery.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className=" flex gap-4 mt-4 font-figTree">
                {/* <button
                  type="submit"
                  className="w-full bg-[#ffc439] hover:bg-[#f7b900] text-center py-2 rounded-lg"
                >
                  <span className="text-base">
                    <span className="text-[#253b80] italic">Pay</span>
                    <span className="text-[#179bd7] italic">Pal</span>
                  </span>
                </button> */}
                <button
                  type="submit"
                  onClick={handlePreviewMore}
                  className="w-full text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-[4px]  font-normal hover:opacity-90 h-[40px]"
                >
                  {isLoading ? (
                    <BasicLoader />
                  ) : (
                    `Pay  ${currencyData?.currencySymbol}${checkoutOrderData?.Total}`
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full 
        flex sm:items-center    justify-center flex-col font-figTree
        px-8 py-4 bg-white sm:bg-white/40 border border-gray-100 block sm:hidden"
          >
            <div className="flex  gap-2">
              {/* <button
                type="submit"
                className="w-full bg-[#ffc439] hover:bg-[#f7b900] text-center py-2 rounded-lg"
              >
                <span className="text-sm  font-semibold ">
                  <span className="text-[#253b80] italic">Pay</span>
                  <span className="text-[#179bd7] italic">Pal</span>
                </span>
              </button> */}
              <button
                type="submit"
                className="w-full text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg  font-light hover:opacity-90"
                onClick={handlePreviewMore}
              >
                {isLoading ? (
                  <BasicLoader />
                ) : (
                  `Pay  ${currencyData?.currencySymbol}${checkoutOrderData?.Total}`
                )}
              </button>
            </div>

            {isMobile && (
              <div className="flex justify-center sm:justify-end items-center text-sm font-figTree px-1 mt-2">
                <nav className="flex flex-wrap text-gray-500 gap-2 ">
                  <span className="hover:text-gray-700 cursor-pointer font-medium text-black underline whitespace-nowrap">
                    Cart
                  </span>
                  <span>{">"}</span>
                  <span className="hover:text-gray-700 cursor-pointer  font-medium text-black  underline whitespace-nowrap">
                    Delivery
                  </span>
                  <span>{">"}</span>
                  <span className="hover:text-gray-700 cursor-pointer font-medium text-black underline whitespace-nowrap">
                    Checkout
                  </span>
                </nav>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCheckout;
