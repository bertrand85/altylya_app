import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the BandeBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bande-block',
  templateUrl: 'bande-block.html',
})
export class BandeBlockPage {
  bande : any;
  slideBande : FormGroup;
  slideBandeTwo : FormGroup;
  slidesForms : Array<FormGroup> = [];
  formsegment : string = 'lot';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private view: ViewController) {
    this.init();
  }

  init() {
    if(this.navParams.data.bande!=undefined)
      this.bande = Object.assign({}, this.navParams.data.bande);

    this.slideBande = this.formBuilder.group({
      lotCode: [this.bande.lotCode],
      souche: [this.bande.souche],
      couvoir: [this.bande.couvoir],
      batimentINUAV: [this.bande.batimentINUAV],
      communeBatiment: [this.bande.communeBatiment],
      productionType: [this.bande.productionType],
      productionTypeAutre: [this.bande.productionTypeAutre],
    });
    this.slidesForms.push(this.slideBande);

    this.slideBandeTwo = this.formBuilder.group({
      nbMisEnPlace: [this.bande.nbMisEnPlace],
      dateMiseEnPlace: [this.bande.dateMiseEnPlace],
      ageMiseEnPlace: [this.bande.ageMiseEnPlace],
      densite: [this.bande.densite],
    });
    this.slidesForms.push(this.slideBandeTwo);

  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  saveModal() {
    let values = this.slideBande.value;
    this.bande.lotCode = values.lotCode;
    this.bande.souche = values.souche;
    this.bande.couvoir = values.couvoir;
    this.bande.batimentINUAV = values.batimentINUAV;
    this.bande.communeBatiment = values.communeBatiment;
    this.bande.productionType = values.productionType;
    this.bande.productionTypeAutre = values.productionTypeAutre;

    values = this.slideBandeTwo.value;
    this.bande.nbMisEnPlace = values.nbMisEnPlace;
    this.bande.dateMiseEnPlace = values.dateMiseEnPlace;
    this.bande.ageMiseEnPlace = values.ageMiseEnPlace;
    this.bande.densite = values.densite;


    this.view.dismiss(this.bande);


  }
}
