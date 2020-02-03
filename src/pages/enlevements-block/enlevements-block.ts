import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {alimentsupplemente, enlevement} from "../../providers/enlevement/enlevement";

/**
 * Generated class for the enlevementsBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enlevements-block',
  templateUrl: 'enlevements-block.html',
})
export class EnlevementsBlockPage {
  enlevements : any;
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
    if(this.navParams.data.enlevements!=undefined)
      this.enlevements = Object.assign({}, this.navParams.data.enlevements);

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
    let el = document.querySelectorAll("input[name='date[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevements.items[i].date = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='nombre[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevements.items[i].nombre = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='observations[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevements.items[i].observations = el[i]['value'];
    }

    this.view.dismiss(this.enlevements);
  }

  /********************************************************************************************************************
   *
   * operations sur les aliments supplémentés
   */

  addEnlevement() {
    const newEnlevement : enlevement = {date:'', nombre:0,observations:''};

    this.enlevements.items.push(newEnlevement);

  }

  deleteAliment(index : number) {
    this.enlevements.items.splice(index,1);
  }

}
