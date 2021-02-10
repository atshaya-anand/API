function ajaxCall(apiurl,title,img=0){
    $.ajax({
    url: apiurl, 
    type:"GET",
    error: function(data){
      console.log("Server Error" , data);
      console.log(data.getAllResponseHeaders());
    },
    success: function(data){
      console.log(data);
      document.getElementById("title").innerHTML = title;
      if (img==0){
        document.getElementById("img").style.display = "none";
        document.getElementById('resultValue').innerHTML = data['result'];
      }
      else{
        document.getElementById("img").style.display = "block";
	      data = data.split(">");
        var s = data[0];
        s = s.split('"');
        console.log('---->',s[1]);
        document.getElementById('img').src = s[1];
      }
    }
  });
}

function moveNext(id1,id2){
  document.getElementById(id1).style.display = "none";
  document.getElementById("img").style.display = "none";
  document.getElementById(id2).style.display = "block";
  document.getElementById("title").innerHTML = '';
  document.getElementById('resultValue').innerHTML = '';
}

function getDateDiff(){
  var date01 = document.getElementById("date1").value;
  var date02 = document.getElementById("date2").value;
  console.log(date01,date02);
  var url = "http://127.0.0.1:5000/getDateDiff?date1="+date01+"&date2="+date02;
  ajaxCall(url,"Difference of Dates");
}

function getUnion(){
    //console.log('Clicked');
    var set01 = document.getElementById("set1").value;
    var set02 = document.getElementById("set2").value;
    console.log(set01,'----',set02);
    //console.log("test");
    var url = "http://127.0.0.1:5000/getUnion?seta="+set01+"&setb="+set02;
    ajaxCall(url,"Union");
}

function getIntersection(){
    //console.log('Clicked');
    var set01 = document.getElementById("set1").value;
    var set02 = document.getElementById("set2").value;
    console.log(set01,set02);
    //console.log("test");
    var url = "http://127.0.0.1:5000/getIntersection?seta="+set01+"&setb="+set02;
    ajaxCall(url,"Intersection");
}

function getDifference(){
    //console.log('Clicked');
    var set01 = document.getElementById("set1").value;
    var set02 = document.getElementById("set2").value;
    console.log(set01,set02);
    //console.log("test");
    var url = "http://127.0.0.1:5000/getMinus?seta="+set01+"&setb="+set02;
    ajaxCall(url,"Difference");
}

function getTranspose(){
  var row = document.getElementById("row").value;
  var col = document.getElementById("col").value;
  var mat = document.getElementById("mat").value;
  console.log(row,col,mat);
  var url = "http://127.0.0.1:5000/getTranspose?row="+row+"&col="+col+"&mat="+mat;
  ajaxCall(url,"Transpose");
}

function getLowDiagonal(){
  var row = document.getElementById("row").value;
  var col = document.getElementById("col").value;
  var mat = document.getElementById("mat").value;
  console.log(row,col,mat);
  var url = "http://127.0.0.1:5000/getLowerDiagonal?row="+row+"&col="+col+"&mat="+mat;
  ajaxCall(url,"Lower Diagonal");
}

function getUpDiagonal(){
  var row = document.getElementById("row").value;
  var col = document.getElementById("col").value;
  var mat = document.getElementById("mat").value;
  console.log(row,col,mat);
  var url = "http://127.0.0.1:5000/getUpperDiagonal?row="+row+"&col="+col+"&mat="+mat;
  ajaxCall(url,"Upper Diagonal");
}

function getWord(){
  var fig = document.getElementById('fig').value;
  console.log(fig);
  var url = "http://127.0.0.1:5000/getWord?fig="+fig;
  ajaxCall(url,"Word Format");
}

function encrypt(){
  var msg = document.getElementById('msg').value;
  console.log(msg);
  document.getElementById('msg').style.display = "none";
  document.getElementById('en').style.display = "none"
  document.getElementById('en-msg').style.display = "block";
  document.getElementById('key').style.display = "block";
  document.getElementById('de').style.display = "block";
  var url = "http://127.0.0.1:5000/getEncrypt?msg="+msg;
  ajaxCall(url,"Encrypted Message");
}

function decrypt(){
  var msg = document.getElementById('en-msg').value;
  var key = document.getElementById('key').value;
  console.log(msg);
  document.getElementById('msg').style.display = "none";
  document.getElementById('en').style.display = "none"
  document.getElementById('en-msg').style.display = "block";
  document.getElementById('de').style.display = "block";
  document.getElementById('key').style.display = "block";
  var url = "http://127.0.0.1:5000/getDecrypt?msg="+msg+"&key="+key;
  ajaxCall(url,"Decrypted Message");
}

function getCheckSum(){
  var text = document.getElementById('text').value;
  console.log(fig);
  var url = "http://127.0.0.1:5000/getCheckSum?text="+text;
  ajaxCall(url,"Checksum Value");
}

