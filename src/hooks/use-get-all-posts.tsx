import { useQuery } from "@tanstack/react-query";
import getBackendUrl from "../helpers/get-backend-url";
import { PostWithTotalComments } from "@/types";

function getPosts() {
  return fetch(`${getBackendUrl()}/api/posts`).then((res) => res.json());
}

export default function useGetAllPosts() {
  return useQuery<PostWithTotalComments[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}
