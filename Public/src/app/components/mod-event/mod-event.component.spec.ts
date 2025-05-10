import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEventComponent } from './mod-event.component';

describe('ModEventComponent', () => {
  let component: ModEventComponent;
  let fixture: ComponentFixture<ModEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
