import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/OtpVerify.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  if (!email) {
    navigate("/signup");
  }

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleVerify = async () => {
    setError(null);
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/verify-otp", {
        email,
        otp: otpValue,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      await api.post("/auth/resend-otp", { email });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <h2>Enter OTP</h2>
        <p className="otp-subtitle">
          We have sent a verification code to<br />
          <span>{email}</span>
        </p>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
            />
          ))}
        </div>

        {error && <div className="otp-error">{error}</div>}

        <button className="otp-btn" onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="resend-text">
          Didn’t receive a code?{" "}
          <span onClick={handleResend}>
            {resendLoading ? "Sending..." : "Resend"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;