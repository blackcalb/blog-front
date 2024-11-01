import getBackendUrl from "@/helpers/get-backend-url";
import { useQuery } from "@tanstack/react-query";
import { Comment as CommentType } from "@/types";

function getComment(postId: string | number, commentId: string | number) {
  return async () => {
    if (!postId) return Promise.reject(new Error("No post id provided"));
    if (!commentId) return Promise.reject(new Error("No comment id provided"));
    return fetch(
      `${getBackendUrl()}/api/posts/${postId}/comments/${commentId}`
    ).then((res) => res.json());
  };
}

export default function useGetComment(
  postId: string | number,
  commentId: string | number
) {
  return useQuery<CommentType>({
    queryKey: ["posts", postId, commentId],
    queryFn: getComment(postId, commentId),
  });
}
