// /types/user.d.ts
export interface User {
  email: string;
  password: string;
  role: "Admin" | "User";
  name: string;
  image: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  apiUrl: string;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkToken: () => void;
  hasAccess: (requiredRole: "Admin" | "User") => boolean;
  setApiUrl: (url: string) => void;
}
