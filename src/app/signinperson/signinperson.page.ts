import { Component, OnInit } from '@angular/core';
import { Person } from 'src/models/person-interface';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environnements } from 'src/models/environnements';

@Component({
  selector: 'app-signinperson',
  templateUrl: './signinperson.page.html',
  styleUrls: ['./signinperson.page.scss'],
})
export class SigninpersonPage implements OnInit {
  person = {} as Person;
  form : any = {};
  constructor(private nativeStorage : NativeStorage, private navCtrl : NavController, private http : HttpClient) {
   }

  ngOnInit() {
  }

  async submitPersonForm()  {
    console.log('FormResult', this.form);
    this.person = this.form;
    let email : string = await this.nativeStorage.getItem('emailToSignIn');
    this.person.email = email;
    console.log('PersonSignIn', this.person);
    let url = `${environnements.api_url}/people`;
    this.http.post(url, this.person)
      .subscribe(person => {
        console.log('PersonInDatabase', person);
        this.nativeStorage.setItem('personSignIn', person);
        this.navCtrl.navigateForward('/signinaddress');
      })
  }

}
