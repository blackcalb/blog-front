export interface MutationHandlers {
  onError?: (error: Error) => void;
  onSuccess?: (data: Response) => void;
}
