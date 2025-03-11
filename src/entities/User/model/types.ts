import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  company: z.object({
    name: z.string(),
  }),
  address: z.object({
    city: z.string(),
  }),
});

export type TUser = z.infer<typeof UserSchema>;
