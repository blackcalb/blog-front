import getBackendUrl from "@/helpers/get-backend-url";
import { useQuery } from "@tanstack/react-query";
import { Comment as CommentType } from "@/types";

function getComments(postId: string | number) {
  return async () => {
    if (!postId) return Promise.reject(new Error("No id provided"));
    return fetch(`${getBackendUrl()}/api/posts/${postId}/comments`).then(
      (res) => res.json()
    );
  };
}

export default function useGetComments(postId: string | number) {
  return useQuery<CommentType[]>({
    queryKey: ["posts", postId],
    queryFn: getComments(postId),
  });
}
