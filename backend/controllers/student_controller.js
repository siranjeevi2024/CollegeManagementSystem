
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

const studentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' });
        }
        else {
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            let result = await student.save();

            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudents = async (req, res) => {
    try {
        let students = await Student.find({ school: req.params.id })
            .populate("sclassName", "sclassName")
            .populate({ path: 'examResult.subName', select: 'subName subCode' });
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate({ path: 'examResult.subName', select: 'subName subCode' })

        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateAllExamResults = async (req, res) => {
    const { examResults } = req.body; // examResults should be an array of { subName, marksObtained, grade }

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        // Clear existing exam results
        student.examResult = [];

        // Add all new exam results
        examResults.forEach(result => {
            student.examResult.push({
                subName: result.subName,
                marksObtained: result.marksObtained,
                grade: result.grade,
                semester: result.semester
            });
        });

        const updatedStudent = await student.save();
        return res.send(updatedStudent);
    } catch (error) {
        res.status(500).json(error);
    }
};

const markAttendance = async (req, res) => {
    const { studentId, date, status } = req.body;

    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        // Check if attendance for this date already exists
        const existingAttendance = student.attendance.find(
            (att) => att.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            student.attendance.push({ date: new Date(date), status });
        }

        const updatedStudent = await student.save();
        return res.send(updatedStudent);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getStudentAttendance = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('attendance name rollNum');

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        res.send(student);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllStudentAttendance = async (req, res) => {
    try {
        const students = await Student.find({ school: req.params.id })
            .select('attendance name rollNum sclassName')
            .populate('sclassName', 'sclassName');

        if (students.length === 0) {
            return res.send({ message: 'No students found' });
        }

        res.send(students);
    } catch (error) {
        res.status(500).json(error);
    }
};




module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    deleteStudentsByClass,
    updateExamResult,
    updateAllExamResults,
    markAttendance,
    getStudentAttendance,
    getAllStudentAttendance,
};
