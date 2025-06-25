const { errorCode } = require("../helper/Response");
const TokenModel = require("../model/token");
const { User, validateUser } = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const adminVerificationEmail = require("../helper/adminVerificationMail");
const { Doctor } = require("../model/doctor");
const sendDoctorAprovedMail = require("../helper/doctorAprovedMail");
const Speciality = require("../model/speciality");
const sendDoctorFeesScheduleUpdateMail = require("../helper/doctorFeesScheduleUpdateMail");
const sendDoctorRejectionMail = require("../helper/doctorRejectionMail");
class AdminController {

    async adminLogin(req, res) {
        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                req.flash('error', 'User not found');
                return res.redirect('/login');
            }

            if (user.role === 'admin') {
                if (user.is_verified === false) {

                    req.flash('error', 'You are not a verified admin, please try again later or check your email');
                    res.redirect('/login');
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);


                if (isPasswordValid === false) {
                    req.flash('error', 'Incorrect password');
                    res.redirect('/login');
                }
                const token = jwt.sign({ _id: user._id, username: user.first_name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

                res.cookie('admin-token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000, 
                    domain: 'localhost',  
                    path: '/',    
                    sameSite: 'strict' 
                });
                req.flash('success', "Admin logged in successfully");
                res.redirect('/admin');
            }
            res.redirect('/login');


        } catch (error) {
            console.log(error);
            req.flash('An error occurred during admin dashboard');
            // return res.status(errorCode.serverError).json({
            //     status: errorCode.serverError,
            //     message: "An error occurred during admin dashboard",
            //     error: error.message
            // });
        }
    }

    async admins(req, res) {
        try {
            const admins = await User.find({ role: 'admin' });

            if (admins.length === 0) {
                return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'No admins found' });
            }

            return res.status(errorCode.success).json({ status: errorCode.success, message: 'Admins fetched successfully!', admins });
        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the varification process" });
        }
    }

    // async adminVerifyDoctors(req, res) {
    //     try {
    //         const { id } = req.params;
    //         let { fees, schedules } = req.body;


    //         if (!fees || !schedules) {
    //             console.log("Schedules and fees are required", schedules, fees);
    //             req.flash('error', "Schedules and fees are required");
    //             return res.redirect('/doctor-accept-form/' + id);
    //             // return res.status(errorCode.requiredError).json({ message: "Schedules and fees are required" });
    //         }

    //         // if (typeof time_slots === "string") {
    //         //     schedules = JSON.parse(schedules);
    //         // }

    //         const doctor = await Doctor.findById(id);
    //         if (!doctor) {
    //             // return res.status(errorCode.dataNotmatch).json({ message: "Doctor not found" });
    //             req.flash('error', "Doctor not found");
    //         }


    //         doctor.status = "approved";
    //         doctor.availability = true;
    //         doctor.fees = fees;
    //         doctor.schedules = schedules;

    //         await doctor.save();

    //         await sendDoctorAprovedMail(req, doctor);

    //         // return res.status(errorCode.success).json({ message: "Doctor approved successfully and mail sent", doctor });
    //         req.flash('success', "Doctor approved successfully and mail sent");
    //         res.render('verificationMessage/verification-success');

    //     } catch (error) {
    //         console.log(error);
    //         // return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the Doctor verification process" });
    //         req.flash('error', "An error occurred during the Doctor verification process");
    //     }
    // }

    async adminVerifyDoctors(req, res) {
        try {
            const { id } = req.params;
            const { fees, schedules } = req.body;

            if (!fees || !schedules) {
                req.flash('error', "Schedules and fees are required");
                return res.redirect('/doctor-accept-form/' + id);
            }

            let schedulesArray = Array.isArray(schedules) ? schedules : Object.values(schedules);


            const processedSchedules = schedulesArray.map(schedule => ({
                day: schedule.day,
                time_slots: schedule.time_slots
            }));

            const doctor = await Doctor.findById(id);
            if (!doctor) {
                req.flash('error', "Doctor not found");
                return res.redirect('/doctor-accept-form/' + id);
            }

            doctor.status = "approved";
            doctor.availability = true;
            doctor.fees = fees;
            doctor.schedules = processedSchedules;

            await doctor.save();

            await sendDoctorAprovedMail(req, doctor);

            req.flash('success', "Doctor approved successfully and mail sent");
            res.render('verificationMessage/verification-success');

        } catch (error) {
            console.log(error);
            req.flash('error', "An error occurred during the Doctor verification process");
            return res.redirect('/doctor-accept-form/' + req.params.id);
        }
    }

    async adminRejectDoctors(req, res) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                // return res.status(errorCode.dataNotmatch).json({ message: "Doctor not found" });
                req.flash('error', "Doctor not found");
            }

            doctor.status = "rejected";

            await doctor.save();

            await sendDoctorRejectionMail(req, doctor);

            // return res.status(errorCode.success).json({ message: "Doctor rejected!", doctor });
            // req.flash('success', "Doctor rejected!");
            res.render('verificationMessage/rejection-successfull');
        } catch (error) {
            console.log(error);
            // return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the Doctor rejection process", error: error.message });
            req.flash('error', "An error occurred during the Doctor rejection process");
        }
    }

    async updateDoctorFeesAndSchedule(req, res) {
        try {
            const { id } = req.params;
            const { schedules, fees } = req.body;

            // Check if at least one field is provided
            if (!schedules && !fees) {
                req.flash('error', "Please provide either fees or schedules to update");
            }

            const doctor = await Doctor.findById(id);
            if (!doctor) {
                // return res.status(errorCode.dataNotmatch).json({ message: "Doctor not found" });
                req.flash('error', "Doctor not found");
                return res.redirect('/doctors-database');
            }


            if (fees) {
                doctor.fees = fees;
            }

            if (schedules) {
                doctor.schedules = schedules;
            }

            await doctor.save();

            await sendDoctorFeesScheduleUpdateMail(req, doctor);

            req.flash('success', "Doctor's fees or schedule updated successfully and Mail sent");
            // return res.status(errorCode.success).json({ message: "Doctor's fees or schedule updated successfully and Mail sent", doctor });

        } catch (error) {
            console.log(error);
            return res.status(errorCode.serverError).json({ message: "An error occurred while updating the doctor", error: error.message });
        }
    }

    async adminRegister(req, res) {
        try {
            const { first_name, last_name, email, password, phone } = req.body;

            const { error } = validateUser(req.body);
            if (error) {
                req.flash('error', error.details[0].message);
                // return res.status(errorCode.requiredError).json({ message: error.details[0].message });
            }

            // if (error) return res.status(400).json({ message: error.details[0].message });

            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new User({ first_name, last_name, email, password: hashedPassword, phone, role: 'admin', is_verified: false });
            await admin.save();

            const token = new TokenModel({
                _userId: admin._id,
                token: crypto.randomBytes(16).toString("hex")
            });

            await token.save();

            await adminVerificationEmail(req, admin, token.token);
            req.flash('success', "You have been registered as Admin, but not verified yet. Please check your email for verification");
            // return res.status(errorCode.success).json({ status: errorCode.success, message: 'You have been registered as Admin, but not verified yet. Please check your email for verification' });
            res.redirect('/login');

        } catch (error) {
            console.log(error);
            req.flash('error', "An error occurred during the registration process");
            // return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the registration process", error: error.message });
        }
    }

    async verification(req, res) {
        try {
            const { token } = req.params;
            const tokenDoc = await TokenModel.findOne({ token });
            if (!tokenDoc) {
                req.flash('error', "Invalid or expired token");
                // return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Invalid or expired token' });
            }
            const admin = await User.findOne({ _id: tokenDoc._userId });
            if (!admin) {
                req.flash('error', "Admin not found");
                // return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Admin not found' });
            }
            admin.is_verified = true;
            await admin.save();
            await TokenModel.deleteOne({ _id: tokenDoc._id });

            req.flash('success', "Admin verified successfully!");
            // return res.status(errorCode.success).json({ status: errorCode.success, message: 'Admin verified successfully!', admin });
        } catch (error) {
            console.log(error);
            req.flash('error', "An error occurred during the varification process");
            // return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the varification process", error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {

            const { email, old_password, new_password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                // return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'User not found! - The email you entered is incorrect, please try again' });
                req.flash('error', 'User not found! - The email you entered is incorrect, please try again');
                return res.redirect('/reset-password');
            }

            if (user.role !== 'admin') {
                // return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'You are not an admin, please check your email again' });
                req.flash('error', 'You are not an admin, please check your email again');
                return res.redirect('/reset-password');
            }

            const isPasswordValid = await bcrypt.compare(old_password, user.password);
            if (!isPasswordValid) {
                // return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Incorrect password! - The password you entered is incorrect, please try again' });
                req.flash('error', 'Incorrect password! - The password you entered is incorrect, please try again');
                return res.redirect('/reset-password');
            }
            const newHashedPassword = await bcrypt.hash(new_password, 10);
            user.password = newHashedPassword;
            await user.save();

            // return res.status(errorCode.success).json({ status: errorCode.success, message: 'Password reset successful! :D' });
            req.flash('success', 'Password reset successful! :D');
            res.clearCookie('token');
            res.redirect('/login');

        } catch (error) {
            console.log(error);
            // return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the password reset process" });
            req.flash('error', "An error occurred during the password reset process");

        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('admin-token');
            req.flash('success', "Admin logged out successfully");
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            req.flash('error', "An error occurred during the logout process");
        }
    }

    async deleteDoctor(req, res) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                req.flash('error', "Doctor not found");
                return res.redirect('/doctors-database');
            }
            doctor.status = 'deleted';
            doctor.isDeleted = true;
            doctor.availability = false;
            await doctor.save();
            req.flash('success', "Doctor deleted successfully");
            return res.redirect('/doctors-database');
        } catch (error) {
            console.log(error);
            req.flash('error', "An error occurred during the delete process");
            return res.redirect('/doctors-database');
        }
    }

    async deactivateDoctor(req, res) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                req.flash('error', "Doctor not found");
                return res.redirect('/doctor-details/' + id);
            }

            doctor.availability = !doctor.availability;
            await doctor.save();
            
            req.flash('success', doctor.availability ? "Doctor activated successfully" : "Doctor deactivated successfully");
            return res.redirect('back');
            
        } catch (error) {
            console.log(error);
            req.flash('error', "An error occurred during the activation/deactivation process");
            return res.redirect('/doctors-database');
        }
    }
}

module.exports = new AdminController();