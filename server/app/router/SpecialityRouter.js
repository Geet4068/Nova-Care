const express = require('express');
const SpecialityController = require('../controller/SpecialityController');
const router = express.Router();

//Get Speciality by Id 
router.get('/get-speciality-by-id/:id', SpecialityController.getSpecialityById);


module.exports = router;