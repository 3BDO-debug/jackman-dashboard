import { atom } from "recoil";

const logoutConfirmationPopUpAtom = atom({
  key: "logoutConfirmationPopUp",
  default: false,
});

export default logoutConfirmationPopUpAtom;
