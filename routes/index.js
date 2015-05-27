//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticController = require('../controllers/statistic_controller');
var userController = require('../controllers/user_controller');
var favouritesController = require('../controllers/favourites_controller.js');


// Página de entrada (home page)
router.get('/', function(req, res) {
    
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con ids
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId
router.param('userId', userController.load);  // autoload :userId

// Definición de rutas de cuenta
router.get('/user',                         sessionController.autologout,userController.new);     // formulario sign un
router.post('/user',                        sessionController.autologout,userController.create);     // registrar usuario
router.get('/user/:userId(\\d+)/edit',      sessionController.autologout,sessionController.loginRequired, userController.edit);     // editar información de cuenta
router.put('/user/:userId(\\d+)',           sessionController.autologout,sessionController.loginRequired, userController.update);     // actualizar información de cuenta
router.delete('/user/:userId(\\d+)',        sessionController.autologout,sessionController.loginRequired, userController.destroy);     // borrar cuenta


// Definición de rutas de sesion
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                      sessionController.autologout,quizController.index);
router.get('/quizes/:quizId(\\d+)',        sessionController.autologout,quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autologout,quizController.answer);
router.get('/quizes/new',                  sessionController.loginRequired,sessionController.autologout,quizController.new);
router.post('/quizes/create',              sessionController.loginRequired,sessionController.autologout,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired,sessionController.autologout,quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired,sessionController.autologout,quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired,sessionController.autologout,quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',   sessionController.autologout,commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',      sessionController.autologout,commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

// Definición de rutas de estadísticas
router.get('/quizes/statistics',           sessionController.autologout,statisticController.show);

// Definicion de ruta de pagina de autores
router.get('/author', sessionController.autologout,quizController.author);

//Definicion de rutas de favoritos
router.get('/user/:userId(\\d+)/favourites', sessionController.autologout, sessionController.loginRequired,favouritesController.show);
router.put('/user/:userId(\\d+)/favourites/:quizId(\\d+)', sessionController.autologout, sessionController.loginRequired,favouritesController.update);
router.delete('/user/:userId(\\d+)/favourites/:quizId(\\d+)', sessionController.autologout, sessionController.loginRequired,favouritesController.destroy);


module.exports = router;
