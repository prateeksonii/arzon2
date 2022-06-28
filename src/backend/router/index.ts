import * as trpc from "@trpc/server";
import { adminRouter } from "./admin";
import { productsRouter } from "./products";
import { usersRouter } from "./users";

export const appRouter = trpc
  .router()
  .merge("products.", productsRouter)
  .merge("admin.", adminRouter)
  .merge("users.", usersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
