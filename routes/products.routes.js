const { Router } = require("express");
const { body,param } = require("express-validator");

const { createProducts, getProducts } = require("../controllers/product-controller");

const { categoryDBValidation } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole } = require("../middlewares/validar-rol");


const router = Router();

router.post('/', [validarJWT, validarCampos, isAdminRole], createProducts); 
router.get('/', getProducts)
module.exports = router; 
