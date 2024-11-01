import getBackendUrl from "@/helpers/get-backend-url";
import { UpdateCommentFormDTO } from "@/schemas/comments.schema";
import { MutationHandlers } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateComment(options?: MutationHandlers) {
  return useMutation({
    mutationFn: (
      data: UpdateCommentFormDTO & {
        postId: string | number;
        commentId: string | number;
      }
    ) => {
      const { postId, commentId, ...rest } = data;
      return fetch(
        `${getBackendUrl()}/api/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rest),
        }
      );
    },
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
}
