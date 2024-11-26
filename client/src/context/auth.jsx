// import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";
import instance from "../axios";

// Zustand store
const useAuthStore = create((set) => ({
  auth: {
    user: null,
    token: "",
  },
  setAuth: (newAuth) =>
    set((state) => ({ auth: { ...state.auth, ...newAuth } })),
  initializeAuth: () => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parstData = JSON.parse(data);
      set(() => ({
        auth: {
          user: parstData.user,
          token: parstData.token,
        },
      }));
      // console.log("Initialized auth:", parstData);
    } else{
        console.log("No auth data in localStorage");
    }
  },
}));
// Tokenni axios uchun default sarlavha sifatida o'rnatish
const authStore = useAuthStore.getState();
instance.defaults.headers.common["Authorization"] = authStore.auth?.token;

// costum hook
const useAuth = () => {
  const { auth, setAuth, initializeAuth } = useAuthStore();
  useEffect(() => {
    initializeAuth();
  }, []);
  return { auth, setAuth };
};

export {useAuth}