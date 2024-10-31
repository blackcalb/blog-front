import { useContext } from "react";
import { AuthCtx } from "../providers/AuthCtx";

export default function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return ctx;
}
