import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "https://ai-space-ground-task-scheduler-backend.onrender.com/aiTaskSchedular/protect",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  // loading
  if (isAuthenticated === null) {
    return <h1>Loading...</h1>;
  }

  // not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // authenticated
  return children;
};

export default ProtectedRoute;
