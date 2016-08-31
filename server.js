var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var jsdom = require('jsdom');


app.get('/create-file', function(req, res){
  console.log("up");
  createFile("index.html");
});

app.get('/table', function(req, res){
  var rows = req.query.rows;
  var cols = req.query.cols;
  var className = req.query.class;
  var id = req.query.id;

  jsdom.env("index.html" ,{
    scripts: ["http://code.jquery.com/jquery-2.1.1.js"],
    done: function (err, window) {
      var $ = window.$;
      console.log(window.$("body").text("hello from the outside"));
      fs.writeFile("index.html", window.$("html").html(), function (err){
        if(err)
          console.log(err);
        console.log("overwritten")
      })
    }
  });
  
  // jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.1.js", function () {
  //   var tmp = document.createElement("div");
  //   // tmp.appendChild(window.$("html"));
  //   // console.log(tmp);
  //   // console.log(tmp.innerHTML);
  // });
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
                          "<body>Hello World!</body>" + 
                          "</html>";
          fs.appendFile(filename, htmlBase, encoding='utf8', function (err) {
            if (err) throw err;
          });
      });
    } else {
      console.log("The file exists!");
    }
    jsdom.env({
      file: filename,
      done: function (err, window) {
        GLOBAL.window = window;
        GLOBAL.document = window.document;
      }
    });
  });
}

http.listen(80, function(){
   console.log('listening on *:80');
});