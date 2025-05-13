const eventRatingService = require('../services/eventRatings.service');

exports.newRating = async (req, res, next) => {
    try {
        const { rating, opinion, userId, eventId} = req.body;
        if (!rating || !opinion) {
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        else{
            const event = await eventRatingService.newRating(rating, opinion, userId, eventId);
            res.status(200).json({success: true, message: "Értékelés sikeresen hozzáadva!"});
        }
    } catch (error) {
        next(error);
    }
}

exports.updateRating = async (req, res, next) => {
    try {
        const { rating, opinion} = req.body;
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó értékelés azonosító!'});
        }
        else{
            const event = await eventRatingService.updateRating(req.params.id, rating, opinion);
            res.status(200).json({success: true, message: "Értékelés módosítása sikeresen!"});
        }
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó esemény azonosító!'});
        }

        const rating = await eventRatingService.deleteRating(req.params.id);
        
        res.status(200).json({success:true, results: rating});

    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const ratings = await eventRatingService.getAll();

        res.status(200).json({success:true, results: ratings});
    } catch (error) {
        next(error)
    }
}

exports.getAllById = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó esemény azonosító!'});
        }

        const ratings = await eventRatingService.getAllById(req.params.id);
        
        res.status(200).json({success:true, results: ratings});
    } catch (error) {
        next(error)
    }
}