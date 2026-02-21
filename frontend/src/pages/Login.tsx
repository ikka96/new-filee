import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/auth/login", { email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <div className="error-text">{error}</div>}

        <button type="submit">Log In</button>

        <div className="auth-links">
          <p onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;