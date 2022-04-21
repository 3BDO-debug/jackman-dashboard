import React, { useState } from "react";
import { Icon } from "@iconify/react";
// material
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
// assets
import logo from "../assets/images/logo.png";
import theme from "../theme";
// components
import { MotionViewport, varSlide } from "./animate";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------

const NavButton = styled(ListItemButton)`
  .Mui-selected {
    background-color: red !important;
  }
`;

const NavItem = ({ navItem }) => {
  const muiTheme = useTheme(theme);
  const navigate = useNavigate();
  const { label, icon, active, path } = navItem;

  return (
    <NavButton selected={active} onClick={() => navigate(path)}>
      <ListItemIcon>
        <Icon
          icon={icon}
          width={24}
          height={24}
          color={muiTheme.palette.primary.main}
        />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="subtitle2">{label}</Typography>
      </ListItemText>
    </NavButton>
  );
};

// ---------------------------------------------------------------

function SideNav() {
  const muiTheme = useTheme(theme);

  const [navItems, setNavItems] = useState([
    { label: "Home", icon: "ci:home-fill", active: false, path: "/home" },
    {
      label: "Pending",
      icon: "bi:clock-history",
      active: false,
      path: "/pending-requests",
    },
    {
      label: "Accepted",
      icon: "akar-icons:circle-check",
      active: false,
      path: "/accepted-requests",
    },
    {
      label: "Rejected",
      icon: "charm:circle-cross",
      active: false,
      path: "/rejected-requests",
    },
  ]);

  return (
    <MotionViewport variants={varSlide().inRight} sx={{ marginRight: "270px" }}>
      <Paper elevation={0} sx={styles.wrapper}>
        {/* Main container */}
        <Box sx={styles.container}>
          {/* Logo wrapper */}
          <Box sx={styles.logoWrapper} />
          {/* Nav items container */}
          <List>
            {navItems.map((navItem) => (
              <NavItem navItem={navItem} />
            ))}
          </List>
          {/* Nav action wrapper */}
          <Box sx={styles.navActionWrapper}>
            <Button
              color="error"
              startIcon={
                <Icon
                  icon="majesticons:logout"
                  color={muiTheme.palette.error.main}
                  width={25}
                  height={25}
                />
              }
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Paper>
    </MotionViewport>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  logoWrapper: {
    backgroundImage: `url(${logo})`,
    width: "200px",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginBottom: "90px",
  },
  navItemsWrapper: {
    paddingLeft: "20px",
  },
  navActionWrapper: {
    marginTop: "35%",
    marginBottom: "56px",
    paddingLeft: "20px",
    flex: 1,
  },
};

export default SideNav;
