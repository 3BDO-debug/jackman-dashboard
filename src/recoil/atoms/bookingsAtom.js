import { atom } from "recoil";

const bookingsAtom = atom({
  key: "bookings",
  default: { data: [], refresh: 0 },
});

export default bookingsAtom;
