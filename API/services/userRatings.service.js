const { UserRatings } = require('../models/userRatings.model');

exports.newRating = async (rating, userId,) => {
    
    const newRating = await UserRatings.create({
        rating,
        userId
    });

    return newRating
}


exports.deleteRating = async (id) => {

    const rating = await UserRatings.destroy({
        where: {id}
    });

    if (!rating) throw new Error('Értékelés nem található!');

    return "Értékelés törölve!";
}

exports.getAll = async () => {
    const ratings = await UserRatings.findAll();

    return ratings;
}

exports.getAllById = async (userId) => {
    const rating = await UserRatings.findAll({
        where: {userId}
    })

    return rating
}