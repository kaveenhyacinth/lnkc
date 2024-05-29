import { z } from "zod"

export const validation = {
  signUp: z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  signIn: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  forgotPassword: z.object({
    email: z.string().email({ message: "Invalid email address" }),
  }),
  resetPassword: z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  createLink: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
  }),
}