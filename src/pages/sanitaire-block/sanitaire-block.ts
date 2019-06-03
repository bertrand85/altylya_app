import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";

/**
 * Generated class for the SanitaireBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sanitaire-block',
  templateUrl: 'sanitaire-block.html',
})
export class SanitaireBlockPage {
  etatSanitaire : any;
  slideEtatSanitaire : FormGroup;
  slideSalmonelle : FormGroup;
  slidesForms : Array<FormGroup> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private view: ViewController) {
    this.init();
  }

  init() {
    if(this.navParams.data.etatSanitaire!=undefined)
      this.etatSanitaire = Object.assign({}, this.navParams.data.etatSanitaire);

    // form pour le premier slide
    this.slideEtatSanitaire = this.formBuilder.group({
      pdsVif15j : [this.etatSanitaire.pdsVif15j],
      pdsVif8j : [this.etatSanitaire.pdsVif8j],
      pdsVifAbattage : [this.etatSanitaire.pdsVifAbattage],
      mortTotalNb : [this.etatSanitaire.mortTotalNb],
      mortTotalPourcent : [this.etatSanitaire.mortTotalPourcent],
      mort10jNb : [this.etatSanitaire.mort10jNb],
      mort10Pourcent : [this.etatSanitaire.mort10Pourcent],
      mortLast15Nb : [this.etatSanitaire.mortLast15Nb],
      mortLast15Pourcent : [this.etatSanitaire.mortLast15Pourcent],
      observations : [this.etatSanitaire.observations],
    });

    this.slidesForms.push(this.slideEtatSanitaire);

    // form pour le second slide
    this.slideSalmonelle = this.formBuilder.group({
      salmoAnalyse : [this.etatSanitaire.salmoAnalyse],
      salmoDatePrelev : [this.etatSanitaire.salmoDatePrelev],
      salmoEleDerog : [this.etatSanitaire.salmoEleDerog],
      derogEnlevContinu : [this.etatSanitaire.derogEnlevContinu],
      derogToutPleinVide : [this.etatSanitaire.derogToutPleinVide],
      salmoLabo : [this.etatSanitaire.salmoLabo],
      salmoResultat : [this.etatSanitaire.salmoResultat],
      salmoSerotype : [this.etatSanitaire.salmoSerotype],
    });
    this.slidesForms.push(this.slideSalmonelle);

  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  saveModal() {
    let values = this.slideEtatSanitaire.value;
    this.etatSanitaire.pdsVif15j = values.pdsVif15j;
    this.etatSanitaire.pdsVif8j = values.pdsVif8j;
    this.etatSanitaire.pdsVifAbattage = values.pdsVifAbattage;
    this.etatSanitaire.mortTotalNb = values.mortTotalNb;
    this.etatSanitaire.mortTotalPourcent = values.mortTotalPourcent;
    this.etatSanitaire.mort10jNb = values.mort10jNb;
    this.etatSanitaire.mort10Pourcent = values.mort10Pourcent;
    this.etatSanitaire.mortLast15Nb = values.mortLast15Nb;
    this.etatSanitaire.mortLast15Pourcent = values.mortLast15Pourcent;
    this.etatSanitaire.observations = values.observations;

    values = this.slideSalmonelle.value;
    this.etatSanitaire.salmoAnalyse = values.salmoAnalyse;
    this.etatSanitaire.salmoDatePrelev = values.salmoDatePrelev;
    this.etatSanitaire.salmoEleDerog = values.salmoEleDerog;
    this.etatSanitaire.derogEnlevContinu = values.derogEnlevContinu;
    this.etatSanitaire.derogToutPleinVide = values.derogToutPleinVide;
    this.etatSanitaire.salmoLabo = values.salmoLabo;
    this.etatSanitaire.salmoResultat = values.salmoResultat;
    this.etatSanitaire.salmoSerotype = values.salmoSerotype;


    this.view.dismiss(this.etatSanitaire);


  }
}
