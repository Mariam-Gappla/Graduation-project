import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicComponent } from './servic.component';

describe('ServicComponent', () => {
  let component: ServicComponent;
  let fixture: ComponentFixture<ServicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
