import { z } from "zod";

export const createProductValidator = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().url(),
});
