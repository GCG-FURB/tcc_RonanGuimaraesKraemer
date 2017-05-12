// import { Component } from '@angular/core';
// import { Camera } from 'ionic-native';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import { NavController } from 'ionic-angular';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {
//   imageURL;
//   current_image;

//   constructor(public navCtrl: NavController, public http: Http) {}
//   takePhoto(){
//     Camera.getPicture().then((imageData) => {
//        this.imageURL = imageData;
//        this.current_image = "data:image/jpeg;base64," + imageData;

//        var headers = new Headers();
//        headers.append("Accept", "application/json");
//        headers.append('Content-Type', 'application/json');
//        let options = new RequestOptions({headers: headers});

//         let body = JSON.stringify({
//          images_file: toDataURL(imageData),
//          parameters: {"classifier_ids":["Munchkin_2087879047"], "owners": ["me"]} 
//         });
        
//       //  var data = new FormData();
//       //  data.append("images_file", imageData);
//       //  alert
//       //  let postParams = {
//       //    image_file: this.current_image,
//       //    parameters: {"classifier_ids":["Munchkin_2087879047"], "owners": ["me"]},
//       //  }

//        alert(body);
//        this.http.post("https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=06f075d4c5f24dcb9857e66123d7c1814b8f2c23&version=2016-05-20", 
//        body, options).subscribe(
//          data => { 
//            console.log(data['_body']);
//            	alert(data['_body']);
//         }, 
//          error => { 
//            console.log(error);
//            alert(error);
//         });

//     }, (err) => {
//        console.log(err);
//     });
//   }
// }


import {Component} from '@angular/core';
import {Camera} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
 
  constructor(private navCtrl: NavController, public http: Http, private _DomSanitizationService: DomSanitizer) {
    this.photoTaken = false;
  }
 
  selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraUrl = imageData;
      this.photoSelected = true;
      this.photoTaken = false;
    }, (err) => {
      // Handle error
    });
  }
 
  openCamera() {
    var options = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraData = 'data:image/jpg;base64,' + imageData;
      this.photoTaken = true;
      this.photoSelected = false;

      var headers = new Headers();
       headers.append("Accept", "application/json");
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({headers: headers});

        // let body = JSON.stringify({
        //  images_file:  this.cameraData,
        //  parameters: {"classifier_ids":["Munchkin_2087879047"], "owners": ["me"]} 
        // });

       var body = new FormData();
       body.append("images_file",  this.cameraData);

       //alert(body);
       this.http.post("https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=06f075d4c5f24dcb9857e66123d7c1814b8f2c23&version=2016-05-20", 
       body, options).subscribe(
         data => { 
           console.log(data['_body']);
           	alert(data['_body']);
        }, 
         error => { 
           console.log(error);
           alert(error);
        });

    }, (err) => {
      // Handle error
    });
  }
}