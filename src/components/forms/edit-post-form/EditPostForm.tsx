import Button from "@/components/inputs/button";
import Input from "@/components/inputs/input";
import Textarea from "@/components/inputs/textarea";
import useUpdatePost from "@/hooks/use-edit-post";
import { EditPostFormDTO, SchemaEditPost } from "@/schemas/post.schema";
import { Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface EditPostFormProps {
  post: Post;
}

export function EditPostForm({ post }: Readonly<EditPostFormProps>) {
  const navigate = useNavigate();
  const [updateError, setUpdateError] = useState<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPostFormDTO>({
    resolver: zodResolver(SchemaEditPost),
  });

  const updatePostMutations = useUpdatePost({
    onSuccess: (data: Response) => {
      if (data.status === 200) {
        navigate("/post/" + post.id);
        return;
      }
      setUpdateError(true);
    },
  });

  function onSubmit(data: EditPostFormDTO) {
    updatePostMutations.mutate({ ...data, postId: post.id });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title")}
        label="Title"
        error={errors.title?.message}
        defaultValue={post.title}
      />
      <Textarea
        {...register("content")}
        label="Content"
        error={errors.content?.message}
        rows={4}
        defaultValue={post.content}
      />
      <div className="grid gap-2 w-full grid-cols-3">
        {/* TODO: update this to accept a callback urlc */}
        <a href={`/post/${post.id}`} className="flex-1">
          <Button
            type="button"
            className="w-full"
            disabled={updatePostMutations.isPending}
          >
            Cancel
          </Button>
        </a>
        <Button
          type="reset"
          className="flex-1"
          disabled={updatePostMutations.isPending}
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updatePostMutations.isPending}
        >
          Modify
        </Button>
        {updateError && (
          <p className="text-red-500 text-xs">
            There was an unexpected error, try again
          </p>
        )}
      </div>
    </form>
  );
}
