import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Drawer, DrawerHeader } from "./navbar.styles";
import { InavigationItem } from "@/types/navigation.types";
import { verifyAuthority } from "@/utils/auth.utils";
import { navigationItems } from "@/configs/navigation.config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Logout from "@/views/auth/Logout";

const ControlPanelDrawer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const authority = useSelector(
    (state: RootState) => state.auth.authorizations
  );
  const [open, setOpen] = useState(false);
  const [accordionState, setAccordionState] = useState<{
    [key: string]: boolean;
  }>({});
  const [profileOpen, setProfileOpen] = useState(false); // State for profile accordion
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAccordionToggle = (name: string) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  useEffect(() => {
    if (!open) {
      setProfileOpen(false);
      setAccordionState({});
    }
  }, [open]);

  const renderNavItem = (item: InavigationItem) => (
    <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        selected={location.pathname === item.path}
        onClick={() => {
          navigate(item.path);
          if (isMobile) {
            setOpen(false);
          }
        }}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          ".MuiListItemIcon-root": {
            justifyContent: "center",
          },
          ".MuiListItemText-root": {
            textAlign: "left",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );

  const renderAccordionNavItem = (item: InavigationItem) => (
    <Box key={item.name}>
      <ListItemButton
        onClick={() => handleAccordionToggle(item.name)}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
        {open && (accordionState[item.name] ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={accordionState[item.name]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children?.map((child) => (
            <ListItemButton
              key={child.name}
              sx={{ pl: 4 }}
              selected={location.pathname === child.path}
              onClick={() => {
                navigate(child.path);
                if (isMobile) {
                  setOpen(false);
                }
              }}
            >
              <ListItemIcon>
                <child.icon />
              </ListItemIcon>
              <ListItemText primary={child.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerToggle}
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems.map((item: InavigationItem) =>
            verifyAuthority(item.authority, authority)
              ? item.children
                ? renderAccordionNavItem(item)
                : renderNavItem(item)
              : null
          )}
        </List>
        <Divider />
        {/* Profile Accordion */}
        <Box sx={{ marginTop: "auto" }}>
          <ListItemButton onClick={handleProfileToggle}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            {open && (profileOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={profileOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText primary={user.authorizations?.join(", ")} />
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                <Logout />
              </ListItem>
            </List>
          </Collapse>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ControlPanelDrawer;
