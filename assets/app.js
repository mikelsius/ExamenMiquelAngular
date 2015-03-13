var appLlibres = angular.module("appLlibres", ['ngResource']);

appLlibres.controller("LlibresController", function ($scope, LlibresSvc) {
    $scope.productes = [];
    LlibresSvc.query(function (productes) {
        $scope.productes = productes;
    });

    $scope.afegirLlibre = function() {
        LlibresSvc.save({
            codi: $scope.codiN,
            nom: $scope.nomN,
            seccio: $scope.seccioN,
            preu: $scope.preuN
        }, function(){
            $scope.productes.unshift({
                codi: $scope.codiN,
                nom: $scope.nomN,
                seccio: $scope.seccioN,
                preu: $scope.preuN
            });
            
            $scope.codiN = "";
            $scope.nomN = "";
            $scope.seccioN = "";
            $scope.preuN = "";
        });
    };
    $scope.editar = function(producte) {
        $scope.codiE= producte.codi;
        $scope.nomE = producte.nom;
        $scope.seccioE= producte.seccio;
        $scope.preuE = producte.preu;
        $scope.producteEdit = producte;
        
      console.log(producte);   
    }
    
    $scope.actualitzar = function() {
        if ($scope.codiE && $scope.nomE) {
            LlibresSvc.update({"_id": $scope.producteEdit._id , "codi": $scope.codiE , "nom" : $scope.nomE, "seccio" : $scope.seccioE, "preu" : $scope.preuE}, function() { 
                    $scope.producteEdit.codi = $scope.codiE;
                    $scope.producteEdit.nom = $scope.nomE;
                    $scope.producteEdit.seccio = $scope.seccioE;
                    $scope.producteEdit.preu = $scope.preuE;
                    $scope.isbnE=null;
                    $scope.titolE = null;
                    $scope.seccioE=null;
                    $scope.preuE = null;
            
            });
            
        }
    }
    
    $scope.esborrar= function(producte) {
        LlibresSvc.delete({id: producte.codi}, function(){
            
            $scope.producte.splice(producte, 1);
    });
    };
});


appLlibres.service('LlibresSvc', function ($resource) {
    return $resource('/api/productes/:id', null, {
        'update': {
            method: 'PUT'
        }
    });
});