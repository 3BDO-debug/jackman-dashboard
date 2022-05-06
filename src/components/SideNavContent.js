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
import { LoadingButton } from "@mui/lab";
// atoms
import drawerAtom from "../recoil/atoms/drawerAtom";
import alertAtom from "../recoil/atoms/alertAtom";
// __apis__
import { logoutRequest } from "../__apis__/auth";
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
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(alertAtom);

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

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutRequest()
      .then(() => {
        navigate("/login");
        setAlert({
          status: "open",
          variant: "success",
          message: "Logged out successfully.",
        });
      })
      .catch(() =>
        setAlert({
          status: "open",
          variant: "error",
          message: "Sorry!, we couldnt process your request at the moment.",
        })
      );
    setLoggingOut(false);
  };

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
        <LoadingButton
          color="error"
          startIcon={
            <Icon
              icon="majesticons:logout"
              color={muiTheme.palette.error.main}
              width={25}
              height={25}
            />
          }
          loading={loggingOut}
          disabled={loggingOut}
          onClick={handleLogout}
        >
          Log Out
        </LoadingButton>
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
