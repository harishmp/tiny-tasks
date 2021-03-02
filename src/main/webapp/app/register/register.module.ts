import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { FormModule } from 'app/shared/form/form.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatCardModule,
    FormModule
  ],
  providers: [LocalTaskService]
})
export class RegisterModule { }