import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().min(0).max(65535),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string("JWT_SECRET is required").min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: z.string("JWT_EXPIRES_IN is required").regex(/^\d+[smhd]$/, "JWT_EXPIRES_IN format example : 1h, 30m, 7d"),
    CLOUDINARY_NAME: z.string("CLOUDINARY_NAME is required").min(1, "CLOUDINARY_NAME is required"),
    CLOUDINARY_API_KEY: z.string("CLOUDINARY_API_KEY is required").min(1, "CLOUDINARY_API_KEY is required"),
    CLOUDINARY_API_SECRET: z.string("CLOUDINARY_API_SECRET is required").min(1, "CLOUDINARY_API_SECRET is required")
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
    console.log(error.issues);
    process.exit(0);
}

export const envConfig = data;
