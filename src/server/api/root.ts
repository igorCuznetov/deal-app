import { createTRPCRouter } from './trpc';
import { collectionRouter } from './routers/collection';
import { productRouter } from './routers/product';
import { locationRouter } from './routers/location';
import { categoryRouter } from './routers/category';
import { taskRouter } from './routers/task';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  collection: collectionRouter,
  product: productRouter,
  location: locationRouter,
  category: categoryRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
