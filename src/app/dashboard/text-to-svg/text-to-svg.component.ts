import {Component, Inject, Input} from '@angular/core';

@Component({
  selector: 'app-text-to-svg',
  template:`
    <svg width="100%" height="100">
      <text
        [attr.x]="dynamicFontStyle.x"
        [attr.y]="dynamicFontStyle.y"
        [attr.dominant-baseline]="dynamicFontStyle['dominant-baseline']"
        [attr.text-anchor]="dynamicFontStyle['text-anchor']"
        [attr.font-size]="dynamicFontStyle['font-size']"
        [attr.font-family]="fontFamity || dynamicFontStyle['font-family']"
        [attr.fill]="fontColor || dynamicFontStyle.fill">
        {{ text }}
      </text>
    </svg>
  `,
  styleUrl: './text-to-svg.component.scss'
})
export class TextToSvgComponent {
  @Input() text: string = 'Defualt';
  @Input() fontFamity: string = '';
  @Input() fontColor: string = '';
  constructor() {
  }
  dynamicFontStyle : any ={
    'x':"50%",
    'y':"50%",
    'dominant-baseline':"middle",
    'text-anchor':"middle",
    'font-size':"50",
    'font-family':"'"+this.fontFamity+"'",
    'color':"green",
    'fill':"'"+this.fontColor+"'",
  }
}
