import { z } from "zod";

export const SchemaCreatePost = z.object({
  title: z.string().min(3),
  content: z.string().min(1),
});

export type CreatePostFormDTO = z.infer<typeof SchemaCreatePost>;
