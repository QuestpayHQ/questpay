import { z } from "zod";

export const waitlistSchema = z.object({
    email: z.string().email(),
}).strict();

export type WaitlistSchema = z.infer<typeof waitlistSchema>;