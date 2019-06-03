import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LotsettingsPage } from './lotsettings';

@NgModule({
  declarations: [
    LotsettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(LotsettingsPage),
  ],
})
export class LotsettingsPageModule {}
