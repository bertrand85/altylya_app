import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {alimentsupplemente} from "../../providers/enlevement/enlevement";

/**
 * Generated class for the AlimentsBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aliments-block',
  templateUrl: 'aliments-block.html',
})
export class AlimentsBlockPage {
  aliment : any;
  slideAliments : FormGroup;
  slidesForms : Array<FormGroup> = [];
  formsegment : string = 'lot';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private view: ViewController) {
    this.init();
  }

  init() {
    if(this.navParams.data.aliment!=undefined)
      this.aliment = Object.assign({}, this.navParams.data.aliment);

    this.slideAliments = this.formBuilder.group({
      nbAlimentsSupp : [0],
    });
    this.slidesForms.push(this.slideAliments);

  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  saveModal() {
    //aliments supplémentés
    let el = document.querySelectorAll("input[name='alimname[]']");
    for (let i=0; i<el.length; i++) {
      this.aliment.items[i].name = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='dateDebut[]']");
    for (let i=0; i<el.length; i++) {
      this.aliment.items[i].dateDebut = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='dateFin[]']");
    for (let i=0; i<el.length; i++) {
      this.aliment.items[i].dateFin = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='veterinaire[]']");
    for (let i=0; i<el.length; i++) {
      this.aliment.items[i].veterinaire = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='tempsAttente[]']");
    for (let i=0; i<el.length; i++) {
      this.aliment.items[i].tempsAttente = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='ordonnance[]']");
    for (let i=0; i<el.length; i++) {
      this.aliment.items[i].ordonnance = el[i]['value'];
    }

    this.view.dismiss(this.aliment);
  }

  /********************************************************************************************************************
   *
   * operations sur les aliments supplémentés
   */

  addAliment() {
    const newAlim : alimentsupplemente = {name:'', dateDebut:'',dateFin:'',veterinaire:'',ordonnance:'',tempsAttente:8};

    this.aliment.items.push(newAlim);

  }

  deleteAliment(index : number) {
    this.aliment.items.splice(index,1);
  }

}
