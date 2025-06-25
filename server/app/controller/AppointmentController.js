const { errorCode } = require("../helper/Response");
const Appointment = require("../model/appointment");
const { User } = require("../model/user");
const { Doctor } = require("../model/doctor");
const Specialization = require("../model/speciality");

class AppointmentController {

    async createAppointment(req, res) {
        try {
            console.log(req.user);
            const user_id = req.user._id;
            // const user_id = '67e6e36ecf443c87c8014e23';

            const {
                doctor_id,
                speciality,
                reason,
                allergies,
                medicalHistory,
                appointment_day,
                appointment_time_slot
            } = req.body;

            if (!doctor_id || !speciality || !reason || !appointment_day || !appointment_time_slot) {
                return res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Please fill all the required fields"
                });
            }

            const patient = await User.findById(user_id);
            if (!patient) {
                return res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Patient not found"
                });
            }

            const doctor = await Doctor.findById(doctor_id);
            if (!doctor) {
                return res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Doctor not found"
                });
            }

            const speciality_name = await Specialization.findById(speciality);
            if (!speciality_name) {
                return res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Speciality not found"
                });
            }

            const appointmentExists = await Appointment.findOne({
                doctor_id,
                appointment_day,
                appointment_time_slot
            });
            if (appointmentExists) {
                return res.status(errorCode.dataExist).json({
                    status: errorCode.dataExist,
                    message: "This time slot is already booked"
                });
            }

            const appointment = await Appointment.create({
                patient_id: user_id,
                doctor_id,
                patient_name: `${patient.first_name} ${patient.last_name}`,
                patient_email: patient.email,
                patient_phone: patient.phone,
                patient_blood_grp: patient.blood_grp,
                doctor_name: `${doctor.first_name} ${doctor.last_name}`,
                doctor_phone: doctor.phone,
                fees: doctor.fees,
                speciality: speciality_name.department,
                reason,
                allergies,
                medicalHistory,
                appointment_day,
                appointment_time_slot
            });

            return res.status(errorCode.success).json({
                status: errorCode.success,
                message: "Appointment created successfully",
                data: appointment
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "Error creating appointment",
                error: error.message
            });
        }
    }

    async getAllAppointments(req, res) {
        try {
            const appointments = await Appointment.find({ patient_id: req.user._id });
            return res.status(errorCode.success).json({
                status: errorCode.success,
                message: "Appointments fetched successfully",
                data: appointments
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "Error fetching appointments",
                error: error.message
            });
        }
    }

    async getPatientAppointments(req, res) {
        try {
            const appointments = await Appointment.find({ patient_id: req.user._id });
            return res.status(errorCode.success).json({
                status: errorCode.success,
                message: "Appointments fetched successfully",
                data: appointments
            });

        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "Error fetching appointments",
                error: error.message
            });
        }
    }

    async getDoctorAppointments(req, res) {
        try {
            const appointments = await Appointment.find({ doctor_id: req.user });
            return res.status(errorCode.success).json({
                status: errorCode.success,
                message: "Appointments fetched successfully",
                data: appointments
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "Error fetching appointments",
                error: error.message
            });
        }
    }

    async updateAppointmentStatusCompleted(req, res) {
        try {
            const appointment = await Appointment.findById(req.params.id);
            if (!appointment) {
                res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Appointment not found"
                });
                return;
            }
            appointment.status = 'Completed';
            await appointment.save();

            res.status(errorCode.success).json({
                status: errorCode.success,
                message: "Appointment status updated to completed",
                appointment
            });
        } catch (error) {
            console.log(error);
            res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "Error updating appointment status",
                error: error.message
            });
        }
    }

    async updateAppointmentStatusRejected(req, res) {
        try {
            const { rejection_reason } = req.body;
            if (!rejection_reason) {
                req.flash('error', 'Please provide a reason for rejection');
            }
            const appointment = await Appointment.findById(req.params.id);
            if (!appointment) {
                req.flash('error', 'Appointment not found');
                return res.redirect('/admin/appointments');
            }
            appointment.status = 'Rejected';
            appointment.rejection_reason = rejection_reason;
            await appointment.save();

            req.flash('success', 'Appointment status updated to rejected');
            return res.redirect('/admin/appointments');
        } catch (error) {
            req.flash('error', 'Error updating appointment status');
            return res.redirect('/admin/appointments');
        }
    }

    async updateAppointmentStatusCencelled(req, res) {
        try {
            const { reason } = req.body;
            if (!reason) {
                res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Please provide a reason for cancellation"
                });
                return;
            }

            const appointment = await Appointment.findById(req.params.id);
            if (!appointment) {
                res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: "Appointment not found"
                });
                return;
            }
            appointment.status = 'Cancelled';
            appointment.is_cancelled = true;
            appointment.cancellation_reason = reason;
            await appointment.save();

            res.status(errorCode.success).json({
                status: errorCode.success,
                message: "Appointment status updated to cancelled",
                appointment
            });
        } catch (error) {

            res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "Error updating appointment status",
                error: error.message
            });

        }
    }
}

module.exports = new AppointmentController();