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
  user: null,
  setUser: (value) => set({ user: value }),
  verified: false,
  verifyUser: () => set({ verified: true }),
  searchDestination: false,
  setSearchDestination: (value) => set({ searchDestination: value }),
  destination: null,
  setDestination: (value) => set({ destination: value }),
  picker: false,
  setPicker: (value) => set({ picker: value }),
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));

module.exports = { userStore };
