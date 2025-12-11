import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookie } from "../utils/cookies";

interface AdminPrivateRouteProps {
  Component: React.ComponentType<any>;
  [key: string]: any;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ Component, ...rest }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const adminToken = cookie.get("adminToken");
    
    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Only render component if authenticated
  return isAuthenticated ? <Component {...rest} /> : null;
};

export default AdminPrivateRoute;