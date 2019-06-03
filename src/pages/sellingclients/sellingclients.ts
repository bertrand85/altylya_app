import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';
import {MessagerServiceProvider} from "../../providers/messager-service";
import { ClientsProvider } from "../../providers/clients/clients";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SellingclientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellingclients',
  templateUrl: 'sellingclients.html',
})
export class SellingclientsPage {

  clients: Array<any> = [];
  selectedClient = -1;
  addNew = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
             // private messager : MessagerServiceProvider,
              private modal: ModalController,
              private clientsProvider: ClientsProvider,
              public storage: Storage,
              private message : MessagerServiceProvider,) {
  }

  ionViewDidLoad() {
    this.getClients();
    console.log('ionViewDidLoad SellingclientsPage');
  }

  /**
   * Ajout d'un client
   */
  addClient() {
    this.addNew = true;
    let newClient = {id:0, nom:'', prenom:'', adr1:'', adr2:'', cp:'', ville:'', email:''};
    this.openModalClient(newClient);
  }


  /**
   * Modification d'un client
   * @param {number} index
   */
  editClient(index:number) {
    this.addNew = false;
    this.selectedClient = index;
    this.openModalClient(this.clients[index]);
  }

  /**
   * Ouvre la fenêtre modal pour ajout/modif d'un client
   * @param Data
   */
  openModalClient(client) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {client : Object.assign({}, client)};
    const myModal: Modal = this.modal.create('SellingclientPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        this.storeClient(data);
      }

    });

  }

  /**
   * store clients to local storage
   */
  

  storeClient(data : any) {
    let planurl = 'api/clients';
    this.clientsProvider.post(planurl,data)
      .then(data => {
        if(data['result'] == 'ok') {
          if(this.addNew) {
            this.clients.push(data['datas']);
          }
          else {
            this.clients[this.selectedClient] = data['datas'];
          }
          this.message.TaostMessage('Client enregistré',2000);
        }
        else {
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        }

        console.log(this.clients[0]);
      });



  }

  /**
   * get clients from local storage
   * @returns {Promise<any>}
   */
  getClients(){
    let planurl = 'api/clients';   
    let i=0;
    this.clientsProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.clients = data['datas'];
        }
        else {
          this.clients = [];
          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }
        for(i=0;i<this.clients.length;i++){
          if(this.clients[i].actif == 1){
            this.clients[i].actif = true;
          }
          else{
            this.clients[i].actif = false;
          }
        }
        console.log(this.clients[0]);
      });
  }

  /**
   * searchbar filtre
   * @param ev
   */
  getItems(ev: any) {
    // Reset items back to all of the items
    /*this.getClients().then((result)=>{
      this.clients = result;
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      for(let i=0; i<this.clients.length;i++) {
        if(this.clients[i].name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          this.clients[i].show=1;
        else
          this.clients[i].show=0;
      }
       console.log(this.clients);
    });*/


  }

  onChangeStatus(i, id) {
    this.addNew = false;
    if(this.clients[i].actif == true){
      let planurl = 'api/clients/publish/'+id;
      this.clientsProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.message.TaostMessage('Statut enregistré',2000);
        }
        else {
          this.clients[i].actif = false;
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        };
      });
      

    }
    else{
      let planurl = 'api/clients/unpublish/'+id;
      this.clientsProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.message.TaostMessage('Statut enregistré',2000);
        }
        else {
          this.clients[i].actif = true;
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        };
      });
      
    }
  }
}
