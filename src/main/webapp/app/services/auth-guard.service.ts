import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (!this.authService.LoginStatus) {
        this.router.navigate(['login']);
        }
        return this.authService.LoginStatus;
    }
}
