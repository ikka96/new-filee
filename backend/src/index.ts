import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";

dotenv.config();

const app = express();

/* ================= Middleware ================= */

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));
app.use(express.json());

/* ================= Routes ================= */

// Auth routes
app.use("/api/auth", authRoutes);

// Protected routes (existing)
app.use("/api", protectedRoutes);

// ✅ Dashboard route (ADD THIS)
app.get("/api/dashboard", (_req, res) => {
  res.status(200).json({
    stats: {
      users: 10,
      products: 25,
      suppliers: 6,
      categories: 8,
      invoices: 14,
      payments: 9,
    },
    lowStockProducts: [
      { product_id: "p1", name: "Item A", stock: 2 },
      { product_id: "p2", name: "Item B", stock: 4 },
    ],
    recentInvoices: [
      {
        invoice_id: "inv1",
        supplier: { name: "ABC Suppliers" },
        status: "PAID",
      },
    ],
    recentPayments: [
      {
        payment_id: "pay1",
        amount: 1500,
        method: "UPI",
      },
    ],
    topCategories: [
      {
        name: "Electronics",
        productCount: 12,
        products: [],
      },
      {
        name: "Groceries",
        productCount: 8,
        products: [],
      },
    ],
  });
});

// Root test route
app.get("/", (_req, res) => {
  res.send("Backend is running");
});

/* ================= Server ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
