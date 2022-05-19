import React from "react";
// material
import { Box, Paper } from "@mui/material";
// components
import SideNavContent from "./SideNavContent";

// -------------------------------------------------------------------------------------------

function SideNav() {
  return (
    <Box sx={{ marginRight: "270px", minHeight: "800px", display: "flex" }}>
      <Paper elevation={0} sx={styles.wrapper}>
        {/* Nav content */}
        <SideNavContent />
      </Paper>
    </Box>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
  },
};

export default SideNav;
