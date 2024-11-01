import { useQuery } from "@tanstack/react-query";
import getBackendUrl from "../helpers/get-backend-url";
import { PaginateResponse, PostWithTotalComments } from "@/types";

export const PAGE_SIZE = 4;

function getPosts(page: number) {
  return async () => {
    return fetch(
      `${getBackendUrl()}/api/posts?offset=${
        PAGE_SIZE * (page - 1)
      }&limit=${PAGE_SIZE}`
    ).then((res) => res.json());
  };
}

export default function useGetPaginatePosts(page: number) {
  return useQuery<PaginateResponse<PostWithTotalComments>>({
    queryKey: ["posts", page],
    queryFn: getPosts(page),
  });
}
