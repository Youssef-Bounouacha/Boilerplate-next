import { AuthState, User } from "../types/User";
import { create } from "zustand";
import { setCookie, removeCookie } from "@/lib/cookies";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  apiUrl: process.env.NEXT_PUBLIC_USER_URL || "https://yourapi.com/users",

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
          phone: foundUser.phone,
          address: foundUser.address,
          company: foundUser.company,
        };

        // Serialize as JWT-like token for mock consistency
        const mockToken = btoa(JSON.stringify(tokenData));

        // Set both cookie and localStorage
        setCookie("token", mockToken);
        localStorage.setItem("token", mockToken);

        set({
          user: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role as "Admin" | "User",
            password: foundUser.password,
            name: foundUser.name || "",
            image: foundUser.image || "",
            phone: foundUser.phone || "",
            address: foundUser.address || "",
            company: foundUser.company || "",
          },
          token: mockToken,
          isAuthenticated: true,
        });
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
      try {
        const decodedData = JSON.parse(atob(tokenData)) as User;
        set({
          user: {
            id: decodedData.id,
            email: decodedData.email,
            role: decodedData.role,
            password: "",
            name: decodedData.name,
            image: decodedData.image,
            phone: decodedData.phone,
            address: decodedData.address,
            company: decodedData.company,
          },
          token: tokenData,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Token parsing error:", error);
      }
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
