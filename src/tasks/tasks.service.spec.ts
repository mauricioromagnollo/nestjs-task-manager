import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

const mockUser = {
  username: 'John Doe',
  id: 'any_id',
  password: 'any_password',
  tasks: [],
};

const mockTask = {
  title: 'Any_Title',
  description: 'any_description',
  id: 'any_id',
  status: TaskStatus.OPEN,
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should be return the tasks when getTasks is called', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('should be able getTaskById when id is provided and the task exist', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('any_id', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('should be throw an Error if the task id is not found', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('any_id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('should be able create a new task', async () => {
      tasksRepository.createTask.mockResolvedValue(mockTask.title);
      const result = await tasksService.createTask(
        { title: mockTask.title, description: mockTask.description },
        mockUser,
      );
      expect(result).toEqual(mockTask.title);
    });
  });
});
