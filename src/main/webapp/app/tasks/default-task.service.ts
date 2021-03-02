import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task, User } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  private static readonly USER_STORAGE_KEY: string = 'tiny.users';
  private static readonly USER_LOGGEDIN_KEY: string = 'tiny.isLoggedIn';

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  update(username: string, password: string): boolean {
    return true;
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  // register users services
  getUser(): string {
    const user = JSON.parse(localStorage.getItem(DefaultTaskService.USER_LOGGEDIN_KEY));
    return user.username;
  }
  
  getAllUsers(): Observable<User[]> {
    return of(this.readUsers());
  }

  private readUsers(): User[] {
    const users = localStorage.getItem(DefaultTaskService.USER_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  logout(): void {
    localStorage.removeItem(DefaultTaskService.USER_LOGGEDIN_KEY);
  }
}
