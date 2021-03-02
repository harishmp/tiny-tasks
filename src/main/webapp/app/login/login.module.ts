import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatCardModule } from '@angular/material/card';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { FormModule } from 'app/shared/form/form.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    FormModule
  ],
  providers: [LocalTaskService]
})
export class LoginModule { }