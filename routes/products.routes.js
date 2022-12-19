const { Router } = require("express");
const { body,param } = require("express-validator");

const { createProducts, getProducts, deleteProducts, getProductById, updateProducts } = require("../controllers/product-controller");

const { categoryDBValidation } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole } = require("../middlewares/validar-rol");


const router = Router();

router.post('/', [validarJWT, validarCampos, isAdminRole], createProducts); 
router.get('/', getProducts); 
router.get('/:id', getProductById); 
router.put('/:id', [validarJWT, validarCampos, isAdminRole], updateProducts); 
router.delete('/:id',[validarJWT, validarCampos, isAdminRole], deleteProducts); 
module.exports = router; 
