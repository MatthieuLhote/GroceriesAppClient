import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninaddressPageRoutingModule } from './signinaddress-routing.module';

import { SigninaddressPage } from './signinaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninaddressPageRoutingModule
  ],
  declarations: [SigninaddressPage]
})
export class SigninaddressPageModule {}
