import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Category } from 'src/models/category-interface';
import { Observable } from 'rxjs';
import { environnements } from 'src/models/environnements';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  categories : Category[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage : NativeStorage,
    private navCtrl : NavController,
    private http : HttpClient
  ) {
    this.initializeApp();
    this.loadCategories()
      .subscribe((data : Category[]) => {
        console.log('Categories', data);
        data.sort(this.GetSortOrder("order"));
        this.categories = data;
      })
  }

  GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}
  initializeApp() {
    this.platform.ready().then(async () => {
      const loggedIn = await this.storage.getItem('isLoggedIn');
      this.statusBar.styleDefault();
      if(loggedIn){
        console.log('Déjà connecté ! ');
        this.navCtrl.navigateRoot('/addproduct');
      }
      this.splashScreen.hide();
    });

    this.loadCategories
  }

  loadCategories() : Observable<Category[]>{
    let url : string = `${environnements.api_url}/Categories`;
    return this.http.get<Category[]>(url);
  }

  goTo(route: string):void{
    console.log('route', route);
    this.navCtrl.navigateForward(`/${route}`);
  }
}
