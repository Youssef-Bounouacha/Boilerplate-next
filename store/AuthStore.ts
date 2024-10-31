// /store/authStore.ts

import axios from "axios";
import { AuthState, User } from "../types/User";
import { create } from "zustand";
import { setCookie, removeCookie } from "@/lib/cookies";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://yourapi.com/users",

  login: async (email, password): Promise<void> => {
    try {
      const users = (await import("../mocks/Users.json")).default;
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        const tokenData = {
          email: foundUser.email,
          role: foundUser.role,
          name: foundUser.name,
          image: foundUser.image,
        };

        // Set both cookie and localStorage
        setCookie("token", JSON.stringify(tokenData));
        localStorage.setItem("token", JSON.stringify(tokenData));

        set({
          user: {
            email: foundUser.email,
            role: foundUser.role as "Admin" | "User",
            password: foundUser.password,
            name: foundUser.name || "",
            image: foundUser.image || "",
          },
          token: "mock-token",
          isAuthenticated: true,
        });

        return;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    removeCookie("token");
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkToken: () => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const { email, role, name, image }: User = JSON.parse(tokenData);
      set({
        user: { email, role, password: "", name, image },
        token: "mock-token",
        isAuthenticated: true,
      });
    }
  },

  hasAccess: (requiredRole: string): boolean => {
    return requiredRole === "Admin"
      ? useAuthStore.getState().user?.role === "Admin"
      : true;
  },

  setApiUrl: (url) => set({ apiUrl: url }),
}));

export default useAuthStore;
