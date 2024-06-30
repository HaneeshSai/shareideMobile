import { create } from "zustand";

const userStore = create((set) => ({
  phone: null,
  setphone: (ph) => set({ phone: ph }),
  submittedModal: false,
  setSubmittedModal: (value) => set({ submittedModal: value }),
  userCoords: null,
  setUserCoords: (value) => set({ userCoords: value }),
  pickUp: null,
  setPickUp: (value) => set({ pickUp: value }),
  userType: null,
  setUserTYpe: (value) => set({ userType: value }),
  verified: false,
  verifyUser: () => set({ verified: true }),
}));

module.exports = { userStore };
