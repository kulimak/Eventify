import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassResetFinalComponent } from './pass-reset-final.component';

describe('PassResetFinalComponent', () => {
  let component: PassResetFinalComponent;
  let fixture: ComponentFixture<PassResetFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassResetFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassResetFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
