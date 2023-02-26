const { Router } = require("express");
const { body,param } = require("express-validator");

const { getSpecialty, getSpecialtyById, createSpecialty, updateSpecialty, deleteSpecialty } = require("../controllers/specialty-controller");

const { isSpecialtyValid } = require("../helpers/db-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-role");

const router = Router();

router.get("/", [validateFields], getSpecialty);

router.get("/:id", [param("id").custom( (id) => isSpecialtyValid(id)), validateFields], getSpecialtyById);

router.post("/", [validateJWT, body("name", "The name is required").notEmpty(), validateFields], createSpecialty);

router.put("/:id",[validateJWT, param('id').custom((id)=> isSpecialtyValid(id)), body("name", "The name is required").notEmpty(), validateFields], updateSpecialty);

router.delete("/:id", [validateJWT, param('id').custom((id)=> isSpecialtyValid(id)), isAdminRole, validateFields], deleteSpecialty);

module.exports = router;