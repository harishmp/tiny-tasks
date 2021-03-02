import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task, User } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';
  private static readonly USER_STORAGE_KEY: string = 'tiny.users';
  private static readonly USER_LOGGEDIN_KEY: string = 'tiny.isLoggedIn';

  getAll(): Observable<Task[]> {
    return of(this.readTasksbyUser());
  }

  private readTasksbyUser(): Task[] {
    const tasks = JSON.parse(localStorage.getItem(LocalTaskService.STORAGE_KEY));
    const user = JSON.parse(localStorage.getItem(LocalTaskService.USER_LOGGEDIN_KEY));
    return tasks ? tasks.filter(task => task.username === user.username) : [];
  }

  create(name: string, username: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name, username};
    tasks.push(task);
    const user = JSON.parse(localStorage.getItem(LocalTaskService.USER_LOGGEDIN_KEY));
    tasks.filter(task => task.username === user.username)
    this.writeTasks(tasks);
    return of(task);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(null);
  }

  update(username: string, password: string): boolean {
    const users = this.readUsers();
    users.forEach(user => {
      if(user.username === username){
        user.password = password;
      }
    });
    this.writeUsers(users);
    return true;
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(localStorage.getItem(LocalTaskService.STORAGE_KEY)) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }

  // register users services
  getUser(): string {
    const user = JSON.parse(localStorage.getItem(LocalTaskService.USER_LOGGEDIN_KEY));
    return user.username;
  }

  getAllUsers(): Observable<User[]> {
    return of(this.readUsers());
  }

  register(username: string, password: string): boolean {
    const users = this.readUsers();
    const checkUniqueUsername = users.filter(user => user.username === username);
    if(checkUniqueUsername.length == 0) {
      this.registerUserLocal(users, username, password)
      return true;
    } else return false;
  }

  registerUserLocal(users, username: string, password: string): Observable<User> {
    const user = {username: username, password: password};
    users.push(user);
    this.writeUsers(users);
    return of(user);
  }

  logout(): void {
    localStorage.removeItem(LocalTaskService.USER_LOGGEDIN_KEY);
  }

  private readUsers(): User[] {
    const users = localStorage.getItem(LocalTaskService.USER_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  private writeUsers(users: User[]): void {
    localStorage.setItem(LocalTaskService.USER_STORAGE_KEY, JSON.stringify(users));
  }
  
}
