import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTypesComponent } from './manage-types.component';

describe('ManageTypesComponent', () => {
  let component: ManageTypesComponent;
  let fixture: ComponentFixture<ManageTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTypesComponent]
    });
    fixture = TestBed.createComponent(ManageTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
