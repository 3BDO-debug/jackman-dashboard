import { atom } from "recoil";

const bookingModalAtom = atom({
  key: "bookingModal",
  default: {
    show: false,
    variant: "error",
    title: "",
    bodyText: "",
    confirmHandler: null,
    confirming: false,
  },
});

export default bookingModalAtom;
