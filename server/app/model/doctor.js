const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer not to say'],
    },
    specialization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Specialization',
        required: true
    },
    specialization_name: {
        type: String,
    },
    expertise: {
        type: Array,
    },
    schedules: [
        {
            day: { type: String, required: true },
            time_slots: { type: Array, required: true }
        }
    ],
    about: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending','deleted'],
        default: 'pending',
        required: true
    },
    profile_pic: {
        type: String,
        required: false
    },
    education: [
        {
            year: { type: String, required: true },
            degree: { type: String, required: true },
            university: { type: String, required: true },
            info: { type: String, required: true }
        }
    ],
    reviews: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            user_name: {
                type: String,
                required: true
            },
            review: {
                type: String,
                required: true
            }
        }
    ],
    fees: {
        type: Number
    },
    availability: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


// Joi Validation Schema
const validateDoctor = (doctor) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().required(),
        gender: Joi.string().valid('male', 'female', 'other', 'prefer not to say').required(),
        specialization_id: Joi.string().required(),
        // specialization_id: Joi.string().optional(),
        expertise: Joi.array(),
        availability: Joi.boolean().default(true),
        about: Joi.string().required(),
        experience: Joi.string().required(),
        status: Joi.string().valid('approved', 'rejected', 'pending','deleted').default('pending'),
        education: Joi.array()
            .items(
                Joi.object({
                    year: Joi.string().required(),
                    degree: Joi.string().required(),
                    university: Joi.string().required(),
                    info: Joi.string().required()
                })
            )
            .optional(),
        reviews: Joi.array()
            .items(
                Joi.object({
                    user_id: Joi.string(),
                    user_name: Joi.string(),
                    review: Joi.string()
                })
            )
            .optional(),
        fees: Joi.number(),
        profile_pic: Joi.optional(),
        isDeleted: Joi.boolean().default(false)
    });

    return schema.validate(doctor);
};


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Doctor, validateDoctor };