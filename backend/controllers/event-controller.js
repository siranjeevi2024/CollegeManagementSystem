const Event = require('../models/eventSchema.js');

const eventCreate = async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            school: req.body.adminID,
            creator: req.body.creatorID
        })
        const result = await event.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const eventList = async (req, res) => {
    try {
        let events = await Event.find({ school: req.params.id })
        if (events.length > 0) {
            res.send(events)
        } else {
            res.send({ message: "No events found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateEvent = async (req, res) => {
    try {
        const result = await Event.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteEvent = async (req, res) => {
    try {
        const result = await Event.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteEvents = async (req, res) => {
    try {
        const result = await Event.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No events found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = { eventCreate, eventList, updateEvent, deleteEvent, deleteEvents };
