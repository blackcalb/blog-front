import Typhography from "@/components/content/typhography";
import Button from "@/components/inputs/button";
import WrapperContent from "@/components/wrapper-content";
import useAuth from "@/hooks/use-auth";
import useGetPost from "@/hooks/use-get-post";
import { useParams } from "react-router-dom";

export function Post() {
  const { postId } = useParams();
  const { data: post, error, isLoading } = useGetPost(postId ?? "");
  const { user, isLogged } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    return <div>Error</div>;
  }

  const wasCreatedByMe = user?.id === post.created_by;

  return (
    <WrapperContent>
      <div className="flex justify-between items-end">
        <Typhography kind="h1" className="mt-10">
          {post?.title}
        </Typhography>

        {wasCreatedByMe && (
          <div className="flex gap-2">
            <a href={`/post/${post.id}/edit`}>edit</a>
            <a href={`/post/${post.id}/confirm-delete`}>delete</a>
          </div>
        )}
      </div>
      <div>
        <Typhography className="text-xs">
          Created by: {wasCreatedByMe ? "Me" : post.created_by}
        </Typhography>
        <Typhography className="italic text-xs">
          {Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(post.created_at))}
        </Typhography>
      </div>

      <Typhography className="mt-4">{post?.content}</Typhography>
      <div className="flex justify-between items-center">
        <Typhography kind="h2" className="mt-4">
          Commets
        </Typhography>

        {!isLogged ? (
          <a href="/auth/sign-in">
            <span className="underline">Sign in</span> to create a new post
          </a>
        ) : (
          <a href={`/post/${post.id}/new-comment`}>
            <Button type={"button"} className="mt-4" disabled={!isLogged}>
              Add comment
            </Button>
          </a>
        )}
      </div>
      {!post.total_comments && (
        <Typhography className="pl-4">No commets yet</Typhography>
      )}
    </WrapperContent>
  );
}
