import React from "react";
// recoil
import { RecoilRoot } from "recoil";
// material
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
        <RecoilRoot>
          <AppContainer />
        </RecoilRoot>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
