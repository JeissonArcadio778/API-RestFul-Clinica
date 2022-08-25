//Desestrucuturo y traigo una funcion llamada Route. Sirve para yo configurarle las ruta

const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/user-controller");

// llamo la funcion
const route = Router();

route.get("/", usersGet);

route.post("/", usersPost);

route.put("/", usersPut);

route.delete("/", usersDelete);

route.patch("/", usersPatch);

module.exports = route;
