import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SanitaireModalPage } from './sanitaire-modal';

@NgModule({
  declarations: [
    SanitaireModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SanitaireModalPage),
  ],
})
export class SanitaireModalPageModule {}
