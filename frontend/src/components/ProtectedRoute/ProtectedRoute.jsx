import { Navigate } from 'react-router-dom';
import apiService from '../../api';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userID = localStorage.getItem('userID');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) {
        setLoading(false);
        return;
      }
      try {
        const response = await apiService.CheckRole(userID);
        setUserRole(response.role);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userID]);

  if (!userID) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
