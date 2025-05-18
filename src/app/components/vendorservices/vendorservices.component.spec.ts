import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorservicesComponent } from './vendorservices.component';

describe('VendorservicesComponent', () => {
  let component: VendorservicesComponent;
  let fixture: ComponentFixture<VendorservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
