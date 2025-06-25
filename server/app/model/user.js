const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    login_id: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other']
    },
    blood_grp: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
    },
    dob: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'admin'],
        default: 'patient',
        required: true
    },
    is_verified: {
        type: Boolean,
        default: false,
        required: true
    }
    });

    const validateUser = (data) => {
        const schema = Joi.object({
            first_name: Joi.string().min(2).max(50).required(),
            last_name: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            gender: Joi.string().valid('male', 'female', 'other'),
            blood_grp: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+','O-'),
            dob: Joi.date().required(),
            role: Joi.string().valid('patient', 'admin'),
        });
    
        return schema.validate(data);
    };

    const User = mongoose.model('User', userSchema);

    module.exports = {User, validateUser};