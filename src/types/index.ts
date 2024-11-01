export interface MutationHandlers {
  onError?: (error: Error) => void;
  onSuccess?: (data: Response) => void;
}

export interface Post {
  id: string | number;
  created_at: string;
  created_by: string;
  title: string;
  content: string;
}

export type PostWithTotalComments = Post & { total_comments: number };

export interface Comment {
  id: string | number;
  created_at: string;
  created_by: string;
  content: string;
  post_id: Post["id"];
}
