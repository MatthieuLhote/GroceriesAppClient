import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product-interface';
import { environnements } from 'src/models/environnements';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {

  products : Product[];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  async ngOnInit() {
    const idCategorie: string = await this.activatedRoute.snapshot.paramMap.get('catId');
    console.log(idCategorie);

    this.loadProductsByCategories(idCategorie)
      .subscribe((data : Product[])=> {
        this.products = data;
        console.log(data);
      })

  }

  loadProductsByCategories(categoryId:String):Observable<Product[]>{
    let url = `${environnements.api_url}/Products?filter=%7B%22where%22%3A%7B%22categoryId%22%3A%22${categoryId}%22%7D%7D`;
    return this.http.get<Product[]>(url);
  }

}
