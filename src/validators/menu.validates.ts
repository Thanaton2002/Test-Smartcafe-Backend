import { z } from "zod";

export const menuSchema = z.object({
    name: z.string("Menu name is required").min(6, "Menu name must be at least 6 characters long"),
    price: z.coerce.number("Price is required").min(0, "Price must be a positive number")
});

export type MenuDto = z.infer<typeof menuSchema>;