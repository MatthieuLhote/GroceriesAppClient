import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { Address } from 'src/models/address-interface';
import { HttpClient } from '@angular/common/http';
import { environnements } from 'src/models/environnements';
import { Person } from 'src/models/person-interface';

@Component({
  selector: 'app-signinaddress',
  templateUrl: './signinaddress.page.html',
  styleUrls: ['./signinaddress.page.scss'],
})
export class SigninaddressPage implements OnInit {

  address = {} as Address;
  formAdress : any = {};
  person = {} as Person;

  constructor(private nativeStorage : NativeStorage, private navCtrl : NavController, private http : HttpClient) { }

  async ngOnInit() {
    this.person = await this.nativeStorage.getItem('personSignIn');
  }

  submitAddressForm() : void {
    console.log('FormResult', this.formAdress);
    this.address = this.formAdress;
    console.log('adressSignIn', this.address);
    this.nativeStorage.setItem('addressSignIn', this.address);
    let url = `${environnements.api_url}/people/${this.person.id}/addresses`;


    
    this.http.post(url, this.address)
      .subscribe((address : Address) =>{
        console.log('AddresseSubscribed', address);
        this.navCtrl.navigateForward('/home');
      })


  }

}
