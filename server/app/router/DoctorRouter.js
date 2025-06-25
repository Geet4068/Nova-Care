const express = require('express');
const DoctorController = require('../controller/DoctorController');
const doctorPic = require('../helper/docProfilePics');
const SpecialityController = require('../controller/SpecialityController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/doctors', DoctorController.getDoctors);
router.get('/doctor-by-id/:id', DoctorController.getDoctorsById);
router.get('/doctor-dashboard-details', DoctorController.getDoctorDashboardDetails);
router.post('/doctor-register',doctorPic.single('profile_pic'), DoctorController.registerDoctor);

// router.post('/doctor-register', (req, res) => {
//   doctorPic.single('profile_pic')(req, res, async (err) => {
//     if (err) {
//       console.error("Upload error:", err.message);
//       return res.status(400).json({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     try {
//       // Proceed with registration
//       req.body.profile_pic = req.file.path;
//       await DoctorController.registerDoctor(req, res);
//     } catch (error) {
//       if (req.file) fs.unlinkSync(req.file.path);
//       res.status(500).json({ error: error.message });
//     }
//   });
// });
router.post('/doctor-login', DoctorController.loginDoctor);
router.post('/change-doctor-profile-pic', doctorPic.single('profile_pic'), DoctorController.updateDoctorProfilePic);
router.post('/update-doctor-profile-details', DoctorController.updateDoctorProfileDetails);
router.get('/get-speciality-doctors', SpecialityController.getSpcialityDoctors);
router.get('/all-specialities', SpecialityController.getAllSpecialties);
router.get('/doctor-appointments', authenticate, DoctorController.getDoctorAppointments);


module.exports = router;