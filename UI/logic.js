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
    console.log(set01,set02);
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