// Esta importacion es así para activar las propiedades de response en el controlador. (las funciones que vamos a realizar dentro de la peticion que realizamos)
//AQUI VA LO QUEREMOS QUE SE HAGA en general
const { response, request } = require("express");
// Para encriptar la contraseña en respuesta http y db
const bcrypt = require("bcryptjs");

// Estandar: crearemos instancias del modelo.
const Usuario = require("../models/usuario");

// METODO GET:
const usersGet = (req = request, res = response) => {

  // Los argumentos enviado en la HTTP con signo de interrogación son considerados como opcionales. Express me los parsea.

  const { q, nombre = "no name", apikey } = req.query;
  res.json({
    msg: "get API - controller",
    q,
    nombre,
    apikey,
  });
};

//METODO POST: 
const usersPost = async (req, res = response) => {
  // Pequeña desestructuracion y validación. Recoger datos del body. Cuidadeo con los required.
  // const {name, id} = req.body;
  const { name, password, email, role } = req.body;
  // Solo se enviará lo que está definido en el modelo. Solo es la instancia.
  const usuario = new Usuario({ name, email, password, role });

  //Encriptar password // Hacer el HASH: encriptar en una sola via // Metodo para hacer qué tan complejo es el encripte. 10 por defecto.
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // grabo en la DB
  await usuario.save();

  // VALIDAR LOS ENDPOINDS DE LA MEJOR MANERA
  res.json({
    msg: "Post API - controller",
    usuario,
  });
};

// METODO PUT: update info user! Se debe asumir que la info existe.

// Hay cierto tipo de validaciones. Cuando no envian info, misma info a update, etc. Actualizar contra: volver a manipular el hash


const usersPut = async (req = request, res = response) => {
  // Poner datos anviados desde el path. Enviarlos, pero no actualizarlos
  const { id } = req.params;

  // sacar lo que no quiero actualizar: 
  const {password, google,...forUpdate} = req.body; 

  //TODO:Si alguien quiere actu algo, debo validar que eso exista 

  //Encriptar nuevamente la contra
  if (password) {
    const salt = bcrypt.genSaltSync();
    forUpdate.password = bcrypt.hashSync(password, salt);
  }
  // Actualizar este resgistro mediante ID

  // The third param is to allow the return of the new object into the DB - after update. Para que la funcion retorn el nuevo usuario actualizado
  const usuarioDB = await Usuario.findByIdAndUpdate(id, forUpdate,{new:true}); 
  
  // Debo hacer validaciones de _id de mongo

  // Transformar la respues a JSON
  res.json({
    msg: "Put API - controller",
    usuarioDB
  });
};
const usersDelete = (req, res = response) => {
  res.json({
    msg: "Delete API - controller",
  });
};
const usersPatch = (req, res = response) => {
  res.json({
    msg: "get API - controller",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
};
