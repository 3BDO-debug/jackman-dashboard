import { atom } from "recoil";

const alertAtom = atom({
  key: "alert",
  default: {
    status: "closed",
    variant: "",
    message: "",
  },
});

export default alertAtom;
