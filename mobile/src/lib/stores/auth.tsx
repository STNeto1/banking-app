import { create } from "zustand";
import { core_User } from "../openapi/requests";

type AuthStore = {
  user: core_User | null;
  token: string | null;

  setToken: (data: string) => void;
  setUser: (data: core_User) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  setToken: (data) => {
    set((state) => ({
      ...state,
      token: data,
    }));
  },
  setUser: (data) => {
    set((state) => ({
      ...state,
      user: data,
    }));
  },
  logout: () => {
    set((state) => ({
      ...state,
      user: null,
      token: null,
    }));
  },
}));

// Getters
export const useUser = () => {
  return useAuthStore((state) => state.user);
};

export const useToken = () => {
  return useAuthStore((state) => state.token);
};

// Setters
export const useSetUser = () => {
  return useAuthStore((state) => state.setUser);
};

export const useSetToken = () => {
  return useAuthStore((state) => state.setToken);
};

// Actions
export const useLogout = () => {
  return useAuthStore((state) => state.logout);
};
