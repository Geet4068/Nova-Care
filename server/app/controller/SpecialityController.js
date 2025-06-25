const { errorCode } = require("../helper/Response");
const speciality = require("../model/speciality");

class SpecialityController {
//  async getSpcialityDoctors(req, res) {
//     try {
//         const specialityDocs = await speciality.aggregate([
//             {
//                 $lookup: {
//                     from: "doctors",
//                     localField: "_id",
//                     foreignField: "specialization",
//                     as: "doctors"
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     department: 1,
//                     description: 1,
//                     doctors: {
//                         $map: {
//                             input: "$doctors",
//                             as: "doctor",
//                             in: {
//                                 _id: "$$doctor._id",
//                                 first_name: "$$doctor.first_name",
//                                 last_name: "$$doctor.last_name",
//                                 email: "$$doctor.email",
//                                 phone: "$$doctor.phone",
//                                 gender: "$$doctor.gender",
//                                 expertise: "$$doctor.expertise",
//                                 experience: "$$doctor.experience",
//                                 about: "$$doctor.about",
//                                 status: "$$doctor.status",
//                                 availability: "$$doctor.availability",
//                                 fees: "$$doctor.fees",
//                                 schedules: "$$doctor.schedules"
//                             }
//                         }
//                     },
//                     doctorCount: { $size: "$doctors" }
//                 }
//             }
//         ]);

//         return res.status(errorCode.success).json({ 
//             status: errorCode.success, 
//             message: 'Doctors fetched successfully!', 
//             specialityDocs 
//         });
        
//     } catch (error) {
//         res.status(errorCode.serverError).json({ 
//             status: errorCode.serverError, 
//             message: "An error occurred while fetching doctors", 
//             error: error.message 
//         });
//     }
// }

async getSpcialityDoctors(req, res) {
    try {
        const specialityDocs = await speciality.aggregate([
            {
                $lookup: {
                    from: "doctors",
                    let: { specId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$specialization_id", "$$specId"]
                                },
                                status: "approved" 
                            }
                        },
                        {
                            $project: {
                                password: 0, 
                                __v: 0    
                            }
                        }
                    ],
                    as: "doctors"
                }
            },
            {
                $project: {
                    _id: 1,
                    department: 1,
                    description: 1,
                    doctors: 1,
                    doctorCount: { $size: "$doctors" }
                }
            },
            {
                $sort: { department: 1 } // Sort specialties alphabetically
            }
        ]);

        // Filter out specialties with no doctors
        const filteredSpecialities = specialityDocs.filter(spec => spec.doctorCount > 0);

        return res.status(200).json({ 
            status: 200, 
            message: 'Doctors fetched successfully!', 
            data: filteredSpecialities 
        });
        
    } catch (error) {
        console.error("Error fetching specialty doctors:", error);
        res.status(500).json({ 
            status: 500, 
            message: "An error occurred while fetching doctors", 
            error: error.message 
        });
    }
}

async addSpeciality(req, res) {

    try {

        const { department, description } = req.body;

        if (!department || !description) {
            return res.status(errorCode.dataNotmatch).json({ status: errorCode.dataNotmatch, message: 'Please provide all required fields!' });
        }

            const existingSpecialization = await speciality.findOne({ 
                department: { $regex: new RegExp(`^${department}$`, 'i') } 
            });
            
            if (existingSpecialization) {
                return res.status(errorCode.dataExist).json({ 
                    status: errorCode.dataExist, 
                    message: 'Speciality already exists!' 
                });
            }

        const specialization = new speciality({ department, description });
        await specialization.save();

        return res.status(errorCode.success).json({ status: errorCode.success, message: 'Speciality added successfully!', specialization });

    } catch (error) {
        console.log(error);
        return res.status(errorCode.serverError).json({ status: errorCode.serverError, message: "An error occurred during the varification process", error: error.message });
    }
}

async getAllSpecialties(req, res) {
    try {

        const specialties = await speciality.find();
        if (!specialties || specialties.length === 0) {
            return res.status(errorCode.dataNotmatch).json({ 
                status: errorCode.dataNotmatch, 
                message: 'No specialties found!' 
            });
        }
        return res.status(errorCode.success).json({ 
            status: errorCode.success, 
            message: 'Specialties fetched successfully!', 
            data: specialties 
        });

    }catch(error) {
        res.status(errorCode.serverError).json({ 
            status: errorCode.serverError, 
            message: "An error occurred while fetching specialties", 
            error: error.message 
        });
    }
}

async getSpecialityById(req, res) {
    try {

        const { id } = req.params;
        const specialization = await speciality.findById(id);
        if (!specialization) {
            return res.status(errorCode.dataNotmatch).json({ 
                status: errorCode.dataNotmatch, 
                message: 'Speciality not found!' 
            });
        }
        return res.status(errorCode.success).json({ 
            status: errorCode.success, 
            message: 'Speciality fetched successfully!', 
            data: specialization 
        });

    }catch(error) {
        res.status(errorCode.serverError).json({ 
            status: errorCode.serverError, 
            message: "An error occurred while fetching specialties", 
            error: error.message 
        });
    }
}

}


module.exports = new SpecialityController();