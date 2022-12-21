const { Router } = require('express'); 
const { body, param } = require("express-validator");
const { search } = require('../controllers/search-controller');


const router = Router();

router.get('/:collection/:param', search); 

module.exports = router; 