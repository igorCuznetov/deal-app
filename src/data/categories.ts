import { Prisma } from '@prisma/client';

export const categories: Prisma.CategoryCreateManyInput[] = [
  {
    id: 'construction_repair',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'autoservice',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'equipment_repair',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'holidays_organization',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'beauty_health',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'training_courses',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'animal_care',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'household_staff',
    profilesCount: 0,
    tasksCount: 0,
  },
  {
    id: 'transportation',
    profilesCount: 0,
    tasksCount: 0,
  },
];
