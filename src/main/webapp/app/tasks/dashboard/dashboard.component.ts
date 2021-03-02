import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';
import { Task, User } from '../../tasks/task';
import { TaskService } from '../../tasks/task.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'app/shared/snackbar/snackbar.component';
export interface DialogData {
  password: string;
}

/**
 * Landing page main layout.
 */
@Component({
  selector: 'tiny-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  tasks$: Observable<Task[]>;
  users$: Observable<User[]>;
  userName: string;
  password: string;

  constructor(@Inject('TaskService') private taskService: TaskService, private router: Router,
  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
    this.users$ = this.taskService.getAllUsers();
    // this.userName = this.authService.userName;
    this.userName = this.taskService.getUser();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  logout(): void {
    this.taskService.logout();
    this.router.navigate(['./login'])
  }

  openDialog(): void {
    this.dialog.open(UpdatePassword, {});
  }
}

/**
 * change password.
 */
@Component({
  selector: 'update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePassword implements OnInit{
  public changePasswordForm: FormGroup;
  userName: string;
  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdatePassword>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, @Inject('TaskService') private taskService: TaskService, 
    private authService: AuthService, public snackBar: MatSnackBar) {}

    public ngOnInit(): void {
      this.changePasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.userName = this.authService.userName;
    }

    onSubmit() {
      this.taskService.update(this.userName, this.changePasswordForm.value.password);
      this.onNoClick();
      this.openSnackBar('Password Updated Successfully!!', 'pizza-party');
    }

  onNoClick(): void {
    this.dialogRef.close();
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
