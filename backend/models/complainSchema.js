const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['student', 'teacher']
    },
    date: {
        type: Date,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    }
});

module.exports = mongoose.model("complain", complainSchema);