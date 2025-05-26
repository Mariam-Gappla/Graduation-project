import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChoosingUsComponent } from './why-choosing-us.component';

describe('WhyChoosingUsComponent', () => {
  let component: WhyChoosingUsComponent;
  let fixture: ComponentFixture<WhyChoosingUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChoosingUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyChoosingUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
