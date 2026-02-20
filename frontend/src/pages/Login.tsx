import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🚨 VERY IMPORTANT

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // TEMP: replace with your API call
      console.log("Login data:", { email, password });

      // simulate success
      setTimeout(() => {
        alert("Login successful");
        navigate("/dashboard");
      }, 500);
    } catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Login failed");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>

        <h2>Log In</h2>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {/* ✅ FORM END */}

        <button
          className="link-btn"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>

        <p className="signup-text">
          Don&apos;t have an account?{" "}
          <span
            style={{ color: "#7c3aed", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
