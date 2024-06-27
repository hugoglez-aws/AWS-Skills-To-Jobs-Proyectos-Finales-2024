import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeModalComponent } from './type-modal.component';

describe('TypeModalComponent', () => {
  let component: TypeModalComponent;
  let fixture: ComponentFixture<TypeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeModalComponent]
    });
    fixture = TestBed.createComponent(TypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
