const { Events } = require('../models/events.model');
const fs = require('fs');
const path = require('path');
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
    // 1. Keresd meg az eseményt
    const event = await Events.findByPk(id);
    
    if (!event) throw new Error('Esemény nem található!');

    const imagePath = path.join(__dirname, '..', 'uploads', event.image);

    // 2. Töröld az eseményt az adatbázisból
    await Events.destroy({
        where: { id }
    });

    // 3. Próbáld meg törölni a képfájlt is
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Kép törlése sikertelen:', err.message);
            // nem dobunk hibát, ha nem sikerül, mert az adat törölve lett
        } else {
            console.log('Kép sikeresen törölve:', event.image);
        }
    });

    return 'Esemény törölve!';
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