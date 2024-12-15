import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRotateResizeRepositionComponent } from './image-rotate-resize-reposition.component';

describe('ImageRotateResizeRepositionComponent', () => {
  let component: ImageRotateResizeRepositionComponent;
  let fixture: ComponentFixture<ImageRotateResizeRepositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageRotateResizeRepositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageRotateResizeRepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
