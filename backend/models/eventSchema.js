const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    registrationLink: {
        type: String,
        required: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("event", eventSchema)
