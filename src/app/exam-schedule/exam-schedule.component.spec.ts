import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamScheduleComponent } from './exam-schedule.component';

describe('ExamScheduleComponent', () => {
  let component: ExamScheduleComponent;
  let fixture: ComponentFixture<ExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
