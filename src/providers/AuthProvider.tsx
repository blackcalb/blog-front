import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import useGetUser from "../hooks/use-get-user";
import { AuthCtx } from "./AuthCtx";

export function AuthProvider({
  children,
}: Readonly<{ children: ReactElement }>) {
  const [user, setUser] = useState<{ id: string; email: string } | undefined>();
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("auth_token") ?? undefined
  );
  const { refetch } = useGetUser(token);

  const updateToken = useCallback(async (token: string) => {
    setToken(token);
    localStorage.setItem("auth_token", token);
  }, []);

  const updateUserInfo = useCallback(
    (user: { id: string; email: string }) => setUser(user),
    []
  );

  useEffect(() => {
    if (token) {
      refetch()
        .then((res) => res?.data)
        .then((d) => d?.json())
        .then(updateUserInfo)
        .catch(() => {
          setToken(undefined);
          localStorage.removeItem("auth_token");
        });
    }
  }, [token, updateUserInfo, refetch]);

  const value = useMemo(() => {
    return {
      isLogged: !!user,
      user,
      token,
      updateToken,
      updateUserInfo,
    };
  }, [user, token, updateToken, updateUserInfo]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
