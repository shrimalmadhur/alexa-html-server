var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');



app.get('/create-file', function(req, res){
  console.log("up");
  createFile("index.html");
});

function createFile(filename) {
  fs.open(filename,'r',function(err, fd){
    if (err) {
      fs.writeFile(filename, '', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("The file was saved!");
          var htmlBase = "<html>" +
                          "<title>HTML page</title>" +
                          "<head></head>" + 
                          "<body></body>" + 
                          "</html>";
          fs.appendFile(filename, htmlBase, encoding='utf8', function (err) {
            if (err) throw err;
          });
      });
    } else {
      console.log("The file exists!");
    }
  });
}

http.listen(80, function(){
   console.log('listening on *:80');
});