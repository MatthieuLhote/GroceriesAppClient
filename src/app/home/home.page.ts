import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnements } from 'src/models/environnements';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http : HttpClient) {
    this.loadPeoples();
  }

  loadPeoples():void{
    let url = `${environnements.api_url}/people`;
    this.http.get(url)
      .subscribe(people => console.log('peoples', people));
  }

}
