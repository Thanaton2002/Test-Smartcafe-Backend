import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().min(0).max(65535),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string("JWT_SECRET is required").min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: z.string("JWT_EXPIRES_IN is required").regex(/^\d+[smhd]$/, "JWT_EXPIRES_IN format example : 1h, 30m, 7d"),
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
    console.log(error.issues);
    process.exit(0);
}

export const envConfig = data;
