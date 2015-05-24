//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2


// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


// Get /login -- Formulario de login
exports.new = function(req, res) {
     var errors = req.session.errors || {};
     req.session.errors = {};

     res.render('sessions/new', {errors: errors});
};

// POST /login -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

     var login = req.body.login;
     var password = req.body.password;
     var time = Date.now();
     
     var userController = require('./user_controller');
     userController.autenticar(login, password, function(error, user) {

     if (error) { // si hay error retornamos mensajes de error de sesión
         req.session.errors = [{"message": 'Se ha producido un error: '+error}];
         res.redirect("/login");
         return;
     }

     // Crear req.session.user y guardar campos id, username y la duracion del login
     // La sesión se define por la existencia de: req.session.user
     req.session.user = {id:user.id, username:user.username, time:time};
         console.log("usuario creado time = "+req.session.user.time);
     res.redirect(req.session.redir.toString());// redirección a path anterior a login
     });
};

// DELETE /logout -- Destruir sesion
exports.destroy = function(req, res) {
     delete req.session.user;
     res.redirect(req.session.redir.toString()); // redirect a path anterior a login
}; 

// Autologout
exports.autologout = function(req, res, next){
	if(req.session.user){
        var timeNow = Date.now(); //hora que es
        var timeBefore = req.session.user.time; //hora de la ultima transaccion
        var time = timeNow - timeBefore; //tiempo logueado desde la ultima transaccion
        console.log("time now = "+timeNow);
        console.log("time before = "+timeBefore);
        console.log("time = "+time);
        
        if(time < 120000){  
            req.session.user.time = timeNow;
            next();

        } else {
             res.redirect('/logout',{});
             console.log("Sesión expirada.")
          }
    }else{
	   next();
    }

};
