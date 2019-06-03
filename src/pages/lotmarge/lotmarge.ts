import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MargebrutProvider } from '../../providers/margebrut/margebrut';
import {marge} from "../../interfaces/lots";

/**
 * Generated class for the LotmargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotmarge',
  templateUrl: 'lotmarge.html',
})
export class LotmargePage {

  lotCode : string = '';
  lot : any;
  margeBrute : marge;
  showWhat : string;

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
  			 private margeProvider : MargebrutProvider) {
  }

  /**
   *
   */
  ionViewDidLoad() {
    if(this.navParams.data.lotCode!=undefined)
      this.lotCode = this.navParams.data.lotCode;

    if(this.navParams.data.lot!=undefined)
      this.lot = this.navParams.data.lot;

    this.getMargeForLot();
    this.showWhat = 'produits';
  }

  /**
   * get marge for a lot
   */
  getMargeForLot() {
 	this.margeProvider.getMargeBrut(this.lot.definition.id);
  this.margeBrute = this.margeProvider.marge;
 }

  /**
   *
   */
  addProduit() {
    this.margeProvider.addProduit();
  }

  /**
   *
   */
  addCharge() {
    this.margeProvider.addCharge();
  }

  /**
   *
   */
   saveMarge() {
     console.log(this.margeProvider.marge);
     this.margeProvider.storeMargeBrut();
  }

  deleteItem(type : string, i : number) {
     if(type=='produit') {
       this.margeProvider.deleteProduit(i);
     }
     else {
       this.margeProvider.deleteCharge(i);
     }
    this.margeProvider.storeMargeBrut();
  }
}
