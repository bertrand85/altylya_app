import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';
import {PlanalimProvider} from "../../providers/planalim/planalim";
import {MessagerServiceProvider} from "../../providers/messager-service";
import { DecimalPipe } from '@angular/common';
import {ProductionplanProvider} from "../../providers/lots/productionplan";

/**
 * Generated class for the LotplanalimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotplanalim',
  templateUrl: 'lotplanalim.html',
})
export class LotplanalimPage {

  segment: string = "livraisons";

  lot : any;
  plan : any;
  marge : any;
  livraisons : any;
  addNew = false;
  selectedPlan = -1;
  selectedAliment = -1;

  productionplanPeriodes : any;

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {PlanalimProvider} planProvider
   * @param {MessagerServiceProvider} messager
   * @param {ModalController} modal
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private planProvider : PlanalimProvider,
              private messager : MessagerServiceProvider,
              private modal: ModalController,
              private message : MessagerServiceProvider,
              public  productionplanProvider : ProductionplanProvider) {

  }

  /**
   *
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad LotplanalimPage');
    if(this.navParams.data.lot!=undefined)
      this.lot = Object.assign({}, this.navParams.data.lot.definition);

    this.getAlimentation();
    this.productionplanProvider.init(this.lot.id, []);
    this.productionplanPeriodes = this.productionplanProvider.planPeriodes;
    console.log(this.lot);

  }

  /**
   * appel API pour alimentation
   * API retourne à la fois le plan et les livraisons d'aliment
   */
  getAlimentation() {
    let planurl = '/api/lot/'+this.lot.id+'/alimentation';
    this.planProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.productionplanProvider.planPeriodes = data['datas']['plan'];
          this.livraisons = data['datas']['livraisons'];
          this.marge = this.planProvider.dispatchLivraisons(this.livraisons, this.lot);
          console.log(this.marge);
        }
        else {
          this.productionplanProvider.planPeriodes = [];
          this.livraisons = [];
          this.messager.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }

        console.log(this.productionplanProvider.planPeriodes);
      });
  }

  /*****************************************************************************************************************
   * PLAN D'ALIMENTATION
   */

  /**
   * open modal
   * @param plan
   */
  openModalPlanAlim(plan) {
    console.log('enlevement click');

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {'sexe' : this.lot.sexe , 'plan':Object.assign({}, plan), lotstatus : this.lot.status};
    const myModal: Modal = this.modal.create('LotplanalimdetailPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        this.savePlanAlim(data);
      }
      else {

      }

    });
  }

  /**
   * ajoute un plan
   */
  addPlanAlim() {

    this.addNew = true;

   /* let newPlanAlim = {id:0, lot_id:this.lot.id, aliment_type:1,
        aliment_nom:'', age_debut:'', age_fin:'', qtte_par_animal:'', poids_objectif :'', poids_objectif_p2 :'', poids_etapes:'',  	ic_objectif :''  };
   */
    this.openModalPlanAlim(this.productionplanProvider.newPlanPeriode());
  }


  /**
   * modif plan alim
   * @param {number} index
   */
  editPlanAlim(index:number) {
    this.addNew = false;
    this.selectedPlan = index;
    this.openModalPlanAlim(this.productionplanProvider.planPeriodes[index]);
  }

  /**
   * save plan alim
   * @param data
   */
  savePlanAlim(data : any) {



    let planurl = '/api/plan';
    this.productionplanProvider.post(planurl,data)
      .then(data => {
        if(data['result'] == 'ok') {
          if(this.addNew) {
            this.productionplanProvider.planPeriodes.push(data['datas']);
          }
          else {
            this.productionplanProvider.planPeriodes[this.selectedPlan] = data['datas'];
          }

          this.message.TaostMessage('Plan enregistré',2000);
        }
        else {
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        }


      });



  }

  deletePlanForLot(i, plan_id) {
    let planurl = '/api/plan/delete/'+plan_id;
    this.selectedPlan = i;
    this.productionplanProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.productionplanProvider.deletePeriode(this.selectedPlan);
          this.message.TaostMessage('Plan d\'alimentation supprimé',2000);
        }
        else {

          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }

        this.selectedPlan = -1;
      });
  }

  duplicateFrom() {
    this.productionplanProvider.getForDuplicate(this.lot.id);
  }

  duplicate(lotId) {
    this.productionplanProvider.duplicate(lotId);
  }

  /*****************************************************************************************************************
   * LIVRAISON
   */

  /**
   * open modal
   * @param plan
   */
  openModalLivraison(livraison) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {livraison:Object.assign({}, livraison), lotstatus : this.lot.status};
    const myModal: Modal = this.modal.create('LotalimlivraisonPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        this.saveLivraison(data);
      }

    });
  }

  /**
   * ajoute une livraison
   */
  addLivraison() {
    this.addNew = true;

    let newLivraison = {id:0, lot_id:this.lot.id, aliment_type:1, date:'', quantite:'', supplement:'', supp_delai:'0', supp_ordo:''};
    this.openModalLivraison(newLivraison);
  }


  /**
   * modif Livraison
   * @param {number} index
   */
  editLivraison(index:number) {
    this.addNew = false;
    this.selectedAliment = index;
    this.openModalLivraison(this.livraisons[index]);
  }

  /**
   * save Livraison
   * @param data
   */
  saveLivraison(data : any) {
    let planurl = '/api/alimlivraison';
    this.planProvider.post(planurl,data)
      .then(data => {
        if(data['result'] == 'ok') {
          if(this.addNew) {
            this.livraisons.push(data['datas']);
          }
          else {
            this.livraisons[this.selectedAliment] = data['datas'];
          }
          this.message.TaostMessage('Livraison enregistrée',2000);
        }
        else {
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        }

        console.log(this.livraisons[0]);
      });
  }

  deleteAlimLivraisonForLot(i, id) {
    let planurl = '/api/alimlivraison/delete/'+id;
    this.selectedAliment = i;
    this.planProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.livraisons.splice(this.selectedAliment,1);
          this.message.TaostMessage('Livraison supprimée',2000);
        }
        else {

          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }
        this.selectedAliment = -1

      });
  }
}
