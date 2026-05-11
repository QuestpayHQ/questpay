import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).strict();

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    phoneNumber: z.string().optional(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).strict();

export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z
  .object({
    email: z.string().email().min(1, { message: "Email is required" }),
  })
  .strict();

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const otpCodeSchema = z
  .string()
  .length(5, { message: "Enter the complete 5-digit code" })
  .regex(/^\d{5}$/, { message: "Code must contain only numbers" });