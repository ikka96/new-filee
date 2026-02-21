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
        pt: 2,
      }}
    >
      <List>
        {[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Upload Invoice", path: "/upload-invoice" },
          { label: "Inventory", path: "/inventory" },
          { label: "Payments", path: "/payments" },
        ].map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.path}
            sx={{
              "&:hover": {
                backgroundColor: "#2d2d44",
              },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;