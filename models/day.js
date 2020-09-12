const {Sequelize, DataTypes}  = require('sequelize');

const sequelize = require('../util/database');

const Day = sequelize.define('day', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    theDate: {
        type: DataTypes.STRING,
        allowNull: false,

    }

});

module.exports = Day;