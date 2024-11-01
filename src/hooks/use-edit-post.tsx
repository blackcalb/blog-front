import getBackendUrl from "@/helpers/get-backend-url";
import { EditPostFormDTO } from "@/schemas/post.schema";
import { MutationHandlers } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdatePost(options?: MutationHandlers) {
  return useMutation({
    mutationFn: (data: EditPostFormDTO & { postId: string | number }) => {
      const { postId, ...rest } = data;
      return fetch(`${getBackendUrl()}/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
    },
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
}
