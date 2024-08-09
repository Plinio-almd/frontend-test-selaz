import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";


@Injectable({
  providedIn:'root'
})

export class TaskService {

  getTasks(): Task[] {
    let tasksString = localStorage.getItem('tasks') ?? '[]';    
    return JSON.parse(tasksString);
  }

  createTask(task: Task): void {
    let tasks = this.getTasks()
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  updateTask(updatedTask: Task): void {
    let tasks = this.getTasks()
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  deleteTask(taskId:string): void {
    let tasks = this.getTasks()
    tasks = tasks.filter(task => task.id !== taskId)
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  deleteTasksByUser(userName: string) {
    let tasks = this.getTasks()
    tasks = tasks.filter(task => task.userName !== userName)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }    
}