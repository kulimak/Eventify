const { Categories } = require('../models/categories.model');

exports.getAll = async () => {
    const categories = await Categories.findAll();

    return categories
}

exports.newCategory = async (name) => {
    const category = await Categories.create(name);

    return category
}