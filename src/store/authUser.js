import axios from "axios";
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
      const response = await axios.post("https://backend123-five.vercel.app/api/v1/auth/signup", credentials);
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
      const response = await axios.post("https://backend123-five.vercel.app/api/v1/auth/login", credentials);
      localStorage.setItem("token", response.data.token); // Store token
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
      await axios.post("https://backend123-five.vercel.app/api/v1/auth/logout");
      localStorage.removeItem("token"); // Clear token
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
      set({ isLoggingOut: false });
    }
  },

  // Auth Check Action (Updated to match the format you requested)
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios({
        method: "get",  // using post method
        baseURL: "https://backend123-five.vercel.app/api/v1",  // Your base URL
        url: "/auth/authCheck",  // URL for the endpoint
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json", // Send the token as a Bearer token in the headers
        },
        data: {},  // No body data needed for this action
        credentials: "include",  // If required to include credentials like cookies
      });

      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error("Auth check error:", error.response?.data || error.message);
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
