//Desestrucuturo y traigo una funcion llamada Route. Sirve para yo configurarle las ruta
const { Router } = require("express");
const { body, param } = require("express-validator");
const mongoose = require('mongoose');

const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/user-controller");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, isRole } = require("../middlewares/validate-role");

const { isRoleValid, isEmailValid,isUserValid, isCedulaParmValid } = require("../helpers/db-validator");

const router = Router();

const validateInputsCreate = [
  body("name", "The name is required").not().isEmpty(),
  body("cedula", "The cedula is required").not().isEmpty(),
  body("cedula").custom( (cedula) => isUserValid(cedula)),
  body("email", "The email is invalid").isEmail(),
  body("email").custom( (email) => isEmailValid(email)),
  body("password", "The password is required").notEmpty(),
  body("password", "Password must be more than 6 letters").isLength({min:6}),
  body("role").custom( (role) => isRoleValid(role) ),
  validateFields
];

const validateInputsUpdate = [
  validateJWT,
  body("name", "The name is required").not().isEmpty(),
  body("email", "The email is invalid").isEmail(),
  body("password", "The password is required").notEmpty(),
  body("password", "Password must be more than 6 letters").isLength({min:6}),
  body("role").custom( (role) => isRoleValid(role) ),
  param("cedula").custom((cedula) => isCedulaParmValid(cedula)),
  validateFields
];

const validateInputsDelete = [
  validateJWT,
  isRole('ADMIN'),
  param("cedula").custom((cedula) => isCedulaParmValid(cedula)), 
  validateFields
];

router.get("/", getUsers);

router.post("/", validateInputsCreate, createUser);

router.put("/:cedula", validateInputsUpdate, updateUser);

router.delete("/:cedula", validateInputsDelete, deleteUser);

module.exports = router;
