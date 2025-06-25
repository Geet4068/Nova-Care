const express = require('express');
const AppointmentController = require('../controller/AppointmentController');
const authenticate = require('../middleware/authenticate');
const frontendAuthCheck = require('../middleware/frontendAuthCheck');
const router = express.Router();

router.post('/create-appointment', frontendAuthCheck, AppointmentController.createAppointment);
router.get('/get-appointments', frontendAuthCheck, AppointmentController.getAllAppointments);
router.get('/patient-dashboard/get-personal-appointments', frontendAuthCheck, AppointmentController.getPatientAppointments);
router.get('/doctor-dashboard/get-doctor-appointments', frontendAuthCheck, AppointmentController.getDoctorAppointments);
router.put('/update-appointment-status-completed/:id', frontendAuthCheck, AppointmentController.updateAppointmentStatusCompleted);
router.post('/update-appointment-status-rejected/:id', authenticate, AppointmentController.updateAppointmentStatusRejected);
router.post('/update-appointment-status-cancelled/:id', frontendAuthCheck, AppointmentController.updateAppointmentStatusCencelled);

module.exports = router;