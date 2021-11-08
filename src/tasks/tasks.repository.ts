import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task, TASK_TABLE_NAME } from './task.entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder(TASK_TABLE_NAME);

    if (status) {
      query.andWhere(`${TASK_TABLE_NAME}.status = :status`, {
        status,
      });
    }

    if (search) {
      query.andWhere(
        `LOWER(${TASK_TABLE_NAME}.title) LIKE LOWER(:search) OR LOWER(${TASK_TABLE_NAME}.description) LIKE LOWER(:search)`,
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
