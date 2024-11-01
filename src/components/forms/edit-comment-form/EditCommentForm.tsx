import Button from "@/components/inputs/button";
import Textarea from "@/components/inputs/textarea";
import useUpdateComment from "@/hooks/use-update-comment";
import {
  SchemaCreateComment,
  UpdateCommentFormDTO,
} from "@/schemas/comments.schema";
import { Comment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface EditCommentFormProps {
  postId: string | number;
  comment: Comment;
}
export function EditCommentForm({
  postId,
  comment,
}: Readonly<EditCommentFormProps>) {
  const navigate = useNavigate();
  const [updatingError, setUpdatingError] = useState<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCommentFormDTO>({
    resolver: zodResolver(SchemaCreateComment),
  });

  const editCommentMutations = useUpdateComment({
    onSuccess: (data: Response) => {
      if (data.status === 200) {
        navigate(`/post/${postId}`);
        return;
      }
      setUpdatingError(true);
    },
  });

  const onSubmit = (data: UpdateCommentFormDTO) => {
    editCommentMutations.mutate({ ...data, postId, commentId: comment.id });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register("content")}
        label="Content"
        error={errors.content?.message}
        rows={4}
        defaultValue={comment.content}
      />
      <Button
        type="submit"
        className="self-end"
        disabled={editCommentMutations.isPending}
      >
        Edit
      </Button>
      {updatingError && (
        <p className="text-red-500 text-xs">
          There was an unexpected error, try again
        </p>
      )}
    </form>
  );
}
