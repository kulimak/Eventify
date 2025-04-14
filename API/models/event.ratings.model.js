const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { Events } = require('../models/events.model');
const { User } = require('../models/user.model');

const EventRatings = db.define('EventRatings', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    opinion:{
        type: DataTypes.TEXT,
        allowNull: true
    }
}); 

//Kapcsolatok
Events.hasMany(EventRatings, { foreignKey: 'eventId' });
User.hasMany(EventRatings, { foreignKey: 'userId' });

EventRatings.belongsTo(Events, { foreignKey: 'eventId' });
EventRatings.belongsTo(User, { foreignKey: 'userId' });

module.exports = { EventRatings };