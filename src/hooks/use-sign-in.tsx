import { useMutation } from "@tanstack/react-query";
import { SigninFormDTO } from "../schemas/auth";
import getBackendUrl from "../helpers/get-backend-url";
import { MutationHandlers } from "@/types";

export default function useSignIn(options?: MutationHandlers) {
  return useMutation({
    mutationFn: (data: SigninFormDTO) => {
      return fetch(`${getBackendUrl()}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
}
