const { errorCode } = require("../helper/Response");
const Appointment = require("../model/appointment");
const { Doctor } = require("../model/doctor");
const { User } = require("../model/user");
const mongoose = require('mongoose');

class WebController {

    async adminDashboard(req, res) {
        try {
            // Get total patients count
            const totalPatients = await User.countDocuments({ role: 'patient' });

            // Get active doctors count (approved and available)
            const activeDoctors = await Doctor.countDocuments({
                status: 'approved',
                availability: true
            });

            // Get pending doctors count
            const pendingDoctors = await Doctor.countDocuments({ status: 'pending' });

            // Get upcoming appointments count
            const upcomingAppointments = await Appointment.countDocuments({ status: 'Pending' });

            // Get doctors count by speciality
            const doctorsBySpeciality = await Doctor.aggregate([
                {
                    $match: {
                        status: 'approved',
                        availability: true
                    }
                },
                {
                    $group: {
                        _id: '$specialization_id',
                        department: { $first: '$specialization_name' },
                        doctorCount: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        doctorCount: { $gt: 0 }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        department: 1,
                        doctorCount: 1
                    }
                }
            ]);

            // Get doctors popularity based on appointments
            const popularity = await Appointment.aggregate([
                {
                    $group: {
                        _id: '$doctor_id',
                        doctorName: { $first: '$doctor_name' },
                        speciality: { $first: '$speciality' },
                        totalAppointments: { $sum: 1 }
                    }
                },
                {
                    $sort: { totalAppointments: -1 }
                },
                {
                    $project: {
                        _id: 1,
                        doctorName: 1,
                        speciality: 1,
                        totalAppointments: 1
                    }
                }
            ]);


            const stats = {
                totalPatients,
                activeDoctors,
                pendingDoctors,
                upcomingAppointments,
                doctorsBySpeciality,
                successMessage: req.flash('success') || [],
                errorMessage: req.flash('error') || [],
                popularity
            };

            return res.render('admin', {
                stats,
                user: req.user || null
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during admin dashboard"
            });
        }
    }

    async loginPage(req, res) {
        try {
            const token = req.cookies?.token;
            if (token) {
                return res.redirect('/admin');
            }

            return res.render('login', {
                user: req.user || null
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during login page"
            });
        }
    }

    async adminRegisterPage(req, res) {
        try {
            return res.render('register', {
                user: req.user || null
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during admin register page"
            });
        }
    }

    async doctorAcceptForm(req, res) {
        try {
            const doctorResult = await Doctor.find({ _id: req.params.id });
            const doctor = doctorResult[0];
            console.log(doctor);


            return res.render('doctor-verification-form', {
                doctor,
                user: req.user || null
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during doctor accept page"
            });
        }
    }

    async resetPasswordPage(req, res) {
        try {
            return res.render('reset-password', {
                user: req.user || null,
                successMessage: req.flash('success') || [],
                errorMessage: req.flash('error') || []
            });
        } catch (error) {
            console.log(error);
            req.flash('error', 'An error occurred during reset password page');
            // return res.status(errorCode.serverError).json({
            //     status: errorCode.serverError,
            //     message: "An error occurred during reset password page"
            // });
        }
    }

    async checking(req, res) {
        try {
            const { id } = req.params
            const doctor = await Doctor.findById(id);
            return res.render('checking', {
                doctor,
                user: req.user || null
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during checking page"
            });
        }
    }

    async appointmentsPage(req, res) {
        try {
            const appointments = await Appointment.find().sort({ createdAt: -1 });

            return res.render('appointments/appointments', {
                appointments,
                user: req.user || null,
                successMessage: req.flash('success') || [],
                errorMessage: req.flash('error') || []
            });
        } catch (error) {
            console.log(error);
            req.flash('error', 'An error occurred while fetching appointments');
            res.redirect('/admin');
        }
    }

    async appointmentDetailsPage(req, res) {
        try {
            const appointment = await Appointment.findById(req.params.id);
            return res.render('appointments/appointment-details', {
                appointment,
                user: req.user || null,
                successMessage: req.flash('success') || [],
                errorMessage: req.flash('error') || []
            });
        } catch (error) {
            console.log(error);
            req.flash('error', 'An error occurred while fetching appointment details');
        }
    }

    async doctorsDetailsPage(req, res) {
        try {
            const doctor = await Doctor.findById(req.params.id);
            return res.render('tables/doctor-details', {
                doctor,
                user: req.user || null,
                successMessage: req.flash('success') || [],
                errorMessage: req.flash('error') || []
            });

        } catch (error) {
            console.log(error);
            req.flash('error', 'An error occurred while fetching doctors details');
        }
    }
}


module.exports = new WebController();