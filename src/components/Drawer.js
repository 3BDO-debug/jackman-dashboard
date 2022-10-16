import React from "react";
import { useRecoilState } from "recoil";
// material
import { SwipeableDrawer } from "@mui/material";
// atoms
import drawerAtom from "../recoil/atoms/drawerAtom";
import SideNavContent from "./SideNavContent";

// -------------------------------------------------------------------------------

function Drawer() {
  const [drawerIsOpen, setDrawerIsOpen] = useRecoilState(drawerAtom);

  const handleDrawerClosure = () => {
    setDrawerIsOpen(false);
  };

  const handleDrawerOpening = () => {
    setDrawerIsOpen(true);
  };

  return (
    <SwipeableDrawer
      open={drawerIsOpen}
      onOpen={handleDrawerOpening}
      onClose={handleDrawerClosure}
    >
      <SideNavContent />
    </SwipeableDrawer>
  );
}

export default Drawer;
