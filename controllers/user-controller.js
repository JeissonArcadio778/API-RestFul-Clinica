// Esta importacion es así para activar las propiedades de response en el controlador

const { response } = require("express");

const usersGet = (req, res = response) => {
    res.json({
    msg: "get API - controller",
  });
};

const usersPost = (req, res = response) => {
    res.json({
    msg: "Post API - controller",
  });
};
const usersPut= (req, res = response) => {
    res.json({
    msg: "Put API - controller",
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
