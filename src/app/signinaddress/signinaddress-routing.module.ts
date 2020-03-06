import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninaddressPage } from './signinaddress.page';

const routes: Routes = [
  {
    path: '',
    component: SigninaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninaddressPageRoutingModule {}
