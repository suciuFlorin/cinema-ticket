import { createCallerFactory, createTRPCRouter } from "@base/server/api/trpc";
import movieRouter from "./routers/movieRouter";
import specialPropertyRouter from "./routers/specialProperyRouter";
import userRouter from "@base/server/api/routers/userRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  movie: movieRouter,
  specialProperty: specialPropertyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
