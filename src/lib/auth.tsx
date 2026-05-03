// Mock role-based auth using localStorage. Replace with real auth later.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { users, type Role, type User } from "./mockData";

interface AuthState {
  user: User | null;
  login: (email: string, role?: Role) => User | null;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthCtx = createContext<AuthState | null>(null);
const KEY = "brainexa.auth.userId";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.localStorage.getItem(KEY);
    if (id) {
      const u = users.find((x) => x.id === id) ?? null;
      setUser(u);
    }
  }, []);

  const login = (email: string, role?: Role) => {
    let u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u && role) u = users.find((x) => x.role === role);
    if (u) {
      window.localStorage.setItem(KEY, u.id);
      setUser(u);
      return u;
    }
    return null;
  };

  const logout = () => {
    window.localStorage.removeItem(KEY);
    setUser(null);
  };

  const switchRole = (role: Role) => {
    const u = users.find((x) => x.role === role);
    if (u) {
      window.localStorage.setItem(KEY, u.id);
      setUser(u);
    }
  };

  return <AuthCtx.Provider value={{ user, login, logout, switchRole }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
