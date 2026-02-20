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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password validation (industry-correct "uniqueness")
  const validatePassword = () => {
    const { password, confirmPassword, firstName, lastName } = form;

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (
      password.toLowerCase().includes(firstName.toLowerCase()) ||
      password.toLowerCase().includes(lastName.toLowerCase())
    ) {
      return "Password should not contain your name";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must include at least one special character";
    }

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
      await api.post("/auth/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.dob,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful");
      navigate("/login");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        setError(err.response?.data?.message || "Signup failed");
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="signup-subtitle">
          Smart Inventory Automation
        </p>

        {/* First & Last Name */}
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


        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
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
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🐼👀" : "🐼🙈"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="password-field">
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error */}
        {error && <div className="error-text">{error}</div>}

        {/* Submit */}
        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        {/* Login switch */}
        <p className="login-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
