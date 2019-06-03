import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydashboardPage } from './mydashboard';
import { JustgageModule  } from 'angular2-justgage';
import { ComponentsModule } from '../../components/components.module'
//https://github.com/emn178/angular2-justgage
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MydashboardPage,
  ],
  imports: [
    JustgageModule,
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(MydashboardPage),
  ]
})
export class MydashboardPageModule {}
