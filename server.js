var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use("/api/productes", require("./controllers/api/productes"));
app.use("/",require("./controllers/static"));

//
app.listen(8080, function() {
    console.log("Server started on", 8080);
});

//proba {"codi":"12345-1", "nom":"Patata", "seccio":"Alimentacio", "preu":"1"}