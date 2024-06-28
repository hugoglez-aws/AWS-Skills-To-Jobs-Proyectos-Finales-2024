import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSchedulesComponent } from './user-schedules.component';

describe('UserSchedulesComponent', () => {
  let component: UserSchedulesComponent;
  let fixture: ComponentFixture<UserSchedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSchedulesComponent]
    });
    fixture = TestBed.createComponent(UserSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
