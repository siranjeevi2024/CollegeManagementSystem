const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList, deleteComplain } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const { eventCreate, eventList, deleteEvents, deleteEvent, updateEvent } = require('../controllers/event-controller.js');
const {
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
    getAllStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeachersByClass, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');
const { createTimetable, getTimetables, generateAutomaticTimetable, deleteTimetable } = require('../controllers/timetable-controller.js');
const { createExamTimetable, getExamTimetables, deleteExamTimetable } = require('../controllers/exam-timetable-controller.js');
const { createAssignment, getAssignmentsByTeacher, getAssignmentsByStudent, submitAssignment, gradeAssignment, getAssignmentDetails, deleteAssignment } = require('../controllers/assignment-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)
router.put('/UpdateAllExamResults/:id', updateAllExamResults)

router.post('/MarkAttendance', markAttendance)
router.get('/StudentAttendance/:id', getStudentAttendance)
router.get('/AllStudentAttendance/:id', getAllStudentAttendance)



// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/TeachersClass/:id", getTeachersByClass)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Event

router.post('/EventCreate', eventCreate);

router.get('/EventList/:id', eventList);

router.delete("/Events/:id", deleteEvents)
router.delete("/Event/:id", deleteEvent)

router.put("/Event/:id", updateEvent)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

router.delete("/Complain/:id", deleteComplain)

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

// Timetable

router.post('/TimetableCreate', createTimetable);

router.get('/Timetables/:id', getTimetables);

router.post('/GenerateTimetable/:id', generateAutomaticTimetable);

router.delete("/Timetable/:id", deleteTimetable)

// Exam Timetable

router.post('/ExamTimetableCreate', createExamTimetable);

router.get('/ExamTimetables/:id', getExamTimetables);

router.delete("/ExamTimetable/:id", deleteExamTimetable)

// Assignment

router.post('/AssignmentCreate', createAssignment);

router.get('/AssignmentsTeacher/:id', getAssignmentsByTeacher);
router.get('/AssignmentsStudent/:id', getAssignmentsByStudent);
router.get('/Assignment/:id', getAssignmentDetails);

router.post('/SubmitAssignment', submitAssignment);
router.put('/GradeAssignment', gradeAssignment);
router.delete('/Assignment/:id', deleteAssignment);

module.exports = router;
