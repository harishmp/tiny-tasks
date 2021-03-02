import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { DashboardComponent, UpdatePassword } from './dashboard/dashboard.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SnackbarComponent } from 'app/shared/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { BASE_URL } from 'app/app.tokens';
import { environment } from '../../environments/environment';
import { DefaultTaskService } from './default-task.service';
import { LocalTaskService } from './local-task.service';

@NgModule({
  entryComponents: [UpdatePassword],
  declarations: [TaskFormComponent, TaskListComponent, DashboardComponent, SnackbarComponent, UpdatePassword],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    FormsModule
  ],
  exports: [TaskFormComponent, TaskListComponent, DashboardComponent],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService}
  ]
})
export class TasksModule { }
