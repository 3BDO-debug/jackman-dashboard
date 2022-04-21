import React from "react";
// material
import { Avatar, Box, Divider, Typography } from "@mui/material";

// -------------------------------------------------------------

function Header() {
  return (
    <Box sx={styles.container}>
      {/* Titles wrapper */}
      <Box sx={styles.titlesWrapper}>
        <Typography variant="h6">Good Morning, Seif Yasser!</Typography>
      </Box>
      {/* Avatar wrapper */}
      <Box sx={styles.avatarWrapper}>
        <Avatar alt="profile-name" />
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titlesWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  avatarWrapper: {
    marginLeft: "70px",
  },
};

export default Header;
