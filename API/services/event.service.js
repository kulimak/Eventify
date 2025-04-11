const { Events } = require('../models/events.model');
const { generateToken } = require('../utils/token');
const { configDotenv } = require('dotenv');

exports.newEvent = async (eventName, eventStart, eventEnd, eventAddress, eventDate, description) => {

    const newEvent = await Events.create({
        eventName,
        eventStart,
        eventEnd,
        eventAddress,
        eventDate,
        description
    });

    return newEvent;
}

exports.deleteEvent = async (id) => {
    const event = await Events.destroy({
        where: {id}
    });

    if (!event) throw new Error('Esemény nem található!');

    return "Esemény törölve!";
}
