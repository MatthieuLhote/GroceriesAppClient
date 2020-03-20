import { Category } from './category-interface';
import { Product } from './product-interface';

export class ProductByCategory{
    category : Category;
    listProduct : Product[];
    constructor(category : Category, products : Product[]){
        this.category = category;
        this.listProduct = products;
    }
}