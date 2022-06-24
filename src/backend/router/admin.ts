import * as trpc from "@trpc/server";
import { prisma } from "../../db";
import { z } from "zod";
import { loginValidator } from "../../shared/login-validator";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const adminRouter = trpc
  .router()
  .mutation("login", {
    input: loginValidator,
    resolve: ({ input }) => {
      const adminEmail = process.env.ADMIN_EMAIL!;
      const adminPassword = process.env.ADMIN_PASSWORD!;

      if (adminEmail !== input.email || adminPassword !== input.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      return {
        token: jwt.sign({ sub: nanoid() }, process.env.JWT_SECRET!, {
          expiresIn: "10y",
        }),
      };
    },
  })
  .query("me", {
    input: z.object({
      Authorization: z.string(),
    }),
    resolve: ({ input }) => {
      try {
        jwt.verify(
          input.Authorization.split(" ")[1] ?? "",
          process.env.JWT_SECRET!
        );
        return {
          ok: true,
        };
      } catch (err) {
        throw new TRPCError({
          message: "Invalid token provided",
          code: "FORBIDDEN",
          // cause: err,
        });
      }
    },
  });
