import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenEventComponent } from './full-screen-event.component';

describe('FullScreenEventComponent', () => {
  let component: FullScreenEventComponent;
  let fixture: ComponentFixture<FullScreenEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScreenEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullScreenEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
