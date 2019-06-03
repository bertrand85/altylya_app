import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlimentsBlockPage } from './aliments-block';

@NgModule({
  declarations: [
    AlimentsBlockPage,
  ],
  imports: [
    IonicPageModule.forChild(AlimentsBlockPage),
  ],
})
export class AlimentsBlockPageModule {}
