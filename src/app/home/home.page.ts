import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnements } from 'src/models/environnements';
import { Category } from 'src/models/category-interface';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories : Category[];
  imageUrl : String;

  constructor(private http : HttpClient, private photoViewer: PhotoViewer) {
    this.imageUrl = `${environnements.api_url}/Containers/photos/download/`;
    this.loadPeoples();
    this.loadCategories()
      .subscribe((data : Category[]) => {
        console.log('Categories', data);
        data.sort(this.GetSortOrder("order"));
        this.categories = data;
      })
  }

  showImage(imgId : string, imgTitle:string, event){
    event.stopPropagation();
    this.photoViewer.show(`${environnements.api_url}/Containers/photos/download/${imgId}`, imgTitle, {share: true});
  }

  loadPeoples():void{
    let url = `${environnements.api_url}/people`;
    this.http.get(url)
      .subscribe(people => console.log('peoples', people));
  }

  loadCategories() : Observable<Category[]>{
    let url : string = `${environnements.api_url}/Categories`;
    return this.http.get<Category[]>(url);
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


  slideOpts = {
    slidesPerView: 10,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

}
