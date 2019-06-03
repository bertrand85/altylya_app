import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellingPage } from './selling';

@NgModule({
  declarations: [
    SellingPage,
  ],
  imports: [
    IonicPageModule.forChild(SellingPage),
  ],
})
export class SellingPageModule {}
