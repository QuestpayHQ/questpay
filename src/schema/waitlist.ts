import { z } from "zod";

export const waitlistSchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
}).strict();

export type WaitlistSchema = z.infer<typeof waitlistSchema>;