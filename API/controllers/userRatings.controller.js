const userRatingService = require('../services/userRatings.service');

exports.newRating = async (req, res, next) => {
    try {
        const { rating, userId} = req.body;
        if (!rating || !userId) {
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        else{
            const event = await userRatingService.newRating(rating, userId);
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
            const event = await userRatingService.updateRating(req.params.id, rating, opinion);
            res.status(200).json({success: true, message: "Értékelés módosítása sikeres!"});
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

        const rating = await userRatingService.deleteRating(req.params.id);
        
        res.status(200).json({success:true, results: rating});

    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const ratings = await userRatingService.getAll();

        res.status(200).json({success:true, results: ratings});
    } catch (error) {
        next(error)
    }
}

exports.getAllById = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }

        const ratings = await userRatingService.getAllById(req.params.id);
        
        res.status(200).json({success:true, results: ratings});
    } catch (error) {
        next(error)
    }
}