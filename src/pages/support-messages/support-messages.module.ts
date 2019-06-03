import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportMessagesPage } from './support-messages';

@NgModule({
  declarations: [
    SupportMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportMessagesPage),
  ],
})
export class SupportMessagesPageModule {}
