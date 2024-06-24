import { PrismaClient } from "@prisma/client";
import { createTRPCRouter, adminProcedure } from "@base/server/api/trpc";
import { z } from "zod";

const prisma = new PrismaClient();

const specialPropertyRouter = createTRPCRouter({
  getByName: adminProcedure
    .input(z.string())
    .query(({ input }: { input: string }) => {
      return prisma.specialProperty.findFirst({
        where: {
          name: input,
        },
      });
    }),
  create: adminProcedure
    .input(z.string())
    .mutation(({ input }: { input: string }) => {
      return prisma.specialProperty.create({
        data: {
          name: input,
        },
      });
    }),
  mutate: adminProcedure
    .input(z.string())
    .mutation(({ input }: { input: string }) => {
      return prisma.specialProperty.create({
        data: {
          name: input,
        },
      });
    }),
});

export default specialPropertyRouter;
