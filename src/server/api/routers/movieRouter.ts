import { z } from "zod";
import { createTRPCRouter, adminProcedure, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movieRouter = createTRPCRouter({
  getById: adminProcedure.input(z.number()).query(({ input }) => {
    return prisma.movie.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getByName: adminProcedure.input(z.string()).query(({ input }) => {
    return prisma.movie.findFirst({
      where: {
        name: input,
      },
    });
  }),
  getAllByName: adminProcedure.input(z.string()).query(({ input }) => {
    return prisma.movie.findMany({
      where: {
        name: input,
      },
    });
  }),
  getLatestFive: publicProcedure.query(() => {
    const currentDate = new Date();

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    return prisma.movie.findMany({
      take: 5,
      where: {
        launchDate: {
          gte: sixMonthsAgo,
        },
      },
    });
  }),
});

export default movieRouter;
