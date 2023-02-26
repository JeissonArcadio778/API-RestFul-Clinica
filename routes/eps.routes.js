const { Router } = require("express");
const { body,param } = require("express-validator");

const { updateEps, deleteEps, getEps, getEpsById, createEps } = require("../controllers/eps-controller");

const { isEpsValid } = require("../helpers/db-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-role");

const router = Router();

//Get eps - public
router.get("/", [validateFields], getEps);

router.get("/:id", [param("id").custom( (id) => isEpsValid(id)), validateFields], getEpsById);

router.post("/", [validateJWT, body("name", "The name is required").notEmpty(), validateFields], createEps);

router.put("/:id",[validateJWT, param('id').custom((id)=> isEpsValid(id)), body("name", "The name is required").notEmpty(), validateFields], updateEps, updateEps);

router.delete("/:id", [validateJWT, param('id').custom((id)=> isEpsValid(id)), isAdminRole, validateFields], deleteEps);

module.exports = router;
