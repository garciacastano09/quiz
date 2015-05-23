//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2

var models = require('../models/models.js');

exports.show = function(req, res) {	
	var p=0; //numero preguntas
	var c=0; //numero comentarios
	var mc=0; //media comentarios
	var psc=0; //preguntas sin comentarios
	var pcc=0; //preguntas con comentarios
    
	models.Quiz.findAll({include: models.Comment}).then(function(quizes) {
		for(i in quizes){
			p++;
			for(j in quizes[i].Comments){
				if(j==0) {
					pcc++;
				}
				c++;
            }			
		}
	psc=p-pcc;
	mc=c/p;
	res.render('quizes/statistics', { p:p, c:c, pcc:pcc, psc:psc, mc:mc, quiz: req.quiz, errors: []});	
	});	
}; 
