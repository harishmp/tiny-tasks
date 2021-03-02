import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { TaskService } from '../task.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let taskService: jasmine.SpyObj<TaskService>;
  let router: Router;
  const redirectUrl = './login';

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAll', 'getAllUsers', 'getUser']);
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule
    ],
    }).overrideTemplate(DashboardComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should init the tasks', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);
    const users$ = of([]);
    taskService.getAllUsers.and.returnValue(users$);
    const userName = '';
    taskService.getUser.and.returnValue(userName);

    // when
    component.ngOnInit();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(component.users$).toEqual(users$);
    expect(component.userName).toEqual(userName);
  });

  it('should reload the tasks after task creation', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);
    const users$ = of([]);
    taskService.getAllUsers.and.returnValue(users$);

    // when
    component.created();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });

  it('should reload the tasks after task deletion', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);
    const users$ = of([]);
    taskService.getAllUsers.and.returnValue(users$);

    // when
    component.deleted();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });
});
