import { z } from "zod";

export const RegisterSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1).max(60).optional(),
  }),
};

export const LoginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
};
