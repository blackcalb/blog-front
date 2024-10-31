import Typhography from "@/components/content/typhography";
import WrapperContent from "../components/wrapper-content";
import useAuth from "../hooks/use-auth";
import useGetAllPosts from "../hooks/use-get-all-posts";

export default function Home() {
  const { data: posts, isLoading, error } = useGetAllPosts();
  const { user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (posts?.length === 0) {
    return <EmptyHome />;
  }

  return (
    <WrapperContent>
      <div className="flex flex-col justify-center items-center bg-red-200">
        Hello 👋
        {!user && <p>Not logged in</p>}
        {user && <p>Logged in as {user.email}</p>}
        <p>{JSON.stringify(posts, undefined, Infinity)}</p>
      </div>
    </WrapperContent>
  );
}

function EmptyHome() {
  const { isLogged } = useAuth();

  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-10">
        Post
      </Typhography>
      <Typhography className="mb-4">
        There are no posts published yet.
      </Typhography>
      {isLogged && (
        <Typhography>
          Click on the button below to create the firs post
        </Typhography>
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
