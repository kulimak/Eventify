const { Event } = require('../models/events.model');
const eventService = require('../services/event.service');

exports.newevent = async (req, res, next) => {
    try{

        /*console.log('Body:', req.body);
        console.log('File:', req.file);*/
        // Ellenőrizzük, hogy van-e feltöltött fájl
        /*if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Nem található feltöltött fájl.',
            });
        }*/

        // Feltöltött fájl adatai
        const file = req.file;

        const { eventName, eventStart, eventEnd, eventAddress, eventDate, description, userId, catId} = req.body;
        const image = req.file ? req.file.filename : null;

        if (!eventName || !eventStart || !eventEnd || !eventAddress || !eventDate || !description || !userId || !catId){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        else if (eventStart >= eventEnd) {
            return res.status(400).json({ message: 'Az esemény kezdete nem lehet előbb vagy ugyanakkor, mint az esemény vége!'});
        }
        else{
            const event = await eventService.newEvent(eventName, eventStart, eventEnd, eventAddress, eventDate, description, userId, catId, image);
            res.status(201).json({success: true, message: "Esemény létrehozása sikeres!"});
        }
    }catch(error){
        //console.log(error)
        next(error);
    }

}

exports.getAll = async (req, res, next) => {
    try {
        const events = await eventService.getAll();

        res.status(200).json({success:true, results: events});
    } catch (error) {
        next(error)
    }
}

exports.getOneById = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó esemény azonosító!'});
        }

        const event = await eventService.getOneById(req.params.id);
        
        res.status(200).json({success:true, results: event});
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó esemény azonosító!'});
        }

        const event = await eventService.deleteEvent(req.params.id);
        
        res.status(200).json({success:true, results: event});

    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {

        const file = req.file;

        const { eventName, eventStart, eventEnd, eventAddress, eventDate, description, userId, catId} = req.body;
        const image = req.file ? req.file.filename : null;

        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó esemény azonosító!'});
        }
        else{
            const event = await eventService.updateEvent(req.params.id,eventName, eventStart, eventEnd, eventAddress, eventDate, description, catId, image);
            res.status(200).json({success: true, message: "Esemény módosítása sikeres!"});
        }
    } catch (error) {
        next(error);
    }
}