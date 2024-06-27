import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScheduleCardComponent } from './user-schedule-card.component';

describe('UserScheduleCardComponent', () => {
  let component: UserScheduleCardComponent;
  let fixture: ComponentFixture<UserScheduleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserScheduleCardComponent]
    });
    fixture = TestBed.createComponent(UserScheduleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
