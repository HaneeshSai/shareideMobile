import { create } from "zustand";

const userStore = create((set) => ({
  phone: null,
  setphone: (ph) => set({ phone: ph }),
  imgModal: false,
  setImgModal: (value) => set({ imgModal: value }),
}));

module.exports = { userStore };
