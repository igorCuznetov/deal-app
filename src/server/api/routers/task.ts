import { createTRPCRouter, publicProcedure } from '../trpc'; // Adjust import path based on your structure
import { Prisma } from '@prisma/client';
import { z } from 'zod';

// Define a select object for Prisma to specify the fields you want to return
export const defaultTaskSelect = Prisma.validator<Prisma.TaskSelect>()({
  id: true,
  title: true,
  description: true,
  startDate: true,
  endDate: true,
  price: true,
  categoryId: true,
  subCategoryId: true,
  locationId: true,
  priceUnit: true,
});

export const taskRouter = createTRPCRouter({
  // Define a mutation for creating a task
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.string().optional().nullable(),
        endDate: z.string().optional().nullable(),
        price: z.string().optional().nullable(),
        categoryId: z.string().optional().nullable(),
        subCategoryId: z.string().optional().nullable(),
        locationId: z.string().optional().nullable(),
        priceUnit: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log('input', input);

      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          startDate: input.startDate ? new Date(input.startDate) : undefined,
          endDate: input.endDate ? new Date(input.endDate) : undefined,
          price: input.price,
          categoryId: input.categoryId,
          subCategoryId: input.subCategoryId,
          locationId: input.locationId,
          priceUnit: input.priceUnit ?? 'leu',
          createdBy: ctx.session?.user?.id as string,
        },
        select: defaultTaskSelect,
      });
      return task;
    }),

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany({
      select: defaultTaskSelect,
      orderBy: { createdAt: 'desc' },
    });
  }),

  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.task.findUnique({
      where: { id: input },
      select: defaultTaskSelect,
    });
  }),
});
