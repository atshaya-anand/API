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
      var arr = [];
      for (var key in data['result']['huffmanCode']) {
          if (data['result']['huffmanCode'].hasOwnProperty(key)) {
              arr.push( [ key, data['result']['huffmanCode'][key] ] );
          }
      }
      document.getElementById('resultValue').innerHTML = arr + '<br/>' + data['result']['encStr'];
    }
  });
}

function moveNext(id1,id2){
  document.getElementById(id1).style.display = "none";
  document.getElementById(id2).style.display = "block";
  document.getElementById("title").innerHTML = '';
  document.getElementById('resultValue').innerHTML = '';
}

function huffman(){
  var str = document.getElementById('txt').value;
  console.log(str);
  var url = "http://127.0.0.1:5000/huffmanCode?text="+str;
  ajaxCall(url, "Text Compression using Huffman Code");
}