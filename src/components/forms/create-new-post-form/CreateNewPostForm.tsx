import Button from "@/components/inputs/button";
import Input from "@/components/inputs/input";
import Textarea from "@/components/inputs/textarea";
import useCreatePost from "@/hooks/use-create-post";
import {
  CreatePostFormDTO,
  SchemaCreatePost,
} from "@/schemas/create-post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function CreateNewPostForm() {
  const navigate = useNavigate();
  const [creationError, setCreationError] = useState<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormDTO>({
    resolver: zodResolver(SchemaCreatePost),
  });

  const createPostMutations = useCreatePost({
    onSuccess: (data: Response) => {
      if (data.status === 200) {
        navigate("/");
        return;
      }
      setCreationError(true);
    },
  });

  const onSubmit = (data: CreatePostFormDTO) => {
    createPostMutations.mutate(data);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title")}
        label="Title"
        error={errors.title?.message}
      />
      <Textarea
        {...register("content")}
        label="Content"
        error={errors.content?.message}
        rows={4}
      />
      <div className="grid gap-2 w-full grid-cols-3">
        <a href="/" className="flex-1">
          <Button
            type="button"
            className="w-full"
            disabled={createPostMutations.isPending}
          >
            Cancel
          </Button>
        </a>
        <Button
          type="reset"
          className="flex-1"
          disabled={createPostMutations.isPending}
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createPostMutations.isPending}
        >
          Create
        </Button>
        {creationError && (
          <p className="text-red-500 text-xs">
            There was an unexpected error, try again
          </p>
        )}
      </div>
    </form>
  );
}
