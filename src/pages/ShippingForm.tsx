import { Formik } from "formik";
import * as Yup from "yup";

import "react-country-state-city/dist/react-country-state-city.css";
import FormField from "@/components/ui/FormField";
import { useEffect, useRef, useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { PiPackage } from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";
import { useIsMobile } from "@/hooks/use-mobile";
import { FiEdit } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import loading from "../assets/images/purple.gif";
import {
  city,
  shippingCharge,
  shippingQuote,
  getAddress,
  shippingAddress,
  personalizedBookCart,
  addressDelete,

  getAddressSuccess,
  requestSupportSuccess,
  checkoutOrder,
  checkoutOrderSuccess
} from "../../store/slices/bookTemplateSlice.js";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { countryList, statesList , currencyList } from "../../store/slices/loginSlice.js";

import AddressAdd from "@/components/modals/AddressAdd.js";
import { useNavigate, useParams } from "react-router-dom";
import BasicLoader from "@/components/ui/basicLoader.js";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const ShippingForm = ({  bookId, }) => {
  // const { id } = useParams(); // ye ek string milegi
  // const idArray = id ? id?.split(",") : [];

  const idArray = localStorage.getItem("ids");
  //  const idArray = bookId ? bookId?.map((book) => book?.id) : [];
  // const { values } = useFormikContext<any>();

  const cartList = useSelector((state) => state?.bookTemplate?.cartData);
  const items = cartList?.data?.personalizedBooks;
  const idCart = items?.map((c) => {
    return c?.id;
  });

  const [tooltip, setTooltip] = useState(false);
  const [tooltipState, setTooltipState] = useState(false);

  const [addAddress, setAddAddress] = useState(false);

  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

   
  const [selectedState, setSelectedState] = useState("");

  const countryListData = useSelector((state) => state?.auth?.countryList);
   
  const currencyData = useSelector((state) => state?.bookTemplate?.currency);
  const addressData = useSelector(
    (state) => state?.bookTemplate?.getAddressData
  );

  const isAddress = addressData?.data?.id;
  const addressList = addressData?.data?.address || [];
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (addressData?.data?.address) {
      setAddresses(addressData.data.address);
    }
  }, [addressData]);

  const stateList = useSelector((state) => state?.auth?.statesList);
  const cityList = useSelector((state) => state?.bookTemplate?.cityData?.data);
  const isLoad = useSelector((state) => state?.bookTemplate?.isQuote);
  const isLoading = useSelector((state) => state?.bookTemplate?.isCharge);
  const [edit, setEdit] = useState(false);
  const requestSupportList = useSelector(
    (state) => state?.bookTemplate?.requestSupportData?.data
  );

  const standard = requestSupportList?.standard;

  const express = requestSupportList?.express;
  const orderId = localStorage.getItem("orderId");
  const profileData = useSelector((state: any) => state?.auth?.profile);

  useEffect(() => {
    dispatch(requestSupportSuccess({}));
    dispatch(countryList());
    personalizedBookCart({ currencyCode: currencyData?.currencyCode })
    dispatch(getAddress({}));
    dispatch(currencyList());
  }, []);



  useEffect(() => {
    if (selected) {
      dispatch(statesList({ country: typeof selected === "string" ? selected : selected?.countryName  }));
    }
  }, [selected]);

  useEffect(() => {
    if (selectedState && selected) {
      dispatch(
        city({ country: selected?.countryName, state: selectedState?.name })
      );
    }
  }, [selectedState, selected]);

  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isId, setIsId] = useState("");
  const validationSchema = (addresses: any[]) =>
    Yup.object({
      email: Yup.string().test(
        "email-required-if-no-address",
        "Email Address is required",
        function (value) {
          if (addresses && addresses.length > 0) return true; // skip validation
          if (!value) return false; // required
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value); // valid email
        }
      ),
      country: Yup.string().required("Country is required"),
      fullName: Yup.string().required("Full name is required"),
      phone: Yup.string().required("Phone number is required"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      postal: Yup.string().required("Postal/Zip Code is required"),
      state: Yup.string().required("State/Province is required"),
      shipping: Yup.string().required("Shipping method is required"),
    });

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (addresses?.length > 0 && idArray?.length > 0) {
      const first = addresses[0];
      setSelectedAddress(first?.id || first?._id);
     
      dispatch(
        shippingCharge({
          country: first?.country,
          firstName: first.fullName,
          street: first.street,
          state: first?.state,
          city: first?.city,
          postCode: first?.zipCode,
          email: addressData?.data?.email,
          phone: first?.phoneNumber,
          bookId: idArray?.includes(",") ? idArray?.split(",") : [idArray],
          currencyCode:currencyData?.currencyCode
        })
      );
    }
  }, [addresses?.length > 0, idArray?.length]);

  const countryName = localStorage.getItem("countrySave"); 


  const countryInitial = countryListData?.find(
    (item, ind) => item?.countryCode === countryName
  );

  const [isAddingAddress, setIsAddingAddress] = useState(false);


  const checkoutOrderData = useSelector(
    (state) => state?.bookTemplate?.checkoutOrderData?.data
  );
  const address = checkoutOrderData?.shippingAddress;
  const shipping = checkoutOrderData?.shippingMethod;

  useEffect(() => {
    if(orderId){

      dispatch(checkoutOrder({ id: orderId, couponCode: "" }));
    }
  }, [orderId]);
