import { Component } from '@angular/core';
import {IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams} from 'ionic-angular';
import {NetworkProvider} from "../../providers/network/network";
import {MessagerServiceProvider} from "../../providers/messager-service";

/**
 * Generated class for the SupportMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support-messages',
  templateUrl: 'support-messages.html',
})
export class SupportMessagesPage {

  messages : any;
  addNew = false;
  selectedMessage = -1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private networkProvider : NetworkProvider,
              private messager : MessagerServiceProvider,
              private modal: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportMessagesPage');
    this.getMessages();
  }

  /**
   * Get message list from serveur
   */
  getMessages() {
    let planurl = '/api/support/messages';
    this.networkProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.messages = data['datas']
        }
        else {
          this.messages = [];
          this.messager.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }

        console.log(this.messages);
      });
  }

  /**
   * open modal
   * @param plan
   */
  openModalSupportMessage(message) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = Object.assign({}, message);
    const myModal: Modal = this.modal.create('SupportMessagesModaleditPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        this.saveMessage(data);
      }

    });
  }

  /**
   * ajoute un message
   */
  addMessage() {
    this.addNew = true;

    let newmessage = {id:0, message : ''};
    this.openModalSupportMessage(newmessage);
  }


  /**
   * modif message
   * @param {number} index
   */
  editMessage(index:number) {
    this.addNew = false;
    this.selectedMessage = index;
    if(this.messages[index].admin_read_date==null)
      this.openModalSupportMessage(this.messages[index]);
    else
      this.messager.TaostMessage('Vous ne pouvez pas modifier ce message');
  }

  /**
   * save message
   * @param data
   */
  saveMessage(data : any) {
    let planurl = '/api/support/message';
    this.networkProvider.post(planurl,data)
      .then(data => {
        if(data['result'] == 'ok') {
          if(this.addNew) {
            this.messages.unshift(data['datas']);
          }
          else {
            this.messages[this.selectedMessage] = data['datas'];
          }
          this.messager.TaostMessage('Message enregistré',2000);
        }
        else {
          this.messager.TaostMessage('Erreur d\'enregistrement',2000);
        }

      });



  }

  /**
   * supprime un message
   * @param i
   * @param message
   */
  delete(i, id) {
    let planurl = '/api/support/message/delete/'+id;
    this.networkProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
            this.messages.splice(i,1);

          this.messager.TaostMessage('Message Supprimé',2000);
        }
        else {
          this.messager.TaostMessage('Erreur d\'enregistrement',2000);
        }

      });

  }
}
