import Navbar from "@/components/shared/navbar/Navbar";
import useVerifyAuth from "@/hooks/useVerifyAuth";
import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  useVerifyAuth();
  return (
    <Box width="100%" height="100%" sx={{}}>
      <Navbar />

      <Paper
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: 8,
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default MainLayout;
