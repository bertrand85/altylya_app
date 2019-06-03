import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {traitement} from "../../providers/enlevement/enlevement";

/**
 * Generated class for the PathologieBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pathologie-block',
  templateUrl: 'pathologie-block.html',
})
export class PathologieBlockPage {
  traitements : any;
  slidePathologie : FormGroup;
  slidesForms : Array<FormGroup> = [];
  formsegment : string = 'lot';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private view: ViewController) {
    this.init();
  }

  init() {
    if(this.navParams.data.traitements!=undefined)
      this.traitements = Object.assign({}, this.navParams.data.traitements);

    this.slidePathologie = this.formBuilder.group({
      examEnCours : [this.traitements.examEnCours],
      examLabo : [this.traitements.examLabo],
    });
    this.slidesForms.push(this.slidePathologie);


  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  saveModal() {
    let values = this.slidePathologie.value;
    this.traitements.examEnCours = values.examEnCours;
    this.traitements.examLabo = values.examLabo;

    // traitements
    let el = document.querySelectorAll("input[name='traitePatho[]']");
    for (let i=0; i<el.length; i++) {
      this.traitements.items[i].pathologie = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteDateDebut[]']");
    for (let i=0; i<el.length; i++) {
      this.traitements.items[i].dateDebut = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteDateFin[]']");
    for (let i=0; i<el.length; i++) {
      this.traitements.items[i].dateFin = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteTraitement[]']");
    for (let i=0; i<el.length; i++) {
      this.traitements.items[i].traitement = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteTempsAttente[]']");
    for (let i=0; i<el.length; i++) {
      this.traitements.items[i].tempsAttente = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='TraiteOrdonnance[]']");
    for (let i=0; i<el.length; i++) {
      this.traitements.items[i].ordonnance = el[i]['value'];
    }


    this.view.dismiss(this.traitements);
  }

  /********************************************************************************************************************
   *
   * operations sur les traitements
   */

  addTraitement() {
    const newTraitement : traitement = {pathologie:'', dateDebut:'',dateFin:'',traitement:'',ordonnance:'',tempsAttente:8};

    this.traitements.items.push(newTraitement);
  }

  deleteTraitement(index : number) {
    this.traitements.items.splice(index,1);

  }


}
