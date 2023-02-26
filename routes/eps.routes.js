const { Router } = require("express");
const { body,param } = require("express-validator");

const { updateEps, deleteEps } = require("../controllers/eps-controller");
const { getMedicalHistories, createMedicalHistory } = require("../controllers/medical-history-controller");

const { isEpsValid } = require("../helpers/db-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-role");

const router = Router();

//Get eps - public
router.get("/", [validateFields]);

router.get("/:id", [param("id", "No es un ID válido").isMongoId(), validateFields], getMedicalHistories);

router.post("/", [validateJWT, body("name", "The name is required").notEmpty(), validateFields], createMedicalHistory
);

router.put("/:id",[validateJWT, param("id", "No es un ID válido").isMongoId(), param('id').custom((id)=> isEpsValid(id)), body('name', 'The name is requied').notEmpty(), validateFields], updateEps
);

router.delete("/:id", [validateJWT, param("id", "No es un ID válido").isMongoId(), isAdminRole, validateFields], deleteEps);

module.exports = router;
