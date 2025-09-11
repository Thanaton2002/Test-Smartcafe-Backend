import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().min(0).max(65535),
    DATABASE_URL: z.url()
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
    console.log(error);
    process.exit(0);
}

export const envConfig = data;
