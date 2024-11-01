import Typhography from "@/components/content/typhography";
import Button from "@/components/inputs/button";
import WrapperContent from "@/components/wrapper-content";
import useAuth from "@/hooks/use-auth";
import useDeleteComment from "@/hooks/use-delete-comment";
import useGetComment from "@/hooks/use-get-comment";
import { Comment } from "@/components/Comment/Comment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteComment() {
  const { postId = "", commentId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: comment, error, isLoading } = useGetComment(postId, commentId);

  const [deleteError, setDeleteError] = useState<boolean>();

  const deleteMutation = useDeleteComment({
    onSuccess: (data: Response) => {
      if (data.status === 200) {
        navigate("/post/" + postId);
        return;
      }
      setDeleteError(true);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !comment) {
    return <div>Error</div>;
  }
  const wasCreatedByMe = user?.id === comment.created_by;

  //TODO
  // if(!wasCreatedByMe) {
  //redirect to unauthorized
  // }

  return (
    <WrapperContent className="flex flex-col gap-4">
      <Typhography kind="h1" className="mt-10">
        Delete Comment
      </Typhography>
      <Typhography>The fallowing comment will be deleted:</Typhography>
      <Comment comment={comment} />
      <Typhography>
        This action cannot be undone. Are you sure you want to delete this post?
      </Typhography>
      <Button
        type="button"
        className="w-full"
        onClick={() => {
          deleteMutation.mutate({ postId, commentId });
        }}
        disabled={!wasCreatedByMe}
      >
        Delete Comment
      </Button>
      {!wasCreatedByMe && (
        <p className="text-sm text-red-500">
          You need to be the creator to delete this comment
        </p>
      )}

      {deleteError && (
        <p className="text-red-500 text-xs">
          There was an unexpected error, try again
        </p>
      )}
    </WrapperContent>
  );
}
