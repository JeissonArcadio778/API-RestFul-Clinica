const { Router } = require('express'); 
const { body} = require("express-validator");

const { login } = require('../controllers/auth-controller');
const { validateFields } = require('../middlewares/validate-fields')

const router = Router();

// Validations
const validateLogin = [

    body('email', 'El email es obligatorio').notEmpty(),
    body('password', 'El password es obligatorio').notEmpty(),
    body('email', 'Correo o contraseña no válido').isEmail(), 
    body('password', 'Correo o contraseña no válido').isLength({min:6}),
    validateFields

]

router.post("/login", validateLogin, login); 

module.exports = router; 