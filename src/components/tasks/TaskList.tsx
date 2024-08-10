import { Task } from '@/types';
import { TaskItem, Skeleton } from './TaskItem';

interface Props {
  tasks: Task[] | undefined;
  isLoading: boolean;
}

export const TaskList = ({ tasks, isLoading }: Props) => {
  console.log('tasks', tasks);
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {isLoading &&
        Array(12)
          .fill('')
          .map((_, index) => <Skeleton key={index} />)}
      {tasks &&
        tasks.map((task) => (
          <div key={task?.id}>
            <TaskItem {...task} />
          </div>
        ))}
    </div>
  );
};
