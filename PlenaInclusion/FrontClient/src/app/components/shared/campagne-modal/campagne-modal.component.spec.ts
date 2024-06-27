import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagneModalComponent } from './campagne-modal.component';

describe('CampagneModalComponent', () => {
  let component: CampagneModalComponent;
  let fixture: ComponentFixture<CampagneModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampagneModalComponent]
    });
    fixture = TestBed.createComponent(CampagneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
