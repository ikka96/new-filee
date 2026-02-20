import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const onScroll = () => {
      els.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-root">

      {/* ================= NAVBAR ================= */}
      <nav className="landing-nav">
        <div className="nav-left">💡</div>

        <div className="nav-center">
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("dashboard")}>Dashboard</button>
          <button onClick={() => scrollTo("pricing")}>Pricing</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>

        <div className="nav-right">
          <button className="nav-cta" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="hero-section">
        <div className="hero-visual">
          <div className="globe glow-pulse"></div>
          <div className="ring ring-1 ring-spin"></div>
          <div className="ring ring-2 ring-spin-reverse"></div>
          <div className="ring ring-3 ring-fade"></div>
        </div>

        <div className="hero-content reveal">
          <h1 className="hero-title floating gradient-text">
            Smart Stock
          </h1>

          <p className="hero-subtitle floating-delay">
            AI-powered inventory automation to track, predict,
            and optimize stock effortlessly.
          </p>

          <button className="hero-btn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>
      </section>

      {/* ================= DASHBOARD ================= */}
      <section id="dashboard" className="dashboard-section reveal">
        <h2>Dashboard Preview</h2>
        <div className="dashboard-mock">
          <div className="chart"></div>
          <div className="stats">
            <div className="stat-card">Total Stock</div>
            <div className="stat-card">Low Alerts</div>
            <div className="stat-card">Invoices</div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="pricing-section reveal">
        <h2>Pricing Plans</h2>
        <div className="pricing-cards">
          <div className="price-card">
            <h3>Starter</h3>
            <p className="price">₹0</p>
          </div>
          <div className="price-card featured">
            <h3>Pro</h3>
            <p className="price">₹999 / month</p>
          </div>
          <div className="price-card">
            <h3>Enterprise</h3>
            <p className="price">Custom</p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact-section reveal">
        <h2>Contact Us</h2>
        <p>Email: support@sia-system.com</p>
        <p>Phone: +91 9XXXXXXXXX</p>
        <p>Bengaluru, India</p>
      </section>

      <footer className="landing-footer">
        © 2026 Smart Inventory Automation (SIA)
      </footer>
    </div>
  );
};

export default Landing;
