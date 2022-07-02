import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// material
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// atoms
import drawerAtom from "../recoil/atoms/drawerAtom";
import userAtom from "../recoil/atoms/userAtom";

// ------------------------------------------------------------------------------------

function Header() {
  const [drawer, setDrawer] = useRecoilState(drawerAtom);
  const userInfo = useRecoilValue(userAtom);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Box sx={styles.container}>
      {/* Titles wrapper */}
      <Box sx={styles.titlesWrapper}>
        <Typography variant="h6">
          Good Morning, {userInfo.firstName} {userInfo.lastName}!
        </Typography>
      </Box>
      {/* Right side actions wrapper */}
      <Box sx={styles.rightSideActionsWrapper}>
        {/* Avatar wrapper */}
        <Box sx={styles.avatarWrapper}>
          <Avatar
            src={userInfo.firstName}
            alt={userInfo.firstName}
            sx={{ backgroundColor: "#496360" }}
          />
        </Box>
        {/* Menu icon wrapper */}
        <Box
          sx={{
            ...styles.menuIconWrapper,
            display: {
              xs: "block",
              sm: "block",
              md: "block",
              lg: "none",
              xl: "none",
            },
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {drawer ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titlesWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  rightSideActionsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    marginLeft: "70px",
  },
  menuIconWrapper: {
    marginLeft: "10px",
  },
};

export default Header;
