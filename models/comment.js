//JORGE GARCÍA CASTAÑO Y MARTA ALMENDRAL HERNANDEZ
//GRUPO 35.2

// Definicion del modelo de Quiz con validación
module.exports = function(sequelize, DataTypes) {
    
  return sequelize.define(
  	'Comment',
    { texto: {
         type: DataTypes.STRING,
         validate: { notEmpty: {msg: "-> Falta Comentario"}}
      },
      publicado: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false
       }
     }    
   );
 } 
