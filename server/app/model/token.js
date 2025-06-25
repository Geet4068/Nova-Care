const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: () => Date.now() + 2 * 60 * 60 * 1000,
        expires: 0 
    }
});

const TokenModel = new mongoose.model("Token", TokenSchema);
module.exports = TokenModel;