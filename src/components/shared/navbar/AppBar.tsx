import React from "react";
import { Box, IconButton, styled, useTheme } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "./navbar.styles";

interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleDrawerToggle?: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type ControlPanelAppBarProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

/**
 * ControlPanelAppBar component for the Control Panel.
 * Renders the app bar with a menu icon for mobile, theme selector, and language selector.
 */
const ControlPanelAppBar: React.FC<ControlPanelAppBarProps> = ({
  open,
  handleDrawerToggle,
}) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      open={open}
      dir={theme.direction}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar>
        {open && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            ml: 1,
          }}
        ></Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        ></Box>
      </Toolbar>
    </AppBar>
  );
};

export default ControlPanelAppBar;
