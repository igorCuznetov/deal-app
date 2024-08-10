import { createTRPCRouter, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';

export const defaultLocationSelect = Prisma.validator<Prisma.LocationSelect>()({
  id: true,
});

export const locationRouter = createTRPCRouter({
  all: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.location.findMany({
        select: defaultLocationSelect,
        orderBy: { id: 'asc' },
      }),
  ),
});
