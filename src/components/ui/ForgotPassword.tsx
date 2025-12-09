import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../store/slices/loginSlice.js";
import BasicLoader from "./basicLoader.js";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.auth?.isForgotPassword);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please fill email")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          "Invalid email (must include .com/.net/etc)"
        ),
    }),
    onSubmit: (values) => {
      dispatch(
        forgotPassword({
          email: values?.email,
          onSuccess: () => {
            navigate("/login");
          },
        })
      );
    },
  });
  return (
    <>
      <Helmet>
        <title>StarMe - Forgot Password</title>
        <meta
          name="description"
          content="Forgot your StarMe password? No worries! Enter your email to receive a password reset link and continue creating magical personalized storybooks for your child."
        />
      </Helmet>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200 rounded-md shadow-sm block w-full p-3 border rounded-lg"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r text-sm from-purple-500 to-pink-500 hover:bg-purple-600 text-white py-2 rounded font-normal font-figTree "
        >
          {loading ? <BasicLoader /> : "Email Password Reset Link"}
        </button>

        <p className=" text-sm font-medium text-neutral-600 text-center mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-purple-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </>
  );
};

export default ForgotPassword;
