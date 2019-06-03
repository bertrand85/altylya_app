import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

/**
 * Generated class for the ElevageBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elevage-block',
  templateUrl: 'elevage-block.html',
})
export class ElevageBlockPage {

  identite : any;
  slideElevage : FormGroup;
  slideTechn : FormGroup;
  slideVeto:FormGroup;
  slidesForms : Array<FormGroup> = [];
  formsegment : string = 'elevage';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private view: ViewController) {
    this.init();
  }

  init() {
    if(this.navParams.data.identite!=undefined)
      this.identite = Object.assign({}, this.navParams.data.identite);

    this.slideElevage = this.formBuilder.group({
      nameExploi: [ this.identite.nameExploi, Validators.required],
      nameEleveur: [ this.identite.nameEleveur, Validators.required],
      telExploi: [ this.identite.telExploi, Validators.required],
      faxExploi: [ this.identite.faxExploi],
      adresse: [ this.identite.adresse, Validators.required],
      numExploi: [ this.identite.numExploi],

    });

    this.slidesForms.push(this.slideElevage);

    this.slideTechn = this.formBuilder.group({
      nameOP: [this.identite.nameOP],
      adresseOP: [this.identite.adresseOP],
      telOP: [this.identite.telOP],
      faxOP: [this.identite.faxOP],
      nameTechn: [this.identite.nameTechn],
      telTechn: [this.identite.telTechn],
    });
    this.slidesForms.push(this.slideTechn);

    this.slideVeto = this.formBuilder.group({
      nameVeto: [this.identite.nameVeto],
      telVeto: [this.identite.telVeto],
      faxVeto: [this.identite.faxVeto],
    });
    this.slidesForms.push(this.slideVeto);

  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  saveModal() {
    let values = this.slideElevage.value;
    this.identite.nameExploi = values.nameExploi;
    this.identite.nameEleveur = values.nameEleveur;
    this.identite.telExploi = values.telExploi;
    this.identite.faxExploi = values.faxExploi;
    this.identite.adresse = values.adresse;
    this.identite.numExploi = values.numExploi;

    values = this.slideTechn.value;
    this.identite.nameOP = values.nameOP;
    this.identite.adresseOP = values.adresseOP;
    this.identite.telOP = values.telOP;
    this.identite.faxOP = values.faxOP;
    this.identite.nameTechn = values.nameTechn;
    this.identite.telTechn = values.telTechn;

    values = this.slideVeto.value;
    this.identite.nameVeto = values.nameVeto;
    this.identite.telVeto = values.telVeto;
    this.identite.faxVeto = values.faxVeto;

    this.view.dismiss(this.identite);


  }
}
