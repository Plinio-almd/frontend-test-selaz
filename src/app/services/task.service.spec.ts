import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);

    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('should create an instance of the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list of tasks when there are no tasks in localStorage', () => {
    const tasks = service.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should add a task to localStorage', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Description', status: 'pending', createdAt: '2024-08-08', dueDate: '2024-08-08', userName: 'User' };
    service.createTask(task);

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });

  it('should update a task in localStorage', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Description', status: 'pending', createdAt: '2024-08-08', dueDate: '2024-08-08', userName: 'User' };
    service.createTask(task);

    const updatedTask: Task = { ...task, title: 'Updated Task' };
    service.updateTask(updatedTask);

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Updated Task');
  });

  it('should delete a task by id', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Description', status: 'pending', createdAt: '2024-08-08', dueDate: '2024-08-08', userName: 'User' };
    service.createTask(task);

    service.deleteTask(task.id);

    const tasks = service.getTasks();
    expect(tasks.length).toBe(0);
  });

  it('should delete all tasks associated with a user', () => {
    const task1: Task = { id: '1', title: 'Task 1', description: 'Description 1', status: 'pending', createdAt: '2024-08-08', dueDate: '2024-08-08', userName: 'User1' };
    const task2: Task = { id: '2', title: 'Task 2', description: 'Description 2', status: 'pending', createdAt: '2024-08-08', dueDate: '2024-08-08', userName: 'User2' };
    const task3: Task = { id: '3', title: 'Task 3', description: 'Description 3', status: 'pending', createdAt: '2024-08-08', dueDate: '2024-08-08', userName: 'User1' };

    service.createTask(task1);
    service.createTask(task2);
    service.createTask(task3);

    service.deleteTasksByUser('User1');

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].userName).toBe('User2');
  });
});
