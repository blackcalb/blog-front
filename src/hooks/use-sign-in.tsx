import { useMutation } from "@tanstack/react-query";
import { SigninFormDTO } from "../schemas/auth";
import getBackendUrl from "../helpers/get-backend-url";

export default function useSignIn(options?: {
  onError?: (error: Error) => void;
  onSuccess?: (data: Response) => void;
}) {
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
