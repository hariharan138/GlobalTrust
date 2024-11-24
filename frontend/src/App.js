import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/AdminCompos/Dashboard';
import SetPage from './SetPage'; // Assuming you have a settings page.
import AllUser from './components/AdminCompos/AllUser';
import AllTrust from './components/AdminCompos/AllTrust';
import LoginPage from './components/LoginPage';
import TrustPage from './components/TrustPage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminCompos/AdminPage';
import TrustLogin from './components/TrustLogin';
import UserLogin from './components/UserLogin';
import ContactUs from './components/ContactUs';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';

function App() {
  return (
    <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/trustlogin" element={<TrustLogin/>} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/contact" element={<ContactUs/>} />




        {/* admin login page does not protected */}
        <Route path="/admin" element={<AdminPage />} />
        
        {/* pages where the admin should be a loggedin user then only he can access these pages */}
        <Route path="/Home" element={<ProtectedRoute requiredRole="admin">
          <Dashboard />
        </ProtectedRoute>} />

        <Route path="/alluser" element={<ProtectedRoute requiredRole="admin">
          <AllUser/>
        </ProtectedRoute>} />

        <Route path="/alltrust" element={<ProtectedRoute requiredRole="admin">
          <AllTrust />
        </ProtectedRoute>}/>

        <Route path="/set" element={<SetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
