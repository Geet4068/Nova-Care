const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    patient_email: {
        type: String,
        required: true
    },
    patient_phone: {
        type: String,
        required: true
    },
    patient_blood_grp: {
        type: String,
    },
    doctor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    doctor_phone: {
        type: Number,
    },
    fees: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },

    allergies: {
        type: String
    },
    medicalHistory: {
        type: String
    },
    appointment_day: {
        type: String,
        required: true
    },
    appointment_time_slot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Completed', 'Cancelled', 'Missed', 'Rejected']
    },
    rejection_reason: {
        type: String
    },
    is_cancelled: {
        type: Boolean,
        default: false
    },
    cancellation_reason: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', userSchema);