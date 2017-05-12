
//var API_URL = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=06f075d4c5f24dcb9857e66123d7c1814b8f2c23&version=2016-05-20";
var API_URL = "https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=06f075d4c5f24dcb9857e66123d7c1814b8f2c23&version=2016-05-20";
               
var API_USER = "ronan469@gmail.com";
var API_PASSWORD = "kraemer13798426500";

$(document).on("deviceready", function() {

    function uploadWin(res) {
        var data = JSON.parse(res.response);
        var labels = data.images[0].labels;
        var result = "<p>Detected the following possible items:<br/>";
        for(var i=0, len=labels.length; i<len; i++) {
            result += "<b>"+labels[i].label_name + "</b><br/>";   
        }
        $("#status").html(result);
    }
    
    function uploadFail() {
        console.log('uploadFail');
        console.dir(arguments);
        $("#status").html("Deu ruim!");
    }
    
    //Credit: http://stackoverflow.com/a/14313052/52160
    function authHeaderValue(username, password) {
        var tok = username + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    };
    
	function onCamSuccess(imageData) {
		var image = document.getElementById('myImage');
        $("#imgDisplay").attr("src", imageData);

        $("#status").html("<i>Uploading picture for BlueMix analysis...</i>");
        
        var options = new FileUploadOptions();
        options.fileKey = "img_file";
        options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        
        options.headers = {'Authorization': authHeaderValue(API_USER, API_PASSWORD) };
        
        var ft = new FileTransfer();
        $("#status").html("<i>Uploading picture for BlueMix analysis 2...</i>");
        ft.upload(imageData, encodeURI(API_URL), uploadWin, uploadFail, options);
        $("#status").html("<i>Uploading picture for BlueMix analysis 3...</i>");

    }

	function onCamFail(message) {
		alert('Failed because: ' + message);
	}	
    
    //Touch handlers for the two buttons, one uses lib, one uses cam
    $("#cameraButton, #galleryButton").on("touchend", function() {
        var source = ($(this).prop("id")==="cameraButton")?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.PHOTOLIBRARY;
        
		navigator.camera.getPicture(onCamSuccess, onCamFail, { 
			quality: 50,
			sourceType: source,
			destinationType: Camera.DestinationType.FILE_URI
		});

    });
    
});
