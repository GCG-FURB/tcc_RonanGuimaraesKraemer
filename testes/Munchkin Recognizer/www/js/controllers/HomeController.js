(function(){
	angular.module('starter')
	.controller('HomeController', ['$scope', '$cordovaFile', '$cordovaFileTransfer', '$cordovaCamera', '$ionicLoading', HomeController]);

	function HomeController($scope, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, $ionicLoading) {

		var me = this;
		me.current_image = '';
		me.image_description = '';
    me.detection_type = 'TEXT_DETECTION';
		me.card_desc = '';
    me.detection_types = {
      LABEL_DETECTION: 'label',
      TEXT_DETECTION: 'text',
      LOGO_DETECTION: 'logo',
      LANDMARK_DETECTION: 'landmark'
    };

		me.jsonData = {
										"CartasArray":[
											{
													"nome":"ANAO",
													"desc":"Anão... Carta do tipo Raça....  Atributos:... Você pode carregar um número qualquer de Itens Grandes. Você pode ficar com 6 cartas na mão no final de seu turno."
											},
											{
													"nome":"INTERVENCAO DIVINA",
													"desc":"Invervenção Divina...  Carta do tipo Efeito...  Efeito:...  Independente de quem tiver comprado essa carta ou como a tiver comprado, todos os Clérigos ganham, imediatamente, um nível...  Se isso fizer o jogo terminar, o vencedor poderá zoar os outros jogadores sem dó nem piedade."
											},
											{
													"nome":"LESMAS VELOZES",
													"desc":"Lesmas Velozes...  Carta do tipo Monstro nível 4...  menos dois para fugir...  Coisa Ruim:...  Elas roubam seu tesouro...  Jogue um dado... Você perde aquela quantidade de itens ou cartas de sua mão... Você decide quais...  Ao derrotá-lo, ganha 1 nível e 2 tesouros."
											},
											{
													"nome":"MALDICAO PERCA A AMADURA QUE ESTIVER USANDO",
													"desc":"Maldição!...  Carta do tipo Maldição...  Efeito:...  Perca a armadura que estiver usando."
											},
											{
													"nome":"MALDICAO MUDANCA DE RACA",
													"desc":"Maldição! Mudança de raça...  Carta do tipo Maldição...  Efeito:...  Se você não tiver nenhuma raça neste momento, esta maldição não tem efeito...  Caso contrário, procure, a partir do topo, uma carta de Raça na pilha de descarte... A primeira carta de raça que aparecer substitui sua(s) Raça(s). Se não encontrar nenhuma carta de raça na pilha de descarte, você simplesmente perde sua(s) raça(s)."
											},
											{
													"nome":"GOBLIN ALEIJADO",
													"desc":"Goblin Aleijado...  Carta do tipo Monstro nível 1...  mais um para fugir...  Coisa Ruim:... Ele te arrebenta com a muleta... Você perde um nível... Ao derrotá-lo, ganha 1 nível e 1 tesouro."
											},
											{
													"nome":"RATRICINHA COM PORRETE",
													"desc":"Ratricinha com porrete...  Carta do tipo Monstro nível 1...  Uma criatura do inferno...  mais 3 contra clérigos...  Coisa Ruim:... Ela te detona....  Você perde um nível...  Ao derrotá-la, ganha 1 nível e 1 tesouro."
											},
											{
													"nome":"BALROG",
													"desc":"Balrog...  Carta do tipo Monstro nível 18...  não persegue personagens de nível 4 ou menos...  Coisa Ruim:... Você é esfolado até a morte...  Ao derrotá-lo, ganha 2 níveis e 5 tesouros."
											},
											{
													"nome":"BONECO PALITO",
													"desc":"Bonec Palito...  Carta do tipo Monstro nível 1...  Sempre tiveram mania de Halflings...  Mais 4 contra Halflings... Coisa Ruim:... Os Bonecos não tem sexo e, agora, você também não tem... Não é nem masculino nem feminino até que outro jogador mude sexo.... Nesse momento você volta a ter o mesmo sexo de antes...  Ao derrotá-lo, ganha 1 nível e 1 tesouros."
											},
											{
													"nome":"PAGA PAU DE VAMPIRO",
													"desc":"Paga pau de vampiro...  Carta do tipo Monstro nível 12...  Em vez de combatê-lo, um clérigo pode afugentar um paga pau de vampiro gritando Buuuuuuu, buuuuuuuu! e pegar todo o seu tesouro.... Ele não ganha nenhum nível por fazer isso!...  Coisa Ruim:... Ele tranca a porta e começa a te falar sobre a vida do seu personagem... Você perde 3 níveis...  Ao derrotá-lo, ganha 1 nível e 3 tesouros."
											},
											{
													"nome":"CLERIGO",
													"desc":"Clérigo...  Carta do tipo Classe...  Atributos:.... Ressureição:.... Quando você for pegar uma carta aberta, em vez disso você pode comprar a carta do topo da pilha de descarte apropriada.... Depois você tem que descartar uma carta de sua mão....  Espantar:...   Você pode descartar até 3 cartas durante um combate contra um morto-vivo. Cada Carta descartada lhe dá +3 de bônus."
											},
											{
													"nome":"MALDICAO PERCA 1 ITEM PEQUENO",
													"desc":"Maldição! Perca um Item Pequeno...  Carta do tipo Maldição...  Efeito:.... Escolha 1 item pequeno e o descarte....   Qualquer item que não estiver designado como Grande é Pequeno."
											},
											{
													"nome":"MALDICAO PERCA SUA CLASSE",
													"desc":"Maldição! Perca sua classe...  Carta do tipo Maldição...  Efeito:.... Descarte sua carta de Classe, se tiver uma.....   Se você tiver 2 Classes em jogo, você perde uma delas (à sua escolha).....   Se não tiver nenhuma classe, você perde 1 Nível."
											},
											{
													"nome":"HORROR ATERRORIZANTE INDESCRITIVELMENTE INDESCRITIVEL",
													"desc":"Horro Aterrorizante Indescritivelmente Indescritível!...  Carta do tipo Monstro nível 14...  +4 contra Guerreiros.....   Coisa Ruim:...  Uma morte indescritivelmente terrível aguarda a todos que não forem Magos....   Um mago perde seus poderes..... Descarte a carta de mago.....  Ao derrotá-lo, ganha 1 nível e 4 tesouros."
											},
											{
													"nome":"NARIZ FLUTUANTE",
													"desc":"Nariz Flutuante...  Carta do tipo Monstro nível 10...  Não é uma ideia lutar contra o Nariz flutuante..... Você pode suborná-lo com um item que valha no mínimo 200 peças de ouro que ele o deixará em paz..... Coisa Ruim:.....   Ele é capaz de farejá-lo em qualquer lugar..... Se perder, você não conseguirá fugir.... Nada irá ajudá-lo...... Você perde 3 níveis.....  Ao derrotá-lo, ganha 1 nível e 3 tesouros."
											},
											{
													"nome":"CAJADO DE NAPALM",
													"desc":"Cajado de Napalm....  Carta Tesouro do tipo ítem ...  É um ítem de uma mão e Custa 800 peças de ouro ..... Só pode ser usado por magos e concede +5 de bônus ao usuário."
											},
											{
													"nome":"ESCADA DE MAO",
													"desc":"Escada de Mão....  Carta Tesouro do tipo ítem  ...  É um item grande e Custa 400 peças de ouro ..... Só pode ser usado por halflings e concede +3 de bônus ao usuário."
											},
											{
													"nome":"CHAPEU DE BRUXO DO PODER",
													"desc":"Chapéu de Bruxo do Poder ....  Carta Tesouro do tipo ítem  ...  É um item para cabeça e Custa 400 peças de ouro ..... Só pode ser usado por Magos e concede +3 de bônus ao usuário."
											},
											{
													"nome":"COCAO DE PONFUSAO",
													"desc":"Coção de Ponfusão ....  Carta Tesouro do tipo poção  ...  É uma poção que Custa 100 peças de ouro ..... Use durante qualquer combate.....  Da mais 3 de bonus para qualquer um dos lados....   Uso Único."
											},
											{
													"nome":"ARMADURA FLAMEJANTE",
													"desc":"Armadura Flamejante ....  Carta Tesouro do tipo ítem  ...  É um item para o corpo e Custa 400 peças de ouro .....  Concede +2 de bônus ao usuário."
											},
											{
													"nome":"SANDALIAS DA PROTECAO",
													"desc":"Sandálias da Proteção! ....  Carta Tesouro do tipo ítem  ...  É um item para os pés e Custa 700 peças de ouro .....  As cartas de maldição que você comprar quando abrir uma porta não tem efeito..... As maldições que os outros jogadores lançarem sobre você continuarão funcionando."
											},
											{
													"nome":"ESPADA BASTARDA TRAICOEIRA",
													"desc":"Espada Bastarda Traiçoeira ....  Carta Tesouro do tipo ítem  ...  É um item para uma mão e Custa 400 peças de ouro .....  Concede +2 de bônus ao usuário."
											},
											{
													"nome":"POCAO DO SONO",
													"desc":"Poção do Sono ....  Carta Tesouro do tipo poção  ...  É uma poção que Custa 100 peças de ouro ..... Use durante qualquer combate.....  Da mais 2 de bonus para qualquer um dos lados....   Uso Único."
											},
											{
													"nome":"RALADOR DE QUEIJO DA PAZ",
													"desc":"Ralador de Queijo da Paz ....  Carta Tesouro do tipo ítem  ...  É um item uma mão e Custa 400 peças de ouro ..... Só pode ser usado por clérigos e concede +3 de bônus ao usuário."
											},
											{
													"nome":"ARMADURA RECHONCHUDA",
													"desc":"Armadura Rechonchuda ....  Carta Tesouro do tipo ítem  ...  É um item para o corpo e Custa 400 peças de ouro ..... Só pode ser usada por anões e concede +3 de bônus ao usuário."
											},
											{
													"nome":"LANCA MUITO GRANDE",
													"desc":"Lança Muito Grande ....  Carta Tesouro do tipo ítem  ...  É um item para duas mãos e Custa 200 peças de ouro .....  Concede +1 de bônus ao usuário."
											},
											{
													"nome":"BROQUEL DA BRAVATA",
													"desc":"Broquel da Bravata ....  Carta Tesouro do tipo ítem  ...  É um item para uma mão e Custa 400 peças de ouro .....  Concede +2 de bônus ao usuário."
											},
											{
													"nome":"POCAO DA INVISIBILIDADE",
													"desc":"Poção da Invisibilidade ....  Carta Tesouro do tipo poção  ...  É uma poção que Custa 200 peças de ouro ..... Descarte esta carta quando sua tentativa de fugir falhar..... Você escapa automaticamente....   Uso Único."
											},
											{
													"nome":"ROUBAR 1 NIVEL",
													"desc":"Roubar 1 nível ....  Carta Tesouro do tipo Subir de nível  ...   Escolha um jogador para você roubar 1 nível....   Você ganha um e ele perde um."
											},
											{
													"nome":"VARINHA DE ZAHORI",
													"desc":"Varinha de Zahori ....  Carta Tesouro do tipo ítem  ...  É um item de uso único e Custa 1100 peças de ouro .....  Procure na pilha de descarte qualquer carta que você quiser.... Fique com aquela carta e descarte esta."
											},
											{
													"nome":"LAMPADA MAGICA",
													"desc":"Lâmpada Mágica ....  Carta Tesouro do tipo ítem  ...  É um item de uso único e Custa 500 peças de ouro .....  Você pode usar a lâmpada durante seu próprio turno..... Ela invoca um gênio que faz um único monstro desaparecer, mesmo que você já tenha falhado em sua tentativa de fugir e o monstro já esteja quase te alcançando.... Se aquele era o únic monstro que você estava enfrentando, você poderá pegar seu tesouro, mas não irá ganhar 1 nível...... Uso único."
											}
									]
								};

		// $http.get('file:///android_asset/www/js/data/cartas.json').success(function(response) { // do something 
		// 		me.jsonData = response;
		// });

		var api_key = 'AIzaSyDAyL0pkgp2mQDnyG3qqVuavlZblfXMsnY';


		$scope.takePicture = function(){
      //alert('detection type: ' + me.detection_type);

			var options = {
		  	destinationType: Camera.DestinationType.DATA_URL,
    		sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 500,
        targetHeight: 500,
        correctOrientation: true,
        cameraDirection: 0,
        encodingType: Camera.EncodingType.JPEG
			};

			$cordovaCamera.getPicture(options).then(function(imagedata){
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

					$cordovaFileTransfer.upload(server, filePath, options, true)
				  		.then(function(result){

                var res = JSON.parse(result.response);
                var key = me.detection_types[me.detection_type] + 'Annotations';

								var listaPalavras = res.responses[0][key][0].description.replace("<br />", " ").replace("<br>", " ").replace("\r\n", " ").replace("\r", " ").replace(/\n/g, " ").replace("\t", " ").replace(".", "").replace("!", "").split(" ");
								var lista = me.jsonData.CartasArray;
								var novaLista = [];
								
								// alert(listaPalavras[0]);

								$scope.identificaCarta(listaPalavras, lista, novaLista);
								me.image_description = res.responses[0][key][0].description.replace("<br />", " ").replace("<br>", " ").replace("\r\n", " ").replace("\r", " ").replace(/\n/g, " ").replace("\t", " ").split(" ");

					  }, function(err){
					    alert('An error occured while uploading the file');
					  });

				}, function(err){
         			alert('An error occured while writing to the file');
        		});

			}, function(err){
			  alert('An error occured getting the picture from the camera');
			});


		}
		
		$scope.identificaCarta = function(listaPalavras, lista, novaLista) {
			// alert(listaPalavras.length);
			// alert(lista.length);
			var gambi = [];
			// var i = 0;
			// var k = 0;
			// var j = 0;
			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			for (i=0; i < listaPalavras.length; i++) {
				//alert("palavra: " + listaPalavras[i]);

				for (j=0; j < lista.length; j++) {
					gambi = lista[j].nome.split(" ");

					for (k=0; k < gambi.length; k++) {
						if (gambi[k] == listaPalavras[i]) {
							novaLista.push(lista[j]);
							break;
						}
					}
				}

				//alert(novaLista.length);
				if (novaLista.length > 0) {
					if (novaLista.length == 1) {
						break;

					} else {
						lista = novaLista;
						novaLista = [];
					}
				} 
			}
			
			if (novaLista.length > 0 && novaLista.length == 1) {
				//alert(novaLista[0].desc);
				me.card_desc = novaLista[0].desc;
				TTS.speak({
					text: novaLista[0].desc,
					locale: 'pt-BR',
					rate: 1.5
				}, function () {
					// Do Something after success
				}, function (reason) {
					// Handle the error case
				});
			
			} else {
				TTS.speak({
					text: "Carta com baixa resolução. Por favor. Tire outra foto da carta.",
					locale: 'pt-BR',
					rate: 1.5
				}, function () {
					// Do Something after success
				}, function (reason) {
					// Handle the error case
				});
			}

			$ionicLoading.hide();
		}

		$scope.repeat = function(listaPalavras, lista, novaLista) {
			TTS.speak({
				text: me.card_desc,
				locale: 'pt-BR',
				rate: 1.0
			}, function () {
				// Do Something after success
			}, function (reason) {
				// Handle the error case
			});
		}

	}



})();
