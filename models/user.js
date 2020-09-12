const {Sequelize, DataTypes}  = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

module.exports = User;