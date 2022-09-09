
const { Router } = require('express'); 
const { body, param } = require("express-validator");

const { login } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos')

const route = Router();

// Validations
const validateLogin = [
    body("email", "El email es obligatorio").notEmpty(),
    body('password', 'El password es obligatorio').notEmpty(),
    body('email', 'Correo o contraseña no válido').isEmail(), 
    body('password', 'Correo o contraseña no válido').isLength({min:6}),
    validarCampos
  ]

// Routes - Router
route.post("/login", validateLogin, login); 

// porque es lo que voy a exportar
module.exports = route; 