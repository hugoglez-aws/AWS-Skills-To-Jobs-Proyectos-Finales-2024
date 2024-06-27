import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampagneComponent } from './manage-campagne.component';

describe('ManageCampagneComponent', () => {
  let component: ManageCampagneComponent;
  let fixture: ComponentFixture<ManageCampagneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCampagneComponent]
    });
    fixture = TestBed.createComponent(ManageCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
