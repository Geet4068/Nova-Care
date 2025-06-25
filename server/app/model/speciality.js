const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specializationSchema = new Schema({
    department : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    }
    });

module.exports = mongoose.model('Specialization', specializationSchema);
