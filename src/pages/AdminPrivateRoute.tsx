import React from "react";
import { useNavigate } from "react-router-dom";
import { cookie } from "../utils/cookies";

const AdminPrivateRoute = ({ Component, ...rest }: { Component: React.FC }) => {
  const navigate = useNavigate();
  const adminToken = cookie.get("adminToken");

  React.useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login"); // Redirect to admin login if no admin token
    }
  }, [adminToken, navigate]);

  // Only render the Component if the admin token exists
  return adminToken ? <Component {...rest} /> : null;
};

export default AdminPrivateRoute;