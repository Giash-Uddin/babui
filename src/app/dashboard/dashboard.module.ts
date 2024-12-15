import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './dashboard-components/sales/sales.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { ProductComponent } from './dashboard-components/product/product.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {ProductDisplayComponent} from "./product-display/product-display.component";
import {ProductModalComponent} from "./product-modal/product-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ImagePreviewComponent} from "./image-preview/image-preview.component";
import {ImageRotateResizeRepositionComponent} from "./image-rotate-resize-reposition/image-rotate-resize-reposition.component";
import {TextToSvgComponent} from "./text-to-svg/text-to-svg.component";
import {NgxColorsModule} from "ngx-colors";

@NgModule({
  declarations: [
    DashboardComponent,
    SalesComponent,
    ActivityComponent,
    ProductComponent,
    CardsComponent,
    ProductDisplayComponent,
    ProductModalComponent,
    ImagePreviewComponent,
    ImageRotateResizeRepositionComponent,
    TextToSvgComponent

  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    MatDialogModule,
    NgxColorsModule
  ],
  exports: [
    DashboardComponent,
    SalesComponent,
    ActivityComponent,
    ProductComponent
  ]
})
export class DashboardModule { }
