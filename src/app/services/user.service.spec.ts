import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { TaskService } from './task.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['deleteTasksByUser']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: TaskService, useValue: spy }
      ]
    });
    service = TestBed.inject(UserService);
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user', () => {
    const user:User = { name: 'John', role: 'user' };
    service.createUser(user);

    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('John');
  });

  it('should update a user', () => {
    const user: User = { name: 'John', role: 'user' };
    service.createUser(user);

    const updatedUser: User = { name: 'John', role: 'admin' };
    service.updateUser(updatedUser);

    const users = service.getUsers();
    expect(users[0].role).toBe('admin');
  });

  it('should delete a user', () => {
    const user: User = { name: 'John', role: 'user' };
    service.createUser(user);

    service.deleteUser('John');

    const users = service.getUsers();
    expect(users.length).toBe(0);
    expect(taskServiceSpy.deleteTasksByUser).toHaveBeenCalledWith('John');
  });
});
