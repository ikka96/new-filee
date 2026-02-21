import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Avatar,
  Paper,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        overflowX: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* ================= Navigation Bar ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 4,
          px: 2,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "900px",
            bgcolor: "rgba(20, 20, 20, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "50px",
            px: 3,
            py: 1.5,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 32,
                border: "2px solid #fff",
                borderRadius: "12px 12px 4px 4px",
                opacity: 0.8,
              }}
            />
            <Typography sx={{ fontWeight: 600 }}>SIA</Typography>
          </Box>

          {/* Nav Links */}
          <Stack direction="row" spacing={4} sx={{ display: { xs: "none", md: "flex" } }}>
            {["About", "Help", "Contact", "Pricing"].map((text) => (
              <Typography
                key={text}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color: "#a1a1aa",
                  "&:hover": { color: "#fff" },
                }}
              >
                {text}
              </Typography>
            ))}
          </Stack>

          {/* CTA */}
          <Button
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              bgcolor: "rgba(147, 51, 234, 0.2)",
              color: "#d8b4fe",
              border: "1px solid rgba(147, 51, 234, 0.5)",
              borderRadius: "20px",
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(147, 51, 234, 0.4)" },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* ================= Hero Section ================= */}
      <Box sx={{ position: "relative", textAlign: "center", pt: 15, pb: 10, px: 2 }}>
        {/* Glow */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(126,34,206,0.6) 0%, rgba(0,0,0,0) 60%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "3.5rem", md: "6.5rem" },
              letterSpacing: "-0.05em",
              background: "linear-gradient(to bottom, #ffffff, #a1a1aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            Smart Inventory Automation
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#a1a1aa",
              maxWidth: "600px",
              mx: "auto",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Automate invoice processing, track inventory in real time, and
            eliminate manual errors using AI-powered OCR technology.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              bgcolor: "#fff",
              color: "#000",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { bgcolor: "#e4e4e7" },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* ================= Testimonials ================= */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "Alec Whitten",
              role: "CTO @ Tech Solutions",
              text:
                "Our inventory accuracy improved significantly after adopting SIA.",
            },
            {
              name: "Sophia Perez",
              role: "Operations Head",
              text:
                "Invoice automation saved hours of manual work every week.",
            },
          ].map((t, i) => (
            <Grid item xs={12} sm={6} md={5} key={i}>
              <Paper
                sx={{
                  bgcolor: "rgba(20,20,20,0.5)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  p: 3,
                  color: "#fff",
                }}
              >
                <Typography sx={{ mb: 3, color: "#d4d4d8" }}>
                  “{t.text}”
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#7e22ce" }}>{t.name[0]}</Avatar>
                  <Box>
                    <Typography fontWeight="bold">{t.name}</Typography>
                    <Typography variant="caption" color="#a1a1aa">
                      {t.role}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;