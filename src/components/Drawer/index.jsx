import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LogoutOutlined } from "@ant-design/icons"; // Import the UploadOutlined icon
import { Typography, Button } from "antd";
import drawerOptions from "./content";
import styles from "./styles.module.scss";
const {
  selectedTab,
  logOutBtn,
  headerContainer,
  tabFontSize,
  logo,
  textColor,
  logOutBtnContent,
  buttonIcon,
  buttonText,
} = styles;
const { Title } = Typography;
const drawerWidth = 240;

const handleLogoClick = () => {
  window.location.href = "/";
};
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ContentWrapper = styled("div")(({ open }) => ({
  marginLeft: open ? `${drawerWidth}px` : "0",
  transition: "margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  overflowX: "hidden",
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
}));

export default function RightMiniVariantDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(drawerOptions[0].name); // Initialize with the name of the first tab
  const handleLogOut = (text) => {
    sessionStorage.removeItem("authToken");
    window.location.href = "/signin";
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (text) => {
    setSelectedItem(text);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className={headerContainer}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            sx={{
              marginLeft: "auto",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className={logo} onClick={handleLogoClick}>
            <img src="/assets/images/npc_logo.png" alt="NPC Logo" />
            <div>
              <Title level={5} className={textColor}>
                HR Employment
              </Title>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="right" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerOptions?.map((el, index) => (
            <ListItem
              key={el.name}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleItemClick(el.name)}
              className={selectedItem === el.name ? selectedTab : ""}
            >
              <ListItemButton
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
                  {el.icon}
                </ListItemIcon>
                <ListItemText
                  primary={el.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  className={tabFontSize}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {open && (
            <ListItem
              // key={el.name}
              disablePadding
              sx={{ display: "block" }}
            >
              <Button
                danger
                className={logOutBtn}
                onClick={() => handleLogOut()}
              >
                <div className={logOutBtnContent}>
                  <div className={buttonText}>تسجيل الخروج</div>
                </div>
                <div className={buttonIcon}>
                  <LogoutOutlined />
                </div>
              </Button>
            </ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
      <ContentWrapper style={{ marginTop: "50px" }}>
        {selectedItem
          ? drawerOptions.find((el) => el.name === selectedItem).content
          : "Select a tab to view its content."}
      </ContentWrapper>
    </Box>
  );
}
