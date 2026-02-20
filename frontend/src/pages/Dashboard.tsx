import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

/* ================= Types ================= */

type CategoryProduct = {
  id: string;
  name: string;
};

type TopCategory = {
  name: string;
  productCount: number;
  products: CategoryProduct[];
};

type HoveredCategory = {
  x?: number;
  y?: number;
  name: string;
  productCount: number;
};

type DashboardData = {
  stats: {
    users: number;
    products: number;
    suppliers: number;
    categories: number;
    invoices: number;
    payments: number;
  };
  lowStockProducts: {
    product_id: string;
    name: string;
    stock: number;
  }[];
  recentInvoices: {
    invoice_id: string;
    supplier: { name: string };
    status: string;
  }[];
  recentPayments: {
    payment_id: string;
    amount: number;
    method: string;
  }[];
  topCategories: TopCategory[];
};

/* ================= Component ================= */

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] =
    useState<HoveredCategory | null>(null);

  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ✅ Recharts 3.6.0 compatible handler */
  const handleMouseMove = (state: unknown) => {
    if (!state || typeof state !== "object") {
      setHoveredCategory(null);
      return;
    }

    const s = state as {
      activePayload?: Array<{
        payload: {
          name: string;
          productCount: number;
        };
      }>;
      chartX?: number;
      chartY?: number;
    };

    const payload = s.activePayload?.[0]?.payload;

    if (!payload) {
      setHoveredCategory(null);
      return;
    }

    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    tooltipTimeout.current = setTimeout(() => {
      setHoveredCategory({
        x: s.chartX,
        y: s.chartY,
        name: payload.name,
        productCount: payload.productCount,
      });
    }, 40);
  };

  if (loading || !data) {
    return (
      <MainLayout>
        <Typography color="white">Loading...</Typography>
      </MainLayout>
    );
  }

  const statCards = [
    { title: "Users", value: data.stats.users },
    { title: "Products", value: data.stats.products },
    { title: "Suppliers", value: data.stats.suppliers },
    { title: "Categories", value: data.stats.categories },
    { title: "Invoices", value: data.stats.invoices },
    { title: "Payments", value: data.stats.payments },
  ];

  return (
    <MainLayout>
      <Box sx={{ p: 3, bgcolor: "#000", minHeight: "100vh", color: "#fff" }}>
        {/* ================= Stat Cards ================= */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {statCards.map((card) => (
            <Grid item xs={6} md={2} key={card.title}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "#111",
                  textAlign: "center",
                  border: "1px solid #222",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#7c3aed", fontWeight: "bold" }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", textTransform: "uppercase" }}
                >
                  {card.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ================= Low Stock + Invoices ================= */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#111",
                border: "1px solid #222",
                height: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
                Low Stock Products
              </Typography>

              {data.lowStockProducts.length === 0 ? (
                <Typography variant="body2" color="gray">
                  No low stock products.
                </Typography>
              ) : (
                data.lowStockProducts.map((p) => (
                  <Box
                    key={p.product_id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">{p.name}</Typography>
                    <Typography variant="body2" color="error">
                      {p.stock} left
                    </Typography>
                  </Box>
                ))
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#111",
                border: "1px solid #222",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Recent Invoices
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ bgcolor: "#7c3aed" }}
                  onClick={() => navigate("/upload-invoice")}
                >
                  Upload Invoice
                </Button>
              </Box>

              {data.recentInvoices.length === 0 ? (
                <Typography variant="body2" color="gray">
                  No recent invoices.
                </Typography>
              ) : (
                data.recentInvoices.map((inv) => (
                  <Typography
                    key={inv.invoice_id}
                    variant="body2"
                    sx={{ mb: 1 }}
                  >
                    #{inv.invoice_id} — {inv.supplier.name}{" "}
                    <Box component="span" sx={{ color: "#7c3aed" }}>
                      ({inv.status})
                    </Box>
                  </Typography>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* ================= Chart ================= */}
        <Paper
          sx={{
            p: 3,
            bgcolor: "#111",
            border: "1px solid #222",
            mb: 3,
            position: "relative",
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
            Stock Levels by Top Categories
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data.topCategories}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="productCount"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {hoveredCategory && (
            <Box
              sx={{
                position: "absolute",
                top: hoveredCategory.y,
                left: hoveredCategory.x,
                bgcolor: "#000",
                p: 1,
                border: "1px solid #333",
                fontSize: 12,
                pointerEvents: "none",
              }}
            >
              <strong>{hoveredCategory.name}</strong>
              <br />
              Products: {hoveredCategory.productCount}
            </Box>
          )}
        </Paper>

        {/* ================= Payments ================= */}
        <Paper sx={{ p: 3, bgcolor: "#111", border: "1px solid #222" }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
            Recent Payments
          </Typography>

          {data.recentPayments.length === 0 ? (
            <Typography variant="body2" color="gray">
              No payments yet.
            </Typography>
          ) : (
            data.recentPayments.map((pmt) => (
              <Typography
                key={pmt.payment_id}
                variant="body2"
                sx={{ mb: 1 }}
              >
                #{pmt.payment_id} — Amount: {pmt.amount} ({pmt.method})
              </Typography>
            ))
          )}
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
