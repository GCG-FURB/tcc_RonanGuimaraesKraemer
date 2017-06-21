(function(){
	angular.module('starter')
	.controller('HomeController', ['$scope', '$cordovaFile', '$cordovaFileTransfer', '$cordovaCamera', '$ionicLoading', '$http', '$filter', HomeController]);

	function HomeController($scope, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, $ionicLoading, $http, $filter) {

		var me = this;
		me.current_image = '';
		me.image_description = '';
		me.detection_type = 'TEXT_DETECTION';
		me.card_desc = '';
		me.recognizer = '';
		me.reconhecendo = false;
		
		me.developMode = false;
		

		me.detection_types = {
			LABEL_DETECTION: 'label',
			TEXT_DETECTION: 'text'
		};

		me.jsonData = [];
		me.tempo = new Date();
		$http.get("https://api.myjson.com/bins/13yhlz")
        	.success(function(response) {
				me.jsonData = response;

				if (me.developMode) {
					var diff = (new Date()).getTime() - me.tempo.getTime();
					alert("Tempo de execução do get da biblioteca de cartas: \n" + convertTime(diff));
				}
			})
			
			.error(function(response) {
                $scope.textToSpeech("Erro ao buscar informações das cartas. Verifique sua conexão.");
        });

		var api_key = 'AIzaSyDAyL0pkgp2mQDnyG3qqVuavlZblfXMsnY';

		$scope.reconhecerVoz = function() {
			var texto = "";
			me.recognizer = new window.SpeechRecognition();
			me.recognizer.lang = "pt-BR";
			me.recognizer.continuous = true;
      		
			me.recognizer.onresult = function(event) {
				if (event.results.length > 0) {
					texto = event.results[0][0].transcript;
					
					if (!me.reconhecendo) {
						if (texto == "tirar foto") {
							$scope.takePicture();
						
						} else if (texto == "repetir") {
							$scope.repeat()
						
						} else {
              				 $scope.textToSpeech('Comando inválido.');
            			}
					}
					
        		}
      		};

			me.recognizer.start();
		}

		$scope.takePicture = function(){
			var options = {
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				targetWidth: 500,
				allowEdit: false,

				targetHeight: 500,
				correctOrientation: true,
				cameraDirection: 0,
				encodingType: Camera.EncodingType.JPEG
			};

			$scope.textToSpeech("Abrindo a câmera. Tire uma foto da carta para realizar o reconhecimento.");

			$cordovaCamera.getPicture(options).then(function(imagedata){
				me.reconhecendo = true;
				me.card_desc = '';
				me.current_image = "data:image/jpeg;base64," + imagedata;
				me.image_description = '';
				me.locale = '';
				
				var vision_api_json = {
					"requests":[
						{
							"image":{
							"content": imagedata
							},
							"features":[
								{
									"type": me.detection_type,
									"maxResults": 1
								}
							]
						}
					]
				};
				
				var file_contents = JSON.stringify(vision_api_json);

				$cordovaFile.writeFile(
					cordova.file.cacheDirectory,
					'file.json',
					file_contents,
					true
				).then(function(result){

					var headers = {
						'Content-Type': 'application/json'
					};

					options.headers = headers;

					var server = 'https://vision.googleapis.com/v1/images:annotate?key=' + api_key;
					var filePath = cordova.file.cacheDirectory + 'file.json';

					if (me.developMode) {
						me.tempo = 0.0;
					}

					me.tempo = new Date();

					$cordovaFileTransfer.upload(server, filePath, options, true)
					.then(function(result){
						if (me.developMode) {
							var diff = (new Date()).getTime() - me.tempo.getTime();
							alert("Tempo total de processamento de imagem: \n" + convertTime(diff));
						}
					
						var res = JSON.parse(result.response);
						var key = me.detection_types[me.detection_type] + 'Annotations';

						me.image_description = res.responses[0][key][0].description.replace(/\r\n/g, " ").replace(/\n/g, " ").replace(/\n/g, " ").replace(/\t/g, " ").replace(".", "").replace("!", "").split(" ");
						$scope.identificaCarta(me.image_description, me.jsonData.CartasArray);

					}, function(err){
						$scope.textToSpeech('Ocorreu um erro ao fazer o upload da imagem');
					});

				}, function(err){
					$scope.textToSpeech('Ocorreu um erro ao salvar a imagem.');
				});

			}, function(err){
				$scope.textToSpeech('Ocorreu um erro ao tirar a foto da carta');
			});
		}

		$scope.identificaCarta = function(listaPalavras, listaCartas) {
			var tempList = [];
			var novaLista = [];
			
			me.tempo = new Date();

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			for (i=0; i < listaPalavras.length; i++) {
				for (j=0; j < listaCartas.length; j++) {
					tempList = listaCartas[j].nome.split(" ");

					for (k=0; k < tempList.length; k++) {
						if ($filter('uppercase')(tempList[k]) == $filter('uppercase')(listaPalavras[i])) {
							novaLista.push(listaCartas[j]);
							break;
						}
					}
				}

				if (novaLista.length > 0) {
					if (novaLista.length == 1) {
						break;

					} else {
						listaCartas = novaLista;
						novaLista = [];
					}
				} 
			}
				
			if (novaLista.length > 0 && novaLista.length == 1) {
				me.card_desc = novaLista[0].desc;
				$scope.textToSpeech(novaLista[0].desc);
				
			} else {
				$scope.textToSpeech("Foto com baixa resolução ou fora de foco. Por favor. Tire outra foto da carta.");
			}

			$ionicLoading.hide();
			me.reconhecendo = false;

			if (me.developMode) {
				var diff = (new Date()).getTime() - me.tempo.getTime();
				alert("Tempo de processamento para encontrar a carta: \n" + convertTime(diff));
			}
		}

		$scope.repeat = function() {
			me.reconhecendo = true;

			if (me.card_desc != "") {
				$scope.textToSpeech(me.card_desc);

			} else {
				$scope.textToSpeech("Sem dados. Por favor. Tire uma nova foto de uma carta.");
			}

			me.reconhecendo = false;
		}

		$scope.textToSpeech = function(frase) {
			TTS.speak({
				text: frase,
				locale: 'pt-BR',
				rate: 1.2
			}, function () {
				// Do Something after success
			}, function (reason) {
				// Handle the error case
			});
		}
	}

	function convertTime(execTime) {
		var miliseconds = 0;
		var textMls = "00";
		var seconds = 0;
		var txtScns = "00";
		var minutes = 0;
		var txtMins = "00";
		var hours = 0;
		var txtHrs = "00";

		if (execTime >= 3600000) {
			hours = (execTime - (execTime % 3600000)) / 3600000;
			execTime = execTime % 3600000;
			txtHrs = hours < 10 ? "0" + hours : "" + hours;
		}

		if (execTime >= 60000) {
			minutes = (execTime - (me.execTime % 60000)) / 60000;
			execTime = me.execTime % 60000;
			txtMins = minutes < 10 ? "0" + minutes : "" + minutes;
		}

		if (execTime >= 1000) {
			seconds = (execTime - (execTime % 1000)) / 1000;
			execTime = execTime % 1000;
			txtScns = seconds < 10 ? "0" + seconds : "" + seconds;
		}

		miliseconds = execTime;
		textMls = miliseconds < 10 ? "0" + miliseconds : "" + miliseconds;
		
		return txtHrs + ":" + txtMins + ":" + txtScns + ":" + textMls;
	}
})();
