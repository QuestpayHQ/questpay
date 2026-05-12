import { Toaster } from "sonner";
import { Waitlist } from "@/pages";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Home } from "@/pages/main";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyOTP,
} from "./pages/auth";
import { AirtimePurchase, Dashboard, DataPurchase, Services } from "./pages/dashboard";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/home" element={<Home />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services">
          <Route index element={<Services />} />
          <Route path="data" element={<DataPurchase />} />
          <Route path="airtime" element={<AirtimePurchase />} />
        </Route>
      </Routes>
    </>
  );
}
