import Button from "@/components/inputs/button";
import Textarea from "@/components/inputs/textarea";
import useCreateComment from "@/hooks/use-create-comment";
import {
  CreateCommentFormDTO,
  SchemaCreateComment,
} from "@/schemas/comments.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CreateNewCommentFormProps {
  postId: string | number;
}
export function CreateNewCommentForm({
  postId,
}: Readonly<CreateNewCommentFormProps>) {
  const navigate = useNavigate();
  const [creationError, setCreationError] = useState<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentFormDTO>({
    resolver: zodResolver(SchemaCreateComment),
  });

  const addCommentMutations = useCreateComment({
    onSuccess: (data: Response) => {
      if (data.status === 200) {
        navigate(`/post/${postId}`);
        return;
      }
      setCreationError(true);
    },
  });

  const onSubmit = (data: CreateCommentFormDTO) => {
    addCommentMutations.mutate({ ...data, postId });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register("content")}
        label="Content"
        error={errors.content?.message}
        rows={4}
      />
      <Button
        type="submit"
        className="self-end"
        disabled={addCommentMutations.isPending}
      >
        Create
      </Button>
      {creationError && (
        <p className="text-red-500 text-xs">
          There was an unexpected error, try again
        </p>
      )}
    </form>
  );
}
