const { Events } = require('../models/events.model');
const { generateToken } = require('../utils/token');
const { configDotenv } = require('dotenv');

exports.newEvent = async (eventName, eventStart, eventEnd, eventAddress, eventDate, description, userId, catId, image) => {

    const newEvent = await Events.create({
        eventName,
        eventStart,
        eventEnd,
        eventAddress,
        eventDate,
        description,
        userId,
        catId,
        image
    });

    return newEvent;
}

exports.getAll = async () => {
    const events = await Events.findAll();

    return events;
}

exports.getOneById = async (id) => {
    const event = await Events.findOne({
        where: {id}
    })

    return event
}

exports.deleteEvent = async (id) => {
    
    const event = await Events.destroy({
        where: {id}
    });

    if (!event) throw new Error('Esemény nem található!');

    return "Esemény törölve!";
}

exports.updateEvent = async (id, eventName, eventStart, eventEnd, eventAddress, eventDate, description) => {

    const updateEvent = Events.update({
        eventName, 
        eventStart, 
        eventEnd, 
        eventAddress, 
        eventDate, 
        description
    },
    {
        where: {id}
    });

    if (updateEvent == 0) throw new Error('Az Esemény nem található!');

    return 'Esemény módosítás sikeres!'
}