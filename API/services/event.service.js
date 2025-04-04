const { Event } = require('../models/events.model');
const { generateToken } = require('../utils/token');
const { configDotenv } = require('dotenv');

exports.newEvent = async (eventName, eventStart, eventEnd, eventAddress, eventDate, description)=>{

    const newEvent = await Event.create({
        eventName,
        eventStart,
        eventEnd,
        eventAddress,
        eventDate,
        description
    });

    return newEvent;
}