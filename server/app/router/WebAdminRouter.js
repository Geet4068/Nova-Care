const express = require('express');
const WebAdminController = require('../controller/WebController');
const authenticate = require('../middleware/authenticate');
const TableController = require('../controller/TableController');
const router = express.Router();

router.get('/admin', authenticate, WebAdminController.adminDashboard);
router.get('/doctors-database', authenticate, TableController.doctorTable);
router.get('/patients-database', authenticate, TableController.patientTable);
router.get('/admins-database', authenticate, TableController.adminTable);
router.get('/login', WebAdminController.loginPage);
router.get('/register', WebAdminController.adminRegisterPage);
router.get('/reset-password', WebAdminController.resetPasswordPage);
router.get('/doctor-details/:id', authenticate, WebAdminController.doctorsDetailsPage);
router.get('/doctor-accept-form/:id', authenticate, WebAdminController.doctorAcceptForm);
router.get('/admin/appointments', authenticate, WebAdminController.appointmentsPage);
router.get('/admin/appointment/:id', authenticate, WebAdminController.appointmentDetailsPage);
router.get('/checking/:id', WebAdminController.checking);


module.exports = router;