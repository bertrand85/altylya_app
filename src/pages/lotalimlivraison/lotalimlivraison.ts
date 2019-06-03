import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LotalimlivraisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotalimlivraison',
  templateUrl: 'lotalimlivraison.html',
})
export class LotalimlivraisonPage {
  livraison = {};
  submitAttempt: boolean = false;
  lotStatus : number = 1;

  livraisonForm:FormGroup;
  constructor(private view: ViewController,
              public navParams: NavParams,
              public formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LotalimlivraisonPage');
  }

  /**
   *
   */
  ionViewWillLoad() {
    let datas = this.navParams.get('data');
    this.livraison = datas.livraison;
    this.lotStatus = datas.lotstatus;

    this.livraisonForm = this.formBuilder.group({
      aliment_type : [ this.livraison['aliment_type'], Validators.required],
      name : [ this.livraison['name']],
      date : [ this.livraison['date'], Validators.required],
      quantite : [ this.livraison['quantite'], Validators.required],
      prix : [ this.livraison['prix']],
      supplement : [ this.livraison['supplement']],
      supp_delai : [ this.livraison['supp_delai']],
      supp_ordo : [ this.livraison['supp_ordo']],
    });
  }

  save(){
    this.submitAttempt = true;

    if(this.livraisonForm.valid){
      this.livraison['aliment_type'] = this.livraisonForm.value['aliment_type'];
      this.livraison['name'] = this.livraisonForm.value['name'];
      this.livraison['date'] = this.livraisonForm.value['date'];
      this.livraison['quantite'] = this.livraisonForm.value['quantite'];
      this.livraison['prix'] = this.livraisonForm.value['prix'];
      this.livraison['supplement'] = this.livraisonForm.value['supplement'];
      this.livraison['supp_delai'] = this.livraisonForm.value['supp_delai'];
      this.livraison['supp_ordo'] = this.livraisonForm.value['supp_ordo'];

      this.view.dismiss(this.livraison);
    }
  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

}
