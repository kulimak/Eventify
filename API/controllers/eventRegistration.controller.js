const eventRegistrationService = require('../services/eventRegistrations.service');


exports.newRegistration = async (req, res, next) => {
    try {
        const { userId, eventId} = req.body;
        if (!userId || !eventId) {
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        else{
            const registration = await eventRegistrationService.newRegistration( userId, eventId);
            res.status(200).json({success: true, message: "Jelentkezés sikeres!"});
        }
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }

        const registration = await eventRegistrationService.deleteRegistration(req.params.id);
        
        res.status(200).json({success:true, results: registration});

    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const registrations = await eventRegistrationService.getAll();

        res.status(200).json({success:true, results: registrations});
    } catch (error) {
        next(error)
    }
}

exports.getAllById = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }

        const registrations = await eventRegistrationService.getAllById(req.params.id);
        
        res.status(200).json({success:true, results: registrations});
    } catch (error) {
        next(error)
    }
}