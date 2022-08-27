// Esta importacion es así para activar las propiedades de response en el controlador. (las funciones que vamos a realizar dentro de la peticion que realizamos)

const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  // Los argumentos con signo de interrogación son considerados como opcionales. Express me los parsea.
  
  const {q, nombre = 'no name', apikey} = req.query; 
    res.json({
    msg: "get API - controller",
    q, 
    nombre,
    apikey
  });
};

const usersPost = (req, res = response) => {
  // Pequeña desestructuracion y validación. Recoger datos
    const {name, id} = req.body; 
    res.json({
    msg: "Post API - controller",
    name, 
    id
  });
};
const usersPut= (req = request, res = response) => {
  // Poner datos anviados desde el path. Enviarlos, pero no actualizarlos
  const {id} = req.params; 
    res.json({
    msg: "Put API - controller",
    id
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
}
