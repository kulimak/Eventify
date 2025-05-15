const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { User } = require('./user.model')

const UserRatings = db.define('UserRatings', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.STRING(1),
        allowNull: true
    }
});

//Kapcsolatok
User.hasMany(UserRatings, { foreignKey: 'userId' });
UserRatings.belongsTo(User, { foreignKey: 'userId' });

module.exports = { UserRatings };