const { Router } = require('express'); 

const { getRoles } = require('../controllers/roles-controller');

const router = Router();

router.get("/", getRoles); 

module.exports = router; 