import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninpersonPageRoutingModule } from './signinperson-routing.module';

import { SigninpersonPage } from './signinperson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninpersonPageRoutingModule
  ],
  declarations: [SigninpersonPage]
})
export class SigninpersonPageModule {}
