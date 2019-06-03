import { Component } from '@angular/core';
import {
  IonicPage, ViewController, NavParams, Modal, ModalController, ModalOptions,
  ActionSheetController
} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {lotTraitement} from "../../interfaces/lots";
import {ImagePicker} from "@ionic-native/image-picker";
import {Crop} from "@ionic-native/crop";
import {Camera} from "@ionic-native/camera";

/**
 * Generated class for the JournalModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journal-modal',
  templateUrl: 'journal-modal.html',
})
export class JournalmodalPage {
  journalsegment: string = "general";
  dayData : any;
  lot : any;
  photos : Array<string>;

  constructor(private view: ViewController,
              public navParams: NavParams,
              private modal: ModalController,
              public actionSheetCtrl: ActionSheetController,
              private imagePicker : ImagePicker,
              private cropService : Crop,
              private camera : Camera) {
  }

  ionViewWillLoad() {
    let d = this.navParams.get('data');
    this.lot = d.lot;
    this.dayData = d.Data;
   // this.dayData.traitements.push(this.newTraitement());
  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  onSave(form: NgForm) {

    if (form.valid) {
      this.view.dismiss(this.dayData);
    }
  }

  newTraitement():lotTraitement {
    return {
      symptome       : '',
      produit        : '',
      qtte_produit   : '',
      ordonnance     : '',
      mode           : ''
    };
  }

  /**
   * fenetre ajout/modif d'un traitement
   * @param Data
   */
  openModalSanitaire(Data : any, i:number) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };


    let myModalData = Object.assign({}, this.newTraitement());
    if(Data)
      myModalData = Object.assign({}, Data);

    const myModal: Modal = this.modal.create('SanitaireModalPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        if(i>=0) {
          this.dayData.traitements[i] = data;
        }
        else {
          this.dayData.traitements.push(data);
        }
        //this.saveData(data);
      }

    });

  }

  /*********************************************************************************************
   * timeline image
   */

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openImagePicker(){
    let options= {
      maximumImagesCount: 5,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {
          console.log('all images cropped!!');
        });
      }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any) : any{
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75, targetHeight:200,targetWidth:200})
          .then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  }

  takePicture(){
    let options =
      {
        quality: 100,
        correctOrientation: true
      };
    this.camera.getPicture(options)
      .then((data) => {
        this.photos = new Array<string>();
        this.cropService
          .crop(data, {quality: 75, targetHeight:200,targetWidth:200})
          .then((newImage) => {
            this.photos.push(newImage);
          }, error => console.error("Error cropping image", error));
      }, function(error) {
        console.log(error);
      });
  }
}
