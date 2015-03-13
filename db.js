var mongoose = require("mongoose");
mongoose.connect("mongodb://practica:practica@ds033601.mongolab.com:33601/llibres", function(){
    console.log("Connectat a MongoLab");
});

module.exports = mongoose;