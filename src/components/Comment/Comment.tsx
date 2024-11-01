import useAuth from "@/hooks/use-auth";
import { Comment as CommentType } from "@/types";
import Typhography from "../content/typhography";

interface CommentProps {
  comment: CommentType;
}
export function Comment({ comment }: Readonly<CommentProps>) {
  const { user } = useAuth();

  const wasCreatedByMe = user?.id === comment.created_by;
  return (
    <div className="p-2 rounded-md border border-black bg-teal-200 flex flex-col">
      <Typhography className="text-xs italic text-right">
        By: {comment.created_by}
      </Typhography>
      <Typhography className="py-2">{comment.content}</Typhography>
      <div className="flex flex-row-reverse justify-between items-end">
        <Typhography className="text-xs italic text-right">
          on:{" "}
          {Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(comment.created_at))}
        </Typhography>
        {wasCreatedByMe && (
          <div className="flex gap-2">
            <a
              className="text-sm italic"
              href={`/post/${comment.post_id}/comment/${comment.id}/edit`}
            >
              edit
            </a>
            <a
              className="text-sm italic"
              href={`/post/${comment.post_id}/comment/${comment.id}/confirm_delete`}
            >
              delete
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
