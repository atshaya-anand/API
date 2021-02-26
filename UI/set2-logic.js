function ajaxCall(apiurl,title){
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
      document.getElementById('resultValue').innerHTML = data['result'];
    }
  });
}

function moveNext(id1,id2){
  document.getElementById(id1).style.display = "none";
  document.getElementById(id2).style.display = "block";
  document.getElementById("title").innerHTML = '';
  document.getElementById('resultValue').innerHTML = '';
}

function getSD(){
    var data = document.getElementById('sd').value;
    console.log(data);
    var url = "http://localhost:8001/getStandardDeviation/"+data;
    ajaxCall(url,"Standard Deviation");
}

function getVariance(){
    var data = document.getElementById('var').value;
    console.log(data);
    var url = "http://localhost:8001/getVariance/"+data;
    ajaxCall(url,"Variance");
}

function getLR(){
    var row = document.getElementById('row').value;
    var data = document.getElementById('lr').value;
    console.log(row,data);
    var url = "http://localhost:8001/getLinearRegression/"+row+"/"+data;
    ajaxCall(url,"Linear Regression");
}

function getGCD(){
  var num1 = document.getElementById('num1').value;
  var num2 = document.getElementById('num2').value;
  console.log(num1,num2);
  var url = "http://localhost:8001/getGCD?num1="+num1+"&num2="+num2;
  ajaxCall(url,"GCD");
}

function getLCM(){
  var num1 = document.getElementById('num1').value;
  var num2 = document.getElementById('num2').value;
  console.log(num1,num2);
  var url = "http://localhost:8001/getLCM?num1="+num1+"&num2="+num2;
  ajaxCall(url,"LCM");
}

function getnthRoot(){
  var n = document.getElementById('n').value;
  var num1 = document.getElementById('number').value;
  console.log(n,num1);  
  var url = "http://127.0.0.1:5000/getnRoot?n="+n+"&num="+num1;
  var x = n + "th Root";
  ajaxCall(url,x);
}

function getln(){
  var num = document.getElementById('num1').value;
  console.log(num);
  var url = "http://localhost:8001/getNaturalLog/"+num;
  ajaxCall(url,"Natural Logarithm (ln)");
}

function getlog(){
  var base = document.getElementById('base').value;
  var num = document.getElementById('num2').value;
  console.log(base,num);
  var url = "http://localhost:8001/getLog/"+num+"/"+base;
  ajaxCall(url,"Logarithm (log)");
}

function getantilog(){
  var pow = document.getElementById('pow').value;
  var num = document.getElementById('num').value;
  console.log(pow,num);
  var url = "http://localhost:8001/getAntiLog/"+num+"/"+pow;
  ajaxCall(url,"Anti-Logarithm (exponential)");
}

function getSin(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getSine/"+num;
  ajaxCall(url,"Sin "+num);
}

function getCos(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getCosine/"+num;
  ajaxCall(url,"Cos "+num);
}

function getTan(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getTan/"+num;
  ajaxCall(url,"Tan "+num);
}

function getSec(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getSec/"+num;
  ajaxCall(url,"Sec "+num);
}

function getCosec(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getCosec/"+num;
  ajaxCall(url,"Cosec "+num);
}

function getCot(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getCot/"+num;
  ajaxCall(url,"Cot "+num);
}

function getArcsin(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getArcSin/"+num;
  ajaxCall(url,"Arcsin "+num);
}

function getArccos(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getArcCos/"+num;
  ajaxCall(url,"Arccos "+num);
}

function getArctan(){
  var num = document.getElementById('ip').value;
  console.log(num);
  var url = "http://localhost:8001/getArcTan/"+num;
  ajaxCall(url,"Arctan "+num);
}

function getAmps(){
  var pow = document.getElementById("pow").value;
  var vol = document.getElementById("vol").value;
  var url = "http://127.0.0.1:5000/amps?power="+pow+"&voltage="+vol;
  ajaxCall(url,"Calculation of Amps")
}

function getkW(){
  var cur = document.getElementById("cur").value;
  var vol = document.getElementById("vol").value;
  var url = "http://127.0.0.1:5000/kVA?current="+cur+"&voltage="+vol;
  ajaxCall(url,"Calculation of Kilo Watt")
}

function getVA(){
  var cur = document.getElementById("cur").value;
  var vol = document.getElementById("vol").value;
  var url = "http://127.0.0.1:5000/watt?current="+cur+"&voltage="+vol;
  ajaxCall(url,"Calculation of Watts")
}

function getVolts(){
  var pow = document.getElementById("pow").value;
  var cur = document.getElementById("cur").value;
  var url = "http://127.0.0.1:5000/volts?power="+pow+"&current="+cur;
  ajaxCall(url,"Calculation of volts")
}

function getJoules(){
  var pow = document.getElementById("pow").value;
  var time = document.getElementById("time").value;
  var url = "http://127.0.0.1:5000/joules?power="+pow+"&time="+time;
  ajaxCall(url,"Calculation of Joules")
}

function getMah(){
  var wh = document.getElementById("wh").value;
  var vol = document.getElementById("vol").value;
  var url = "http://127.0.0.1:5000/mAh?wh="+wh+"&voltage="+vol;
  ajaxCall(url,"Calculation of mAh")
}

function getWh(){
  var ah = document.getElementById("ah").value;
  var vol = document.getElementById("vol").value;
  var url = "http://127.0.0.1:5000/wh?ah="+ah+"&voltage="+vol;
  ajaxCall(url,"Calculation of wh")
}