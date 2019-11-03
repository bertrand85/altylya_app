import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignatureBlockPage } from './signature-block';

@NgModule({
  declarations: [
    SignatureBlockPage,
  ],
  imports: [
    IonicPageModule.forChild(SignatureBlockPage),
  ],
})
export class SignatureBlockPageModule {}
