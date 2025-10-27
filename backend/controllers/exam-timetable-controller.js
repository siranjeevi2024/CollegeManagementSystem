const ExamTimetable = require('../models/examTimetableSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Admin = require('../models/adminSchema.js');

// Create a single exam timetable entry
const createExamTimetable = async (req, res) => {
    try {
        const { semester, examDate, subject, sclass, teacher, school, examType } = req.body;

        const existing = await ExamTimetable.findOne({
            examDate: new Date(examDate),
            subject,
            sclass,
            school
        });
        if (existing) {
            return res.status(400).json({ message: 'Exam already scheduled for this subject and class on this date' });
        }

        const examTimetable = new ExamTimetable({
            semester,
            examDate,
            subject,
            sclass,
            teacher,
            school,
            examType
        });

        const result = await examTimetable.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exam timetables for a school, optionally filter by class and/or semester
const getExamTimetables = async (req, res) => {
    try {
        const { id } = req.params; // school id
        const { classId, semester } = req.query;

        let filter = { school: id };
        if (classId) {
            filter.sclass = classId;
        }
        if (semester) {
            filter.semester = semester;
        }

        const examTimetables = await ExamTimetable.find(filter)
            .populate('subject', 'subName subCode')
            .populate('sclass', 'sclassName')
            .populate('teacher', 'name')
            .sort({ examDate: 1 });

        res.status(200).json(examTimetables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete exam timetable entries
const deleteExamTimetable = async (req, res) => {
    try {
        const { id } = req.params; // exam timetable id or school id
        const { schoolId } = req.query;

        if (schoolId) {
            await ExamTimetable.deleteMany({ school: schoolId });
            res.status(200).json({ message: 'All exam timetables deleted for school' });
        } else {
            await ExamTimetable.findByIdAndDelete(id);
            res.status(200).json({ message: 'Exam timetable deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createExamTimetable, getExamTimetables, deleteExamTimetable };
