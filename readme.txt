Para realizar a compilação deste projeto deve-se:

Primeiramente, configurar o ambiente de desenvolvimento para a plataforma desejada de acordo com o tutorial:

https://ionicframework.com/getting-started/

-------------------------------------------------------------------------------------------------------------

Iniciar um projeto em branco ionic com o comando:

$ ionic start <nome-projeto> blanck

Após isso, deve-se copiar e colar todos os arquivos da pasta Munchkin Recognizer para dentro do projeto, sobstituindo todos os arquivos com mesmo nome.
Obs.: Deve-se verificar a versão do projeto, pois o mesmo deve ser 1.0 para que o projeto seja compilado.

--------------------------------------------------------------------------------------------------------------

Adicionar os principais plugins com os comandos:

$ ionic plugin add cordova-plugin-camera
$ ionic plugin add cordova-plugin-file-transfer
$ ionic plugin add cordova-plugin-tts
$ ionic plugin add github.com/macdonst/SpeechRecognitionPlugin

Ao final, deve-se contar na pasta .../project-Name/plugins os seguintes plugins:

cordova-plugin-camera
cordova-plugin-compat
cordova-plugin-console
cordova-plugin-device
cordova-plugin-file
cordova-plugin-file-transfer
cordova-plugin-splashscreen
cordova-plugin-statusbar
cordova-plugin-tts
cordova-plugin-whitelist
ionic-plugin-keyboard
phonegap-plugin-speech-recognition

Obs.: Caso a lista esteja incompleta, basta adicionar os plugins faltantes com o comando:

$ ionic pligin add <nome-do-plugin>

------------------------------------------------------------------------------------------------------------

Adicionar as plataformas com os comandos:

$ ionic platform add android
$ ionic platform add ios

------------------------------------------------------------------------------------------------------------

Buildar e executar o aplicativo com os comandos:

$ ionic build android
$ ionic run android

$ ionic build ios
$ ionic run ios

Obs.: O build e a execução para iOS irá apenas funcionar em computadores com macOS
Ao adicionar a plataforma iOS pode ocorrer erros por falta de recursos de imagens. Neste caso usar:
$ ionic resources --icon

------------------------------------------------------------------------------------------------------------

Seguindo estes passos, a aplicação irá executar e abrirá em qualquer dispositivo android ou iOS. Porém, o aplicativo não funcionará 100% pois necessita da api_key para realizar o reconhecimento de texto e da apiKey para autorizar os dispositivos iOS em utilizar o reconhecimento de voz.
Para adquirir as chaves necessárias, basta seguir os seguintes tutoriais:

Google Cloud Vision: https://www.sitepoint.com/image-recognition-with-the-google-vision-api-and-ionic/
iSpeech: https://github.com/macdonst/SpeechRecognitionPlugin