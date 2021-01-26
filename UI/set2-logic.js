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
}

function getVariance(){
    var data = document.getElementById('var').value;
    console.log(data);
}

function getLR(){
    var row = document.getElementById('row').value;
    var data = document.getElementById('lr').value;
    console.log(row,data);
}