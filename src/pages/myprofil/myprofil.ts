import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserData } from "../../providers/user-data";
import {ImagePicker} from "@ionic-native/image-picker";
import {Crop} from "@ionic-native/crop";
import {Camera} from "@ionic-native/camera";
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { ALTYLYA_API } from "../../interfaces/app-options";
import {MessagerServiceProvider} from "../../providers/messager-service";


/**
 * Generated class for the MyprofilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofil',
  templateUrl: 'myprofil.html',
})
export class MyprofilPage {

  profilForm : FormGroup;
  submitAttempt = false;
  photos : string;
  avatarChanged = false;

  /**
   * constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {UserData} user
   * @param {FormBuilder} formBuilder
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private user : UserData,
              public formBuilder: FormBuilder,
              public actionSheetCtrl: ActionSheetController,
              private imagePicker : ImagePicker,
              private cropService : Crop,
              private camera : Camera,
              private message : MessagerServiceProvider,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath) {

    this.profilForm = formBuilder.group({
      name: [ this.user.userProfile.name, Validators.required],
      email: [ this.user.userProfile.email, Validators.required],
      usertype: [ this.user.userProfile.usertype, Validators.required],
      mobile_phone: [ this.user.userProfile.mobile_phone, Validators.required],
      password: [ this.user.userProfile.password],
      avatar: [ this.user.userProfile.avatar]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilPage');
  }

  /**
   * save form
   */
  save(){
    this.submitAttempt = true;

    if(this.profilForm.valid){
      if(this.avatarChanged) {
        this.uploadImage();
      }

      this.user.postProfil(this.profilForm.value).then(data => {
        if(data['result'] == 'ok') {
          this.user.updateStatusFromWeb();
          this.message.TaostMessage('Profil enregistré',2000);
        }
        else {
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        }

      });


    }
  }

  /*********************************************************************************************
   * timeline image
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
            this.user.userProfile.avatar = cropped_image;
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
            this.user.userProfile.avatar = newImage;
            this.avatarChanged = true;
          }, error => console.error("Error cropping image", error));
      }, function(error) {
        console.log(error);
      });
  }

  public uploadImage() {
    // Destination URL
    var url = ALTYLYA_API.urlapi2 + '/api/user/avatar?session_id='+this.user.userInfo.session_id;

    // File for Upload
    var targetPath = this.user.userProfile.avatar;

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
