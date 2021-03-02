import { Injectable } from '@angular/core';
import { User } from '../tasks/task';

@Injectable({
  providedIn : 'root'
})
export class AuthService {
    private static readonly USER_STORAGE_KEY: string = 'tiny.users';
    private static readonly USER_LOGGEDIN_KEY: string = 'tiny.isLoggedIn';
    
    private loggedInStatus = false;

    setlogin(username: string, password: string): boolean {
        const users = this.readUsers();
        let checkUser = users.filter(user => (user.username === username) && (user.password === password));
        if(checkUser.length != 0) { 
        this.isUserLoggedIn(checkUser[0].username);
        return true 
        }
        else return false
    }

    private isUserLoggedIn(username: string): void {
        const user = {username: username, loggedIn: true};
        localStorage.setItem(AuthService.USER_LOGGEDIN_KEY, JSON.stringify(user));
    }

    private readUsers(): User[] {
        const users = localStorage.getItem(AuthService.USER_STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    }

    get LoginStatus(): boolean {
        const users = JSON.parse(localStorage.getItem(AuthService.USER_LOGGEDIN_KEY));
        return users ? users.loggedIn : this.loggedInStatus;
    }

    get userName(): string {
        const user = JSON.parse(localStorage.getItem(AuthService.USER_LOGGEDIN_KEY));
        return user.username;
    }
}
