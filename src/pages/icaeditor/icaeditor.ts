import { Component, ViewChild } from '@angular/core';
import {
  Platform, NavController, NavParams, ViewController, ModalOptions, Modal, ModalController,
  IonicPage
} from 'ionic-angular';
import { Gesture } from 'ionic-angular'
import {EnlevementProvider} from "../../providers/enlevement/enlevement";

/**
 * Generated class for the IcaeditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-icaeditor',
  templateUrl: 'icaeditor.html',
})
export class IcaeditorPage {

  @ViewChild('image') element;
  @ViewChild('imageParent') elementParent;

  lot : any;
  image = null;
  container = null;
  transforms = [];
  adjustScale= 1;
  adjustDeltaX = 0;
  adjustDeltaY = 0;

  currentScale = null;
  currentDeltaX = null;
  currentDeltaY = null;

  public media: any;
  public src: string;
  public mediaType: string;
  private gesture: Gesture;
  public mediaLoaded:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modal : ModalController,
              private enlevement : EnlevementProvider ) {
    this.src = '';
  }

  setMediaLoaded =() =>{
    setTimeout(()=>this.mediaLoaded = true, 200);
  }

  ionViewDidLoad() {

    if(this.navParams.data.lot!=undefined)
      this.lot = this.navParams.data.lot;


    this.enlevement.initLotIca( this.lot.definition.id, 1);

    this.image = this.element.nativeElement;
    this.container = this.elementParent.nativeElement;
    // Prevent long press saving on mobiles.
       this.container.addEventListener('touchstart', function(e) {
         e.preventDefault();
       });

    this.init();
  }

  /***************************************************************************************************************
   * FONCTION DE MODIFICATION DES BLOCK ICA
   */

  /**
   * block elevage
   */
  gotoElevage = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    //const myModalData = {identite: this.enlevement.icadata.ica.identite};
    const myModal: Modal = this.modal.create('ElevageBlockPage', { identite: this.enlevement.icadata.ica.identite }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevement.saveBlockData('identite', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  /**
   * block bande
   */
  gotoBande = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    //const myModalData = {identite: this.enlevement.icadata.ica.identite};
    const myModal: Modal = this.modal.create('BandeBlockPage', { bande: this.enlevement.icadata.ica.bande }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevement.saveBlockData('bande', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  /**
   * block aliments
   */
  gotoAliments = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    //const myModalData = {identite: this.enlevement.icadata.ica.identite};
    const myModal: Modal = this.modal.create('AlimentsBlockPage', { aliment: this.enlevement.icadata.ica.aliment }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevement.saveBlockData('aliment', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }
  /**
   * block aliments
   */
  gotoPathologie = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    //const myModalData = {identite: this.enlevement.icadata.ica.identite};
    const myModal: Modal = this.modal.create('PathologieBlockPage', { traitements: this.enlevement.icadata.ica.traitements }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevement.saveBlockData('traitements', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  /**
   * block sanitaire
   */
  gotoSanitaire = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    const myModal: Modal = this.modal.create('SanitaireBlockPage', { etatSanitaire: this.enlevement.icadata.ica.etatSanitaire }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevement.saveBlockData('etatSanitaire', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  gotoEnlevements = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    const myModal: Modal = this.modal.create('EnlevementsBlockPage', {enlevements: this.enlevement.icadata.ica.enlevements}, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if (data) {
        this.enlevement.saveBlockData('enlevements', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  gotoSignature = () => {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    const myModal: Modal = this.modal.create('SignatureBlockPage', { }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        this.enlevement.saveBlockData('signature', data);

        console.log("I'm about to dismiss");
        console.log(data);

      }

    });
  }

  /**
   *
   * @param {number} ypos
   */
  gotoBlock = (zone : number) => {
    console.log(zone);
    this.enlevement.getBlock( 'gallus', zone ).then( blockname => {
      console.log(blockname
      );
      switch (blockname) {
        case 'elevage':
          //document.getElementById('btnelevage').click();
          this.gotoElevage();
          break;
        case 'bande':
          this.gotoBande();
          break;
        case 'aliment':
          this.gotoAliments();
          break;
        case 'sanitaire':
          this.gotoSanitaire();
          break;
        case 'pathologie':
          this.gotoPathologie();
          break;
        case 'enlevement':
          this.gotoEnlevements();
          break;
        case 'signature':
          this.gotoSignature();
          break;
        default:
          this.gotoElevage();
      }
    });


  }
  /*
Initialize listeners for gestures
*/
  init = () => {
    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(this.element.nativeElement);

    //listen for the gesture
    this.gesture.listen();

    // double tap
    this.gesture.on('doubletap', (ev) => {
      this.transforms = [];
      this.adjustScale += 1;
      if (this.adjustScale >= 4) this.adjustScale = 1;
      this.transforms.push('scale(' + this.adjustScale + ')');
      this.container.style.transform = this.transforms.join(' ');
    });

    // single tap
    this.gesture.on('tap', (ev) => {
      let ypos = ev.srcEvent.offsetY;
      let imgheight = ev.srcEvent.target.clientHeight;
      let zone = (ypos/imgheight)*100;
      console.log(ypos, imgheight);
      this.gotoBlock(zone);
    });


    this.gesture.on("pan", (ev) => {

      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

      // Concatinating and applying parameters.
      if (this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }
      this.transforms.push('scale(' + this.currentScale + ')');
      this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');

    });

    this.gesture.on("pinch", (ev) => {

      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale;
      //this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
      //this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

      // Concatinating and applying parameters.
      if (this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }
      this.transforms.push('scale(' + this.currentScale + ')');
      this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');

    });


    this.gesture.on("pinchend", (ev) => {

      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustScale = this.currentScale;
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });

    this.gesture.on("panend", (ev) => {

      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustScale = this.currentScale;
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });

  }


}