useEffect(() => {
  if( checkoutOrderData?.shippingAddress?.country && countryListData?.length){
    const curr = countryListData?.find((val) => val?.countryName === checkoutOrderData?.shippingAddress?.country)
    setSelected(curr)
  }
 
}, [checkoutOrderData?.shippingAddress?.country, countryListData?.length])

useEffect(() => {
  if( checkoutOrderData?.shippingAddress?.state && stateList?.length){
    // stateList
    const curr = stateList?.find((val) => val?.name === checkoutOrderData?.shippingAddress?.state)
    setSelectedState(curr)
  }
 
}, [checkoutOrderData?.shippingAddress?.state, stateList?.length])

/// USAGE NOTES:
// 1. Includes complete Order schema with customer details
// 2. PostalAddress schema for each saved address
// 3. Default/selected address in orderDelivery
// 4. Customer name, email, phone in the schema
// 5. Full address fields: street, city, state, postal code, country
// 6. Delivery method selection included
// 7. Shipping time details with handling and transit times
const createShippingSchema = () => {
  const baseUrl = "https://www.starmebooks.com";
  const currencyCode = currencyData?.currencyCode || "USD";
  const currencySymbol = currencyData?.currencySymbol || "$";
  
  // Get the selected or default address with proper fallbacks
  const defaultAddress = addressList?.find(addr => 
    (addr.id || addr._id) === selectedAddress
  ) || addressList?.[0] || checkoutOrderData?.shippingAddress || null;

  // Customer information with fallbacks
  const customerEmail = addressData?.data?.email || profileData?.email || "";
  const customerName = defaultAddress?.fullName || 
                      checkoutOrderData?.shippingAddress?.name || 
                      profileData?.name || "";
  const customerPhone = defaultAddress?.phoneNumber || 
                       checkoutOrderData?.shippingAddress?.phone || "";

  // Shipping method details
  const shippingMethod = checkoutOrderData?.shippingMethod?.method || "standard";
  const isStandardAvailable = requestSupportList?.isStandardDeliveryAvailable;
  const isExpressAvailable = requestSupportList?.isExpressDeliveryAvailable;

  // Standard delivery details
  const standardPrice = standard?.totalPrice || 32;
  const standardMinDays = standard?.minDeliveryDays || 8;
  const standardMaxDays = standard?.maxDeliveryDays || 12;

  // Express delivery details  
  const expressPrice = express?.totalPrice || 0;
  const expressMinDays = express?.minDeliveryDays || 3;
  const expressMaxDays = express?.maxDeliveryDays || 5;

  // Base schemas that always exist
  const baseSchemas = [
    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/cart/delivery#webpage`,
      url: `${baseUrl}/cart/delivery`,
      name: "Shipping & Delivery Information - StarMe",
      description: "Enter your shipping details and select delivery method for your personalized storybooks",
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      breadcrumb: {
        "@id": `${baseUrl}/cart/delivery#breadcrumb`,
      },
      
      potentialAction: {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/cart/checkout`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    },

    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/cart/delivery#breadcrumb`,
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
        availableLanguage: ["English"]
      }
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

  // Delivery schemas
  const deliverySchemas = [];

  // Add Order Schema if we have customer/address info
  if (defaultAddress || customerEmail) {
    deliverySchemas.push({
      "@type": "Order",
      "@id": `${baseUrl}/cart/delivery#order`,
      orderNumber: orderId || undefined,
      orderStatus: "https://schema.org/OrderProcessing",
      orderDate: new Date().toISOString(),
      customer: {
        "@type": "Person",
        name: customerName,
        email: customerEmail,
        telephone: customerPhone,
      },
      ...(defaultAddress && {
        orderDelivery: {
          "@type": "ParcelDelivery",
          deliveryAddress: {
            "@type": "PostalAddress",
            name: defaultAddress.fullName || checkoutOrderData?.shippingAddress?.name,
            streetAddress: defaultAddress.street || checkoutOrderData?.shippingAddress?.street,
            addressLocality: defaultAddress.city || checkoutOrderData?.shippingAddress?.city,
            addressRegion: defaultAddress.state || checkoutOrderData?.shippingAddress?.state,
            postalCode: defaultAddress.zipCode || checkoutOrderData?.shippingAddress?.postCode,
            addressCountry: defaultAddress.country || checkoutOrderData?.shippingAddress?.country,
            telephone: defaultAddress.phoneNumber || checkoutOrderData?.shippingAddress?.phone,
          },
          hasDeliveryMethod: {
            "@type": "DeliveryMethod",
            name: shippingMethod === "express" ? "Express Delivery" : "Standard Delivery",
          },
          expectedArrivalFrom: new Date(
            Date.now() + (shippingMethod === "express" ? expressMinDays : standardMinDays) * 24 * 60 * 60 * 1000
          ).toISOString(),
          expectedArrivalUntil: new Date(
            Date.now() + (shippingMethod === "express" ? expressMaxDays : standardMaxDays) * 24 * 60 * 60 * 1000
          ).toISOString(),
        }
      }),
      acceptedPaymentMethod: [
        "https://schema.org/CreditCard",
        "https://schema.org/PaymentCard",
      ],
    });
  }

  // Add PostalAddress schemas for saved addresses
  if (addressList && addressList.length > 0) {
    addressList.forEach((addr, index) => {
      deliverySchemas.push({
        "@type": "PostalAddress",
        "@id": `${baseUrl}/cart/delivery#address-${addr.id || addr._id || index}`,
        name: addr.fullName,
        streetAddress: addr.street,
        addressLocality: addr.city,
        addressRegion: addr.state,
        postalCode: addr.zipCode,
        addressCountry: addr.country,
        telephone: addr.phoneNumber,
      });
    });
  }

  // Service Schema - Shipping Service
  deliverySchemas.push({
    "@type": "Service",
    "@id": `${baseUrl}/cart/delivery#shipping-service`,
    name: "Shipping and Delivery Service",
    serviceType: "Delivery Service",
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Delivery Options",
      itemListElement: [
        ...(isStandardAvailable ? [{
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Delivery",
          }
        }] : []),
        ...(isExpressAvailable ? [{
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Express Delivery",
          }
        }] : [])
      ]
    }
  });

  // Standard Shipping Offer
  deliverySchemas.push({
    "@type": "Offer",
    "@id": `${baseUrl}/cart/delivery#standard-shipping`,
    name: "Standard Shipping",
    description: `Reliable delivery in ${standardMinDays}-${standardMaxDays} business days`,
    price: standardPrice.toFixed(2),
    priceCurrency: currencyCode,
    availability: isStandardAvailable
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    seller: {
      "@id": `${baseUrl}/#organization`,
    },
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: standardPrice.toFixed(2),
        currency: currencyCode,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "DAY",
          unitText: "Business Days"
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: standardMinDays,
          maxValue: standardMaxDays,
          unitCode: "DAY",
          unitText: "Business Days"
        },
        businessDays: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday", 
            "Wednesday",
            "Thursday",
            "Friday"
          ]
        }
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "Worldwide"
      }
    },
    eligibleRegion: {
      "@type": "Place",
      name: "Worldwide"
    }
  });

  // Express Shipping Offer (if available)
  if (isExpressAvailable) {
    deliverySchemas.push({
      "@type": "Offer",
      "@id": `${baseUrl}/cart/delivery#express-shipping`,
      name: "Express Shipping",
      description: `Fast delivery in ${expressMinDays}-${expressMaxDays} business days`,
      price: expressPrice.toFixed(2),
      priceCurrency: currencyCode,
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${baseUrl}/#organization`,
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: expressPrice.toFixed(2),
          currency: currencyCode,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
            unitText: "Business Days"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: expressMinDays,
            maxValue: expressMaxDays,
            unitCode: "DAY",
            unitText: "Business Days"
          },
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday", 
              "Thursday",
              "Friday"
            ]
          }
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "Worldwide"
        }
      },
      eligibleRegion: {
        "@type": "Place",
        name: "Worldwide"
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": [...baseSchemas, ...deliverySchemas],
  };
};

  return (
    <div className="">
    <GeoHelmet
      title=" Delivery  - StarMe"
      description={`Enter your shipping address and choose delivery method. ${
        requestSupportList?.isStandardDeliveryAvailable 
          ? `Standard delivery: ${currencyData?.currencySymbol}${standard?.totalPrice || 32}`
          : "Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
      }${
        requestSupportList?.isExpressDeliveryAvailable 
          ? ` | Express delivery: ${currencyData?.currencySymbol}${express?.totalPrice}`
          : "Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
      }`}
      keywords="shipping details, delivery address, shipping method, express delivery, standard shipping, checkout"
      image="https://www.starmebooks.com/og-image.jpg"
      type="website"
      schema={createShippingSchema()}
    />

      <div className=" bg-purple-100 sm:bg-white p-0 sm:p-4 shadow-md  rounded-xl ">
        {" "}
        <div className="block sm:hidden mb-4  fixed top-0 left-0 w-full z-50 bg-purple-100">
          <div className="relative flex items-center justify-between  py-4 px-4">
            <div className="flex items-center gap-1">
              <div
                className="block sm:hidden"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <IoChevronBack size={25} />
              </div>

              <div className="text-2xl font-marcellus sm:mb-4 text-center sm:text-start">
                Delivery
              </div>
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer bg-white rounded-[6px] [@media(min-width:1px)_and_(max-width:250px)]:hidden">
              <img
                src={`https://flagsapi.com/${
                  countryInitial?.countryCode
                    ? countryInitial?.countryCode
                    : "AU"
                }/flat/24.png`}
                className="w-[20px] h-[20px]"
                alt="ind"
              />
              {/* {countryInitial?.flag ? countryInitial?.flag : "🇦🇹"} */}
              <span className="text-base font-medium font-figTree flex items-center">
                {currencyData?.currencyCode}
              </span>
            </div>
          </div>
        </div>
        <div className=" rounded-xl  mx-4 sm:mx-0 ">
          <h1 className="text-2xl font-marcellus mb-4 font-normal hidden sm:block text-black">
            Shipping Details
          </h1>

          <Formik
            enableReinitialize={true}
            initialValues={{
          //  email:
          //       addressList >= 0
          //         ? profileData?.email
          //         : addressData?.data?.email
          //         ? addressData?.data?.email
          //         :profileData?.email  ,   

          email:
  addressList >= 0
    ? profileData?.email || ""
    : addressData?.data?.email || profileData?.email || "",
              country: checkoutOrderData?.shippingAddress
              ? checkoutOrderData?.shippingAddress?.country  : addressList?.[0]?.country || "",
              fullName: checkoutOrderData?.shippingAddress
                ? checkoutOrderData?.shippingAddress?.name
                : addressList?.[0]?.fullName || "",
              phone: checkoutOrderData?.shippingAddress
              ? checkoutOrderData?.shippingAddress?.phone :addressList?.[0]?.phoneNumber || "",
              street:checkoutOrderData?.shippingAddress
              ? checkoutOrderData?.shippingAddress?.street :  addressList?.[0]?.street || "",
              city: checkoutOrderData?.shippingAddress
              ? checkoutOrderData?.shippingAddress?.city : addressList?.[0]?.city || "",
              postal:checkoutOrderData?.shippingAddress
              ? checkoutOrderData?.shippingAddress?.postCode : addressList?.[0]?.zipCode || "",
              state:  checkoutOrderData?.shippingAddress
              ? checkoutOrderData?.shippingAddress?.state : addressList?.[0]?.state || "",
              saveShipping: false,
              shipping: checkoutOrderData?.shippingMethod?.method || "",
            }}
            validationSchema={validationSchema(addresses)}
            onSubmit={(values) => {
              if (isAddingAddress) return;
              
              dispatch(
                shippingQuote({
                  orderId: requestSupportList?.orderId,
                  shippingMethod: values?.shipping,
                  currencyCode: currencyData?.currencyCode,


                  onSuccess: () => {
                    navigate("/cart/checkout");
                    localStorage.setItem(
                      "orderId",
                      requestSupportList?.orderId
                    );
                  },
                })
              );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => {
              useEffect(() => {
                if (requestSupportList?.isStandardDeliveryAvailable) {
                  setFieldValue("shipping", "standard");
                }
              }, [requestSupportList, setFieldValue]);

              useEffect(() => {
                if (
                  (typeof selected === "string" ? selected : selected?.countryName ) &&
                  (typeof selectedState === "string" ? selectedState : selectedState?.name ) &&
                  values?.city &&
                  values?.fullName &&
                  values?.street &&
                  values?.postal &&
                  values?.phone
                ) {
                  dispatch(
                    shippingCharge({
                      country: typeof selected === "string" ? selected : selected?.countryName,
                      countryCode: selected?.countryCode,
                      firstName: values?.fullName,
                      street: values?.street,
                      state: typeof selectedState === "string" ? selectedState : selectedState?.name,
                      stateCode: selectedState?.state_code,
                      city: values?.city,
                      postCode: values?.postal,
                      email: values?.email,
                      phone: values?.phone,
                      bookId: idArray?.includes(",")
                        ? idArray?.split(",")
                        : [idArray],
                        currencyCode:  currencyData?.currencyCode 
                    })
                  );
                }
              }, [
                selected,
                selectedState,
                values?.city,
                values?.fullName,
                values?.street,
                values?.postal,
                values?.phone,
                values?.email,
                bookId,
              ]);

              return (
                <form
                  onSubmit={handleSubmit}
                  className="flex  pt-16 sm:pt-0 gap-4  flex-col sm:flex-row lg:pb-0 pb-28"
                >
                  <div className="flex-1  w-full  bg-[#fbf7fe]  sm:bg-white p-4 sm:p-0 rounded-xl ">
                    <h1 className="text-lg font-marcellus mb-4 font-light block sm:hidden">
                      Shipping Details
                    </h1>
                    <FormField
                      type="email"
                      name="email"
                      placeholder="* Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                      messages="Email  Address  is required"
                      helpText="This email will be used to keep you informed about your order status and details."
                    />
                    {addressList >= 0 ? (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-4">
                          <FormField
                            name="fullName"
                            placeholder="* Full Name"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.fullName}
                            touched={touched.fullName}
                            tooltipLine={2}
                            messages=" Full name is required and much be at least 3 characters"
                          />
                          <FormField
                            name="phone"
                            type="text"
                            isNumber={true}
                            placeholder="* Phone Number"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.phone}
                            touched={touched.phone}
                            tooltipLine={4}
                            messages=" phone number is required.min 4 and max 20.Only number ,(), +, -, spaces, periods allowed."
                          />
                        </div>

                        <div className=" relative mt-2">
                          <select
                            name="country"
                            value={values.country}
                            onChange={(e) => {
                              handleChange(e);
                              const selectedName = e.target.value;

                              // get the whole object by matching countryName
                              const selectedCountry = countryListData.find(
                                (c) => c.countryName === selectedName
                              );

                              setFieldValue(
                                "country",
                                selectedCountry?.countryName
                              ); // ✅ store object in formik
                              setSelected(selectedCountry); // ✅ store object in local state if needed
                            }}
                            className={`w-full border rounded-md px-2 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.country && touched.country
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            ${
                              !values.country
                                ? "text-gray-400"
                                : "text-black font-figTree text-[14px]"
                            }`}
                          >
                            <option value="" className="text-gray-400 text-xs">
                              Select Country
                            </option>
                            {countryListData?.map(
                              (country: string, index: number) => (
                                <option
                                  key={index}
                                  value={country?.countryName}
                                >
                                  {country?.countryName}
                                </option>
                              )
                            )}
                          </select>

                          {/* Custom dropdown arrow */}
                          {/* <IoChevronDown
                            size={18}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                          /> */}

                          <div
                            className="absolute  top-3 right-8 flex items-center cursor-pointer"
                            onMouseEnter={() => setTooltip(true)}
                            onMouseLeave={() => setTooltip(false)}
                          >
                            <RiInformationLine
                              className={`text-base ${
                                !!(errors.country && touched.country)
                                  ? "text-red-500"
                                  : "text-gray-400"
                              }`}
                            />

                            {/* Tooltip */}
                            {tooltip && (
                              <div
                                className={`absolute -top-7 right-0 ${
                                  !!(errors.country && touched.country)
                                    ? "bg-red-100"
                                    : "bg-gray-100"
                                } ${
                                  !!(errors.country && touched.country)
                                    ? "text-red-500"
                                    : "text-gray-400"
                                } text-xs rounded-md px-2 py-1 shadow-lg whitespace-nowrap z-10`}
                              >
                                Country Selection is required
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-2 relative">
                          <div className="relative">
                            <select
                              name="state"
                              value={values.state}
                              disabled={!selected}
                              onChange={(e) => {
                                handleChange(e);
                                const selectedName = e.target.value;

                                const selectedCountry = stateList.find(
                                  (c) => c.name === selectedName
                                );

                                setFieldValue("state", selectedCountry?.name);
                                setSelectedState(selectedCountry);
                              }}
                              onBlur={handleBlur}
                              className={`w-full border rounded-md px-2 py-[9px] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500  ${
                                errors.state && touched.state
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }
                                ${
                                  !values.state
                                    ? "text-gray-400"
                                    : "text-black font-figTree text-[14px]"
                                }`}
                            >
                              <option value="">Select State/Province </option>
                              {stateList?.map(
                                (state: string, index: number) => (
                                  <option key={index} value={state.name}>
                                    {state?.name}
                                  </option>
                                )
                              )}
                            </select>
                            {/* <IoChevronDown
                              size={18}
                              className="absolute right-[10px] sm:right-3 top-[20px] sm:top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            /> */}

                            <div
                              className="absolute top-3 sm:top-3 right-8 sm:right-8  flex items-center cursor-pointer"
                              onMouseEnter={() => setTooltipState(true)}
                              onMouseLeave={() => setTooltipState(false)}
                            >
                              <RiInformationLine
                                className={`text-base ${
                                  !!(errors.state && touched.state)
                                    ? "text-red-500"
                                    : "text-gray-400"
                                }`}
                              />

                              {/* Tooltip */}
                              {tooltipState && (
                                <div
                                  className={`absolute -top-8 right-0 ${
                                    !!(errors?.state && touched.state)
                                      ? "bg-red-100"
                                      : "bg-gray-100"
                                  } ${
                                    !!(errors.state && touched.state)
                                      ? "text-red-500"
                                      : "text-gray-400"
                                  } text-xs rounded-md px-2 py-1 shadow-lg whitespace-nowrap z-10`}
                                >
                                  Please select the valid state
                                </div>
                              )}
                            </div>
                          </div>

                          <FormField
                            name="city"
                            placeholder="* City"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.city}
                            touched={touched.city}
                            messages=" City is required."
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-2  relative">
                          <FormField
                            name="street"
                            placeholder="* Street"
                            value={values.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.street}
                            touched={touched.street}
                            messages=" Street address is required."
                          />
                          <FormField
                            name="postal"
                            placeholder="* Postal/Zip Code"
                            value={values.postal}
                            type="text"
                            isNumber={true}
                            onChange={handleChange}
                            // onChange={(e) => {
                            //   handleChange(e);
                            //   const selectedCity = e.target.value;
                            //   dispatch(
                            //     shippingCharge({
                            //       country: selected?.countryName,
                            //       countryCode: selected?.countryCode,
                            //       firstName: values?.fullName,
                            //       street: values?.street,
                            //       state: selectedState?.name,
                            //       stateCode: selectedState?.state_code,
                            //       city: selectedCity,
                            //       postCode: values?.postal,
                            //       email: values?.email,
                            //       phone: values?.phone,
                            //       bookId: idCart,
                            //       saveShippingDetails: values?.saveShipping,
                            //     })
                            //   );
                            // }}
                            onBlur={handleBlur}
                            error={errors.postal}
                            touched={touched.postal}
                            tooltipLine={2}
                            messages="Postal/Zip Code is required and must not exceed 20 characters"
                          />
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <input
                            type="checkbox"
                            id="saveShipping" // ✅ Add id to match the label's htmlFor
                            name="saveShipping"
                            checked={values.saveShipping}
                            onChange={(e) => {
                              handleChange(e);
                              dispatch(
                                shippingAddress({
                                  fullName: values?.fullName,
                                  phoneNumber: values?.phone,
                                  country: selected?.countryName,
                                  street: values?.street,
                                  city: values?.city,
                                  state: selectedState?.name,
                                  zipCode: values?.postal?.toString(),
                                  saveShippingDetails: e.target.checked,
                                })
                              );
                            }}
                            className="w-3.5 h-3.5 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="saveShipping"
                            className="text-xs font-figTree text-[#2E0B4A] cursor-pointer" // ✅ Added cursor-pointer for better UX
                          >
                            Save Shipping details
                          </label>
                        </div>
                      </>
                    ) : (
                      <div className="border rounded-lg mt-4 bg-white">
                        <div>
                          {addresses.map((v, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center gap-3 p-2 cursor-pointer bg-white border-b mx-2"
                            >
                              <div className="flex justify-between items-center gap-4">
                                <input
                                  type="radio"
                                  id={`address-${i}`}
                                  name="address"
                                  checked={
                                    selectedAddress === (v?.id || v?._id)
                                  }
                                  onChange={(e) => {
                                    e?.stopPropagation();
                                    setSelectedAddress(v?.id || v?._id);
                                    dispatch(
                                      shippingCharge({
                                        country: v?.country,
                                        firstName: v.fullName,
                                        street: v.street,
                                        state: v?.state,
                                        city: v?.city,
                                        postCode: v?.zipCode,
                                        email: addressData?.data?.email,
                                        phone: v?.phoneNumber,
                                        bookId: idArray?.includes(",")
                                          ? idArray?.split(",")
                                          : [idArray],
                                          currencyCode:  currencyData?.currencyCode 
                                      })
                                    );
                                  }}
                                  className="accent-purple-500 scale-150"
                                />
                                <label
                                  htmlFor={`address-${i}`}
                                  className="text-xs font-figTree cursor-pointer"
                                >
                                  <div className="text-gray-900 text-sm font-semibold">
                                    {v?.fullName}444
                                  </div>
                                  <div className="text-[#4B5563]">
                                    {v?.phoneNumber}
                                  </div>
                                  <span className="text-[#4B5563]">
                                    {v.street}, {v.zipCode}, {v.city}
                                  </span>
                                  <div className="text-[#4B5563]">
                                    {v.state}, {v.country}
                                  </div>
                                </label>
                              </div>

                              <div className="relative inline-block text-left">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation(); // now it works
                                    if(isLoading) return
                                    setOpenMenuId(openMenuId === i ? null : i);
                                  }}
                                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
                                >
                                  <BsThreeDotsVertical size={20} />
                                </div>

                                {openMenuId === i && (
                                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                                    <button
                                      onClick={() => {
                                        setIsId(v?._id);
                                        setAddAddress(true);
                                        setIsAddingAddress(true);
                                      }}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex gap-2 items-center"
                                    >
                                      <FiEdit /> Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        dispatch(
                                          addressDelete({
                                            id: v?._id,
                                            onSuccess: () => {
                                              // if (addresses.length === 1) {
                                              // window.location.reload(); // 🔄 refresh page if last address deleted
                                              dispatch(getAddressSuccess({}));
                                              dispatch(
                                                requestSupportSuccess({})
                                              );
                                              setAddresses([]);
                                              dispatch(getAddress({}));
                                              dispatch(checkoutOrderSuccess({}))
                                              // } else {
                                              //   dispatch(getAddress({}));
                                              // }
                                            },
                                          })
                                        );

                                        setOpenMenuId(null); // close the menu after click
                                      }}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex gap-2 items-center"
                                    >
                                      <RiDeleteBin5Line /> Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center items-center">
                          <button
                            className=" flex items-center gap-2   text-[#9333EA] text-sm  font-figTree py-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAddAddress(true);
                              setIsId("");
                              setIsAddingAddress(true);
                            }}
                          >
                            <svg
                              className="w-5 h-5 text-purple-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              ></path>
                            </svg>
                            Add a different address
                          </button>
                        </div>{" "}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full ">
                    <div className="space-y-2 bg-[#FBF5FF] p-4 rounded-xl mb-2 sm:mb-0">
                      <h1 className="text-lg font-marcellus mb-2 font-normal text-black">
                        Shipping Method
                      </h1>
                      {/* //! here new -------------- */}
                      {/* {isLoading ? (
                        <div className="flex items-center justify-center">
                          <img src={loading} alt="image" className="w-28" />
                        </div>
                      ) : ( */}
                      <>
                        {/* {requestSupportList?.isStandardDeliveryAvailable && ( */}


                        {!(
                          !standard &&
                          !express &&
                          values?.country &&
                          values?.state &&
                          values?.city &&
                          values?.postal &&
                          values?.street &&
                          !isLoading
                        ) && (
                          <label
                            className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer ${
                              values.shipping === "standard"
                                ? "bg-purple-100"
                                : "bg-[#fbf7fe]"
                            }  ${
                              values.shipping === "standard"
                                ? "border border-purple-500"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between items-center gap-2">
                              <input
                                type="radio"
                                name="shipping"
                                value="standard"
                                checked={values.shipping === "standard"}
                                disabled={
                                  !requestSupportList?.isStandardDeliveryAvailable
                                }
                                onChange={handleChange}
                                className="accent-purple-500 scale-150"
                              />
                              <div className="text-[#cccbce]">
                                <PiPackage size={20} />
                              </div>
                              <div>
                                <span
                                  className={`text-sm font-normal font-figTree ${
                                    standard ? "text-black" : "text-zinc-400"
                                  }`}
                                >
                                  Standard
                                </span>
                                <p className="text-zinc-400 font-sf-pro text-xs">
                                  {isLoading ? (
                                    <img
                                      src={loading}
                                      alt="image"
                                      className="w-5"
                                    />
                                  ) : standard ? (
                                    `${standard.minDeliveryDays}-${standard.maxDeliveryDays} Business Days`
                                  ) : (
                                    "8-12 Business Days"
                                  )}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`font-figTree text-xs  ${
                                standard ? "text-[#18181B]" : "text-zinc-400"
                              } `}
                            >
                              {isLoading ? (
                                <img
                                  src={loading}
                                  alt="loading"
                                  className="w-5"
                                />
                              ) : (
                                `${currencyData?.currencySymbol}${standard?.totalPrice || 32}`
                              )}
                            </span>
                          </label>
                        )}
                        {/* )} */}

                        {requestSupportList?.isExpressDeliveryAvailable && (
                          <label
                            className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer ${
                              values.shipping === "express"
                                ? "bg-purple-100"
                                : "bg-[#fbf7fe]"
                            }  ${
                              values.shipping === "express"
                                ? "border border-purple-500"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between items-center gap-2">
                              <input
                                type="radio"
                                name="shipping"
                                value="express"
                                checked={values.shipping === "express"}
                                onChange={handleChange}
                                className="accent-purple-500 scale-150"
                              />
                              <div className="text-gray-500">
                                <svg
                                  className="w-5 h-5 transform scale-125"
                                  width="30"
                                  height="22"
                                  viewBox="0 0 30 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M28.2527 5.61039L20.0027 1.09633C19.7823 0.974532 19.5346 0.910645 19.2827 0.910645C19.0309 0.910645 18.7831 0.974532 18.5627 1.09633L10.3127 5.61227C10.0771 5.74118 9.88044 5.93098 9.74323 6.16185C9.60603 6.39273 9.53332 6.6562 9.53271 6.92477V15.891C9.53332 16.1596 9.60603 16.4231 9.74323 16.6539C9.88044 16.8848 10.0771 17.0746 10.3127 17.2035L18.5627 21.7195C18.7831 21.8413 19.0309 21.9051 19.2827 21.9051C19.5346 21.9051 19.7823 21.8413 20.0027 21.7195L28.2527 17.2035C28.4883 17.0746 28.685 16.8848 28.8222 16.6539C28.9594 16.4231 29.0321 16.1596 29.0327 15.891V6.9257C29.0326 6.65666 28.9601 6.3926 28.8229 6.16119C28.6857 5.92978 28.4887 5.73953 28.2527 5.61039ZM19.2827 2.40883L26.8146 6.53383L24.0237 8.06196L16.4908 3.93696L19.2827 2.40883ZM19.2827 10.6588L11.7508 6.53383L14.929 4.79383L22.4608 8.91883L19.2827 10.6588ZM11.0327 7.84633L18.5327 11.9507V19.9935L11.0327 15.892V7.84633ZM27.5327 15.8882L20.0327 19.9935V11.9545L23.0327 10.3129V13.6588C23.0327 13.8577 23.1117 14.0485 23.2524 14.1892C23.393 14.3298 23.5838 14.4088 23.7827 14.4088C23.9816 14.4088 24.1724 14.3298 24.313 14.1892C24.4537 14.0485 24.5327 13.8577 24.5327 13.6588V9.49164L27.5327 7.84633V15.8873V15.8882Z"
                                    fill="#E3BBFF"
                                  ></path>
                                  <path
                                    d="M7.63159 7.86035L7.70776 7.86426C8.08612 7.90251 8.38159 8.22191 8.38159 8.61035C8.38159 8.99879 8.08612 9.3182 7.70776 9.35645L7.63159 9.36035H4.14526C3.73105 9.36035 3.39526 9.02457 3.39526 8.61035C3.39526 8.19614 3.73105 7.86035 4.14526 7.86035H7.63159Z"
                                    fill="#E3BBFF"
                                  ></path>
                                  <path
                                    d="M7.6311 10.5166L7.70825 10.5205C8.08632 10.559 8.3811 10.8784 8.3811 11.2666C8.3811 11.6548 8.08632 11.9742 7.70825 12.0127L7.6311 12.0166L2.42505 12.0166C2.01084 12.0166 1.67505 11.6808 1.67505 11.2666C1.67505 10.8524 2.01084 10.5166 2.42505 10.5166L7.6311 10.5166Z"
                                    fill="#E3BBFF"
                                  ></path>
                                  <path
                                    d="M7.63135 13.4551L7.7085 13.459C8.08647 13.4976 8.38135 13.8169 8.38135 14.2051C8.38135 14.5932 8.08647 14.9126 7.7085 14.9512L7.63135 14.9551L0.972168 14.9551C0.557954 14.9551 0.222168 14.6193 0.222168 14.2051C0.222168 13.7909 0.557954 13.4551 0.972168 13.4551L7.63135 13.4551Z"
                                    fill="#E3BBFF"
                                  ></path>
                                </svg>
                              </div>
                              <div>
                                <span className="text-sm font-normal font-figTree text-black">
                                  Express
                                </span>
                                <p className="text-zinc-400 font-sf-pro text-xs">
                                  {standard &&
                                    `${express?.minDeliveryDays}-${express?.maxDeliveryDays} Business Days`}
                                </p>
                              </div>
                            </div>
                            <span className="font-figTree text-xs text-[#18181B]">
                            {currencyData?.currencySymbol}{express?.totalPrice}
                            </span>
                          </label>
                        )}
                        {!standard &&
                          !express &&
                          values?.country &&
                          values?.city &&
                          values?.postal &&
                          values?.street &&
                          values?.state &&
                          !isLoading && (
                            <div className="text-xs text-orange-400">
                              Please change the selected country, as there are
                              currently no available shipping methods for the
                              one you’ve chosen
                            </div>
                          )}

                        {errors.shipping && touched.shipping && (
                          <p className="text-red-500 text-sm">
                            {errors.shipping}
                          </p>
                        )}
                      </>
                      {/* )} */}
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 text-sm font-normal bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-[4px] hover:opacity-90 hidden sm:block h-[40px]"
                    >
                      {isLoad ? (
                        <BasicLoader color="fill-purple-500" />
                      ) : (
                        "Continue"
                      )}
                    </button>

                    <div
                      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full sm:w-[90%] lg:w-[80%] 
                flex flex-col sm:flex-row sm:items-center    justify-center
                gap-1 px-0 pb-2 bg-white sm:bg-white/40 border border-gray-100 block sm:hidden "
                    >
                      {/* Continue button */}
                      <div className="px-4">
                        <button
                          type="submit"
                          className="w-full mt-4 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-[4px]  font-normal hover:opacity-90 font-figTree"
                        >
                          {isLoad ? (
                            <BasicLoader color="fill-purple-500" />
                          ) : (
                            "Continue"
                          )}
                        </button>
                      </div>

                      {/* Breadcrumbs */}
                      {isMobile && (
                        <div className="flex justify-center sm:justify-end items-center text-sm font-figTree px-1 mt-2">
                          <nav className="flex flex-wrap text-gray-500 gap-2">
                            <span className="hover:text-gray-700 cursor-pointer font-medium text-black underline whitespace-nowrap">
                              Cart
                            </span>
                            <span>{">"}</span>
                            <span className="hover:text-gray-700 cursor-pointer  font-medium text-black  underline whitespace-nowrap">
                              Delivery
                            </span>
                            <span>{">"}</span>
                            <span className="hover:text-gray-700 cursor-pointer underline whitespace-nowrap text-[#A1A1AA]">
                              Checkout
                            </span>
                          </nav>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      {/* 
      {addAddress &&
      <AddAddress/>} */}
      {addAddress && (
        <AddressAdd
          isId={isId}
          bookId={idCart}
          addresses={addresses}
          onCancel={() => {
            setAddAddress(false);
            setIsAddingAddress(false);
          }}
          // onConfirm={() => {

          //    setAddAddress(false)
          // }}
          // onConfirm={handlePayment}
        />
      )}
    </div>
  );
};

export default ShippingForm;
