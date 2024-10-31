import { useQuery } from "@tanstack/react-query";
import getBackendUrl from "../helpers/get-backend-url";

function getPosts() {
  console.log(getBackendUrl());
  return fetch(`${getBackendUrl()}/api/posts`).then((res) => res.json());
}

export default function useGetAllPosts() {
  return useQuery({ queryKey: ["posts"], queryFn: getPosts });
}
