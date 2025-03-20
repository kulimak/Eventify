const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    gender:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    defAddress:{
        type: DataTypes.STRING(60),
        allowNull: true
    },
    favCategories:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    role: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
});

module.exports = { User };