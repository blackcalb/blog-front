import Typhography from "@/components/content/typhography";
import Button from "@/components/inputs/button";
import Post from "@/components/post";
import WrapperContent from "@/components/wrapper-content";
import useAuth from "@/hooks/use-auth";
import useDeletePost from "@/hooks/use-delete-post";
import useGetPost from "@/hooks/use-get-post";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeletePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: post, error, isLoading } = useGetPost(postId ?? "");

  const [deleteError, setDeleteError] = useState<boolean>();

  const deleteMutation = useDeletePost({
    onSuccess: (data: Response) => {
      if (data.status === 200) {
        navigate("/");
        return;
      }
      setDeleteError(true);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    return <div>Error</div>;
  }
  const wasCreatedByMe = user?.id === post.created_by;

  //TODO
  // if(!wasCreatedByMe) {
  //redirect to unauthorized
  // }

  return (
    <WrapperContent className="flex flex-col gap-4">
      <Typhography kind="h1" className="mt-10">
        Delete post
      </Typhography>
      <Typhography>
        The fallowing post and all its comments will be deleted:
      </Typhography>
      <Post post={post} />
      <Typhography>
        This action cannot be undone. Are you sure you want to delete this post?
      </Typhography>
      <Button
        type="button"
        className="w-full"
        onClick={() => {
          deleteMutation.mutate({ postId: post.id });
        }}
        disabled={!wasCreatedByMe}
      >
        Delete post
      </Button>
      {!wasCreatedByMe && (
        <p className="text-sm text-red-500">
          You need to be the owner to delete this post
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
