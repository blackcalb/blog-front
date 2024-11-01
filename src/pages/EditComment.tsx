import Typhography from "@/components/content/typhography";
import EditCommentForm from "@/components/forms/edit-comment-form";
import WrapperContent from "@/components/wrapper-content";
import useGetComment from "@/hooks/use-get-comment";
import { Navigate, useParams } from "react-router-dom";

export function EditComment() {
  const { postId, commentId } = useParams();
  const {
    data: comment,
    error: commentError,
    isLoading: commentIsLoading,
  } = useGetComment(postId ?? "", commentId ?? "");

  if (!postId || !commentId) {
    return <Navigate to="/" />;
  }

  if (commentIsLoading) {
    return <div>Loading...</div>;
  }
  if (commentError || !comment) {
    return <div>Error</div>;
  }

  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-10">
        Edit Comment
      </Typhography>

      <EditCommentForm postId={postId} comment={comment} />
    </WrapperContent>
  );
}
