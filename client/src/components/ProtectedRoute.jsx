// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.role === 'admin') {
      return children;
    } else {
      localStorage.removeItem('token');
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;
