import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { authAPI } from "@/lib/api";
import { storage } from "@/lib/storage";

type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!loading) {
      if (!user && !inAuthGroup) {
        router.replace("/(auth)");
      } else if (user && inAuthGroup) {
        router.replace("/home");
      }
    }
  }, [user, loading, segments]);

  const loadUser = async () => {
    try {
      const token = await storage.getItemAsync("accessToken");
      if (token) {
        const response = await authAPI.getMe();
        setUser(response.data);
      }
    } catch (error) {
      await storage.deleteItemAsync("accessToken");
      await storage.deleteItemAsync("refreshToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    await storage.setItemAsync("accessToken", response.data.accessToken);
    await storage.setItemAsync("refreshToken", response.data.refreshToken);
    setUser(response.data.user);
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) => {
    const response = await authAPI.register(data);
    await storage.setItemAsync("accessToken", response.data.accessToken);
    await storage.setItemAsync("refreshToken", response.data.refreshToken);
    setUser(response.data.user);
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      await storage.deleteItemAsync("accessToken");
      await storage.deleteItemAsync("refreshToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
