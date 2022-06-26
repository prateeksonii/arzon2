import * as trpc from "@trpc/server";
import { prisma } from "../../db";
import { z } from "zod";
import { createProductValidator } from "../../shared/create-product-validator";

// TODO: add middleware to protect creation
export const productsRouter = trpc
  .router()
  .mutation("create", {
    input: createProductValidator,
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
  })
  .query("all", {
    async resolve() {
      return await prisma.product.findMany({
        include: { images: true, prices: true },
      });
    },
  });
