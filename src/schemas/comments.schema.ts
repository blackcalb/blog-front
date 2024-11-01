import { z } from "zod";

export const SchemaCreateComment = z.object({
  content: z.string().min(1),
});

export type CreateCommentFormDTO = z.infer<typeof SchemaCreateComment>;

export const SchemaUpdateComment = z.object({
  content: z.string().min(1),
});

export type UpdateCommentFormDTO = z.infer<typeof SchemaUpdateComment>;
