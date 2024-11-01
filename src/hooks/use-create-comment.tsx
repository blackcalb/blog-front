import getBackendUrl from "@/helpers/get-backend-url";
import { CreateCommentFormDTO } from "@/schemas/comments.schema";
import { MutationHandlers } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useCreateComment(options?: MutationHandlers) {
  return useMutation({
    mutationFn: (data: CreateCommentFormDTO & { postId: string | number }) => {
      const { postId, ...rest } = data;
      return fetch(`${getBackendUrl()}/api/posts/${postId}/comments`, {
        method: "POST",
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
