import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LotmargePage } from './lotmarge';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    LotmargePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LotmargePage),
  ],
})
export class LotmargePageModule {}
