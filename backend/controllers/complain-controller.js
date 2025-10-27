const Complain = require('../models/complainSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');

const complainCreate = async (req, res) => {
    try {
        const complain = new Complain(req.body)
        const result = await complain.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const complainList = async (req, res) => {
    try {
        const complains = await Complain.find({ school: req.params.id });
        const populatedComplains = await Promise.all(complains.map(async (complain) => {
            let user;
            if (complain.userType === 'student') {
                user = await Student.findById(complain.user).populate('sclassName', 'sclassName');
            } else if (complain.userType === 'teacher') {
                user = await Teacher.findById(complain.user).populate('teachSubject', 'subName').populate('teachSclass', 'sclassName');
            }
            complain.user = user;
            return complain;
        }));
        if (populatedComplains.length > 0) {
            res.send(populatedComplains)
        } else {
            res.send({ message: "No complains found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteComplain = async (req, res) => {
    try {
        const result = await Complain.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { complainCreate, complainList, deleteComplain };
