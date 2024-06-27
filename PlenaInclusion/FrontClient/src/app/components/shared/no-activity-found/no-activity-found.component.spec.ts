import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoActivityFoundComponent } from './no-activity-found.component';

describe('NoActivityFoundComponent', () => {
  let component: NoActivityFoundComponent;
  let fixture: ComponentFixture<NoActivityFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoActivityFoundComponent]
    });
    fixture = TestBed.createComponent(NoActivityFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
