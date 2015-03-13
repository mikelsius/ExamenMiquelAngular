var Llibre = require("../../models/llibre");

var app = require("express").Router();

app.get("/", function (req, res, next) {
    console.log("fdfdfd");
    Llibre.find(function (err, llibres) {
        if (err) {
            return next(err);
        }
        res.json(llibres);
    });
});


app.post("/:id", function (req, res, next) {
    console.log("L'usuari a fet un POST");
    res.send("POST's no disponibles");
});


app.get("/:id", function (req, res, next) {
    Llibre.find({
        "isbn": req.params.id
    }, function (err, llibres) {
        if (err) {
            return next(err);
        }
        console.log(llibres);
        res.json(llibres);
    });
});


app.delete("/:id", function (req, res, next) {


    Llibre.remove({isbn: req.params.id}, function (err) {
        if (err){
            return next(err);
        }else{
             
            console.log("Llibre amb ISBN " + req.params.id + " esborrat!");
            res.status(201).json("Llibre borrat!");
        }

        
       
    })
});


app.put("/", function (req, res, next) {
    console.log(req.body);

    Llibre.findByIdAndUpdate(req.body._id, req.body, function (err) {
        if (err) {
            return next(err);

        }
        res.json({
            "missatges": "Llibre modificat"
        });
    });

});


app.post("/", function (req, res, next) {
    var llibre = new Llibre({
        isbn: req.body.isbn,
        titol: req.body.titol,
        autors: req.body.autors
    });

    llibre.save(function (err, llibre) {
        if (err) {
            return next(err);
        }
        res.status(201).json(llibre);
    });

});

module.exports = app;