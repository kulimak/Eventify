const { EventRatings } = require('../models/event.ratings.model');

exports.newRating = async (rating, opinion, userId, eventId) => {
    
    const newRating = await EventRatings.create({
        rating,
        opinion,
        userId,
        eventId
    });

    return newRating
}

exports.updateRating = async (id, rating, opinion) => {
    
    const updateRating = await EventRatings.update({
        rating,
        opinion
    },
    {
        where: {id}
    });
    if (updateRating == 0) throw new Error('Az értékelés nem található!');

    return 'Értékelés módosítás sikeres!'
}

exports.deleteRating = async (id) => {

    const rating = await EventRatings.destroy({
        where: {id}
    });

    if (!rating) throw new Error('Értékelés nem található!');

    return "Értékelés törölve!";
}

exports.getAll = async () => {
    const ratings = await EventRatings.findAll();

    return ratings;
}

exports.getOneById = async (id) => {
    const rating = await EventRatings.findOne({
        where: {id}
    })

    return rating
}