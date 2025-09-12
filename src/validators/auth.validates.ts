import { z } from "zod";

export const registerSchema = z.object({
    username: z.string("Username is required").min(1, "Username is required"),
    password: z.string("Password is required").regex(/^[a-zA-Z0-9]{6,}$/, "Password must be at least 6 characters"),
    confirmPassword: z.string()
})
    .refine(value => value.password === value.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        })
    .transform(({ confirmPassword, ...rest }) => rest)

export type RegisterDto = z.infer<typeof registerSchema>