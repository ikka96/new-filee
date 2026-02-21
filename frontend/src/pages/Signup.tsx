import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    const { password, confirmPassword, firstName, lastName } = form;

    if (password !== confirmPassword) return "Passwords do not match";
    if (password.length < 8) return "Minimum 8 characters required";
    if (password.toLowerCase().includes(firstName.toLowerCase()))
      return "Password should not contain your name";
    if (!/[A-Z]/.test(password)) return "Add one uppercase letter";
    if (!/[a-z]/.test(password)) return "Add one lowercase letter";
    if (!/[0-9]/.test(password)) return "Add one number";
    if (!/[!@#$%^&*]/.test(password))
      return "Add one special character";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.dob,
        email: form.email,
        password: form.password,
      });

      navigate("/verify-otp", {
        state: { email: form.email },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="signup-subtitle">Smart Inventory Automation</p>

        <div className="name-row">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <label className="field-label">DATE OF BIRTH</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-field">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            className="panda-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👀" : "🙈"}
          </span>
        </div>

        <input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Sending OTP..." : "Sign Up"}
        </button>

        <p className="login-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;