import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environnements } from '../../models/environnements';
import { Person } from 'src/models/person-interface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  person = {} as Person;
  constructor(private fb : Facebook, private http:HttpClient, private navCtrl : NavController, private storage :NativeStorage) { }

  ngOnInit() {
  }

  loginWithFacebook():void{
    console.log("Loggin facebook");
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb.api('me?fields=email', [])
          .then(async profile => {
            console.log("Loggin facebook", profile);
            let email : string = profile['email'];
            await this.storage.setItem('emailToSignIn', email);
            this.navCtrl.navigateForward('/signinperson');
            
          }
          )
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

}
