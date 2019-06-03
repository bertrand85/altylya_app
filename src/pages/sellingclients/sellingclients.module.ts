import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellingclientsPage } from './sellingclients';

@NgModule({
  declarations: [
    SellingclientsPage,
  ],
  imports: [
    IonicPageModule.forChild(SellingclientsPage),
  ],
})
export class SellingclientsPageModule {}
