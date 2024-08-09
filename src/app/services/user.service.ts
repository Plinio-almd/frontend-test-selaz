import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { TaskService } from "./task.service";


@Injectable({
  providedIn:'root'
})

export class UserService {
  constructor(private taskService: TaskService){}

  getUsers(): User[] {
    let usersString = localStorage.getItem('users') ?? '[]';    
    return JSON.parse(usersString);
  }

  createUser(user: User): void {
    let users = this.getUsers()
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users))
  }

  updateUser(updateUser: User): void {
    let users = this.getUsers()
    users = users.map(user => user.name === updateUser.name ? updateUser : user)
    localStorage.setItem('users', JSON.stringify(users))
  }

  deleteUser(userName:string): void {
    let users = this.getUsers()
    users = users.filter(user => user.name !== userName)
    this.taskService.deleteTasksByUser(userName)
    localStorage.setItem('users',JSON.stringify(users))
  }

  
}