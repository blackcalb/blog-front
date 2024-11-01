import { useQuery } from "@tanstack/react-query";
import getBackendUrl from "../helpers/get-backend-url";
import { PostWithTotalComments } from "@/types";

function getPost(id: string) {
  return async () => {
    if (!id) return Promise.reject("No id provided");
    return fetch(`${getBackendUrl()}/api/posts/${id}`).then((res) =>
      res.json()
    );
  };
}

export default function useGetPost(id: string) {
  return useQuery<PostWithTotalComments>({
    queryKey: ["posts", id],
    queryFn: getPost(id),
  });
}
