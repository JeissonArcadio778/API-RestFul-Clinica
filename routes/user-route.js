//Desestrucuturo y traigo una funcion llamada Route. Sirve para yo configurarle las ruta
const { Router } = require("express");
const { body, param } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/user-controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, validateEmail,validateUserDBById } = require("../helpers/db-validator");

// llamo la funcion y creo una instancia
const route = Router();

// let validarDuplicadoEmail; 

const validarInputs = [

  body("name", "El nombre es obligatorio").not().isEmpty(),
  body("email", "El email no es valido").isEmail(),
  // Valido si existe el email
  body('email').custom( (email) => validateEmail(email)),
  body('password', 'El password es obligatorio').notEmpty(),
  body('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  // body('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   //Podemos validarlo contra una expresion regular para validar carateres especiales, mayusculas, etc. 
   body('role').custom( (role) => esRoleValido(role) ), //.custom(esRoleValido)
  //  Esta funcion es para validar los campos
  validarCampos
];

const validatesPut = [
  body("name", "El nombre es obligatorio").not().isEmpty(),
  body("email", "El email no es valido").isEmail(),
  body('password', 'El password es obligatorio').notEmpty(),
  body('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  body('role').custom( (role) => esRoleValido(role) ),
  param('id', 'No es un ID válido').isMongoId(),
  param('id').custom((id)=> validateUserDBById(id)), 
  validarCampos
]

const validateDelete = [
  param('id', 'No es un ID válido').isMongoId(),
  param('id').custom((id)=> validateUserDBById(id)), 
  validarCampos
]

// const {validarDuplicadoEmail, ...validarPost} = validarInputs;
route.get("/", usersGet);

// Este check va preparando los errores. Está creando en la request todos los errores que esos middleware van creando. En controles ya se confirman.
route.post("/", validarInputs, usersPost);

route.put("/:id", validatesPut, usersPut);

route.delete("/:id", validateDelete, usersDelete);

route.patch("/", usersPatch);

//Lo estoy llamando desde routes
module.exports = route;
