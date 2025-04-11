const { Event } = require('../models/events.model');
const eventService = require('../services/event.service');

exports.newevent = async (req, res, next) => {
    try {
        const { eventName, eventStart, eventEnd, eventAddress, eventDate, description } = req.body;
        if (!eventName || !eventStart || !eventEnd || !eventAddress || !eventDate || !description) {
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        else if (eventStart >= eventEnd) {
            return res.status(400).json({ message: 'Az esemény kezdete nem lehet előbb vagy ugyanakkor, mint az esemény vége!'});
        }
        else{
            const event = await eventService.newEvent(eventName, eventStart, eventEnd, eventAddress, eventDate, description);
            res.status(201).json({success: true, message: "Esemény létrehozása sikeres!"});
        }
    } catch (error) {
        next(error);
    }
}