import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Navbar from "@/components/ui/Navbar";
import EditableProfile from "@/components/ui/EditableProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  shippingCreate,
  countryList,
  statesList,
} from "../../store/slices/loginSlice.js";
import FormField from "@/components/ui/FormField.js";
import { IoChevronDown } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";
import {
  shippingCharge,
  shippingAddress,
  city,
  addressDelete,
  getAddress,
} from "../../store/slices/bookTemplateSlice.js";
import { RiDeleteBin5Line } from "react-icons/ri";

import AddressAdd from "@/components/modals/AddressAdd.js";
import { MapPin, MoreVertical, Plus } from "lucide-react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import HiOutlineBookmarkAlt from "../assets/svgs/Shipping";
import { FiEdit } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state?.auth?.profile);

  const firstAddress = profileData?.address?.[0] || {};

  const initialValues = {
    fullName: profileData?.fullName || "",
    country: firstAddress?.country || "",
    phoneNumber: profileData?.phoneNumber || "",
    street: firstAddress?.street || "",
    city: firstAddress?.city || "",
    zipCode: firstAddress?.zipCode || "",
    state: firstAddress?.state || "",
    saveShippingDetails: false,
  };
  const validationSchema = (addresses: any[]) =>
    Yup.object({
      country: Yup.string().required("Country is required"),
      fullName: Yup.string().required("Full name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .min(4, "Phone number must be at least 4 characters")
        .max(20, "Phone number cannot exceed 20 characters")
        .matches(
          /^[0-9()+\-\s.]*$/,
          "Only numbers, parentheses (), +, -, spaces, and periods are allowed"
        ),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      postal: Yup.string().required("Postal/Zip Code is required"),
      state: Yup.string().required("State/Province is required"),
      apt: Yup.string()
        .required("Address line 2 cannot exceed 35 characters")
        .max(35, "Address line 2 cannot exceed 35 characters")
        .nullable(),
    });

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(shippingCreate({ ...values }));
  };

  useEffect(() => {
    dispatch(countryList());
    dispatch(getAddress({}));
  }, [dispatch]);

  const statesListData = useSelector((state) => state?.auth?.statesList);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipState, setTooltipState] = useState(false);
  const [tooltipCity, setTooltipCity] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selected, setSelected] = useState("");
  const countryListData = useSelector((state) => state?.auth?.countryList);
  const cityList = useSelector((state) => state?.bookTemplate?.cityData?.data);
  const stateList = useSelector((state) => state?.auth?.statesList);
  const addressData = useSelector(
    (state) => state?.bookTemplate?.getAddressData
  );
  const addressList = addressData?.data?.address;
  useEffect(() => {
    if (selected) {
      dispatch(statesList({ country: selected?.countryName }));
    }
  }, [selected]);

  useEffect(() => {
    if (selectedState && selected) {
      dispatch(
        city({ country: selected?.countryName, state: selectedState?.name })
      );
    }
  }, [selectedState, selected]);
  const [addAddress, setAddAddress] = useState(false);

  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (addressData?.data?.address) {
      setAddresses(addressData.data.address);
    }
  }, [addressData]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isId, setIsId] = useState("");
  const [isSave, setIsSave] = useState(false);
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );
  return (
    <div className="min-h-screen relative overflow-hidden">
     <Helmet>
       <title> My Profile - StarMe </title>
        <meta
          name="description"
          content="Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        />

        <meta property="og:title" content="My Profile - StarMe"/>
        <meta
          property="og:description"
          content="Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        />

        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>

      {/* <div className="absolute inset-10 bg-[url('https://resources.wonderwraps.com/e6d69f38-8562-424b-b966-edc0ebe3436e/img/fillers.png')] bg-no-repeat filter blur-sm opacity-50"></div> */}
      <div className="sticky top-0  z-40">
      <Navbar />
      </div>
      <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
        <div className="absolute inset-0 left-0 right-0 -top-28 w-full bg-gradient-to-b from-purple-400/30 to-white">
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>
        <div className="container px-4 py-6 relative z-0 max-w-6xl">
          <EditableProfile
            shippingChild={
              <div className="space-y-5 border p-4 rounded-md bg-white h-[100%]">
                <p className="text-base font-semibold text-black font-figTree">
                  Shipping Address
                </p>
                {addressList?.length > 0 || isSave ? (
                  <>
                    <div className="mt-4">
                      {addresses.map((v, i) => (
                        <div
                          key={v.id}
                          className="flex justify-between items-start border border-gray-100 rounded-lg p-3 mb-2 hover:shadow-sm transition cursor-pointer"
                        >
                          <div className="flex gap-2">
                            <div className="pt-1">
                              <HiOutlineBookmarkAlt />
                            </div>
                            <div className="text-[#4F4D55] text-sm font-figTree leading-relaxed">
                              <div className="">{v?.fullName}</div>
                              <div>
                                {v?.state}, {v?.country}
                              </div>
                              <div>
                                {v.street}, {v.zipCode} {v.city},{" "}
                                {v.phoneNumber}
                              </div>
                            </div>
                          </div>

                          {/* Three-dot Menu */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === i ? null : i);
                              }}
                              className="p-2 hover:bg-gray-100 rounded-full"
                            >
                              <HiOutlineDotsHorizontal size={18} />
                            </button>

                            {openMenuId === i && (
                              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                                <button
                                  onClick={() => {
                                    setIsId(v?._id);
                                    setAddAddress(true);
                                    setIsAddingAddress(true);
                                  }}
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm flex gap-2 items-center"
                                >
                                  <FiEdit /> Edit
                                </button>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      addressDelete({
                                        id: v?._id,
                                        onSuccess: () =>
                                          dispatch(getAddress({})),
                                      })
                                    );
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm flex gap-2 items-center"
                                >
                                  <RiDeleteBin5Line /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add New Address Section */}
                      <div
                        className="flex h-[101px] col-span-1 border border-dashed border-purple-300 rounded-lg mt-2 py-3 bg-purple-50 justify-center items-center cursor-pointer transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null)
                          setAddAddress(true);
                          setIsId("");
                          setIsAddingAddress(true);
                        }}
                      >
                        <button className="  text-sm text-purple-600 flex items-center gap-2 p-2 w-full h-full hover:bg-white/30 rounded-md justify-center font-figTree">
                          <Plus /> Add a different address
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      country: "",
                      fullName: "",
                      phone: "",
                      street: "",
                      city: "",
                      postal: "",
                      state: "",
                      apt: "",
                      saveShipping: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      dispatch(
                        shippingAddress({
                          fullName: values?.fullName,
                          phoneNumber: values?.phone,
                          country: selected?.countryName,
                          street: values?.street,
                          city: values?.city,
                          state: selectedState?.name,
                          zipCode: values?.postal,
                          saveShippingDetails: true,
                          onSuccess: () => {
                            dispatch(getAddress({}));
                          },
                        })
                      );

                      setIsSave(false);
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
                    }) => (
                      <form
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                        className="flex gap-4  flex-col sm:flex-row "
                      >
                        <div className="flex-1  w-full bg-white  rounded-xl">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-2">
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
                              placeholder="* Phone Number"
                              value={values.phone}
                              isNumber={true}
                              onChange={(e) => {
                                const input = e.target.value;
                                if (Number(input) < 0) return;
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              error={errors.phone}
                              touched={touched.phone}
                              tooltipLine={4}
                              messages="Phone number must be positive. Min 4 and max 20 digits."
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-3 relative">
                            <div className=" relative ">
                              <select
                                name="country"
                                value={values.country}
                                onChange={(e) => {
                                  handleChange(e);
                                  const selectedName = e.target.value;

                                  const selectedCountry = countryListData.find(
                                    (c) => c.countryName === selectedName
                                  );

                                  setFieldValue(
                                    "country",
                                    selectedCountry?.countryName
                                  );
                                  setSelected(selectedCountry);
                                }}
                                className={`w-full rounded-lg px-2 py-[8px]  appearance-none  focus:ring-purple-500  h-10 placeholder:text-xs md:placeholder:text-sm text-sm placeholder-gray-500/50 border border-gray-300
   focus:outline-none focus:ring-0 focus:border-purple-500 leading-none pr-8
                                ${
                                  errors.country && touched.country
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }
                                ${
                                  !values.country
                                    ? "text-gray-400"
                                    : "text-black font-figTree text-[14px]"
                                }
                                  `}
                              >
                                <option
                                  value=""
                                  className="text-gray-400 text-xs"
                                >
                                  * Select Country
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
                              className="absolute right-3 top-[18px] -translate-y-1/2 text-gray-500 pointer-events-none"
                            /> */}

                              <div
                                className="absolute  top-[10px] right-8 flex items-center cursor-pointer"
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
                                    } text-xs rounded-lg px-2 py-1 shadow-lg whitespace-nowrap z-10`}
                                  >
                                    Country Selection is required
                                  </div>
                                )}
                              </div>
                            </div>
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
                                className={`w-full rounded-lg px-2 py-[8px]  appearance-none  focus:ring-purple-500  h-10 placeholder:text-xs md:placeholder:text-sm text-sm placeholder-gray-500/50 border border-gray-300
   focus:outline-none focus:ring-0 focus:border-purple-500 leading-none pr-8
  ${errors.state && touched.state ? "border-red-500" : "border-gray-300"}
  ${!values.state ? "text-gray-400" : "text-black font-figTree text-[14px]"}
`}
                              >
                                <option value="">* Select State </option>
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
                              className="absolute right-[10px] sm:right-3 top-[20px] sm:top-[19px] -translate-y-1/2 text-gray-500 pointer-events-none"
                            /> */}

                              <div
                                className="absolute top-3 sm:top-[10px] right-8 sm:right-8  flex items-center cursor-pointer"
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
                                    } text-xs rounded-lg px-2 py-1 shadow-lg whitespace-nowrap z-10`}
                                  >
                                    Please select the valid state
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-3 relative">
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
                              name="apt"
                              placeholder="* Apt # , Building, ect"
                              value={values.apt}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.apt}
                              touched={touched.apt}
                              messages=" optional second address line, max 35 character"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-2  relative">
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

                            <FormField
                              name="postal"
                              placeholder="* Postal/Zip Code"
                              value={values.postal}
                              onChange={handleChange}
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
                              name="saveShipping"
                              checked={values.saveShipping}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              className="w-3 h-3 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="saveShipping"
                              className="ml-2 text-xs text-custom-purple font-figTree"
                            >
                              Save Shipping details
                            </label>
                          </div>
                          <div className="border-t border-gray-200 w-full h-[0.5px] mt-5" />

                          <div className=" flex  gap-2  justify-end">
                            <button
                              type="submit"
                              className="mt-4 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded w-20 sm:w-28 font-light hover:opacity-90"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            }
          />
          {/* <div className="space-y-6 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-figTree text-purple-600">
              Shipping Address
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="* Full Name"
                      className="w-full border px-4 py-2 rounded-md"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-xs pt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      name="phone"
                      type="text"
                      placeholder="* Phone Number"
                      className="w-full border px-4 py-2 rounded-md"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs pt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    name="country"
                    as="select"
                    className="w-full border px-4 py-2 rounded-md"
                  >
                    <option>India</option>
                    <option>USA</option>
                  </Field>
                  <Field
                    name="street"
                    type="text"
                    placeholder="* Street"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <Field
                    name="city"
                    type="text"
                    placeholder="* City"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <Field
                    name="zip"
                    type="text"
                    placeholder="* Postal/Zip Code"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <Field
                    name="state"
                    type="text"
                    placeholder="* State/Province"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Field type="checkbox" name="saveShippingDetails" />
                  <label className="text-sm">Save Shipping details</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white py-2 rounded-md mt-6"
                >
                  Save
                </button>
              </Form>
            </Formik>
          </div> */}
          {/* </div> */}
        </div>

        {/* <div className="max-w-7xl mx-auto px-4 relative">
        <div className="p-6 rounded-lg shadow-md space-y-4 max-w-md border   bg-white">
          <button className="text-gray-700 text-sm hover:underline focus:outline-none">
            Clear Data
          </button>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">
              Generated Book Previews
            </p>
            <button className="bg-red-500 cursor-pointer text-white text-sm font-semibold py-1 px-4 rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div> */}

        {addAddress && (
          <AddressAdd
            isId={isId}
            isProfile={true}
            // bookId={idCart}
            addresses={addresses}
            onCancel={() => {
              setAddAddress(false);
            }}
            // onConfirm={() => {

            //    setAddAddress(false)
            // }}
            // onConfirm={handlePayment}
          />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
