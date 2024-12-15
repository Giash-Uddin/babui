import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProductModalComponent} from "../../product-modal/product-modal.component";

interface cards {
  image: string;
  btn: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  showModal = false;
  products : any=[];

  ngOnInit(): void {
  }

  cards: cards [] = [
    {
      image: "assets/products/red-t-shirt.jpeg",
      btn: "warn",
      name:"T-Shirt",
      description:"Red color T-Shirt",
    },
    {
      image: "assets/products/white-mog.jpeg",
      btn: "primary",
      name:"Ceramic Mog",
      description:"Ceramic Mog",
    },
    {
      image: "assets/products/Black-T-shirt.svg",
      btn: "accent",
      name:"T-Shirt",
      description:"Black Color T-shirt",
    },
    {
      image: "assets/products/red-t-shirt.jpeg",
      btn: "warn",
      name:"T-Shirt",
      description:"Red color T-Shirt",
    },

  ]

  openModal(product : any=[]) {
    this.products=product;
    const productModalRefference=this.dialog.open(ProductModalComponent, {
      data: { products : this.products},
    });
    this.showModal = true;
    productModalRefference.componentInstance.close.subscribe(() => {
      productModalRefference.close(); // Close the dialog
      this.showModal = false; // Update your modal visibility state
    });
  }

  closeModal() {
    this.showModal = false;
  }

}
