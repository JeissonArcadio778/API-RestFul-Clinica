const { Router } = require('express'); 
const { body, param } = require("express-validator");

const { uploadFile } = require('../controllers/uploads-controller');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/', uploadFile); 

// porque es lo que voy a exportar
module.exports = router; 