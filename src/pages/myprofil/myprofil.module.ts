import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyprofilPage } from './myprofil';

@NgModule({
  declarations: [
    MyprofilPage,
  ],
  imports: [
    IonicPageModule.forChild(MyprofilPage),
  ],
})
export class MyprofilPageModule {}
