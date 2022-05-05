import React, { useWindowDimensions } from "react";
// material
import { Box } from "@mui/material";
// assets
import hero from "../../assets/images/hero.png";
import loginLogo from "../../assets/images/loginLogo.png";

// -----------------------------------------------------------------------------------

function HeroWrapper() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${hero})`,
        width: "100%",
        height: window.innerHeight - 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        left: -75,
      }}
    >
      <Box component="img" src={loginLogo} alt="login logo" />
    </Box>
  );
}

const styles = {};

export default HeroWrapper;
