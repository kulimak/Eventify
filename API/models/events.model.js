const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { User } = require('../models/user.model');
const { Categories } = require('../models/categories.model');

const Events = db.define('Events', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    eventName:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    eventStart: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    eventEnd: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    eventAddress: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    eventDate:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    image:{
        type:DataTypes.STRING(100),
        allowNull: true
    }
});

//Kapcsolatok
User.hasMany(Events, { foreignKey: 'userId' });
Categories.hasMany(Events, { foreignKey: 'catId' });

Events.belongsTo(User, { foreignKey: 'userId' });
Events.belongsTo(Categories, { foreignKey: 'catId' });


module.exports = { Events };