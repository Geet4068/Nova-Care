const { errorCode } = require("../helper/Response");
const sendEmailVerificationOTP = require("../helper/sendVerificationMail");
const { User, validateUser } = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class UserController {

    async register(req, res) {
        try {
            const { first_name, last_name, email, phone, gender, blood_grp, dob, role } = req.body;

            const { error } = validateUser(req.body);
            if (error) {
                console.log("Joi validation error:", error.details);
                return res.status(400).json({ status: 400, message: error.details[0].message });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(errorCode.dataExist).json({ status: errorCode.dataExist, message: 'User with this email already exists' });
            }

            // if (role === 'patient') {
            const pass = first_name + Math.floor(1000 + Math.random() * 9000);
            const login_id = Math.floor(100000 + Math.random() * 900000);
            const dobDate = new Date(dob);
            if (isNaN(dobDate.getTime())) {
                return res.status(400).json({ status: 400, message: 'Invalid date of birth' });
            }
            const patient_age = Math.floor((new Date() - dobDate) / (1000 * 60 * 60 * 24 * 365.25));

            if (patient_age < 0) {
                return res.status(400).json({ status: 400, message: 'Please enter a valid Date of Birth' });
            }

            const patient = new User({ first_name, last_name, email, login_id, password: pass, phone, gender, blood_grp, dob, age: patient_age, role, is_verified: true });
            await patient.save();
            await sendEmailVerificationOTP(req, patient);

            return res.status(errorCode.success).json({ status: errorCode.success, message: 'You have been registered successfully, please check your email for login details' });
            // }

            // return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Invalid role', role: role });

        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during registration"
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Invalid Email' });
            }

            if (user.role === 'patient') {
                if (!email || !password) {
                    return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Please fill in all fields' });
                }
                if (user.password !== password) {
                    return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Incorrect password' });
                }
                const token = jwt.sign({ _id: user._id, username: user.first_name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "50m" });
                return res.status(errorCode.success).json({ status: errorCode.success, message: 'Logged in successfully! :)', user, token });
            }

        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during login"
            });
        }
    }

    async patientDashboard(req, res) {
        try {
            const userId = req.user?._id || res.locals.user?._id || req.app.locals.user?._id;

            const user = await User.findById(userId).select('-password -__v');
            if (!user) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'User not found' });
            }
            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Patient dashboard', data: user });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during patient dashboard"
            });
        }
    }

    async editPatientDetails(req, res) {
        try {
            const { first_name, last_name, phone } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                { first_name, last_name, phone },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(errorCode.dataNotmatch).json({
                    status: errorCode.dataNotmatch,
                    message: 'User not found'
                });
            }

            return res.status(errorCode.success).json({
                status: errorCode.success,
                message: 'Patient details updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({
                status: errorCode.serverError,
                message: "An error occurred during updating patient details"
            });
        }
    }
}

module.exports = new UserController();