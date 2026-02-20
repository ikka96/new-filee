import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Content overlay */}
      <div className="landing-content">
        <h1 className="landing-title">
          Smart <span>Stock</span>
        </h1>

        <p className="landing-subtitle">
          Streamline your inventory management with advanced AI technology.
          Automate data entry, track real-time updates, and optimize operations
          effortlessly — all in one smart platform.
        </p>

        <div className="landing-actions">
          <button
            className="get-started-btn"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
