export interface Product {
    name ?: string;
    nbAvailability?: number;
    price?: number;
    description: string;
    pictures:string[];
    id?:string;
    personId:string;
    categoryId:string;
    deliveryTypeId:string;
}