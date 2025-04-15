const { Categories } = require('../models/categories.model');

exports.getAll = async () => {
    const categories = await Categories.findAll();

    return categories
}