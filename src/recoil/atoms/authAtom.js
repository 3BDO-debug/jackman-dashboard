import { atom } from "recoil";

const authAtom = atom({
  key: "auth",
  default: false,
});

export default authAtom;
