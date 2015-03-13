var mongoose = require("mongoose");
mongoose.connect("mongodb://miquel:patata@ds053310.mongolab.com:53310/productes", function(){
    console.log("Connectat a MongoLab");
});

module.exports = mongoose;