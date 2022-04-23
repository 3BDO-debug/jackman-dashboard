import { atom } from "recoil";

const drawerAtom = atom({
  key: "drawer",
  default: false,
});

export default drawerAtom;
