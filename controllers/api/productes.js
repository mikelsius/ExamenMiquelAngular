var Producte = require("../../models/producte");

var app = require("express").Router();

app.get("/", function (req, res, next) {
    console.log("fdfdfd");
    Producte.find(function (err, productes) {
        if (err) {
            return next(err);
        }
        res.json(productes);
    });
});


app.post("/:id", function (req, res, next) {
    console.log("L'usuari a fet un POST");
    res.send("POST's no disponibles");
});


app.get("/:id", function (req, res, next) {
    Producte.find({
        "codi": req.params.id
    }, function (err, productes) {
        if (err) {
            return next(err);
        }
        console.log(productes);
        res.json(productes);
    });
});
app.get("/seccio/:id", function (req, res, next) {
    Producte.find({
        "seccio": req.params.id
    }, function (err, productes) {
        if (err) {
            return next(err);
        }
        console.log(productes);
        res.json(productes);
    });
});
app.get("/preu/:id", function (req, res, next) {
    Producte.find({
        "preu": {"$lte": req.params.id} // {"$gte": 0, "$lt": req.params.id}
    }, function (err, productes) {  //ULL! nomès agafa els registres que han estat insertats com a NUMBERS!
        if (err) {
            return next(err);
        }
        console.log(productes);
        res.json(productes);
    });
});


app.delete("/:id", function (req, res, next) {


    Producte.remove({codi: req.params.id}, function (err) {
        if (err){
            return next(err);
        }else{
             
            console.log("Producte amb codi " + req.params.id + " esborrat!");
            res.status(201).json("Llibre borrat!");
        }

        
       
    })
});


app.put("/", function (req, res, next) {
    console.log(req.body);

    Producte.findByIdAndUpdate(req.body._id, req.body, function (err) {
        if (err) {
            return next(err);

        }
        res.json({
            "missatges": "Producte modificat"
        });
    });

});


app.post("/", function (req, res, next) {
    var producte = new Producte({
        codi: req.body.codi,
        nom: req.body.nom,
        seccio: req.body.seccio,
        preu: req.body.preu
    });

    producte.save(function (err, producte) {
        if (err) {
            return next(err);
        }
        res.status(201).json(producte);
    });

});

module.exports = app;