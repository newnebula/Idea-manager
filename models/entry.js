const {Sequelize, DataTypes}  = require('sequelize');

const sequelize = require('../util/database');

const Entry = sequelize.define('entry', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "did something"
    }
});

module.exports = Entry;