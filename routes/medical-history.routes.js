const { Router } = require("express");
const { body,param } = require("express-validator");

const { getMedicalHistories, getMedicalHistoryById, updateMedicalHistory, deleteMedicalHistory, createMedicalHistory } = require("../controllers/medical-history-controller");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-role");


const router = Router();

router.post('/', [validateJWT, validateFields, isAdminRole], createMedicalHistory); 
router.get('/', getMedicalHistories); 
router.get('/:id', getMedicalHistoryById); 
router.put('/:id', [validateJWT, validateFields, isAdminRole], updateMedicalHistory); 
router.delete('/:id',[validateJWT, validateFields, isAdminRole], deleteMedicalHistory); 
module.exports = router; 
