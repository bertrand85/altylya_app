import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { IonicPage,  ViewController, NavParams } from 'ionic-angular';
import {planPeriodes, ProductionplanProvider} from "../../providers/lots/productionplan";
import { AlertController } from 'ionic-angular';
//import {NgForm} from "@angular/forms";

/**
 * Generated class for the LotplanalimdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotplanalimdetail',
  templateUrl: 'lotplanalimdetail.html',
})
export class LotplanalimdetailPage {
  plan :planPeriodes;
  lotSexe = 1;
  lotStatus = 1;
  submitAttempt: boolean = false;

  planForm:FormGroup;
  nbEtapes : any;

  constructor(private view: ViewController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public  productionplanProvider : ProductionplanProvider,
              private alertCtrl: AlertController) {
  }

  /**
   *
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad LotplanalimdetailPage');
  }

  /**
   *
   */
  ionViewWillLoad() {
    const data = this.navParams.get('data');
    this.plan = data['plan'];
    this.lotSexe = data['sexe'];
    this.lotStatus = data['lotstatus'];

    this.planForm = this.formBuilder.group({
      aliment_type : [ this.plan['aliment_type'], Validators.required],
      aliment_nom : [ this.plan['aliment_nom'], Validators.required],
      age_debut : [ this.plan['age_debut'], Validators.required],
      age_fin : [ this.plan['age_fin'], Validators.required],
      qtte_par_animal : [ this.plan['qtte_par_animal'], Validators.required],
      poids_objectif : [ this.plan['poids_objectif']],
      poids_objectif_p2 : [ this.plan['poids_objectif_p2']],
      /*ic_objectif : [ this.plan['ic_objectif']]*/
    });
  }

  save(){
    this.submitAttempt = true;

    if(this.planForm.valid){
      this.plan['aliment_type'] = this.planForm.value['aliment_type'];
      this.plan['aliment_nom'] = this.planForm.value['aliment_nom'];
      this.plan['age_debut'] = this.planForm.value['age_debut'];
      this.plan['age_fin'] = this.planForm.value['age_fin'];
      this.plan['qtte_par_animal'] = this.planForm.value['qtte_par_animal'];
      //this.plan['poids_objectif'] = this.planForm.value['poids_objectif'];
     // this.plan['poids_objectif_p2'] = this.planForm.value['poids_objectif_p2'];
     // this.plan['ic_objectif'] = this.planForm.value['ic_objectif'];

      let el = document.querySelectorAll("input[name='poids[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].poids_objectif = el[i]['value'];
      }
      this.plan['poids_objectif'] = el[el.length-1]['value'];

      el = document.querySelectorAll("input[name='mort[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].mort_objectif = el[i]['value'];
      }
      el = document.querySelectorAll("input[name='ic[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].ic_objectif = el[i]['value'];
      }
      el = document.querySelectorAll("input[name='poids_p2[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].poids_objectif_p2 = el[i]['value'];
      }
      if(el.length>0)
        this.plan['poids_objectif_p2'] = el[el.length-1]['value'];

      el = document.querySelectorAll("input[name='mort_p2[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].mort_objectif_p2 = el[i]['value'];
      }
      /*el = document.querySelectorAll("input[name='ic_p2[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].ic_objectif_p2 = el[i].value;
      }*/
      el = document.querySelectorAll("input[name='interventions[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].interventions = el[i]['value'];
      }
      /*el = document.querySelectorAll("input[name='observations[]']");
      for (let i=0; i<el.length; i++) {
        this.plan.etapes[i].observations = el[i]['value'];
      }*/
      this.view.dismiss(this.plan);
    }
  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  recalculEtapes() {
    this.plan['age_debut'] = this.planForm.value['age_debut'];
    this.plan['age_fin'] = this.planForm.value['age_fin'];
    this.productionplanProvider.recalculateEtapes(this.plan);

  }


  /****************************************************************************************************************
   * popup etape
   */

  presentPromptEtape(index : number) {
    let alert = this.alertCtrl.create({
      title: 'Semaine',
      inputs: [
        {
          label : 'Poids objectif',
          name: 'Poids objectif',
          placeholder: 'Poids objectif'
        },
        {
          name: 'Mortalité Objectif',
          placeholder: 'Mortalité Objectif'
        },
        {
          name: 'IC Objectif',
          placeholder: 'IC Objectif'
        },
        {
          name: 'Interventions',
          placeholder: 'Interventions à prévoir',
          type : 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }

  presentPromptPoids(index : number) {
    let alert = this.alertCtrl.create({
      title: 'Poids objectif',
      subTitle : 'Entrez le poids objectif en fin de semaine N°',
      inputs: [
        {
          label : 'Poids objectif',
          name: 'Poids objectif',
          placeholder: 'Poids objectif'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }
}
