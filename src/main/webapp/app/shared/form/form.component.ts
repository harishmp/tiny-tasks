import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

/**
 * Login/Registration form.
 */
@Component({
  selector: 'tiny-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() fromLoginorRegister: string;

  errorMessage: string;
  successMessage: string;
  routeUrl: string;
  response: boolean;

  constructor(private router: Router, public snackBar: MatSnackBar, private authService: AuthService, private userService: LocalTaskService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoginorRegister();
      if(this.response == true){
        this.openSnackBar(`${this.successMessage}`, 'pizza-party');
        this.router.navigate([`${this.routeUrl}`])
      } else {
        this.openSnackBar(`${this.errorMessage}`, 'pizza-party');
        this.form.reset();
      }
    }
  }

  isLoginorRegister() {
    if (this.fromLoginorRegister === 'fromLogin') {
      this.errorMessage = 'Username/password is incorrect';
      this.successMessage = 'Login Successfully!!!';
      this.routeUrl = './dashboard';
      this.response = this.authService.setlogin(this.form.value.username, this.form.value.password);
    } else {
      this.errorMessage = `Username '${this.form.value.username}' is already taken`;
      this.successMessage = 'User Created Successfully!!!';
      this.routeUrl = 'login';
      this.response = this.userService.register(this.form.value.username, this.form.value.password);
    }
  }

  // toast message
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 1000
    });
  }

}
