import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imageURL
  constructor() {}
  takePhoto(){
    Camera.getPicture().then((imageData) => {
       this.imageURL = imageData
    }, (err) => {
       console.log(err);
    });
  }
}