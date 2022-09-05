//Desestrucuturo y traigo una funcion llamada Route. Sirve para yo configurarle las ruta
const { Router } = require("express");
const { body } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/user-controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, validateEmail } = require("../helpers/db-validator");

// llamo la funcion y creo una instancia
const route = Router();

const validarInputs = [
  body("name", "El nombre es obligatorio").not().isEmpty(),
  body("email", "El email no es valido").isEmail(),
  body('email').custom( (email) => validateEmail(email)),
  body('password', 'El password es obligatorio').notEmpty(),
  body('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  // body('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   //Podemos validarlo contra una expresion regular para validar carateres especiales, mayusculas, etc. 
   body('role').custom( (role) => esRoleValido(role) ), //.custom(esRoleValido)
  validarCampos
];


route.get("/", usersGet);
// Segundo argumento siempre significa un middleware
// Este check va preparando los errores. Está creando en la request todos los errores que esos middleware van creando. En controles ya se confirman.
route.post("/", validarInputs, usersPost);

route.put("/:id", usersPut);

route.delete("/", usersDelete);

route.patch("/", usersPatch);

module.exports = route;
