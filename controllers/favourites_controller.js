//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2

var models = require('../models/models.js');

// GET /user/:userId/favourites
exports.show = function(req, res, next) {
    req.user.getFavourites().then(function(favs){
        console.log("favoritos : "+favs)
        res.render('quizes/index', {quizes: favs, errors: []});        
    })
    .catch(function(error){
        next(error);
    }); 
}
    
// PUT  /user/:userId/favourites/:quizId
exports.update = function(req, res, next) {      
	var quiz = req.quiz;
	var user = req.user;

	user.hasFavourite(quiz).then(function(result){
		if(result){
		  console.log("ya es favorita");
          res.redirect("/");                           
		} 
        else {
            user.addFavourite(quiz).then(function(){
			    console.log("usuario " +user.id + " hizo fav a  " + quiz.id + " con exito");                     
                res.redirect("/");
            }).catch(function(error){
                    next(error);
                });    
        }    
    }
)}

//DELETE  /user/:userId/favourites/:quizId
exports.destroy = function(req, res) {
    var quiz = req.quiz;
	var user = req.user;
	user.hasFavourite(quiz).then(function(result){
	if(result){
	   user.removeFavourite(quiz).then(function(){	
           console.log("usuario " +user.id + " hizo unfav a  " + quiz.id + " con exito");
           res.redirect("/");
	   }).catch(function(error){
                next(error);
            });
	}
    else{
        res.redirect("/");
    }
  }).catch(function(error){
        next(error);
    });    
}
