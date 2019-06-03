import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IcaeditorPage } from './icaeditor';

@NgModule({
  declarations: [
    IcaeditorPage,
  ],
  imports: [
    IonicPageModule.forChild(IcaeditorPage),
  ],
})
export class IcaeditorPageModule {}
