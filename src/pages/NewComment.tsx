import Typhography from "@/components/content/typhography";
import CreateNewCommentForm from "@/components/forms/create-new-comment-form";
import Post from "@/components/post";
import WrapperContent from "@/components/wrapper-content";
import useGetPost from "@/hooks/use-get-post";
import { Navigate, useParams } from "react-router-dom";

export default function NewComment() {
  const { postId } = useParams();
  const { data: post, error, isLoading } = useGetPost(postId ?? "");

  if (!postId) {
    <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !post) {
    return <div>Error</div>;
  }

  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-10">
        New comment
      </Typhography>
      <CreateNewCommentForm postId={post.id} />
      <Typhography className="mb-4">
        The comment above will be added to the post:
      </Typhography>

      <Post post={post} />
    </WrapperContent>
  );
}
