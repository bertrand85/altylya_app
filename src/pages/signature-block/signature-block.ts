import { Component, ViewChild, Renderer } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Platform, Content} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";


/**
 * Generated class for the SanitaireBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature-block',
  templateUrl: 'signature-block.html',
})
export class SignatureBlockPage {
  // Canvas stuff
  @ViewChild('signatureCanvas') canvasEL : any;
  //Reference Canvas Object
  private canvasElement: any;
  //Reference the context for Canvas Element
  private _CONTEXT : any;

  saveX: number;
  saveY: number;
  signatureImg: any;

  // Make Canvas sticky at the top stuff
  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public renderer: Renderer,
              private plt: Platform,
              private view: ViewController) {
  }

  ionViewDidEnter() {
    // Get the height of the fixed item
    let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
    let scroll = this.content.getScrollElement();

    itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
    scroll.style.marginTop = itemHeight + 'px';
  }

  ionViewDidLoad() {
    this.canvasElement = this.canvasEL.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }

  startDrawing(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

  moved(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  clearPad() {
    this._CONTEXT = this.canvasElement.getContext('2d');
    this._CONTEXT.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  saveModal() {
    var dataUrl = this.canvasElement.toDataURL();
    this.signatureImg = dataUrl;
    this.view.dismiss(this.signatureImg);
  }
}
