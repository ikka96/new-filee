import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "#1e1e2f",
        color: "white",
        height: "100vh",
      }}
    >
      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/upload-invoice">
          <ListItemText primary="Upload Invoice" />
        </ListItemButton>

        <ListItemButton component={Link} to="/inventory">
          <ListItemText primary="Inventory" />
        </ListItemButton>

        <ListItemButton component={Link} to="/payments">
          <ListItemText primary="Payments" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
