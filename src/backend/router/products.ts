import * as trpc from "@trpc/server";
import { prisma } from "../../db";
import { z } from "zod";

export const productsRouter = trpc.router().mutation("create", {
  input: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string().url(),
  }),
  async resolve({ input }) {
    return await prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        prices: {
          create: {
            price: input.price,
          },
        },
        images: {
          create: {
            imageUrl: input.imageUrl,
          },
        },
      },
    });
  },
});
