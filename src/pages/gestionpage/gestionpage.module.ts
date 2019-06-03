import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionPage } from './gestionpage';

@NgModule({
  declarations: [
    GestionPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionPage),
  ],
})
export class GestionpagePageModule {}
