import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { cookie } from "../../utils/cookies";
import { toast } from "react-hot-toast";
import { isValidAdminCredentials, staticAdmin } from "../../utils/staticData";


const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please fill email")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          "Invalid email (must include .com/.net/etc)"
        ),
      password: Yup.string()
        .required("Password is required")
   
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (isValidAdminCredentials(values.email, values.password)) {
        // Set admin token
        cookie.set("adminToken", "static-admin-token");
        cookie.remove("token"); // Remove user token if exists
        
        // Save admin data
        localStorage.setItem("admin", JSON.stringify(staticAdmin));

        toast.success("Admin Login Successful!");
        
        // Navigate to admin dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast.error("Invalid admin credentials");
      }
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

  const [loading] = useState(false);

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
          {loading ? "Loading..." : "Log in as Admin"}
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