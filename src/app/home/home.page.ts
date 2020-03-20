import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnements } from 'src/models/environnements';
import { Category } from 'src/models/category-interface';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product-interface';
import { ProductByCategory } from 'src/models/productbycat-interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories : Category[];
  imageUrl : String;
  productByCategories:ProductByCategory[];

  constructor(private http : HttpClient, private photoViewer: PhotoViewer, private navCtrl : NavController) {
    this.imageUrl = `${environnements.api_url}/Containers/photos/download/`;
    this.loadPeoples();
    this.productByCategories = [];
  }

  async ngOnInit(){

    await this.loadCategories()
      .subscribe((cat : Category[]) => {
        console.log('Categories', cat);
        cat.sort(this.GetSortOrder("order"));
        this.categories = cat;


        this.categories.forEach(category => {
          this.loadProductsByCategories(category.id)
            .subscribe((data : Product[])=> {
              
              let prodByCat = new ProductByCategory(category, data);
              this.productByCategories.push(prodByCat);
              console.log(category.name,this.productByCategories);
            })
          
        });


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

  loadProductsByCategories(categoryId:String):Observable<Product[]>{
    let url = `${environnements.api_url}/Products?filter=%7B%22where%22%3A%7B%22categoryId%22%3A%22${categoryId}%22%7D%7D`;
    return this.http.get<Product[]>(url);
  }

  showCategory(categorieId: string){
    console.log('categorie', categorieId);
    this.navCtrl.navigateForward('/categorie/'+categorieId);
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
