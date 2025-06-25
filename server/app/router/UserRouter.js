const express = require('express');
const UserController = require('../controller/UserController');
const authenticate = require('../middleware/authenticate');
const frontendAuthCheck = require('../middleware/frontendAuthCheck');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/patient-dashboard-details', frontendAuthCheck, UserController.patientDashboard);
router.put('/edit-patient-details', authenticate, UserController.editPatientDetails);


module.exports = router;