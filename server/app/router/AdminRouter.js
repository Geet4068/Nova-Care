const express = require('express');
const AdminController = require('../controller/AdminController');
const SpecialityController = require('../controller/SpecialityController');
const router = express.Router();

router.post('/admin-login', AdminController.adminLogin)
router.get('/admins', AdminController.admins);
router.post('/admin-register', AdminController.adminRegister);
router.post('/reset-password', AdminController.resetPassword);
router.post('/admin-verify-doctors/:id', AdminController.adminVerifyDoctors);
router.get('/admin-reject-doctors/:id', AdminController.adminRejectDoctors);
router.get('/delete-doctor/:id', AdminController.deleteDoctor);
router.get('/activate-deactivate-doctor/:id', AdminController.deactivateDoctor);
router.post('/update-doctor-fees-and-schedule/:id', AdminController.updateDoctorFeesAndSchedule);
router.post('/add-speciality', SpecialityController.addSpeciality);
router.get('/logout', AdminController.logout);

module.exports = router;