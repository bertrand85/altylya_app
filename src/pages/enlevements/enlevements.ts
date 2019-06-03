import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';
import {EnlevementicaPage} from "../enlevementica/enlevementica";
import {EnlevementsProvider} from "../../providers/enlevements/enlevements";
import {MessagerServiceProvider} from "../../providers/messager-service";
import { DecimalPipe } from '@angular/common';
import { EnlevementProvider } from '../../providers/enlevement/enlevement';

/**
 * Generated class for the EnlevementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enlevements',
  templateUrl: 'enlevements.html',
})
export class EnlevementsPage {

  lotCode : string = '';
  lot : any;
  enlevements : Array<any> = [];
  addNew = false;
  selectedEnlevement = -1;
  isAbbatu = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modal: ModalController,
              private enlevementsProvider: EnlevementsProvider,
              private message : MessagerServiceProvider,) {
  }

  ionViewDidLoad() {
    if(this.navParams.data.lotCode!=undefined)
      this.lotCode = this.navParams.data.lotCode;

    if(this.navParams.data.lot!=undefined)
      this.lot = this.navParams.data.lot;

    if(this.lot.definition.status>1) {
      this.isAbbatu = true;
    }
    this.getEnlevementsForLot();

  }

  storeEnlevementsForLot(data : any) {
    let planurl = '/api/enlevement';
    data.lot_id = this.lot.definition.id;
    this.enlevementsProvider.post(planurl,data)
      .then(data => {
        if(data['result'] == 'ok') {
          if(this.addNew) {
            this.enlevements.push(data['datas']);
          }
          else {
            this.enlevements[this.selectedEnlevement] = data['datas'];
          }
          this.message.TaostMessage('Enlèvement enregistré',2000);
        }
        else {
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        }

        console.log(this.enlevements[0]);
      });



  }


  getEnlevementsForLot() {
    let planurl = '/api/lot/'+this.lot.definition.id+'/enlevements';
    this.enlevementsProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.enlevements = data['datas'];
        }
        else {
          this.enlevements = [];
          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }

        console.log(this.enlevements[0]);
      });
  }

  openModalEnlevement(enlevement) {
    console.log('enlevement click');

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {lot:this.lot, enlevement : Object.assign({}, enlevement) };
    const myModal: Modal = this.modal.create('EnlevementPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        this.storeEnlevementsForLot(data);
      }

    });
  }

  addEnlevement() {
    this.addNew = true;
    let i=0;
    let nbEnleves=0;
    let nbEnleves_p2=0;
    for(i=0;i<this.enlevements.length; i++) {
      nbEnleves += parseFloat( this.enlevements[i].nombre);
      nbEnleves_p2 += parseFloat( this.enlevements[i].nombre_p2);
    }

    let nbRestant = this.lot.definition.nombre - this.lot.instant_datas.mort -  nbEnleves ;
    let nbRestant_p2 = this.lot.definition.nombre_p2 - this.lot.instant_datas.mort_p2 - nbEnleves_p2;

    let newEnlevement = {id:0, date:'2018-01-01', nombre: nbRestant, nombre_p2 : nbRestant_p2, pdsvif:0,pdscarcasse:0, statusica:0};
    this.openModalEnlevement(newEnlevement);
  }


  /**
   * Modification d'un client
   * @param {number} index
   */
  editEnlevement(index:number) {
    this.addNew = false;
    this.selectedEnlevement = index;
    this.openModalEnlevement(this.enlevements[index]);
  }

  makeIca() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {'lot':this.lot};
    const myModal: Modal = this.modal.create('EnlevementicaPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  makeIcaEnlev(enlevId, index) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    this.selectedEnlevement = index;
    const myModalData = {'lot':this.lot, 'enlevId':enlevId};
    const myModal: Modal = this.modal.create('EnlevementicaPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevements[this.selectedEnlevement].statusica = 1;
        console.log("I'm about to dismiss");
        console.log(data);

      }
      this.selectedEnlevement = -1;

    });
  }

  showIcaPdf(id) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {'lotid':this.lot.definition.id, 'enlevid':id};
    const myModal: Modal = this.modal.create('EnlevementpdfPage', { data: myModalData }, myModalOptions);

    myModal.present();



  }

  deleteEnlevementsForLot(i, id) {
    let planurl = '/api/enlevement/delete/'+id;
    this.enlevementsProvider.get(planurl)
    .then(data => {
      if(data['result'] == 'ok') {
        this.enlevements.splice(i,1);
        this.message.TaostMessage('Enlèvement supprimé',2000);
      }
      else {
        this.enlevements = [];
        this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }

      console.log(this.enlevements[0]);

      });

  }

  isAbbatuChange() {
    console.log(this.isAbbatu);

    let status = 1;
    if(this.isAbbatu==true)
        status = 2;

    let planurl = '/api/lot/'+this.lot.definition.id+'/updatestatus/'+status;
    this.enlevementsProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.lot.definition.status = status;
          this.message.TaostMessage('Lot mis à jour',2000);
        }
        else {
          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }

        console.log(this.enlevements[0]);

      });
  }
}
