import { useMutation } from "@tanstack/react-query";
import { SignupFormDTO } from "../schemas/auth";
import getBackendUrl from "../helpers/get-backend-url";
import { MutationHandlers } from "@/types";

export default function useSignUp(options?: MutationHandlers) {
  return useMutation({
    mutationFn: (data: SignupFormDTO) => {
      return fetch(`${getBackendUrl()}/auth/signup`, {
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
