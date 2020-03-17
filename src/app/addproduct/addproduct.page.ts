import { Component, OnInit } from '@angular/core';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {


  constructor(private actionSheet : ActionSheetController, private imagePicker : ImagePicker, private camera : Camera, private fileTransfert : FileTransfer) { }

  ngOnInit() {
  }

}
