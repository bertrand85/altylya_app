import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LotjournalPage } from './lotjournal';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    LotjournalPage,
  ],
  imports: [
    IonicPageModule.forChild(LotjournalPage),
    CalendarModule,
  ],
})
export class LotjournalPageModule {}
