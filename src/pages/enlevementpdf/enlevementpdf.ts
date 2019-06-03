import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';

import { ALTYLYA_API} from "../../interfaces/app-options";
import {NetworkProvider} from "../../providers/network/network";
import {MessagerServiceProvider} from "../../providers/messager-service";
import {UserData} from "../../providers/user-data";

/**
 * Generated class for the EnlevementpdfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enlevementpdf',
  templateUrl: 'enlevementpdf.html',
})
export class EnlevementpdfPage {
  lotid : number = 0;
  enlevid:number = 0;
  src : string;
  imgsrc : string;
  platform = false;

  constructor(private view: ViewController,
              public navParams: NavParams,
              public Network : NetworkProvider,
              public Messager : MessagerServiceProvider,
              public user : UserData,
              private fileopener:FileOpener,
              public plt: Platform,
              private file : File,
              private transfer : Transfer) {
    if(this.navParams.data.data.lotid!=undefined)
      this.lotid = this.navParams.data.data.lotid;
    if(this.navParams.data.data.enlevid!=undefined)
      this.enlevid = this.navParams.data.data.enlevid;

    this.src= '/icapdf/'+this.lotid+'/'+this.enlevid+'?session_id='+this.user.userInfo.session_id;
  }

  /**
   * view did load
   */
  ionViewDidLoad() {
    this.imgsrc = '';
    this.Network.get( this.src ).then( data=>{
      if(data['result'] == 'ok') {
        this.imgsrc = ALTYLYA_API.imgurl + '/ica/' + data['datas'];
        console.log(this.imgsrc);
      }
      else {
        this.Messager.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }
    });

  }

  /**
   * fermeture de la modale
   */
  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  /**
   * envoi de la fiche ICA par mail
   */
  sendicapdf() {
    let service = 'icapdfmail/'+this.lotid+'/'+this.enlevid;
    this.Network.get(service).then(data=>{
      if(data['result']=='ok') {
        this.Messager.TaostMessage('Fiche ICA envoyée')
      } else {
        this.Messager.TaostMessage('Erreur lors de l\'envoi de la fiche ICA');
      }
    })
  }

  downloadAndOpenPdf(src:string) {

    let path = null;

    if (this.plt.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.plt.is('android')) {
      path = this.file.dataDirectory;
    }

    const transfer = this.transfer.create();
    transfer.download(src, path + 'ica.pdf').then(entry => {
      let url = entry.toURL();

      this.fileopener.open(url, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
      //this.document.viewDocument(url, 'application/pdf', {});
    });
  }
}
