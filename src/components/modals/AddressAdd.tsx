import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormField from "../ui/FormField";
import { useDispatch, useSelector } from "react-redux";
import { RiInformationLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { countryList, statesList } from "../../../store/slices/loginSlice.js";
import {
  city,
  shippingAddress,
  addressUpdate,
  getAddress,
} from "../../../store/slices/bookTemplateSlice.js";

const AddressAdd = ({
  onCancel,
  isProfile,
  isId,
  addresses,
  bookId,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    // Save original overflow style
    const originalOverflow = document.body.style.overflow;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scroll when modal closes
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const validationSchema = Yup.object({
    country: Yup.string().required("Country is required"),
    fullName: Yup.string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .min(4, "Phone number must be at least 4 characters")
      .max(20, "Phone number must not exceed 20 characters")
      .matches(
        /^[0-9()+\-\s.]+$/,
        "Only numbers, (), +, -, spaces, and periods are allowed"
      ),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    postal: Yup.string()
      .required("Postal/Zip Code is required and must not exceed 20 characters")
      .max(20, "Postal/Zip Code is required and must not exceed 20 characters"),
    state: Yup.string().required("State/Province is required"),
    apt: Yup.string()
      .required("apt address is required")
      .max(35, "Maximum 35 characters allowed")
      .nullable(),
  });
  
  const [selected, setSelected] = useState("");
  const [tooltip, setTooltip] = useState(false);
  const [tooltipState, setTooltipState] = useState(false);
  const [tooltipCity, setTooltipCity] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  
  const [selectedCity, setSelectedCity] = useState("");

  const dispatch = useDispatch();
  const countryListData = useSelector((state) => state?.auth?.countryList);
  const cityList = useSelector((state) => state?.bookTemplate?.cityData?.data);
  const stateList = useSelector((state) => state?.auth?.statesList);
  
  useEffect(() => {
    dispatch(countryList());
  }, []);
  
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
  
  const requestSupportList = useSelector(
    (state) => state?.bookTemplate?.requestSupportData?.data
  );
  
  const updateData = addresses?.find((v) => {
    return v?._id === isId;
  });

  useEffect(() => {
    if (updateData && isId) {
      const matchedCountry = countryListData?.find(
        (c) => c.countryName === updateData.country
      );
      setSelected(matchedCountry);

      const matchedState = stateList?.find((s) => s.name === updateData.state);
      setSelectedState(matchedState);
    }
  }, [updateData, countryListData, isId]);

  return (
    <>
    <div className="fixed inset-0  bg-gray-400 bg-opacity-90 transition-opacity flex items-center justify-center  pt-5 pb-4 sm:pb-0 sm:pt-24 ">
        <div className="relative bg-white rounded-lg shadow-2xl p-4 w-72 sm:w-[600px] max-h-[58vh] overflow-y-auto">
          <h2 className="pb-4 font-semibold text-custom-purple text-sm font-figTree">
            ​ Shipping Address
          </h2>

          <Formik
            enableReinitialize={true}
            initialValues={{
              country: isId ? updateData?.country : "",
              fullName: isId ? updateData?.fullName : "",
              phone: isId ? updateData?.phoneNumber : "",
              street: isId ? updateData?.street : "",
              city: isId ? updateData?.city : "",
              postal: isId ? updateData?.zipCode : "",
              state: isId ? updateData?.state : "",
              apt: isId ? updateData?.apartment : "",
              saveShipping: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(getAddress({  onSuccess: () => {
                onCancel();
          
              },}));

              if (isId) {
                dispatch(
                  addressUpdate({
                    id: isId,
                    fullName: values?.fullName,
                    phoneNumber: values?.phone,
                    country: values?.country,
                    street: values?.street,
                    city: values?.city,
                    zipCode: values?.postal,
                    state: values?.state,
                    apt: values?.apt,
                    onSuccess: () => {
                      onCancel();
                      dispatch(getAddress({}));
                    },
                  })
                );
              } else if (isProfile) {
                dispatch(
                  shippingAddress({
                    fullName: values?.fullName,
                    phoneNumber: values?.phone,
                    country: selected?.countryName,
                    street: values?.street,
                    city: values?.city,
                    state: selectedState?.name,
                    zipCode: values?.postal,
                    apartment: values?.apt,
                    saveShippingDetails: true,
                    onSuccess: () => {
                      onCancel();
                      dispatch(getAddress({}));
                    },
                  })
                );
              } 
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
              return (
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-4 flex-col sm:flex-row"
                >
                  <div className="flex-1 w-full bg-white rounded-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      <FormField
                        isSpace={true}
                        name="fullName"
                        label="Full Name"
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
                        isSpace={true}
                        type="text"
                        isNumber={true}
                        label="Phone Number"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      <div className="relative">
                        <label className="block mb-1 text-xs text-gray-700 font-figTree font-medium">
                          Country
                        </label>
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
                          className={`w-full placeholder:text-xs md:placeholder:text-sm rounded-lg text-sm h-10 placeholder-gray-500/50 border border-gray-300 focus:outline-none focus:ring-0 focus:border-purple-500 leading-none
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
                          <option value="" className="text-gray-400 text-xs">
                            Select Country
                          </option>
                          {countryListData?.map(
                            (country: string, index: number) => (
                              <option key={index} value={country?.countryName}>
                                {country?.countryName}
                              </option>
                            )
                          )}
                        </select>

                        <div
                          className="absolute top-8 right-8 flex items-center cursor-pointer"
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

                      <div className="relative">
                        <label className="block font-medium text-sm text-gray-700 pb-1 text-neutral-600 text-xs font-figTree">
                          State
                        </label>

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
                          className={`focus:ring-purple-500 w-full placeholder:text-xs md:placeholder:text-sm rounded-lg text-sm h-10 placeholder-gray-500/50 border border-gray-300 focus:outline-none focus:ring-0 focus:border-purple-500 leading-none ${
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
                          {stateList?.map((state: string, index: number) => (
                            <option key={index} value={state.name}>
                              {state?.name}
                            </option>
                          ))}
                        </select>

                        <div
                          className="absolute top-8 sm:top-8 right-8 sm:right-8 flex items-center cursor-pointer"
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 relative">
                      <FormField
                        name="street"
                        isSpace={true}
                        placeholder="* Street"
                        label="Street"
                        value={values.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.street}
                        touched={touched.street}
                        messages=" Street address is required."
                      />

                      <FormField
                        name="apt"
                        isSpace={true}
                        label="Apt #, Building, etc.(leave blank if none)"
                        placeholder="Apt #, Building, etc."
                        value={values.apt}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.apt}
                        touched={touched.apt}
                        tooltipLine={2}
                        messages="Option second address line, max 35 characters"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 relative">
                    <FormField
                             name="city"
                             isSpace={true}
                               label="City"
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
                        isSpace={true}
                        label="Postal/Zip Code"
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
                    {!isProfile && (
                      <div className="flex items-center space-x-1 mt-2">
                        <input
                          type="checkbox"
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
                                zipCode: values?.postal,
                                saveShippingDetails: e.target.checked,
                              })
                            );
                          }}
                          className="w-3 h-3 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="saveShipping"
                          className="text-xs font-figTree"
                        >
                          Save Shipping details
                        </label>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        className="mt-4 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded w-20 sm:w-28 font-light hover:opacity-90"
                        onClick={onCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="mt-4 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded w-20 sm:w-28 font-light hover:opacity-90"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddressAdd;