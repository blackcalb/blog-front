import getBackendUrl from "../helpers/get-backend-url";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(token?: string) {
  return useQuery({
    queryKey: ["getUser", token],
    queryFn: () => {
      if (!token) {
        return Promise.reject("No token provided");
      }
      return fetch(`${getBackendUrl()}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: !!localStorage.getItem("token"),
  });
}
