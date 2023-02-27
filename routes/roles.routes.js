const { Router } = require('express'); 

const { getRoles } = require('../controllers/roles-controller');

const router = Router();

router.post("/", getRoles); 

module.exports = router; 