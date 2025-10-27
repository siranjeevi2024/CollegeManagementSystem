const Timetable = require('../models/timetableSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Admin = require('../models/adminSchema.js');

// Create a single timetable entry
const createTimetable = async (req, res) => {
    try {
        const { day, timeSlot, subject, sclass, teacher, school } = req.body;

        const existing = await Timetable.findOne({ day, timeSlot, sclass, school });
        if (existing) {
            return res.status(400).json({ message: 'Time slot already occupied for this class' });
        }

        const timetable = new Timetable({
            day,
            timeSlot,
            subject,
            sclass,
            teacher,
            school
        });

        const result = await timetable.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get timetables for a school, optionally filter by class and/or teacher
const getTimetables = async (req, res) => {
    try {
        const { id } = req.params; // school id
        const { classId, teacherId } = req.query;

        let filter = { school: id };
        if (classId) {
            filter.sclass = classId;
        }
        if (teacherId) {
            filter.teacher = teacherId;
        }

        const timetables = await Timetable.find(filter)
            .populate('subject', 'subName subCode')
            .populate('sclass', 'sclassName')
            .populate('teacher', 'name')
            .sort({ day: 1, timeSlot: 1 });

        res.status(200).json(timetables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate automatic timetable
const generateAutomaticTimetable = async (req, res) => {
    try {
        const { id } = req.params; // school id

        // Delete existing timetables for the school
        await Timetable.deleteMany({ school: id });

        // Get all subjects for the school
        const subjects = await Subject.find({ school: id }).populate('teacher').populate('sclassName');
        console.log('Subjects found:', subjects);

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = ['9-10 AM', '10-11 AM', '11-12 PM', '1-2 PM', '2-3 PM', '3-4 PM'];

        let schedule = {};

        // Initialize schedule
        days.forEach(day => {
            schedule[day] = {};
            timeSlots.forEach(slot => {
                schedule[day][slot] = { teacher: null, sclass: null };
            });
        });

        // Group subjects by class
        let subjectsByClass = {};
        subjects.forEach(sub => {
            if (sub.teacher) {
                const classId = sub.sclassName._id.toString();
                if (!subjectsByClass[classId]) {
                    subjectsByClass[classId] = [];
                }
                const sessions = parseInt(sub.sessions) || 1;
                for (let i = 0; i < sessions; i++) {
                    subjectsByClass[classId].push({
                        subject: sub._id,
                        teacher: sub.teacher,
                        sclass: sub.sclassName,
                        name: sub.subName
                    });
                }
            }
        });

        // For each class, fill all slots with random subjects from its list, allowing repeats, and save
        let allTimetables = [];
        for (let classId in subjectsByClass) {
            const classSubjects = subjectsByClass[classId];
            if (classSubjects.length > 0) {
                // Reset schedule for each class
                days.forEach(day => {
                    schedule[day] = {};
                    timeSlots.forEach(slot => {
                        schedule[day][slot] = { teacher: null, sclass: null };
                    });
                });

                for (let day of days) {
                    for (let slot of timeSlots) {
                        const randomSubj = classSubjects[Math.floor(Math.random() * classSubjects.length)];
                        schedule[day][slot] = { teacher: randomSubj.teacher, sclass: randomSubj.sclass, subject: randomSubj.subject };
                    }
                }

                // Collect timetables for this class
                for (let day of days) {
                    for (let slot of timeSlots) {
                        if (schedule[day][slot].teacher) {
                            allTimetables.push({
                                day,
                                timeSlot: slot,
                                subject: schedule[day][slot].subject,
                                sclass: schedule[day][slot].sclass._id,
                                teacher: schedule[day][slot].teacher._id,
                                school: id
                            });
                        }
                    }
                }
            }
        }

        const result = await Timetable.insertMany(allTimetables);
        res.status(201).json({ message: 'Timetable generated successfully', count: result.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete timetable entries
const deleteTimetable = async (req, res) => {
    try {
        const { id } = req.params; // timetable id or school id
        const { schoolId } = req.query;

        if (schoolId) {
            await Timetable.deleteMany({ school: schoolId });
            res.status(200).json({ message: 'All timetables deleted for school' });
        } else {
            await Timetable.findByIdAndDelete(id);
            res.status(200).json({ message: 'Timetable deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTimetable, getTimetables, generateAutomaticTimetable, deleteTimetable };
