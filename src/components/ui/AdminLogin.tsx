import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { adminLogin } from "../../../store/slices/loginSlice.js";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleCustomButton from "./GoogleLogin.js";
import BasicLoader from "./basicLoader.js";
import { cookie } from "../../../src/utils/cookies";


const AdminLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // No redirect logic here - users can access this page regardless of token status
  // If you want to redirect logged-in users away from login, you can add logic here
  // For now, letting anyone access this page as normal login would

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please fill email")
        .matches(
          /^[^\s@]+@[^\\s@]+\.[^\\s@]{2,}$/,
          "Invalid email (must include .com/.net/etc)"
        ),
      password: Yup.string()
        .required("Password is required")
   
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const payload = {
        ...values,
        onSuccess: () => {
          cookie.remove("token");
          // On successful login, navigate to admin dashboard or specific admin page
          // You might want to verify that this user is an admin before allowing access
          // For now, we'll assume successful login means 
      // valid admin access
      
          navigate("/admin/dashboard", { replace: true }); // Adjust this path as needed
        },
      };
      dispatch(adminLogin({ ...payload }));
    },
  });

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
      email: true,
      password: true,
    });

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    }
  };

  const loading = useSelector((state) => state?.auth?.isAdminLogin);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`  border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200 shadow-sm block w-full p-3 border rounded-lg ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-purple-400"
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
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
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 text-white py-2 text-sm rounded font-normal font-figTree"
        >
          {loading ? <BasicLoader /> : "Log in as Admin"}
        </button>

        <div className="flex justify-end text-sm text-purple-500  font-medium font-figTree mt-2 ">
          <a href="/forgot-password" className="hover:underline">
            Forgot your password?
          </a>
        </div>
        <div className="flex items-center gap-2 mt-4">
        {/* <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
          <div className="flex-1">
            <GoogleCustomButton />
          </div>
        </GoogleOAuthProvider> */}
      </div>

      </div>

      <p className="text-center mt-0 font-figTree text-sm font-medium  text-neutral-600">
        Not an admin?{" "}
        <a href="/login" className="text-purple-500 hover:underline">
          Go to user login
        </a>
      </p>
    </form>
  );
};

export default AdminLogin;