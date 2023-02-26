//Desestrucuturo y traigo una funcion llamada Route. Sirve para yo configurarle las ruta
const { Router } = require("express");
const { body, param } = require("express-validator");
const mongoose = require('mongoose');

const { createUser, getUsers, updateUser, deleteUser, getUserById } = require("../controllers/user-controller");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, isRole } = require("../middlewares/validate-role");

const { isRoleValid, isEmailValid,isUserValid, isCedulaParmValid, isEpsValid } = require("../helpers/db-validator");

const router = Router();

const validateInputsCreate = [
  body("first_name", "The name is required").not().isEmpty(),
  body("cedula", "The cedula is required").not().isEmpty(),
  body("id").custom( (id) => isUserValid(id)),
  body("email", "The email is invalid").isEmail(),
  body("email").custom( (email) => isEmailValid(email)),
  body("password", "The password is required").notEmpty(),
  body("password", "Password must be more than 6 letters").isLength({min:6}),
  body("role").custom((role) => isRoleValid(role)),
  body("eps").custom((eps) => isEpsValid(eps)),
  validateFields
];

const validateInputsUpdate = [
  validateJWT,
  body("first_name", "The first name is required").not().isEmpty(),
  body("email", "The email is invalid").isEmail(),
  body("password", "The password is required").notEmpty(),
  body("password", "Password must be more than 6 letters").isLength({min:6}),
  body("role").custom( (role) => isRoleValid(role) ),
  param("id").custom((id) => isCedulaParmValid(id)),
  validateFields
];

const validateInputsDelete = [
  validateJWT,
  isRole('ADMIN'),
  param("cedula").custom((cedula) => isCedulaParmValid(cedula)), 
  validateFields
];

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", validateInputsCreate, createUser);

router.put("/:id", validateInputsUpdate, updateUser);

router.delete("/:id", validateInputsDelete, deleteUser);

module.exports = router;
