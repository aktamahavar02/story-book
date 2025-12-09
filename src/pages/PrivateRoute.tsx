import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cookie } from "../utils/cookies";
import { profile } from '../../store/slices/loginSlice.js';
import { useDispatch } from "react-redux";
const PrivateRoute = ({ Component , ...rest}: { Component: React.FC }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = cookie.get("token");
  const adminToken = cookie.get("adminToken");
  
  useEffect(() => {
    // If user doesn't have a regular token, redirect to login
    if (!token) {
      navigate("/login");
    } 
    // If user has both tokens (rare case) or only admin token, redirect to admin login
    // This handles the case where an admin tries to access user routes
    else if (adminToken) {
      // Admins should use admin routes, redirect to admin dashboard
      navigate("/admin/dashboard"); 
    } else {
      // Regular user with only user token can proceed
      // dispatch(profile());
    }
  }, [token, adminToken, dispatch, navigate]);

  // ✅ Only render the Component if the user token exists and no admin token exists
  return token && !adminToken ? <Component {...rest} /> : null;
};

export default PrivateRoute;
