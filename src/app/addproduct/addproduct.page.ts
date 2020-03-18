import { Component, OnInit } from '@angular/core';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Product } from 'src/models/product-interface';
import { Category } from 'src/models/category-interface';
import { Observable } from 'rxjs';
import { environnements } from 'src/models/environnements';
import { HttpClient } from '@angular/common/http';
import { DeliveryType } from 'src/models/deliverytype-interface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Person } from 'src/models/person-interface';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  myPictures: string[] = [];
  product : Product;
  categories : Category[];
  deliveryType: DeliveryType[];
  imgUploaded: boolean = false;
  numImgUploaded : number = 0;
  personId : string;

  constructor(private actionSheet : ActionSheetController, private navCtrl : NavController,private toastCtrl: ToastController,private loadingCtrl : LoadingController,private storage : NativeStorage, private http : HttpClient, private imagePicker : ImagePicker, private camera : Camera, private fileTransfert : FileTransfer) { 
    this.product = {} as Product;
    this.product.pictures = [];
    this.loadCategories()
      .subscribe((data : Category[]) => {
        console.log('Categories', data);
        this.categories = data;
      })
    
    this.loadDeliveryType()
      .subscribe((data : DeliveryType[])=>{
        console.log('DeliveryType', data);
        this.deliveryType = data;
      })  


  }

  async ngOnInit() {
    let person = await this.storage.getItem('personSignIn') as Person;
    this.personId = person.id;
    console.log("PErsonId", this.personId);
  }

  loadCategories() : Observable<Category[]>{
    let url : string = `${environnements.api_url}/Categories`;
    return this.http.get<Category[]>(url);
  }

  loadDeliveryType(): Observable<DeliveryType[]>{
    let url : string = `${environnements.api_url}/DeliveryTypes`;
    return this.http.get<DeliveryType[]>(url);
  }

  async action(){
    const actionSheet = await this.actionSheet.create({
      header : 'Select the source',
      buttons : [
        {
          text:'Galerie',
          icon:'images',
          handler: async ()=>{
            let pictures : string[] = await this.galerie(4);
            for (let i = 0; i < pictures.length; i++) {
              const element = pictures[i];
              console.log('element de pictures : ', element);
              this.myPictures.push(element);
            }
          }
        },
        {
          text:'Camera',
          icon:'camera',
          handler:()=>{
            console.log('Camera');
            this.getCamera().then(image => {
              console.log(image);
              this.myPictures.push(image);
            })
          }
        },
        {
          text:'Annuler',
          icon:'close',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  async galerie(imageNum : number){
    let options: ImagePickerOptions = {
      maximumImagesCount: imageNum,
      outputType:0,
      quality: 100

    }

    return this.imagePicker.getPictures(options);
  }


  async getCamera(){
    let options : CameraOptions = {
      sourceType: 1,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100, 
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    return this.camera.getPicture(options);
  }


  delete(index : number){
    this.myPictures.splice(index, 1);
  }

  async uploadIamges(images: string[]){
    for (let i = 0; i < images.length; i++) {
      const element : string = images[i];
      let elementName: string = element.substr(element.lastIndexOf('/')+1);
      console.log('ElementName : ', elementName);
      let fileTransfert : FileTransferObject = this.fileTransfert.create();
      let url : string = `${environnements.api_url}/Containers/photos/upload`;
      console.log('url', url);
      let options: FileUploadOptions = {
        fileKey:'Grocery',
        fileName: elementName,
        chunkedMode: false,
        mimeType: 'image/jpeg',
        headers: { }
      }
      if(!this.imgUploaded){
        let data = await fileTransfert.upload(element, url, options);
        let id: string = JSON.parse(data.response)._id;
        console.log('id', id);
        console.log('id', this.product);
        this.product.pictures.push(id);
        this.numImgUploaded += 1;
      }
      if(this.numImgUploaded === images.length){
        this.imgUploaded = true;
      }
    }
    return true;
  }

  async create(){
    this.product.personId = this.personId;
    console.log('Articles', this.product);
    //Afficher loading controller
    let loading = await this.loadingCtrl.create({
      message : 'Chargement...'
    });
    loading.present();
    try{
      const flag : boolean = await this.uploadIamges(this.myPictures);
      let url = `${environnements.api_url}/people/${this.personId}/products`;
      console.log("PersonIdUrl", url);
      if(flag){

        this.http.post(url, this.product, {headers : {'Content-Type': 'application/json'}})
          .subscribe(data =>{
              //Cacher le loading controller
              //Afficher un message toast et retourner page accueil
              loading.dismiss();
              console.log("Productadded", data);
              this.presentToast('Creation réussie !', 2000);
              this.navCtrl.navigateBack('/home');

          }, error => {
            //Cacher le loading controller
            //Afficher toast
            loading.dismiss();
            this.presentToast('Creation échouée !', 2000);
            console.log("Productnotadded", error);
          });
      }
    }catch(e){
      console.log('error', e);
      loading.dismiss();
    }
  }

  async presentToast(message: string, duration: number){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    }

    );
    toast.present();
  }


}
