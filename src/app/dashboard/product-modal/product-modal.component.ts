import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TextToSvgComponent} from "../text-to-svg/text-to-svg.component";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog : MatDialog) {
  }
  @Output() close = new EventEmitter<void>();

  products : any=this.data?.products;
  imageSrc: string | ArrayBuffer | null = null;

  logoImageSrc : any ='' || null;

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

  isTextDisplayable : boolean =false;
  selectedColor: string = '#000000';
  selectedText: string = "";
  selectedFont: string='';
  fontOptions: { key: string, value: string }[] = [
    { key : 'Arial',value : "Arial"},
    { key: 'TimesNewRoman', value: "Times New Roman, Times" },
    { key : 'Georgia',value : "Georgia"},
    { key : 'Garamond',value : "Garamond"},
    { key : 'Courier New',value : "Courier New"},
    { key: 'Verdana', value: "Verdana" },
    { key : 'Brush Script MT',value : "font-family:Brush Script MT, cursive"},
    { key : 'Copperplate',value : "font-family:Copperplate, Papyrus, fantasy"}
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
        };
        reader.readAsDataURL(file); // Convert file to data URL
      } else {
      }
    }
  }


  onTextItemSelect(event: Event){

  }

  changeFont(){
  }
  saveFontProperty(){
    this.isTextDisplayable=true;

  }
}
