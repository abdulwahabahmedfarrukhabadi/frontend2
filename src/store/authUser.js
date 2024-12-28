import axiosInstance from "./axiosInstance.jsx";
import toast from "react-hot-toast";
import { create } from "zustand";


const token = localStorage.getItem("token");

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  // Signup Action
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false });
    }
  },

  // Login Action
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLoggingIn: false });
    }
  },

  // Logout Action
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
      set({ isLoggingOut: false });
    }
  },

  // Auth Check Action
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/authCheck",{withCredentials: true},{
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is sent as a Bearer token
        },
    }
  );
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error("Auth check error:", error);
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
