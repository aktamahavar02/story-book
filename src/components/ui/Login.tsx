import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { cookie } from "../../utils/cookies";
import { toast } from "react-hot-toast";
import { isValidCredentials, staticUser } from "../../utils/staticData";

const Login: React.FC = () => {
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
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      if (isValidCredentials(values.email, values.password)) {
        // Set authentication token
        cookie.set("token", "static-auth-token");
        
        // Save user data
        localStorage.setItem("user", JSON.stringify(staticUser));

        toast.success("Login Successful!");
        
        // Navigate to home page
        navigate("/", { replace: true });
        
      } else {
        toast.error("Invalid email or password");
      }
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border p-3 rounded w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="border p-3 rounded w-full"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 w-full rounded"
        >
          Log in
        </button>
      </form>
  );
};

export default Login;