const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { User } = require('../models/user.model');
const { Events } = require('../models/events.model');

const EventRegistrations = db.define('EventRegistrations', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

//Kapcsolatok
Events.hasMany(EventRegistrations, { foreignKey: 'eventId' });
User.hasMany(EventRegistrations, { foreignKey: 'userId' });

EventRegistrations.belongsTo(Events, { foreignKey: 'eventId' });
EventRegistrations.belongsTo(User, { foreignKey: 'userId' });

module.exports = { EventRegistrations };