import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/AdminCompos/Dashboard';
import SetPage from './SetPage'; // Assuming you have a settings page.
import AllUser from './AllUser';
import AllTrust from './AllTrust';
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


    {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/admin" element={<AdminPage />} />
      {/* <Route path="/" element={<Dashboard/>} /> */}
        <Route path="/Home" element={<Dashboard/>} />
        <Route path="/alluser" element={<AllUser/>} />
        <Route path="/set" element={<SetPage />} />
        <Route path="/alltrust" element={<AllTrust />}/>
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
