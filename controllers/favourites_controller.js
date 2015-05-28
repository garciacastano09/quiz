//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2

var models = require('../models/models.js');

// GET /user/:userId/favourites
exports.show = function(req, res) {
    var favs = [];
    var user = req.user;
    models.Quiz.findAll({include: models.Favourites}).then(function(quizes){
        console.log("antes del for");
        for(i in quizes){
            console.log("for, interacion i = "+i);
            //console.log(user.hasQuiz(quizes[i]));
            console.log(quizes[i].Favourites);            
            if(quizes[i].Favourites){
                favs.push(quizes[i]);
                console.log(quizes[i].pregunta+" es fav");
            }
        }
        console.log("LONGITUD DE FAVS FUERA DEL FOR = "+favs.length);
        res.render('quizes/index', {quizes: favs, errors: []});
    }).catch(function(error) {});
    
    
    /*var user = req.user;  
    models.Quiz.findAll().then(
        
        function(quizes) {
            console.log("longitud de quizes = "+quizes.length);
            var favs = [];

            for (var i = 0; i < quizes.length; i++){
                console.log("i = "+i);
               user.hasQuiz(quizes[i]).then(function(result){
                   console.log("i = "+i+", result = "+result);
                   if(result){
                       favs.push(quizes[i]);
                       console.log("pregunta "+i+" SI es fav");
                       console.log("LONGITUD DE FAVS DENTRO DEL FOR = "+favs.length);               
                    }
                   else{
                       console.log("pregunta "+i+" NO es fav");               
                   }
                });
            }
            //¿POR QUÉ ESTO DE ABAJO SE EJECUTA ANTES QUE EL FOR?
            console.log("LONGITUD DE FAVS FUERA DEL FOR = "+favs.length);
            res.render('quizes/index', {quizes: favs, errors: []});

        }).catch(function(error) { next(error)});*/
}
    
// PUT  /user/:userId/favourites/:quizId
exports.update = function(req, res, next) {      
	var quiz = req.quiz;
	var user = req.user;

	user.hasQuiz(quiz).then(function(result){
		if(result){
		  console.log("ya es favorita");
            
		} else {
		    user.addQuiz(quiz).then(function(){
			 user.hasQuiz(quiz).then(function(result){
                 if(result){
				    console.log("usuario " +user.id + " hizo fav a  " + quiz.id + " con exito");                     
                 }                 
             })
	        })
		  }
    });    
}

//DELETE  /user/:userId/favourites/:quizId
exports.destroy = function(req, res) {
    var quiz = req.quiz;
	var user = req.user;
	user.hasQuiz(quiz).then(function(result){
	if(result){			
	   user.removeQuiz(quiz).then(function(){	
           console.log("usuario " +user.id + " hizo unfav a  " + quiz.id + " con exito");
	   })
	} 
  });    
}
