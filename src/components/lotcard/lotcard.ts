import { Component, Input } from '@angular/core';
//import Moment from 'moment';
import { extendMoment } from 'moment-range';


//const moment = extendMoment(Moment);


/**
 * Generated class for the LotcardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lotcard',
  templateUrl: 'lotcard.html'
})
export class LotcardComponent {
  @Input('lot') lotDataToUse;
  @Input('index') indexToUse;
  lot: any;
  i : number;
  dateEntree : string;

  constructor() {
    console.log('Hello LotcardComponent Component');

  }

  ngAfterViewInit() {
    debugger;
    this.lot = this.lotDataToUse;
    //this.dateEntree = moment(this.lot.definition.date_entree).format('LLLL');
    this.i   = this.indexToUse;
  }
}
