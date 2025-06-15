import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorMethodComponent } from './add-vendor-method.component';

describe('AddVendorMethodComponent', () => {
  let component: AddVendorMethodComponent;
  let fixture: ComponentFixture<AddVendorMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVendorMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
