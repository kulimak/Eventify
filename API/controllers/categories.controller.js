const categoriesService = require('../services/categories.service');

exports.getAll = async (req, res, next) => {
    try {
        const categories = await categoriesService.getAll();

        res.status(200).json({success:true, results: categories});
    } catch (error) {
        next(error)
    }
}