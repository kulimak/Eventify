const { DataTypes } = require('sequelize');
const db = require('../config/database');

const CompanyUser = db.define('CompanyUser', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cegnev: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    adoszam: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    jegyzekszam: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    szekhely: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nev: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefon: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
});

module.exports = { CompanyUser };