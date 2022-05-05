import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
// material
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
// atoms
import drawerAtom from "../recoil/atoms/drawerAtom";
// assets
import logo from "../assets/images/logo.png";
import theme from "../theme";
import { useSetRecoilState } from "recoil";

// -----------------------------------------------------------------------------

const NavButton = styled(ListItemButton)`
  .Mui-selected {
    background-color: red !important;
  }
`;

const NavItem = ({ navItem }) => {
  const muiTheme = useTheme(theme);
  const navigate = useNavigate();
  const { label, icon, active, path } = navItem;
  const setDrawer = useSetRecoilState(drawerAtom);

  const handleNavButtonClick = () => {
    setDrawer(false);
    navigate(path);
  };

  return (
    <NavButton selected={active} onClick={handleNavButtonClick}>
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

// -----------------------------------------------------------------------------

function SideNavContent() {
  const muiTheme = useTheme(theme);

  const navItems = useState([
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
  ])[0];

  return (
    <Box sx={styles.container}>
      {/* Logo wrapper */}
      <Box sx={styles.logoWrapper} />
      {/* Nav items container */}
      <List>
        {navItems.map((navItem, index) => (
          <NavItem key={index} navItem={navItem} />
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
  );
}

const styles = {
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

export default SideNavContent;
