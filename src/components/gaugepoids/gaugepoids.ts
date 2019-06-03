import { Component, Input, ViewChild } from '@angular/core'
//import { DecimalPipe } from '@angular/common';

//import { JustgageModule  } from 'angular2-justgage';

declare var JustGage;
/**
 * Generated class for the GaugepoidsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'gaugepoids',
  templateUrl: 'gaugepoids.html'
})
export class GaugepoidsComponent {
  @Input('min') minToUse;
  @Input('max') maxToUse;
  @Input('value') valueToUse;
  @Input('objectif') objectifToUse;
  text: string;
  min : number;
  max : number;
  value : number;
  objectif:number;

  options_poids = {
    min: 0,
    title: 'Poids (Kg)',
    gaugeWidthScale: 0.3,
    decimals : 3,
    valueMinFontSize : '35px',
    titleMinFontSize : '20px',
    label : 'jjkjkjk',
    levelColors : [  "#660000", "#CC0000", "#EE0000",  "#33EE33", "#00CC00", '#006600' ]
  };
  max_poids = 7;

  constructor() {
    console.log('Hello GaugepoidsComponent Component');
    this.text = 'Hello World';
  }

  ngOnChanges() {

    console.log('change');
    this.min = this.minToUse;
    this.max = this.maxToUse;
    this.value = this.valueToUse;
    this.objectif = this.objectifToUse;

    let taux = this.value / this.objectifToUse;

    if(taux>=1.4) {
      this.max = this.objectifToUse*taux;
      this.min = this.objectifToUse-(this.max-this.objectifToUse);
    }
    if(taux<=0.6) {
      this.min = (this.objectifToUse*taux)-0.05;
      this.max = this.objectifToUse+(this.objectifToUse-this.min);
    }

    if(this.min<=0) {
      this.min = 0;
      this.max = 2;
    }


    this.options_poids.min = this.min;
    this.options_poids.label = this.objectifToUse+' kg';
  }

}
