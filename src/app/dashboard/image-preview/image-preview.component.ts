import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-preview',
  template: `<div >
  <app-image-rotate-resize-reposition
    id="1"
    [minWidth]="100"
    [minHeight]="100"
    [initialTop]="10"
    [initialLeft]="100"
    [disabled]="!active1"
    [type]="'image'"
  >
    <img
      [src]="logoImageSrc"
      alt=""
      style="width: 100%; height:100%; object-fit: contain; pointer-events:none"
    />
  </app-image-rotate-resize-reposition>
</div>`,
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

  active1 : boolean =true;

  @Input() logoImageSrc : any ='';


}
