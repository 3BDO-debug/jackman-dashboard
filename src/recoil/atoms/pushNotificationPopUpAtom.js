import { atom } from "recoil";

const pushNotificationPopUpAtom = atom({
  key: "pushNotification",
  default: false,
});

export default pushNotificationPopUpAtom;
