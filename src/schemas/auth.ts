import { z } from "zod";

export const SchemaSignUp = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupFormDTO = z.infer<typeof SchemaSignUp>;

export const SchemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SigninFormDTO = z.infer<typeof SchemaSignIn>;
