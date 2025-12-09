"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/slices/loginSlice.js";
import GoogleCustomButton from "./GoogleLogin.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BasicLoader from "./basicLoader.js";
import axios from "axios";
import { countryList, currencyList } from "../../../store/slices/loginSlice.js";
import { Helmet } from "react-helmet-async";
import { cookie } from "../../utils/cookies.js";

const Register: React.FC = () => {
  const dispatch = useDispatch();

  const countryListData = useSelector((state) => state?.auth?.countryList);
  useEffect(() => {
    dispatch(countryList());
  }, []);

  const countryName = localStorage.getItem("countrySave");

  const countryInitial = countryListData?.find(
    (item, ind) => item?.countryCode === countryName
  );

  const currencyData = useSelector((state) => state?.bookTemplate?.currency);
  const countryGet = useSelector((state) => state?.bookTemplate?.country);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      email: Yup.string()
        .required("Please fill email")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          "Invalid email (must include .com/.net/etc)"
        ),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(
          /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/,
          "Must contain at least one special character"
        ),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,     
        
          shipTo: countryGet?.countryCode,
        currency: currencyData?.currencyCode,
      };

      dispatch(
        register({
          ...payload,
          onSuccess: () => {
            cookie.remove("adminToken");
            cookie.remove("adminRefreshToken");
          },
        })
      );
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value) {
      formik.setFieldError(name, undefined);
    }
    formik.handleChange(e);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    formik.setTouched({
      name: true,
      email: true,
      password: true,
    });

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    }
  };

  const loading = useSelector((state) => state?.auth?.isRegister);

  return (
    <>
      <Helmet>
        <title> StarMe - Create Your StarMe Account</title>
        <meta
          name="description"
          content="Join StarMe to start creating magical, personalized storybooks starring your child. Sign up in seconds and bring their imagination to life"
        />
      </Helmet>
      <form onSubmit={handleFormSubmit} className="space-y-6 mt-2">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200  shadow-sm block w-full p-3 border rounded-lg ${
              formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1  font-figTree ">
              {formik.errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={` border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200 shadow-sm block w-full p-3 border rounded-lg ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1  font-figTree ">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={` border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200 shadow-sm block w-full p-3 border rounded-lg ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1  font-figTree ">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 text-white rounded font-normal text-sm font-figTree px-6 h-10 inline-flex items-center justify-center hover:shadow-lg  font-figtree  transition ease-in-out duration-300  text-center py-3"
        >
          {loading ? <BasicLoader /> : "Create Account"}
        </button>
      </form>
      <div className="flex items-center gap-2 mt-4">
        <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
          <div className="flex-1">
            <GoogleCustomButton />
          </div>
        </GoogleOAuthProvider>
      </div>

      <p className=" text-sm  text-neutral-600 text-center  font-medium mt-6 font-figTree">
        Already have an account?{" "}
        <a href="/login" className="text-purple-500 hover:underline">
          Login
        </a>
      </p>
    </>
  );
};

export default Register;
