import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookie } from "../utils/cookies";

interface PrivateRouteProps {
  Component: React.ComponentType<any>;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component, ...rest }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const token = cookie.get("token");
    
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Only render component if authenticated
  return isAuthenticated ? <Component {...rest} /> : null;
};

export default PrivateRoute;
