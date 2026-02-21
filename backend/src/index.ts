import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

/* ================= Middleware ================= */
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));

app.use(express.json());

/* ================= Routes ================= */

// 🔐 Auth routes (signup, login, otp, forgot password)
app.use("/api/auth", authRoutes);

// 🧪 Health check
app.get("/", (_req, res) => {
  res.send("Backend is running");
});

/* ================= Server ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

app.use((req, _res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});