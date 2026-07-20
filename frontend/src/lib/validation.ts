import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Username is required"),

    password: z
        .string()
        .min(4, "Password is required"),
});

export type LoginFormData = z.infer<
    typeof loginSchema
>;

export const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    }
);

export type RegisterFormData =
    z.infer<typeof registerSchema>;
