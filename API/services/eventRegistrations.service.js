const { EventRegistrations } = require('../models/event.registrations.model');

exports.newRegistration = async ( userId, eventId) => {
    
    const newRating = await EventRegistrations.create({
        userId,
        eventId
    });

    return newRating
}

exports.deleteRegistration = async (id) => {

    const registration = await EventRegistrations.destroy({
        where: {id}
    });

    if (!registration) throw new Error('Jelentkezés nem található!');

    return "Jelentkezés törölve!";
}

exports.getAll = async () => {
    const registrations = await EventRegistrations.findAll();

    return registrations;
}

exports.getAllById = async (userId) => {
    const registrations = await EventRegistrations.findAll({
        where: {userId}
    })

    return registrations
}