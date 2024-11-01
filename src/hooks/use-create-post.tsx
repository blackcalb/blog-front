import getBackendUrl from "@/helpers/get-backend-url";
import { CreatePostFormDTO } from "@/schemas/create-post.schema";
import { MutationHandlers } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useCreatePost(options?: MutationHandlers) {
  return useMutation({
    mutationFn: (data: CreatePostFormDTO) => {
      return fetch(`${getBackendUrl()}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
}
