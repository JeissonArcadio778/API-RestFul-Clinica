//Desestrucuturo y traigo una funcion llamada Route. Sirve para yo configurarle las ruta
const { Router } = require("express");
const { body, param } = require("express-validator");

const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/user-controller");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, isRole } = require("../middlewares/validate-role");



const { isRoleValid, isEmailValid,isUserValid } = require("../helpers/db-validator");

const router = Router();

const validateInputs = [
  body("name", "El nombre es obligatorio").not().isEmpty(),
  body("email", "El email no es valido").isEmail(),
  body('email').custom( (email) => isEmailValid(email)),
  body('password', 'El password es obligatorio').notEmpty(),
  body('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  body('role').custom( (role) => isRoleValid(role) ),
  validateFields
];

const validateUpdate = [
  body("name", "El nombre es obligatorio").not().isEmpty(),
  body("email", "El email no es valido").isEmail(),
  body('password', 'El password es obligatorio').notEmpty(),
  body('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  body('role').custom( (role) => esRoleValido(role) ),
  param('id', 'No es un ID válido').isMongoId(),
  param('id').custom((id)=> validateUserDBById(id)), 
  validateFields
]

const validateDelete = [
  validateJWT,
  isRole('ADMIN_ROLE', 'SALES_ROLE'),
  param('id', 'No es un ID válido').isMongoId(),
  param('id').custom((id)=> validateUserDBById(id)), 
  validateFields
]

router.get("/", getUsers);

router.post("/", validateInputs, createUser);

router.put("/:id", validateUpdate, updateUser);

router.delete("/:id", validateDelete, deleteUser);

module.exports = router;
