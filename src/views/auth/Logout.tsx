import { logout } from "@/store/slices/auth.slice";
import { persistor } from "@/store/store";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Tooltip, useTheme } from "@mui/material";
import ApiService from "@/services/ApiService";

/**
 * Component for Google logout functionality.
 * This component handles user logout from Google authentication.
 * Upon logout, it dispatches the logout action to the Redux store, purges persisted state, and navigates the user to the authentication login page.
 */
const Logout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Function to handle user sign-out from Google authentication.
   * It performs Google logout, dispatches logout action to Redux store, purges persisted state, and navigates the user to the authentication login page.
   */
  const handleSignOut = async () => {
    await googleLogout();
    await ApiService.post("user/logout");
    dispatch(logout());
    await persistor.purge();
    navigate("/auth/login");
  };

  return (
    <Tooltip title="Sign Out">
      <Button
        onClick={handleSignOut}
        variant="outlined"
        color="primary"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: theme.shadows[2],
        }}
        startIcon={<LogoutIcon sx={{ fontSize: "1.5rem" }} />}
      >
        Logout
      </Button>
    </Tooltip>
  );
};

export default Logout;
