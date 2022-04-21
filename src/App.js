import React from "react";
import { ThemeProvider } from "@mui/material";
// theme
import theme from "./theme";
// components
import AppContainer from "./components/AppContainer";
import { MotionLazyContainer } from "./components/animate";

// -------------------------------------------------

function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
