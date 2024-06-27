import { Box, styled, useTheme } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "./navbar.styles";

interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
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
};

/**
 * ControlPanelAppBar component for the Control Panel.
 * Renders the app bar with Via logo, theme selector, and language selector.
 */
const ControlPanelAppBar: React.FC<ControlPanelAppBarProps> = ({ open }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      open={open}
      dir={theme.direction}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar>
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
