//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticController = require('../controllers/statistic_controller');

// Página de entrada (home page)
router.get('/', function(req, res) {
    
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de sesion
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                      sessionController.autologout,quizController.index);
router.get('/quizes/:quizId(\\d+)',        sessionController.autologout,quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autologout,quizController.answer);
router.get('/quizes/new',                  sessionController.autologout,quizController.new);
router.post('/quizes/create',              sessionController.autologout,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.autologout,quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.autologout,quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.autologout,quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',   sessionController.autologout,commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',      sessionController.autologout,commentController.create);

// Definición de rutas de estadísticas
router.get('/quizes/statistics',            sessionController.autologout,statisticController.show);

router.get('/author', sessionController.autologout,quizController.author);

module.exports = router;
