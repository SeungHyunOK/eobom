import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userTypeState = atom({
  key: "userTypeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
