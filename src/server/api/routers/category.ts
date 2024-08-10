import { createTRPCRouter, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';

export const defaultCategorySelect = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  profilesCount: true,
  tasksCount: true,
  subCategories: true,
});

export const categoryRouter = createTRPCRouter({
  all: publicProcedure.query(
    async ({ ctx }) => 
      await ctx.prisma.category.findMany({
        select: defaultCategorySelect,
        orderBy: { id: 'asc' },
      }),
  ),
});
