import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninpersonPage } from './signinperson.page';

const routes: Routes = [
  {
    path: '',
    component: SigninpersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninpersonPageRoutingModule {}
