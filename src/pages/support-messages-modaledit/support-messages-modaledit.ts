import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage,  ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SupportMessagesModaleditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support-messages-modaledit',
  templateUrl: 'support-messages-modaledit.html',
})
export class SupportMessagesModaleditPage {
  message = {};
  submitAttempt: boolean = false;

  messageForm:FormGroup;
  constructor(private view: ViewController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,) {
  }

  /**
   *
   */
  ionViewWillLoad() {
    this.message = this.navParams.get('data');

    this.messageForm = this.formBuilder.group({
      message : [ this.message['message'], Validators.required],
    });
  }

  save(){
    this.submitAttempt = true;

    if(this.messageForm.valid){
      this.message['message'] = this.messageForm.value['message'];
      this.view.dismiss(this.message);
    }
  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

}
