import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../store/slices/loginSlice.js";
import BasicLoader from "./basicLoader.js";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const navigate = useNavigate();

  const loading = useSelector((state) => state?.auth?.isResetPassword);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password too short")
        .required("Please fill password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm password"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const payload = {
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        token: token,
      };
      dispatch(
        resetPassword({
          ...payload,
          onSuccess: () => {
            navigate("/login");
          },
        })
      );
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
      password: true,
      confirmPassword: true,
    });

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    }
  };

  return (
    <div>
    <Helmet>   
      <title>StarMe - Reset Password</title>
      <meta
        name="description"
        content="Reset your StarMe password securely and regain access to your account. Continue creating magical, personalized storybooks for your little star."
      />
    </Helmet>

      <form onSubmit={handleFormSubmit} className="space-y-6 mt-5">
        <div>
          <label
            htmlFor="password"
            className=" block font-medium text-sm text-gray-700 font-figTree "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="New password"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`   border-gray-300 text-xs font-figTree pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200 rounded-md shadow-sm block w-full p-3 border  ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className=" block font-medium text-sm text-gray-700   font-figTree "
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className={`  border-gray-300 text-xs font-figTree pl-3 placeholder:text-stone-400 focus:border-purple-600 focus:ring-purple-200 rounded-md shadow-sm block w-full p-3 border ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className=" bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600  font-normal font-figTree  h-10 inline-flex items-center justify-center  hover:shadow-lg border border-transparent font-figtree rounded text-sm text-white transition ease-in-out duration-300 w-full text-center px-6 py-3 "
        >
          {loading ? <BasicLoader /> : "Reset Password"}
        </button>

       
      </form>
      <p className=" text-sm font-medium text-neutral-600 text-center mt-6">
        Remember your password?{" "}
        <a href="/login" className="text-purple-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;