function getBarCode(){
  var text = document.getElementById('barText').value;
  var intHt, intWd, strImages;
	intHt = intWd = 0;
	intWd = 100;
	intHt = 80;
  strText = text;
	funcCode128B();
  var url = "http://localhost:8001/barCode/"+strRaw+"/"+intWd+"/"+intHt;
  ajaxCall(url,"Barcode ",1);
}

function getQRCode(){
  var text = document.getElementById('QRText').value;
  var url = "http://127.0.0.1:5000/getQRCode?text="+text;
  ajaxCall(url,"QRCode ",1);
}

function generateOTPAlphaNum(){
  var text = document.getElementById('OtpText').value;
  var url = "http://127.0.0.1:5000/generateOTPAlphaNum?text="+text;
  ajaxCall(url,"OTP AlphaNumeric ");
}

function generateOTPNum(){
  var text = document.getElementById('OtpText').value;
  var url = "http://127.0.0.1:5000/generateOTPNum?text="+text;
  ajaxCall(url,"OTP Numeric ");
}

function generateOTPAlpha(){
  var text = document.getElementById('OtpText').value;
  var url = "http://127.0.0.1:5000/generateOTPAlpha?text="+text;
  ajaxCall(url,"OTP Alpha ");
}

function generateCaptcha(){
  var text = document.getElementById('str').value;
  var url = "http://127.0.0.1:5000/getCaptcha?text="+text;
  ajaxCall(url,"CAPTCHA ",1);
}

// Code 128 Specific Array
var arrayCode128Bin = [ '11011001100', '11001101100', '11001100110', '10010011000', '10010001100', '10001001100', '10011001000', '10011000100', '10001100100', '11001001000', '11001000100', '11000100100', '10110011100', '10011011100', '10011001110', '10111001100', '10011101100', '10011100110', '11001110010', '11001011100', '11001001110', '11011100100', '11001110100', '11101101110', '11101001100', '11100101100', '11100100110', '11101100100', '11100110100', '11100110010', '11011011000', '11011000110', '11000110110', '10100011000', '10001011000', '10001000110', '10110001000', '10001101000', '10001100010', '11010001000', '11000101000', '11000100010', '10110111000', '10110001110', '10001101110', '10111011000', '10111000110', '10001110110', '11101110110', '11010001110', '11000101110', '11011101000', '11011100010', '11011101110', '11101011000', '11101000110', '11100010110', '11101101000', '11101100010', '11100011010', '11101111010', '11001000010', '11110001010', '10100110000', '10100001100', '10010110000', '10010000110', '10000101100', '10000100110', '10110010000', '10110000100', '10011010000', '10011000010', '10000110100', '10000110010', '11000010010', '11001010000', '11110111010', '11000010100', '10001111010', '10100111100', '10010111100', '10010011110', '10111100100', '10011110100', '10011110010', '11110100100', '11110010100', '11110010010', '11011011110', '11011110110', '11110110110', '10101111000', '10100011110', '10001011110', '10111101000', '10111100010', '11110101000', '11110100010', '10111011110', '10111101110', '11101011110', '11110101110', '11010000100', '11010010000', '11010011100', '1100011101011', '11010111000'];

function funcConsumeEscape(inputChar) {
	'use strict';
	switch (inputChar) {
	case 96: // `
		return 102;
	case 49: // 1
		return 97;
	case 50: // 2
		return 96;
	case 51: // 3
		return 96;
	case 52: // 4 (Assumes Code128B)
		return 100;
	case 65: // A
		return 101;
	case 66: // B
		return 100;
	case 67: // C
		return 99;
	case 68: // D
		return 95;
	case 97: // a
		return 98;
	case 98: // b
		return 98;
	default:
		return (inputChar - 32);
	}
}
var strRaw = "";
var strText = "";
// Symbology-specific functions
function funcCode128B() {
  'use strict';
  var i, j, intWeight, intLength, intWtProd, arrayData = [];

	intLength = strText.length;
	arrayData[0] = 104;
	intWtProd = 104;
	for (i = 0, j = 0; i < intLength; i += 1, j += 1) {
		if (strText[i] !== "`") {
			arrayData[j + 1] = strText.charCodeAt(i) - 32;
			intWeight = j + 1;
			intWtProd += intWeight * arrayData[j + 1];
		} else {
			i += 1;
			arrayData[j + 1] = funcConsumeEscape(strText.charCodeAt(i));
			intWeight = j + 1;
			intWtProd += intWeight * arrayData[j + 1];
		}
	}
	arrayData[j + 1] = intWtProd % 103;
	arrayData[j + 2] = 106;
	strRaw = "";
	for (i = 0; i < arrayData.length; i += 1) {
		strRaw += arrayCode128Bin[arrayData[i]];
	}
} // End Code 128B