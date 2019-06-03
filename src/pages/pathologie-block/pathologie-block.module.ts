import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PathologieBlockPage } from './pathologie-block';

@NgModule({
  declarations: [
    PathologieBlockPage,
  ],
  imports: [
    IonicPageModule.forChild(PathologieBlockPage),
  ],
})
export class PathologieBlockPageModule {}
