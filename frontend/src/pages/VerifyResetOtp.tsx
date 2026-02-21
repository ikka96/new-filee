import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as any)?.email;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-reset-otp", { email, otp });
      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="login-page">
      <form className="auth-card" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyResetOtp;