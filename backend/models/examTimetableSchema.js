const mongoose = require("mongoose");

const examTimetableSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true,
    },
    examDate: {
        type: Date,
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    examType: {
        type: String,
        enum: ['Mid-term', 'Final', 'Quiz', 'Assignment'],
        default: 'Final'
    }
}, { timestamps: true });

module.exports = mongoose.model("examTimetable", examTimetableSchema);
