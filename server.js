var express = require("express");

var app = express();
var port = 9003;

app.use(express.static("./public"));

app.listen(port, function() {
  console.log("listen to port: " + port);
})
