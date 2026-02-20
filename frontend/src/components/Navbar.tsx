import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/login");               // redirect to login
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>

        {/* LEFT: App Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Smart Inventory Automation
        </Typography>

        {/* SPACER */}
        <Box sx={{ flexGrow: 1 }} />

        {/* RIGHT: Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>

          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/upload-invoice"
          >
            Upload Invoice
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/inventory"
          >
            Inventory
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/payments"
          >
            Payments
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
