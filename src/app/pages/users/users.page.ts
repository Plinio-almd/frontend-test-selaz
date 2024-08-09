import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  users: User[] = [];
  user: User = {
    name: '',
    role: 'admin',
  };
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }
  saveUser() {
    if (this.isEditing) {
      this.userService.updateUser(this.user);
      this.isEditing = false;
    } else {
      this.userService.createUser(this.user);
    }
    this.resetForm();
    this.loadUsers();
  }
  editUser(user: User) {
    this.user = { ...user };
    this.isEditing = true;
  }
  deleteUser(userName: string) {
    this.userService.deleteUser(userName);
    this.loadUsers();
  }
  resetForm() {
    this.user = {
      name: '',
      role: 'user',
    };
  }
}
