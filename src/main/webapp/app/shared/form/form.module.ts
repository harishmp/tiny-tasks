import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { FormComponent } from 'app/shared/form/form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [FormComponent],
  providers: [LocalTaskService]
})
export class FormModule { }