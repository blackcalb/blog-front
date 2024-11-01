import getBackendUrl from "@/helpers/get-backend-url";
import { MutationHandlers } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost(options?: MutationHandlers) {
  return useMutation({
    mutationFn: ({ postId }: { postId: string | number }) => {
      return fetch(`${getBackendUrl()}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
      });
    },
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
}
