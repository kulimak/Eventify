const categoriesService = require('../services/categories.service');

exports.getAll = async (req, res, next) => {
    try {
        const categories = await categoriesService.getAll();

        res.status(200).json({success:true, results: categories});
    } catch (error) {
        next(error)
    }
}

exports.newCategory = async (req, res, next) => {
    try {
        const name = req.body

        if (!name) {
            return res.status(400).json({ message: 'Hiányzó adat!'});
        }
        else{
            const upload = await categoriesService.newCategory(name);
            res.status(201).json({success: true, message: "Kategória feltöltése sikeres!"});

        }
    } catch (error) {
         next(error);
    }
}