import { createContext } from "react";

export const AuthCtx = createContext<{
  isLogged: boolean;
  user?: {
    id: string;
    email: string;
  };
  token?: string;
  updateToken: (token: string, callback?: () => void) => Promise<void>;
  updateUserInfo: (user: { id: string; email: string }) => void;
} | null>(null);
