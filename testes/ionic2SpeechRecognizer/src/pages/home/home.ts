import { Component, NgZone } from '@angular/core';
import {TextToSpeech} from 'ionic-native';
import { Platform, ToastController  } from 'ionic-angular';
import { NavController } from 'ionic-angular';

//declare var SpeechRecognition: any;
declare var platform: any;
declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recognition: any;
  ready: boolean = false;
  isWaiting: boolean = false;
  errorCordova : string = "No error";
  public statusSpeaker : string;
  public resultText : string;
  public isRecognizing : boolean = false;
  public spokenWords : Array<string> = new Array<string>()
  counter : number = 0;

  constructor(public navCtrl: NavController, platform: Platform, public  _zone: NgZone, public toastCtrl: ToastController ) {
    platform = platform;
    platform.ready().then(() => {
      this.ready = true;
      console.log("Recognition is " + this.recognition)
      if(window.SpeechRecognition)
      {
          this.recognition = new window.SpeechRecognition();
          this.recognition.start();
 
          this.recognition.continuous = true;
          this.recognition.lang = 'pt-BR';
          this.recognition.maxAlternatives = 3;
          this.recognition.onnomatch = (event => {
              console.log('Erro ao reconhecer.');
          });
          this.recognition.onstart = (event => {
              console.log('Reconhecendo...');
              this._zone.run(() => {
                  this.isRecognizing = true;
                  this.isWaiting = false;
              }
              )
          });
 
          this.recognition.onend = (event => {
              console.log('Fim do Reconhecimento.');
              this._zone.run(() => {
                  this.isRecognizing = false;
                  this.presentToast("Fim do Reconhecimento.")
                  this.isWaiting = false;
              })
          });
 
          this.recognition.onerror = (event => {
              console.log('Error...' + event.error);
              this._zone.run(() => {    
                  this.errorCordova = 'Error'
                  this.isRecognizing = false;
                  this.presentToast("Error..." + event.error)
                  this.isWaiting = false;
              }
              )
          });
 
          this.recognition.onresult = (event => {
                  if (event.results) {
                        this._zone.run(() => {
                            var result = event.results[0];
                            this.resultText = 'Last Text added : \n' + result[0].transcript
                            this.spokenWords.push(result[0].transcript);
                            console.log('Text: ' + result[0].transcript);
                            this.presentToast(this.resultText)
                    }
                )
                this.isWaiting = false;
                        this.isRecognizing = false;
              }
          });
 
      }
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position : "middle",
      duration: 3000
    });
    toast.present();
  }
 
 
  SpeechToText(){
    this.statusSpeaker = 'Waiting...';
    if(!this.isRecognizing)
    {
        this.recognition.start();
        this.isWaiting = true;
    }
    else
    {
        this.isWaiting = true;
    }
  }
 

  textoParaFala() {
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   duration: 3000
    // });
    // loader.present();
    
    // TextToSpeech.speak("Carta Porta do tipo Evento. ... " + 
    //               "Intervenção Divina. ... " + 
    //               "Independente de quem tiver comprado esta carta ou como a tiver " + 
    //               "comprado, todos os clérigos ganham imediatamente 1 nível. " + 
    //               "Se isto fizer o jogo terminar, o jogador vencedor poderá zoar " + 
    //               "os outros jogadores sem dó nem piedade");

    TextToSpeech.speak({
        text: "Carta Porta do tipo Evento. ... " + 
              "Intervenção Divina. ... " + 
              "Independente de quem tiver comprado esta carta ou como a tiver " + 
              "comprado, todos os clérigos ganham imediatamente 1 nível. " + 
              "Se isto fizer o jogo terminar, o jogador vencedor poderá zoar " + 
              "os outros jogadores sem dó nem piedade",
        locale: 'pt-BR',
        rate: 1
    });
  }

} 