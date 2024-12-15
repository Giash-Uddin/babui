import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss'
})
export class ImagePreviewComponent {

  active1 : boolean =true;

  @Input() logoImageSrc : any ='';

}
