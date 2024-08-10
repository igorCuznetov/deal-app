import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Slider } from '@/components/ui';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useQueryClient } from '@tanstack/react-query'; // Ensure you're using the correct version

const TaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  price: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  locationId: z.string().optional(),
  priceUnit: z.string().optional(),
});

type TaskFormData = z.infer<typeof TaskSchema>;

export const CreateTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
  });
  const queryClient = useQueryClient();
  const [range, setRange] = useState([0, 24]);
  const handleRangeChange = (value) => {
    setRange(value);
  };

  const { data: categories } = api.category.all.useQuery();
  const { data: locations } = api.location.all.useQuery();

  const router = useRouter();

  const { slug } = router.query as {
    slug: string[] | undefined;
  };

  console.log('slug', slug);

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['task.all']);

      router.push('/tasks/list');
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log('Form data:', data);
    createTask.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4 mt-32"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Enter task title"
          className={`${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          {...register('startDate')}
          className={`${errors.startDate ? 'border-red-500' : ''}`}
        />
        {errors.startDate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <Input
          id="endDate"
          type="date"
          {...register('endDate')}
          className={`${errors.endDate ? 'border-red-500' : ''}`}
        />
        {errors.endDate && (
          <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="flex space-x-2">
          <Input
            type={'number'}
            id="price"
            {...register('price')}
            placeholder="Pret"
            className={`${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
          <Select defaultValue={'leu'} {...register('priceUnit')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {[{ id: 'leu' }, { id: '€' }, { id: '$' }].map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <Select value={slug?.[0]} {...register('categoryId')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="subCategoryId"
          className="block text-sm font-medium text-gray-700"
        >
          SubCategory
        </label>
        <Select value={slug?.[1]} {...register('subCategoryId')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a subcategory" />
          </SelectTrigger>
          <SelectContent>
            {categories
              ?.find((category) => category.id === slug?.[0])
              ?.subCategories.map((subCategory) => (
                <SelectItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.id}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {errors.subCategoryId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.subCategoryId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="locationId"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <Select {...register('locationId')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.locationId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.locationId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Input
          id="description"
          {...register('description')}
          placeholder="Enter task description"
          className={`${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};
