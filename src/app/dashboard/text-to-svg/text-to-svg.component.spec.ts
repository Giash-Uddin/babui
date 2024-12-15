import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToSvgComponent } from './text-to-svg.component';

describe('TextToSvgComponent', () => {
  let component: TextToSvgComponent;
  let fixture: ComponentFixture<TextToSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextToSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextToSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
