import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthBtnComponent } from './google-auth-btn.component';

describe('GoogleAuthBtnComponent', () => {
  let component: GoogleAuthBtnComponent;
  let fixture: ComponentFixture<GoogleAuthBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleAuthBtnComponent]
    });
    fixture = TestBed.createComponent(GoogleAuthBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
