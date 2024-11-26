import { useEffect } from "react";
import { create } from "zustand";

// Zustand store
const useAuthStore = create((set) => ({
  auth: {
    user: null,
    token: "",
  },
  setAuth: (newAuth) =>
    set((state) => ({ auth: { ...state.auth, ...newAuth } })),
  initializeAuth: () => {
    try {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsedData = JSON.parse(data);
        set(() => ({
          auth: {
            user: parsedData.user,
            token: parsedData.token,
          },
        }));
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      localStorage.removeItem("auth");
    }
  },
  logout: () => {
    localStorage.removeItem("auth");
    set(() => ({
      auth: {
        user: null,
        token: "",
      },
    }));
    window.location.href = "/login";
  },
}));

// Custom hook
const useAuth = () => {
  const { auth, setAuth, initializeAuth, logout } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return { auth, setAuth, logout };
};

export { useAuth };