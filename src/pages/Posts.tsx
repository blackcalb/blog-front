import Typhography from "@/components/content/typhography";
import WrapperContent from "../components/wrapper-content";
import useAuth from "../hooks/use-auth";
import useGetPaginatePosts, {
  PAGE_SIZE,
} from "../hooks/use-get-paginate-posts";
import Button from "@/components/inputs/button";
import Post from "@/components/post";
import { useState } from "react";
import { PaginationNav } from "@/components/content/pagination-nav/PaginationNav";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error } = useGetPaginatePosts(page);
  const { isLogged } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!posts) {
    return <EmptyHome />;
  }

  return (
    <WrapperContent>
      <div className="flex justify-between items-end mb-10">
        <Typhography kind="h1" className="text-center ">
          Posts
        </Typhography>
        {!isLogged ? (
          <a href="/auth/sign-in">
            <span className="underline">Sign in</span> to create a new post
          </a>
        ) : (
          <a href="/new-post">
            <Button type={"button"} className="mt-4" disabled={!isLogged}>
              Create a new post
            </Button>
          </a>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {posts.content.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <PaginationNav
        className="mt-4"
        currentPage={page}
        totalPages={Math.ceil(posts.total / PAGE_SIZE)}
        onChange={(newPage: number) => setPage(newPage)}
      />
    </WrapperContent>
  );
}

function EmptyHome() {
  const { isLogged } = useAuth();

  return (
    <WrapperContent className="text-center">
      <Typhography kind="h1" className="text-center mb-10">
        Post
      </Typhography>
      <Typhography className="mb-4">
        There are no posts published yet.
      </Typhography>
      {isLogged && (
        <>
          <Typhography>
            Click on the button below to create the firs post
          </Typhography>
          <a href="/new-post">
            <Button type={"button"} className="mt-4">
              Create a new post
            </Button>
          </a>
        </>
      )}
      {!isLogged && (
        <>
          <Typhography>
            Please{" "}
            <a href="/auth/sign-in" className="italic underline">
              Sign in here
            </a>{" "}
            to star creating your first post!
          </Typhography>
          <Typhography>
            Dont have an account yet?{" "}
            <a href="/auth/sign-up" className="italic underline">
              Sign up!
            </a>{" "}
          </Typhography>
        </>
      )}
    </WrapperContent>
  );
}
