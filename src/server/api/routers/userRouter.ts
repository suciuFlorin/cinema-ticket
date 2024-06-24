import { hashSync } from "bcrypt-ts";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const userCredentialsSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const hash = hashSync(password, 10);
      return prisma.user.create({
        data: {
          email,
          Password: {
            create: {
              hash,
            },
          },
        },
      });
    }),
  getById: protectedProcedure.input(z.string()).query(({ input }) => {
    return prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
  getByUsernameOrEmail: protectedProcedure
    .input(z.string())
    .query(({ input }) => {
      return prisma.user.findFirst({
        where: {
          OR: [{ username: input }, { email: input }],
        },
      });
    }),
});

export default userRouter;
