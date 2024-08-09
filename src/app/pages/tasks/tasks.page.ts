import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  task: Task = {
    id: '',
    title: '',
    description: '',
    status: 'pending',
    userName: '',
    createdAt: new Date().toISOString(),
    dueDate: '',
  };
  manageForm: boolean = false;
  isEditing: boolean = false;
  users: User[] = [];
  selectedUser: string = '';
  today: string = new Date().toISOString().split('T')[0];
  filterStatus: string = '';
  sortDirection: string = '';

  constructor(
    public taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }
  loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
    this.applyFilters();
  }

  saveTask() {
    if (!this.task.userName) {
      alert('Select a user');
      return;
    }
    if (this.isEditing) {
      this.taskService.updateTask(this.task);
      this.isEditing = false;
    } else {
      let randomNumber = Math.floor(Math.random() * 1000);
      this.task.id = randomNumber.toString();
      this.taskService.createTask(this.task);
    }
    this.resetForm();
    this.loadTasks();
    this.manageForm = false;
  }
  resetForm() {
    this.task = {
      id: '',
      title: '',
      description: '',
      status: 'pending',
      userName: '',
      createdAt: new Date().toISOString(),
      dueDate: '',
    };
  }
  applyFilters() {
    let tasksToFilter = [...this.tasks];

    if (this.selectedUser) {
      tasksToFilter = tasksToFilter.filter(
        (task) => task.userName === this.selectedUser
      );
    }

    if (this.filterStatus) {
      tasksToFilter = tasksToFilter.filter(
        (task) => task.status === this.filterStatus
      );
    }

    if (this.sortDirection === 'asc') {
      tasksToFilter.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (this.sortDirection === 'desc') {
      tasksToFilter.sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
    }

    this.filteredTasks = tasksToFilter;
  }

  editTask(task: Task) {
    this.task = { ...task };
    this.isEditing = true;
    this.manageForm = true;
  }

  changeStatus(task: Task) {
    const updatedTask = { ...task };
    switch (updatedTask.status) {
      case 'pending':
        updatedTask.status = 'ongoing';
        break;
      case 'ongoing':
        updatedTask.status = 'done';
        break;
    }
    this.taskService.updateTask(updatedTask);
    this.loadTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  toggleForm() {
    this.manageForm = !this.manageForm;
    if (!this.manageForm) {
      this.resetForm();
    }
  }
}
