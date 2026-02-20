import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import OtpVerify from "../pages/OtpVerify";
import InvoiceUpload from "../pages/InvoiceUpload";
import Inventory from "../pages/Inventory";
import Payments from "../pages/Payments";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<OtpVerify />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload-invoice" element={<InvoiceUpload />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/payments" element={<Payments />} />
    </Routes>
  );
};

export default AppRoutes;
