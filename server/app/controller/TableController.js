const { Doctor } = require("../model/doctor");
const { User } = require("../model/user");

class TableController {
    async doctorTable(req, res) {
        try {
            // const doctors = await Doctor.aggregate([
            //     {
            //         $lookup: {
            //             from: "specializations", 
            //             localField: "specialization",
            //             foreignField: "_id",
            //             as: "speciality"
            //         }
            //     },
            //     { $unwind: "$speciality" }
            // ]);
            const doctors = await Doctor.find().sort({ createdAt: -1 });
            const approvedDoctors = doctors.filter(doctor => doctor.status === 'approved');
            const pendingDoctors = doctors.filter(doctor => doctor.status === 'pending');
            const rejectedDoctors = doctors.filter(doctor => doctor.status === 'rejected');
            const deletedDoctors = doctors.filter(doctor => doctor.status ==='deleted');
            res.render('tables/doctor-table', { doctors, approvedDoctors, pendingDoctors, rejectedDoctors, deletedDoctors });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async patientTable(req, res) {
        try {
            const patients = await User.find({ role: 'patient' });
            res.render('tables/patient-table', { patients });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async adminTable(req, res) {
        try {
            const admins = await User.find({ role: 'admin' });
            res.render('tables/admin-table', { admins });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}



module.exports = new TableController();