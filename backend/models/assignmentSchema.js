const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true,
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
        submissionDate: {
            type: Date,
        },
        content: {
            type: String,
        },
        grade: {
            type: Number,
        },
        feedback: {
            type: String,
        },
    }],
}, { timestamps: true });

module.exports = mongoose.model('assignment', assignmentSchema);
