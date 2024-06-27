import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScheduleModalComponent } from './user-schedule-modal.component';

describe('UserScheduleModalComponent', () => {
  let component: UserScheduleModalComponent;
  let fixture: ComponentFixture<UserScheduleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserScheduleModalComponent]
    });
    fixture = TestBed.createComponent(UserScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
