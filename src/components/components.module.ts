import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { LotcardComponent } from './lotcard/lotcard';
import { JustgageModule  } from 'angular2-justgage';
import { LotchartComponent } from './lotchart/lotchart';
import { CroissancechartComponent } from './croissancechart/croissancechart';
import { GaugepoidsComponent } from './gaugepoids/gaugepoids';
import { AltylyagaugeComponent } from './altylyagauge/altylyagauge';
import { MargeitemComponent } from './margeitem/margeitem';
@NgModule({
	declarations: [LotcardComponent,
    LotchartComponent,
    CroissancechartComponent,
    GaugepoidsComponent,
    AltylyagaugeComponent,
    MargeitemComponent],
	imports: [JustgageModule,PipesModule, IonicModule],
	exports: [LotcardComponent,
    LotchartComponent,
    CroissancechartComponent,
    GaugepoidsComponent,
    AltylyagaugeComponent,
    MargeitemComponent],

})
export class ComponentsModule {}
