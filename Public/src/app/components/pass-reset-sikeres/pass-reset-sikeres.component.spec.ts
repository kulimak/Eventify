import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassResetSikeresComponent } from './pass-reset-sikeres.component';

describe('PassResetSikeresComponent', () => {
  let component: PassResetSikeresComponent;
  let fixture: ComponentFixture<PassResetSikeresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassResetSikeresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassResetSikeresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
