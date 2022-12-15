const { Router } = require("express");
const { body,param } = require("express-validator");
const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category-controller");
const { categoryDBValidation } = require("../helpers/db-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole } = require("../middlewares/validar-rol");

const router = Router();

//Get category - public
router.get("/", [validarCampos], getCategory);

//Get category by id - public
router.get("/:id", [param("id", "No es un ID válido").isMongoId(), validarCampos], getCategoryById);

//Create a category - private - somebody with valid token
router.post(
  "/",
  [validarJWT, body("name", "The name is required").notEmpty(), validarCampos],
  createCategory
);

//Update a category - private - somebody with valid token
router.put(
  "/:id",
  [validarJWT, param("id", "No es un ID válido").isMongoId(),
  param('id').custom((id)=> categoryDBValidation(id)),
  body('name', 'The name is requied').notEmpty(), validarCampos],
  updateCategory
);

//Delete a category
router.delete(
  "/:id",
  [validarJWT, param("id", "No es un ID válido").isMongoId(), isAdminRole, validarCampos],
  deleteCategory
);

module.exports = router;
