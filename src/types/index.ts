export interface MutationHandlers {
  onError?: (error: Error) => void;
  onSuccess?: (data: Response) => void;
}

export interface PostWithTotalComments {
  id: string | number;
  created_at: string;
  created_by: string;
  title: string;
  content: string;
  total_comments: number;
}
