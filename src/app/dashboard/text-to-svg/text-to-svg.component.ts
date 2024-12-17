import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';

@Component({
  selector: 'app-text-to-svg',
  // template: `
  //       <svg width="auto" height="auto">
  //         <text
  //           [attr.x]="dynamicFontStyle.x"
  //           [attr.y]="dynamicFontStyle.y"
  //           [attr.dominant-baseline]="dynamicFontStyle['dominant-baseline']"
  //           [attr.text-anchor]="dynamicFontStyle['text-anchor']"
  //           [attr.font-size]="dynamicFontStyle['font-size']"
  //           [attr.font-family]="fontFamity"
  //           [attr.fill]="fontColor || dynamicFontStyle.fill">
  //           {{ text }}
  //         </text>
  //       </svg>
  // `,
  templateUrl:'./text-to-svg.component.html',
  styleUrl: './text-to-svg.component.scss'
})
export class TextToSvgComponent {
  @Input() text: string = 'Defualt';
  @Input() fontFamity: string = '';
  @Input() fontColor: string = '';
  @Input() scaleX: number = 1;
  @Input() scaleY: number = 1;
  constructor() {
  }

  dynamicFontStyle :any ={};

  ngOnInit() :void {
  //   this.dynamicFontStyle = {
  //     // 'x': "50%",
  //     // 'y': "50%",
  //     'dominant-baseline': "text-before-edge",
  //     'font-size': "clamp(10px, 5vw, 20px)",
  //     'font-family': "'" + this.fontFamity + "'",
  //     'color': "" + this.fontColor + "",
  //     'fill': "" + this.fontColor + "",
  //     'transform': "scale("+this.scaleX+","+this.scaleY+")"
  // }

      this.dynamicFontStyle = {
        'white-space': 'nowrap',
        'dominant-baseline': "text-before-edge",
        'font-size': '50',
        'transform': 'scale(1)',
        'transform-origin': 'center',
        'width': 'fit-content',
        'text-align': 'center',
        'height': 'auto',
        'overflow': 'auto',
        'font-family': "'" + this.fontFamity + "'",
        'color': "" + this.fontColor + "",
        'fill': "" + this.fontColor + "",
      }
  }

  init(x: any=1,y: any=1) {
    // this.dynamicFontStyle = {
    //   // 'x': "50%",
    //   // 'y': "50%",
    //   'dominant-baseline': "text-before-edge",
    //   'font-size': "50",
    //   'fontFamily': "'" + this.fontFamity + "'",
    //   'color': "" + this.fontColor + "",
    //   'fill': "" + this.fontColor + "",
    //   'transform': "scale("+x+","+y+")"

    this.scaleX=this.scaleX+x;
    this.scaleY=this.scaleY+y;
  }


}
