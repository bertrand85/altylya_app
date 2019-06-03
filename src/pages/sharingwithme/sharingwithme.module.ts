import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharingwithmePage } from './sharingwithme';
import { JustgageModule  } from 'angular2-justgage';
import { ComponentsModule } from '../../components/components.module'

//https://github.com/emn178/angular2-justgage
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SharingwithmePage,
  ],
  imports: [
    JustgageModule,
    ChartsModule,
    ComponentsModule,
    IonicPageModule.forChild(SharingwithmePage),
  ],
})
export class SharingwithmePageModule {}
