const sendDoctorConfirmationEmail = require("../helper/doctorConfirmationMail");
const { errorCode } = require("../helper/Response");
const { Doctor, validateDoctor } = require("../model/doctor");
const speciality = require("../model/speciality");
const bcrypt = require('bcryptjs');
const { User } = require("../model/user");
const Appointment = require("../model/appointment");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');

class DoctorController {

    async getDoctors(req, res) {
        try {
            const doctors = await Doctor.find().select('-password');

            return res.status(errorCode.success).json({
                status: errorCode.success,
                message: 'Doctors fetched successfully',
                data: doctors
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred while fetching doctors",
                error: error.message
            });
        }
    }

    async getDoctorsById(req, res) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.findById(id).select('-password');
            if (!doctor) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Doctor not found' });
            }
            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Doctor fetched successfully', data: doctor });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred while fetching doctor", error: error.message });
        }
    }

    async getDoctorDashboardDetails(req, res) {
        try {
            const userId = req.user?._id || res.locals.user?._id || req.app.locals.user?._id;
            // console.log(userId);
            if (!userId) {
                console.error('User not found');
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'User not found' });
            }
            const doctor = await Doctor.findById(userId).select('-password -__v');
            if (!doctor) {
                console.log('Doctor not found');
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Doctor not found' });
            }
            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Doctor fetched successfully', data: doctor });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred while fetching doctor", error: error.message });
        }
    }

    async getDoctorAppointments(req, res) {
        try {
            // console.log(req.user);
            const doctorId = req.user._id;

            const appointments = await Appointment.aggregate([
                {
                    $match: {
                        doctor_id: new mongoose.Types.ObjectId(doctorId),
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "patientDetails"
                    }
                },
                {
                    $unwind: "$patientDetails"
                },
                {
                    $project: {
                        _id: 1,
                        appointmentDate: 1,
                        status: 1,
                        timeSlot: 1,
                        symptoms: 1,
                        diagnosis: 1,
                        prescription: 1,
                        fees: 1,
                        createdAt: 1,
                        "patientDetails.first_name": 1,
                        "patientDetails.last_name": 1,
                        "patientDetails.email": 1,
                        "patientDetails.phone": 1,
                        "patientDetails.gender": 1
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $group: {
                        _id: "$status",
                        appointments: { $push: "$$ROOT" }
                    }
                }
            ]);

            // Get doctor's profile
            const doctorProfile = await Doctor.findById(doctorId).populate('specialization');

            const dashboardData = {
                doctor: doctorProfile,
                appointments: {
                    upcoming: appointments.find(a => a._id === 'pending')?.appointments || [],
                    completed: appointments.find(a => a._id === 'completed')?.appointments || []
                }
            };

            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Doctor appointments fetched successfully', dashboardData });

        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred while fetching doctor's dashboard",
                error: error.message
            });
        }
    }

    async registerDoctor(req, res) {
        try {

            if (req.file) {
                req.body.profile_pic = req.file.path;
            }
            const { error } = validateDoctor(req.body);
            if (error) {
                if (req.file) fs.unlinkSync(req.file.path);
                return res.status(errorCode.requiredError).json({ message: error.details[0].message });
            }

            const { first_name, last_name, email, password, phone, gender, expertise, about, specialization_id, experience, education } = req.body;

            const specialityExists = await speciality.findById(specialization_id);
            if (!specialityExists) {
                return res.status(errorCode.dataNotmatch).json({ message: "Invalid Specialization" });
            }

            const specialization_name = specialityExists.department;

            const existingDoctor = await Doctor.findOne({ email });
            if (existingDoctor) {
                if (existingDoctor.status === 'pending') {
                    return res.status(errorCode.dataExist).json({ status: errorCode.dataExist, message: 'Doctor with this email is already pending approval' });
                }
                if (existingDoctor.status === 'approved') {
                    return res.status(errorCode.dataExist).json({ status: errorCode.dataExist, message: 'Doctor with this email already exists' });
                }
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const doctor = new Doctor({
                first_name,
                last_name,
                email,
                password: hashPassword,
                phone,
                gender,
                specialization_id,
                specialization_name,
                expertise,
                about,
                experience,
                education,
                profile_pic: req.body.profile_pic,
            });


            await doctor.save();

            await sendDoctorConfirmationEmail(req, doctor);

            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Doctor registered, Please check your email for Approval', doctor });

        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred while registering doctor", error: error.message });
        }
    }

    async loginDoctor(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Email and password are required' });
            }

            const doctor = await Doctor.findOne({ email });
            if (!doctor) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Invalid email' });
            }

            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Incorrect password' });
            }

            if (doctor.status === 'pending') {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Your account is pending approval, please wait for approval' });
            }
            if (doctor.status === 'rejected') {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'You is not eligible to login :(' });
            }

            const token = jwt.sign({ _id: doctor._id }, process.env.JWT_SECRET);
            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Logged in successfully', doctor, token });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during login", error: error.message });
        }
    }

    async updateDoctorProfilePic(req, res) {
        try {
            const doctorId = req.user?._id || res.locals.user?._id || req.app.locals.user?._id;
            // console.log(doctorId);
            if (!req.file) {
                return res.status(400).json({
                    status: 400,
                    message: "No profile picture uploaded"
                });
            }

            const doctor = await Doctor.findById(doctorId);
            if (!doctor) {
                return res.status(404).json({
                    status: 404,
                    message: "Doctor not found"
                });
            }

            // Update the profile picture
            doctor.profile_pic = req.file.path;
            await doctor.save();

            return res.status(200).json({
                status: 200,
                message: "Doctor profile picture updated successfully",
                data: doctor
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "An error occurred while updating doctor profile picture",
                error: error.message
            });
        }
    }

    async updateDoctorProfileDetails(req, res) {
        try {
            const doctorId = req.user?._id || res.locals.user?._id || req.app.locals.user?._id;
    
            if (!doctorId) {
                return res.status(400).json({
                    status: 400,
                    message: "Doctor ID is missing or invalid"
                });
            }
    
            // Only include fields that are defined (prevents overwriting with undefined/null)
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'phone',
                'gender',
                'expertise',
                'about',
                'experience'
            ];
    
            const updateData = {};
            for (let field of allowedFields) {
                if (req.body[field] !== undefined && req.body[field] !== null) {
                    updateData[field] = req.body[field];
                }
            }
    
            const updatedDoctor = await Doctor.findByIdAndUpdate(
                doctorId,
                { $set: updateData },
                { new: true, runValidators: true }
            );
    
            if (!updatedDoctor) {
                return res.status(404).json({
                    status: 404,
                    message: "Doctor not found"
                });
            }
    
            return res.status(200).json({
                status: 200,
                message: "Doctor profile updated successfully",
                data: updatedDoctor
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "An error occurred while updating doctor profile",
                error: error.message
            });
        }
    }
    

}


module.exports = new DoctorController();