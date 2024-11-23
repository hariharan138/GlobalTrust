import React, { useEffect, useState } from 'react'
import  jwt  from 'jsonwebtoken';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children, requiredRole }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
  
    useEffect(() => {
      // Get the token from cookies
      const admintoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('admintoken='));
  
      if (admintoken) {
        const token = admintoken.split('=')[1];
        try {
          const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECREAT_KEY);
          if (decoded) {
            setIsLoggedIn(true);
            setUserRole(decoded.role); // Set the role from the token
          }
        } catch (err) {
          setIsLoggedIn(false); // Invalid or expired token
        }
      } else {
        setIsLoggedIn(false); // No token found
      }
    }, []);
  
    if (!isLoggedIn || (requiredRole && userRole !== requiredRole)) {
      // Redirect to the corresponding login page based on the role
      if (requiredRole === 'admin') {
        return <Navigate to="/adminlogin" />;
      } else if (requiredRole === 'user') {
        return <Navigate to="/userlogin" />;
      } else {
        return <Navigate to="/login" />;
      }
    }
  
    // If logged in and role matches, render the children (protected route)
    return children;
}

export default ProtectedRoute