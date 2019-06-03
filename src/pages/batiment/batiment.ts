import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, Loading, NavController, NavParams} from 'ionic-angular';
import { LoadingController, ToastController} from "ionic-angular";
import { NgForm } from '@angular/forms';
import { batimentJson} from "../../interfaces/avi_jsons";
import { ElevageDataProvider } from "../../providers/elevage-data";
import { UserData} from '../../providers/user-data';
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {ALTYLYA_API} from "../../interfaces/app-options";
import {MessagerServiceProvider} from "../../providers/messager-service";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {Crop} from "@ionic-native/crop";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";

/**
 * Generated class for the BatimentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-batiment',
  templateUrl: 'batiment.html',
})
export class BatimentPage {
  batimentsegment: string = "general";

  batiment : any;
  batiment_index : number=-1;

  photos : string ='';
  avatarChanged = false;


  loading:Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public LoadingCtrl:LoadingController,
              public user: UserData,
              public ElevageData : ElevageDataProvider,
              private toast : ToastController,
              public actionSheetCtrl: ActionSheetController,
              private imagePicker : ImagePicker,
              private cropService : Crop,
              private camera : Camera,
              private message : MessagerServiceProvider,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath) {

    this.batiment = this.newBatiment();

    if(this.navParams.data.batiment!=undefined)
      this.batiment = Object.assign({}, this.navParams.data.batiment);
    if(this.navParams.data.index!=undefined)
      this.batiment_index = this.navParams.data.index;
    console.log(this.batiment.id);
  }

  ionViewDidLoad() {
    console.log(this.batiment.id);
  }

  newBatiment() {

     var batiment = {
         id: 0,
         elevage_id: 0,
         name: "",
         num_national:"",
         streetone: "",
         streettwo: "",
         zipcode: "",
         city: "",
         lat: "0",
         long: "0",
         avatar: "",
         sol: 0,
         structure: 0,
         ventilation: 0,
         surface: 0 ,
         surface_parcour: 0
       };

    return batiment;
  }

  onSave(form: NgForm) {
    if (form.valid) {
      this.presentLoadingCustom();
      this.ElevageData.postBatiment(this.batiment)
        .subscribe(
          result => {
            this.loading.dismiss();
            if(result.status=='ok') {
              if(this.avatarChanged) {
                this.uploadImage(result.batiment.id);
              }
              this.user.updateStatusFromWeb();
              this.navCtrl.pop();
              /*if(this.batiment_index>=0)
                this.user.batiments[this.batiment_index] = result.batiment;
              else
                this.user.batiments.push(result.batiment);*/

              let toast = this.toast.create({
                message: `Batiment sauvegardé!`,
                duration: 2000
              });
              toast.present();
            }
            else {
              alert(result.error_description);
            }
          },
          error => {alert(error);this.loading.dismiss();}
        );
    }
  }

  presentLoadingCustom() {
    this.loading = this.LoadingCtrl.create({
      content: 'Enregistrement ...'
    });


    this.loading.present();
  }

  /*********************************************************************************************
   * batiment image
   */

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choisir ou prendre une photo',
      buttons: [
        {
          text: 'Caméra',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Gallerie',
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
      maximumImagesCount: 1,
    }
    this.photos = '';
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
        return this.cropService.crop(item, {quality: 75, targetHeight:100,targetWidth:100})
          .then(cropped_image => {
            this.photos = cropped_image;
            this.avatarChanged = true;
          });
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
        this.photos = '';
        this.cropService
          .crop(data, {quality: 75, targetHeight:100,targetWidth:100})
          .then((newImage) => {
            this.photos = newImage;
            this.avatarChanged = true;
          }, error => console.error("Error cropping image", error));
      }, function(error) {
        console.log(error);
      });
  }

  public uploadImage(bat_id) {
    // Destination URL
    var url = ALTYLYA_API.urlapi2 + '/api/batiment/avatar?session_id='+this.user.userInfo.session_id+'&bat_id='+bat_id;

    // File for Upload
    var targetPath = this.photos;

    // File name only
    var filename = 'avatar.jpg';

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      httpMethod : 'POST',
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.message.presentLoadingCustom( 'Uploading...' );


    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.message.dismissLoading();
      this.message.TaostMessage('Image succesful uploaded.');
    }, err => {
      this.message.dismissLoading();
      this.message.TaostMessage('Error while uploading file.');
    });
  }
}
