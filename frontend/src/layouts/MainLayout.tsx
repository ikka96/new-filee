import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
            bgcolor: "#f4f6f8",
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
};

export default MainLayout;