import * as trpc from "@trpc/server";
import { adminRouter } from "./admin";
import { productsRouter } from "./products";

export const appRouter = trpc
  .router()
  .merge("products.", productsRouter)
  .merge("admin.", adminRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
