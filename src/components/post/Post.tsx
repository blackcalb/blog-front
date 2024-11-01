import { PostWithTotalComments } from "@/types";
import Typhography from "../content/typhography";
import useAuth from "@/hooks/use-auth";

interface PostProps {
  post: PostWithTotalComments;
}

export function Post({ post }: Readonly<PostProps>) {
  const { user } = useAuth();

  const wasCreatedByMe = user?.id === post.created_by;

  return (
    <div className="bg-slate-100/65 rounded-md border border-slate-400">
      <div className="w-full border-b border-slate-300 p-4 flex justify-between items-end">
        <Typhography className="font-bold text-lg capitalize line-clamp-1">
          {post.title}
        </Typhography>
        {wasCreatedByMe && (
          <a className="text-sm italic" href={`/post/${post.id}/edit`}>
            edit
          </a>
        )}
      </div>

      <div className="p-4">{post.content}</div>

      <div className="flex justify-between px-4 py-2">
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
        <Typhography className="text-xs">
          {post.total_comments} comments
        </Typhography>
      </div>
    </div>
  );
}
