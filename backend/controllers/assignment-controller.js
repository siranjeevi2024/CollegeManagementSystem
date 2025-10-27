const Assignment = require('../models/assignmentSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');

// Create Assignment
const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate, subject, sclass, teacher } = req.body;
        console.log('Creating assignment with data:', { title, description, dueDate, subject, sclass, teacher });

        const newAssignment = new Assignment({
            title,
            description,
            dueDate,
            subject,
            teacher,
            sclass,
        });

        const savedAssignment = await newAssignment.save();
        console.log('Assignment saved:', savedAssignment);
        const populatedAssignment = await Assignment.findById(savedAssignment._id).populate('subject').populate('sclass');
        res.status(201).json(populatedAssignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Assignments for Teacher
const getAssignmentsByTeacher = async (req, res) => {
    try {
        const teacher = req.params.id;
        console.log('Fetching assignments for teacher:', teacher);
        const assignments = await Assignment.find({ teacher }).populate('subject').populate('sclass');
        console.log('Assignments found:', assignments);
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments for teacher:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Assignments for Student
const getAssignmentsByStudent = async (req, res) => {
    try {
        const student = req.params.id;
        const studentData = await Student.findById(student).populate('sclassName');
        const assignments = await Assignment.find({ sclass: studentData.sclassName._id }).populate('subject').populate('teacher');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit Assignment
const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, content, studentId } = req.body;
        const student = studentId;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        const existingSubmission = assignment.submissions.find(sub => sub.student.toString() === student.toString());
        if (existingSubmission) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        assignment.submissions.push({
            student,
            submissionDate: new Date(),
            content,
        });

        await assignment.save();
        res.status(200).json({ message: 'Assignment submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Grade Assignment
const gradeAssignment = async (req, res) => {
    try {
        const { assignmentId, studentId, grade, feedback } = req.body;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        const submission = assignment.submissions.find(sub => sub.student.toString() === studentId);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        submission.grade = grade;
        submission.feedback = feedback;

        await assignment.save();
        res.status(200).json({ message: 'Assignment graded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Assignment Details
const getAssignmentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findById(id).populate('subject').populate('teacher').populate('sclass').populate('submissions.student');
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Assignment
const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findByIdAndDelete(id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAssignment,
    getAssignmentsByTeacher,
    getAssignmentsByStudent,
    submitAssignment,
    gradeAssignment,
    getAssignmentDetails,
    deleteAssignment,
};
