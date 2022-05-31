import React from "react";
// recoil
import { RecoilRoot } from "recoil";
// material
import { ThemeProvider } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <AppContainer />
          </LocalizationProvider>
        </RecoilRoot>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
