import {Component, EventEmitter, Inject, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TextToSvgComponent} from "../text-to-svg/text-to-svg.component";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  @Output() close = new EventEmitter<void>();
  @ViewChild(TextToSvgComponent) textToSvgComponent!: TextToSvgComponent;
  products : any=this.data?.products;
  imageContainerViewable : boolean = false;
  imageSrc: string | ArrayBuffer | null = null;

  logoImageSrc : any ='' || null;
  scaleX : any =1;
  scaleY : any =1;

  productStyles = {
    'background-image': "url('"+this.data?.products?.image+"')",
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'background-position': 'center',
    'width': '100%',
    'height': '100%',
    'max-width': '800px',
    'max-height': '500px',
    'min-width': '300px',
    'min-height': '300px',
    'border-color': 'red',
  };

  addTextEnable : boolean = false;
  isTextDisplayable : boolean =false;
  selectedColor: string = '#000000';
  selectedText: string = "";
  selectedFont: string='';
  fontOptions: { key: string, value: string }[] = [
    { key : 'Arial',value : "Arial"},
    { key: 'TimesNewRoman', value: "Times New Roman" },
    { key : 'Georgia',value : "Georgia"},
    { key : 'Garamond',value : "Garamond"},
    { key : 'Courier New',value : "Courier New"},
    { key: 'Verdana', value: "Verdana" },
    { key : 'Brush Script MT',value : "Brush Script MT"},
    { key : 'Copperplate',value : "Copperplate, Papyrus, fantasy"},
    { key : 'fantasy',value : "fantasy"},
    { key : 'Papyrus',value : "Papyrus"}
  ];


  ngOnInIt(): void {
  }

  closeModal() {
    this.close.emit();
  }


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement || null;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Ensure the file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result; // Set the preview source
          this.logoImageSrc=reader.result;
          this.imageContainerViewable=true;
        };
        reader.readAsDataURL(file); // Convert file to data URL
      } else {
      }
    }
  }


  onTextItemSelect(event: Event){
    this.addTextEnable=true;
  }

  changeFont(){

  }
  saveFontProperty(){
    this.isTextDisplayable=true;
    this.addTextEnable=false;
    this.textToSvgComponent.ngOnInit();
  }
}
