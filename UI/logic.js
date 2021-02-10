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

